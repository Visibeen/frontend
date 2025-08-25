// Ranking service for tracking GMB positions across grid points (plain JS)
import { GooglePlacesService } from './google-places';
import {
  generateGridPointsWithAddresses,
  getGridLabel,
} from './geolocation';

export class RankingService {
  constructor(apiKey, useNewAPI = true) {
    this.placesService = new GooglePlacesService(apiKey, useNewAPI);
  }

  async performRankingAnalysis(config, onProgress) {
    // Optional coordinate fix example retained
    if (
      (config.businessName || '').includes('DigiWolves') ||
      (config.businessAddress || '').includes('Bestech Business Tower')
    ) {
      config.centerLocation = { lat: 30.6752, lng: 76.7409 };
    }

    if (onProgress) onProgress(0, 100, 'Generating grid points...');
    const gridPoints = await generateGridPointsWithAddresses(
      config.centerLocation,
      config.searchRadius,
      config.gridSize,
      config.googleApiKey,
      false,
      (current, total, address) => {
        if (onProgress) {
          const pct = Math.floor((current / total) * 30);
          onProgress(pct, 100, `Converting coordinates to address: ${address}`);
        }
      }
    );

    const trackingId = `tracking_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const timestamp = new Date();
    const results = [];

    if (onProgress) onProgress(30, 100, 'Starting business search analysis...');

    for (let i = 0; i < gridPoints.length; i++) {
      const gridPoint = gridPoints[i];
      try {
        if (onProgress) {
          const pct = 30 + Math.floor(((i + 1) / gridPoints.length) * 60);
          const status = gridPoint.address
            ? `Searching in ${gridPoint.address}...`
            : `Searching at grid point ${gridPoint.id}...`;
          onProgress(pct, 100, status);
        }

        const searchResult = await this.#searchAtGridPoint(
          gridPoint,
          config.keyword,
          config.businessName,
          config.businessAddress
        );
        results.push(searchResult);
        await new Promise((r) => setTimeout(r, 250));
      } catch (error) {
        console.warn(`Search error at ${gridPoint.id}:`, error);
        results.push({
          gridPoint,
          businesses: [],
          targetBusinessRank: null,
          searchRadius: 1000,
          timestamp: new Date(),
          keyword: config.keyword,
        });
      }
    }

    if (onProgress) onProgress(95, 100, 'Calculating final statistics...');

    const stats = this.#calculateStatistics(results);

    if (onProgress) onProgress(100, 100, 'Analysis complete!');

    return {
      trackingId,
      businessName: config.businessName,
      centerLocation: config.centerLocation,
      keyword: config.keyword,
      gridSize: config.gridSize,
      searchRadius: config.searchRadius,
      results,
      timestamp,
      ...stats,
    };
  }

  async #searchAtGridPoint(gridPoint, keyword, targetBusinessName, businessAddress) {
    const searchRadius = 1000; // meters
    let businesses = [];

    // Enhanced single-query search (new API) + mobile/desktop merge
    try {
      const enhanced = await this.placesService.enhancedPlacesAPISearch(
        { lat: gridPoint.lat, lng: gridPoint.lng },
        searchRadius / 1000,
        keyword,
        targetBusinessName,
        gridPoint.address
      );
      const seen = new Set();
      enhanced.forEach((b, idx) => {
        if (!seen.has(b.placeId)) {
          seen.add(b.placeId);
          businesses.push({ ...b, originalRank: b.originalRank || idx + 1 });
        }
      });
    } catch (e) {
      console.warn('Enhanced search failed:', e);
    }

    // Fallback nearby search if too few results
    if (businesses.length < 5) {
      try {
        const nearby = await this.placesService.nearbySearch(
          { lat: gridPoint.lat, lng: gridPoint.lng },
          searchRadius,
          keyword
        );
        const existing = new Set(businesses.map((b) => b.placeId));
        nearby.forEach((b, idx) => {
          if (!existing.has(b.placeId)) {
            businesses.push({ ...b, searchMethod: 'nearby_fallback', originalRank: idx + 1 });
          }
        });
      } catch (e) {
        console.warn('Nearby search failed:', e);
      }
    }

    // Sort by method and original rank for stability
    const methodPriority = {
      real_google_search: 1,
      natural_search_primary: 2,
      custom_search_primary: 3,
      location_specific: 4,
      business_name_search: 5,
      nearby_fallback: 6,
    };
    businesses.sort((a, b) => {
      const ap = methodPriority[a.searchMethod] || 10;
      const bp = methodPriority[b.searchMethod] || 10;
      if (ap !== bp) return ap - bp;
      return (a.originalRank || 999) - (b.originalRank || 999);
    });

    const targetBusinessRank = this.#findBusinessRank(businesses, targetBusinessName);

    return {
      gridPoint,
      businesses,
      targetBusinessRank,
      searchRadius,
      timestamp: new Date(),
      keyword,
    };
  }

  #findBusinessRank(businesses, targetBusinessName) {
    if (!targetBusinessName) return null;
    const normalize = (s) => s.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    const target = normalize(targetBusinessName);
    for (let i = 0; i < businesses.length; i++) {
      const name = normalize(businesses[i].name || '');
      if (name === target || name.includes(target) || target.includes(name)) return i + 1;
    }
    return null;
  }

  #calculateStatistics(results) {
    const ranks = results.map((r) => r.targetBusinessRank).filter((r) => typeof r === 'number');
    const averageRank = ranks.length ? ranks.reduce((a, b) => a + b, 0) / ranks.length : null;
    const bestRank = ranks.length ? Math.min(...ranks) : null;
    const worstRank = ranks.length ? Math.max(...ranks) : null;
    const notRankedCount = results.filter((r) => r.targetBusinessRank == null).length;
    return { averageRank, bestRank, worstRank, notRankedCount };
  }

  convertToGridDisplay(rankingData) {
    return rankingData.results.map((result) => ({
      gridPoint: result.gridPoint,
      rank: result.targetBusinessRank,
      color: this.#getRankingColor(result.targetBusinessRank),
      label: getGridLabel(result.gridPoint.gridX, result.gridPoint.gridY),
    }));
  }

  #getRankingColor(rank) {
    if (rank == null) return 'gray';
    if (rank <= 3) return 'green';
    if (rank <= 7) return 'yellow';
    return 'red';
  }

  async testApiConnection() {
    try {
      return await this.placesService.validateApiKey();
    } catch (_) {
      return false;
    }
  }

  validateConfig(config) {
    const errors = [];
    if (!config.businessName?.trim()) errors.push('Business name is required');
    if (!config.keyword?.trim()) errors.push('Search keyword is required');
    if (!config.centerLocation || typeof config.centerLocation.lat !== 'number' || typeof config.centerLocation.lng !== 'number') errors.push('Valid center coordinates are required');
    if (config.gridSize < 3 || config.gridSize > 10) errors.push('Grid size must be between 3 and 10');
    if (config.searchRadius <= 0 || config.searchRadius > 50) errors.push('Search radius must be between 0 and 50 kilometers');
    if (!config.googleApiKey?.trim()) errors.push('Google API key is required');
    return { isValid: errors.length === 0, errors };
  }
}
