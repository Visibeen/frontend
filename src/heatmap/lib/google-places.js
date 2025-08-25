// Google Places API integration (New + Legacy) in plain JS

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_PLACES_NEW_BASE_URL = 'https://places.googleapis.com/v1/places';

export class GooglePlacesService {
  constructor(apiKey, useNewAPI = true, customSearchApiKey, searchEngineId) {
    this.apiKey = apiKey;
    this.useNewAPI = useNewAPI;
  }

  async validateApiKey() {
    try {
      if (this.useNewAPI) {
        const res = await fetch(`${GOOGLE_PLACES_NEW_BASE_URL}:searchText`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': this.apiKey,
            'X-Goog-FieldMask': 'places.id',
          },
          body: JSON.stringify({ textQuery: 'coffee', maxResultCount: 1 }),
        });
        return res.ok;
      }
      const url = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=coffee&key=${this.apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      return data?.status === 'OK' || data?.results;
    } catch (e) {
      return false;
    }
  }

  async geocodeAddress(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
    const data = await res.json();
    const loc = data?.results?.[0]?.geometry?.location;
    if (!loc) throw new Error('Address not found');
    return { lat: loc.lat, lng: loc.lng };
  }

  async getCoordinatesByPlaceId(placeId) {
    const normalizedId = placeId.replace(/^places\//, '').trim();
    if (this.useNewAPI) {
      try {
        const res = await fetch(`${GOOGLE_PLACES_NEW_BASE_URL}/${encodeURIComponent(normalizedId)}`, {
          headers: {
            'X-Goog-Api-Key': this.apiKey,
            'X-Goog-FieldMask': 'id,location',
          },
        });
        if (res.ok) {
          const place = await res.json();
          const lat = place?.location?.latitude;
          const lng = place?.location?.longitude;
          if (typeof lat === 'number' && typeof lng === 'number') return { lat, lng };
        }
      } catch (_) {}
    }
    const url = `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${encodeURIComponent(
      normalizedId
    )}&fields=geometry/location&key=${this.apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const loc = data?.result?.geometry?.location;
    if (!loc) throw new Error('Place ID not found');
    return { lat: loc.lat, lng: loc.lng };
  }

  async textSearchLegacy({ query, location, radius }) {
    const params = new URLSearchParams({ query, key: this.apiKey });
    if (location && radius) {
      params.set('location', `${location.lat},${location.lng}`);
      params.set('radius', String(radius));
    }
    const res = await fetch(`${GOOGLE_PLACES_BASE_URL}/textsearch/json?${params.toString()}`);
    const data = await res.json();
    this.#checkLegacyApiResponse(data);
    return this.#transformLegacyResults(data.results || []);
  }

  async textSearch({ query, location, radius }) {
    if (this.useNewAPI) {
      return this.#textSearchNew(query, location, radius);
    }
    return this.textSearchLegacy({ query, location, radius });
  }

  async #textSearchNew(query, location, radius) {
    const body = {
      textQuery: query,
      locationBias: location
        ? { circle: { center: { latitude: location.lat, longitude: location.lng }, radius: radius || 2000 } }
        : undefined,
      maxResultCount: 20,
      rankPreference: 'RELEVANCE',
    };
    const res = await fetch(`${GOOGLE_PLACES_NEW_BASE_URL}:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.types,places.location',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Places API (new) text search failed: ${res.status}`);
    const data = await res.json();
    return this.#transformNewApiResults(data.places || []);
  }

  async nearbySearch(location, radius, keyword) {
    if (this.useNewAPI) {
      return this.#textSearchNew(keyword, location, radius);
    }
    const params = new URLSearchParams({
      key: this.apiKey,
      location: `${location.lat},${location.lng}`,
      radius: String(radius),
      keyword,
    });
    const res = await fetch(`${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?${params.toString()}`);
    const data = await res.json();
    this.#checkLegacyApiResponse(data);
    return this.#transformLegacyResults(data.results || []);
  }

  async enhancedPlacesAPISearch(location, radiusKm, keyword, businessName, gridPointAddress) {
    // Simplified single-query strategy compatible with browser
    const query = gridPointAddress ? `${keyword} ${gridPointAddress}` : `${keyword}`;
    const desktop = await this.textSearch({ query, location, radius: (radiusKm || 1) * 1000 });
    const mobile = await this.textSearch({ query, location, radius: Math.min((radiusKm || 1) * 500, 5000) });

    const seen = new Set();
    const merged = [];
    [...desktop, ...mobile].forEach((b) => {
      if (!seen.has(b.placeId)) {
        seen.add(b.placeId);
        merged.push({ ...b, searchMethod: 'natural_search_primary' });
      }
    });
    return merged;
  }

  #checkLegacyApiResponse(data) {
    const ok = data?.status === 'OK' || data?.status === 'ZERO_RESULTS';
    if (!ok) {
      const msg = data?.error_message || data?.status || 'UNKNOWN_ERROR';
      throw new Error(`Google Places (legacy) error: ${msg}`);
    }
  }

  #transformLegacyResults(results) {
    return results.map((r) => ({
      placeId: r.place_id,
      name: r.name,
      address: r.formatted_address || r.vicinity,
      latitude: r.geometry?.location?.lat,
      longitude: r.geometry?.location?.lng,
      rating: r.rating,
      types: r.types,
      businessStatus: r.business_status,
    }));
  }

  #transformNewApiResults(places) {
    return places.map((p, i) => ({
      placeId: p.id || p.placeId,
      name: p.displayName?.text || p.name || 'Unknown',
      address: p.formattedAddress,
      latitude: p.location?.latitude,
      longitude: p.location?.longitude,
      rating: p.rating,
      types: p.types,
      businessStatus: p.businessStatus,
      originalRank: i + 1,
    }));
  }
}
