/**
 * Competitor Discovery Service using Google Places API (New)
 * Finds competitors by location/keyword and fetches reviews data for scoring
 */

import VelocityService from './VelocityService.js';

class CompetitorDiscoveryService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;
    this.baseUrl = 'https://places.googleapis.com/v1/places';
    this.maxCompetitors = 50;
  }

  /**
   * Find competitors near a location using keyword search
   * @param {Object} params - Search parameters
   * @param {number} params.latitude - Center point latitude
   * @param {number} params.longitude - Center point longitude
   * @param {string} params.keyword - Business category/keyword to search for
   * @param {number} params.radius - Search radius in meters (default: 10000)
   * @param {string} params.excludePlaceId - Place ID to exclude (your business)
   * @returns {Promise<Array>} Array of competitor data
   */
  async findCompetitors({ latitude, longitude, keyword, radius = 10000, excludePlaceId = null }) {
    try {
      console.log('[CompetitorDiscovery] Starting competitor search:', {
        location: `${latitude}, ${longitude}`,
        keyword,
        radius,
        excludePlaceId
      });

      const competitors = [];
      let nextPageToken = null;
      let searchAttempts = 0;
      const maxSearchAttempts = 5; // Prevent infinite loops

      do {
        const searchResults = await this.searchNearbyPlaces({
          latitude,
          longitude,
          keyword,
          radius,
          pageToken: nextPageToken
        });

        if (searchResults.places && searchResults.places.length > 0) {
          for (const place of searchResults.places) {
            // Skip if this is the user's own business
            if (excludePlaceId && place.id === excludePlaceId) {
              continue;
            }

            // Use basic place data from search results instead of detailed fetch
            const competitor = {
              placeId: place.id,
              name: place.displayName?.text || 'Unknown Business',
              address: place.formattedAddress || 'Address not available',
              location: place.location,
              rating: place.rating || 0,
              reviewsCount: place.userRatingCount || 0,
              priceLevel: null,
              businessStatus: 'OPERATIONAL',
              types: place.types || [],
              phoneNumber: null,
              website: null,
              openingHours: null,
              photos: [],
              reviews: [],
              distance: this.calculateDistance(
                latitude, 
                longitude, 
                place.location?.latitude,
                place.location?.longitude
              )
            };

            competitors.push(competitor);

            console.log(`[CompetitorDiscovery] Found competitor ${competitors.length}:`, {
              name: competitor.name,
              rating: competitor.rating,
              reviewsCount: competitor.reviewsCount,
              distance: competitor.distance
            });

            // Stop if we've found enough competitors
            if (competitors.length >= this.maxCompetitors) {
              console.log(`[CompetitorDiscovery] Reached maximum competitors limit: ${this.maxCompetitors}`);
              break;
            }

            // Add small delay to avoid rate limiting
            await this.delay(100);
          }
        }

        nextPageToken = searchResults.nextPageToken;
        searchAttempts++;

        // Add delay before next page request
        if (nextPageToken && searchAttempts < maxSearchAttempts) {
          await this.delay(2000); // Places API requires delay between page requests
        }

      } while (nextPageToken && competitors.length < this.maxCompetitors && searchAttempts < maxSearchAttempts);

      console.log(`[CompetitorDiscovery] Competitor discovery completed:`, {
        totalFound: competitors.length,
        searchAttempts,
        keyword,
        location: `${latitude}, ${longitude}`
      });

      // Sort competitors by distance
      competitors.sort((a, b) => a.distance - b.distance);

      return competitors;

    } catch (error) {
      console.error('[CompetitorDiscovery] Error finding competitors:', error);
      throw new Error(`Failed to find competitors: ${error.message}`);
    }
  }

  /**
   * Search for nearby places using Places API (New)
   */
  async searchNearbyPlaces({ latitude, longitude, keyword, radius, pageToken = null }) {
    try {
      const requestBody = {
        includedTypes: ['establishment'],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude)
            },
            radius: parseFloat(radius)
          }
        },
        languageCode: 'en'
      };

      if (pageToken) {
        requestBody.pageToken = pageToken;
      }

      // Add text query if keyword is provided
      if (keyword) {
        requestBody.textQuery = keyword;
      }

      console.log('[CompetitorDiscovery] Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${this.baseUrl}:searchText`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.rating,places.userRatingCount,nextPageToken'
        },
        body: JSON.stringify({
          textQuery: `${keyword} near ${latitude},${longitude}`,
          maxResultCount: 20,
          locationBias: {
            circle: {
              center: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
              },
              radius: parseFloat(radius)
            }
          },
          languageCode: 'en'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[CompetitorDiscovery] API Error Response:', errorText);
        throw new Error(`Places API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('[CompetitorDiscovery] Error in searchNearbyPlaces:', error);
      throw error;
    }
  }

  /**
   * Get detailed place information including reviews
   */
  async getPlaceDetails(placeId) {
    try {
      const fieldMask = [
        'id',
        'displayName',
        'formattedAddress',
        'location',
        'geometry',
        'rating',
        'userRatingCount',
        'priceLevel',
        'businessStatus',
        'types',
        'nationalPhoneNumber',
        'websiteUri',
        'currentOpeningHours',
        'photos',
        'reviews'
      ].join(',');

      const response = await fetch(`${this.baseUrl}/${placeId}`, {
        method: 'GET',
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': fieldMask
        }
      });

      if (!response.ok) {
        console.warn(`[CompetitorDiscovery] Failed to get details for place ${placeId}:`, response.status);
        return null;
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`[CompetitorDiscovery] Error getting place details for ${placeId}:`, error);
      return null;
    }
  }

  /**
   * Geocode an address to get coordinates
   */
  async geocodeAddress(address) {
    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
          formatted_address: data.results[0].formatted_address
        };
      } else {
        throw new Error(`Geocoding failed: ${data.status}`);
      }
    } catch (error) {
      console.error('[CompetitorDiscovery] Geocoding error:', error);
      return null;
    }
  }

  /**
   * Calculate competitor score (wrapper for calculateReviewsScore)
   */
  calculateScore(userBusiness, competitors) {
    return this.calculateReviewsScore(competitors, userBusiness);
  }

  /**
   * Calculate velocity score for user business
   * @param {Object} userBusiness - User business data
   * @param {Object} options - Options for velocity calculation
   * @returns {Object} Velocity score analysis
   */
  calculateVelocityScore(userBusiness, options = {}) {
    try {
      console.log('[CompetitorDiscovery] Calculating velocity score for:', userBusiness.name);
      
      // Use provided 30-day review count directly
      let velocityAnalysis = null;
      
      if (options.reviewsLast30Days !== undefined) {
        // Use provided 30-day review count
        velocityAnalysis = VelocityService.calculateVelocityScore(
          options.reviewsLast30Days, 
          options.benchmarkReviewCount
        );
      }
      
      if (!velocityAnalysis) {
        // Fallback: estimate based on total reviews and business age
        const totalReviews = userBusiness.reviewsCount || userBusiness.userRatingCount || 0;
        const estimatedMonthlyReviews = Math.max(1, Math.floor(totalReviews / 12)); // Assume 1 year average
        const estimatedLast30Days = Math.floor(estimatedMonthlyReviews);
        
        console.log('[CompetitorDiscovery] Using estimated velocity:', {
          totalReviews,
          estimatedLast30Days
        });
        
        velocityAnalysis = VelocityService.calculateVelocityScore(estimatedLast30Days);
      }
      
      return {
        velocityScore: velocityAnalysis.velocityScore,
        analysis: velocityAnalysis
      };
      
    } catch (error) {
      console.error('[CompetitorDiscovery] Error calculating velocity score:', error);
      return {
        velocityScore: 0,
        analysis: {
          error: 'Failed to calculate velocity score',
          newReviewsLast30Days: 0,
          benchmarkReviewCount: 5,
          recommendations: ['Unable to calculate velocity score. Please check review data availability.']
        }
      };
    }
  }

  /**
   * Calculate comprehensive scoring including reviews and velocity
   */
  calculateComprehensiveScore(userBusiness, competitors, options = {}) {
    try {
      // Calculate existing reviews score
      const reviewsScoring = this.calculateReviewsScore(competitors, userBusiness);
      
      // Calculate velocity score
      const velocityScoring = this.calculateVelocityScore(userBusiness, options);
      
      // Combine scores (you can adjust weights as needed)
      const reviewsWeight = 0.7; // 70% weight for reviews score
      const velocityWeight = 0.3; // 30% weight for velocity score
      
      const combinedScore = Math.round(
        (reviewsScoring.score * reviewsWeight) + 
        (velocityScoring.velocityScore * velocityWeight * (100/12)) // Scale velocity to 100 point scale
      );
      
      console.log('[CompetitorDiscovery] Comprehensive scoring calculated:', {
        reviewsScore: reviewsScoring.score,
        velocityScore: velocityScoring.velocityScore,
        combinedScore
      });
      
      return {
        score: combinedScore,
        reviewsAnalysis: reviewsScoring.analysis,
        velocityAnalysis: velocityScoring,
        breakdown: {
          reviewsScore: reviewsScoring.score,
          velocityScore: velocityScoring.velocityScore,
          weights: { reviews: reviewsWeight, velocity: velocityWeight }
        }
      };
      
    } catch (error) {
      console.error('[CompetitorDiscovery] Error calculating comprehensive score:', error);
      // Fallback to reviews-only scoring
      return this.calculateReviewsScore(competitors, userBusiness);
    }
  }

  /**
   * Calculate scoring based on reviews count and rating
   */
  calculateReviewsScore(competitors, userBusiness = null) {
    if (!competitors || competitors.length === 0) {
      return { score: 0, analysis: 'No competitors found for comparison' };
    }

    // Calculate competitor averages
    const competitorRatings = competitors.filter(c => c.rating > 0).map(c => c.rating);
    const competitorReviewCounts = competitors.filter(c => c.reviewsCount > 0).map(c => c.reviewsCount);

    const avgCompetitorRating = competitorRatings.length > 0 
      ? competitorRatings.reduce((sum, rating) => sum + rating, 0) / competitorRatings.length 
      : 0;

    const avgCompetitorReviews = competitorReviewCounts.length > 0
      ? competitorReviewCounts.reduce((sum, count) => sum + count, 0) / competitorReviewCounts.length
      : 0;

    const maxCompetitorRating = Math.max(...competitorRatings, 0);
    const maxCompetitorReviews = Math.max(...competitorReviewCounts, 0);

    let userRating = userBusiness?.rating || 0;
    let userReviewsCount = userBusiness?.reviewsCount || 0;

    // Calculate scores (0-100 scale)
    let ratingScore = 0;
    let reviewsCountScore = 0;

    if (avgCompetitorRating > 0) {
      ratingScore = Math.min(100, (userRating / avgCompetitorRating) * 50);
      if (userRating >= maxCompetitorRating) {
        ratingScore = Math.min(100, ratingScore + 25);
      }
    }

    if (avgCompetitorReviews > 0) {
      reviewsCountScore = Math.min(100, (userReviewsCount / avgCompetitorReviews) * 50);
      if (userReviewsCount >= maxCompetitorReviews) {
        reviewsCountScore = Math.min(100, reviewsCountScore + 25);
      }
    }

    // Combined score (weighted: 60% rating, 40% reviews count)
    const combinedScore = Math.round((ratingScore * 0.6) + (reviewsCountScore * 0.4));

    const analysis = {
      userRating,
      userReviewsCount,
      avgCompetitorRating: Math.round(avgCompetitorRating * 10) / 10,
      avgCompetitorReviews: Math.round(avgCompetitorReviews),
      maxCompetitorRating: Math.round(maxCompetitorRating * 10) / 10,
      maxCompetitorReviews,
      ratingScore: Math.round(ratingScore),
      reviewsCountScore: Math.round(reviewsCountScore),
      combinedScore,
      competitorsAnalyzed: competitors.length,
      recommendations: this.generateRecommendations(userRating, userReviewsCount, avgCompetitorRating, avgCompetitorReviews)
    };

    console.log('[CompetitorDiscovery] Reviews scoring analysis:', analysis);

    return {
      score: combinedScore,
      analysis
    };
  }

  /**
   * Generate recommendations based on competitor analysis
   */
  generateRecommendations(userRating, userReviews, avgCompetitorRating, avgCompetitorReviews) {
    const recommendations = [];

    if (userRating < avgCompetitorRating) {
      recommendations.push(`Your rating (${userRating}) is below competitor average (${avgCompetitorRating.toFixed(1)}). Focus on improving service quality.`);
    }

    if (userReviews < avgCompetitorReviews) {
      recommendations.push(`Your review count (${userReviews}) is below competitor average (${Math.round(avgCompetitorReviews)}). Encourage more customers to leave reviews.`);
    }

    if (userRating >= 4.5 && userReviews >= avgCompetitorReviews) {
      recommendations.push('Excellent performance! You\'re outperforming competitors in both rating and review volume.');
    }

    if (recommendations.length === 0) {
      recommendations.push('You\'re performing competitively. Continue maintaining quality service and encouraging reviews.');
    }

    return recommendations;
  }

  /**
   * Get business types for Places API search based on keyword
   */
  getBusinessTypes(keyword) {
    const keywordLower = keyword.toLowerCase();
    
    // Map common keywords to Places API types
    const typeMapping = {
      'restaurant': ['restaurant', 'meal_takeaway', 'meal_delivery'],
      'food': ['restaurant', 'meal_takeaway', 'meal_delivery', 'bakery', 'cafe'],
      'hotel': ['lodging'],
      'doctor': ['doctor', 'hospital', 'health'],
      'dentist': ['dentist'],
      'lawyer': ['lawyer'],
      'salon': ['beauty_salon', 'hair_care'],
      'gym': ['gym'],
      'store': ['store'],
      'shop': ['store'],
      'repair': ['car_repair', 'electronics_store'],
      'service': ['establishment']
    };

    for (const [key, types] of Object.entries(typeMapping)) {
      if (keywordLower.includes(key)) {
        return types;
      }
    }

    // Default to establishment if no specific type found
    return ['establishment'];
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  /**
   * Utility function to add delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Display competitor discovery results in console
   */
  logCompetitorData(competitors, userBusiness = null) {
    console.group('🔍 COMPETITOR DISCOVERY RESULTS');
    
    console.log(`📊 Total Competitors Found: ${competitors.length}`);
    
    if (userBusiness) {
      console.log('🏢 Your Business:', {
        name: userBusiness.name,
        rating: userBusiness.rating,
        reviewsCount: userBusiness.reviewsCount
      });
    }

    console.log('\n📈 Top 10 Competitors by Distance:');
    competitors.slice(0, 10).forEach((competitor, index) => {
      console.log(`${index + 1}. ${competitor.name}`, {
        rating: competitor.rating,
        reviews: competitor.reviewsCount,
        distance: `${competitor.distance}km`,
        address: competitor.address
      });
    });

    // Statistics
    const ratings = competitors.filter(c => c.rating > 0).map(c => c.rating);
    const reviewCounts = competitors.filter(c => c.reviewsCount > 0).map(c => c.reviewsCount);

    if (ratings.length > 0) {
      console.log('\n📊 Competitor Statistics:');
      console.log('Ratings:', {
        average: (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2),
        highest: Math.max(...ratings),
        lowest: Math.min(...ratings)
      });
      console.log('Review Counts:', {
        average: Math.round(reviewCounts.reduce((sum, r) => sum + r, 0) / reviewCounts.length),
        highest: Math.max(...reviewCounts),
        lowest: Math.min(...reviewCounts)
      });
    }

    console.groupEnd();
  }
}

export default new CompetitorDiscoveryService();
