/**
 * Google My Business API Service
 * This service handles interactions with the Google My Business API
 * using the client ID and secret from the .env file
 */

import { auth, provider, signInWithPopup } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import oauthConfig from '../config/oauth';
import tokenManager from '../auth/TokenManager';
import { registerGoogleRefresher } from '../auth/googleRefresher';
import AutoTokenManager from '../utils/autoTokenUtils';

class GMBService {
  constructor() {
    this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    this.projectId = process.env.REACT_APP_GMB_PROJECT_ID;
    this.apiKey = process.env.REACT_APP_GMB_API_KEY;
    // Register refresher once
    registerGoogleRefresher();
  }

  /**
   * Get Business Profile attributes for a specific location
   * Uses Business Information API v1: locations/{locationId}/attributes
   * @param {string} locationNameOrId - e.g., 'locations/1234567890' or just the numeric ID
   * @param {string} accessToken - optional Google OAuth access token
   * @returns {Promise<Array>} Array of attribute objects
   */
  async getLocationAttributes(locationNameOrId, accessToken) {
    try {
      if (!locationNameOrId) throw new Error('locationNameOrId is required');
      const locName = String(locationNameOrId).includes('locations/')
        ? String(locationNameOrId)
        : `locations/${locationNameOrId}`;

      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${locName}/attributes`;
      const response = await this._googleFetch(url, { method: 'GET' }, accessToken);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch location attributes');
      }
      const data = await response.json();
      // Response shape: { attributes: [ { attributeId, valueType, values, ... } ] }
      return Array.isArray(data?.attributes) ? data.attributes : [];
    } catch (error) {
      console.error('Error fetching location attributes:', error);
      return [];
    }
  }

  // Internal: get a valid access token, optionally using provided token
  async _getAccessToken(providedToken) {
    if (providedToken) return providedToken;
    
    // Try auto Google token first
    const autoToken = AutoTokenManager.getAutoGoogleToken();
    if (autoToken) {
      return autoToken;
    }
    
    // Fallback to TokenManager
    return await tokenManager.getValidAccessToken('google');
  }

  // Internal: fetch helper that attaches token and retries once on 401 after refresh
  async _googleFetch(url, options = {}, accessToken) {
    const token = await this._getAccessToken(accessToken);
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Goog-User-Project': this.projectId,
      ...(options.headers || {}),
    };

    let res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      // try refresh
      const newToken = await tokenManager.getValidAccessToken('google');
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      res = await fetch(url, { ...options, headers: retryHeaders });
    }
    return res;
  }

  /**
   * Get media (photos) for a specific location
   * Uses GMB v4 media endpoint.
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountId - Account ID string (e.g., '12345')
   * @param {string} locationId - Location ID string (e.g., '67890')
   * @returns {Promise<Array>} List of media items
   */
  async getMedia(accessToken, accountId, locationId) {
    try {
      if (!accountId || !locationId) {
        throw new Error('Invalid accountId or locationId');
      }

      const response = await this._googleFetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch media');
      }

      const data = await response.json();
      return Array.isArray(data.mediaItems) ? data.mediaItems : [];
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  }

  /**
   * Get Google OAuth token using Firebase Authentication
   * @returns {Promise<string>} The access token
   */
  async getGoogleToken() {
    try {
      // Add required GMB scopes to the provider
      oauthConfig.google.scopes.forEach((s) => provider.addScope(s));
      
      // Request access token directly from Google
      provider.setCustomParameters({
        'access_type': 'offline',
        'prompt': 'consent',
        'client_id': this.clientId
      });

      const result = await signInWithPopup(auth, provider);
      
      // Get the OAuth access token (not Firebase ID token)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleAccessToken = credential?.accessToken || '';
      
      // Store token using enhanced auto management
      if (googleAccessToken) {
        console.log('🔐 Google OAuth token received, setting up auto-management...');
        
        // Store in TokenManager with metadata
        tokenManager.set('google', { 
          access_token: googleAccessToken, 
          token_type: 'Bearer',
          created_at: Date.now(),
          refresh_token: credential?.refreshToken || null
        });
        
        // Sync to legacy storage for backward compatibility
        localStorage.setItem('googleAccessToken', googleAccessToken);
        sessionStorage.setItem('googleAccessToken', googleAccessToken);
        
        // Start auto token management if not already running
        AutoTokenManager.autoSetupGoogleToken();
        
        console.log('✅ Google token auto-management configured');
      }
      
      return googleAccessToken;
    } catch (error) {
      console.error('Error getting Google token:', error);
      throw error;
    }
  }

  /**
   * Get GMB accounts for the authenticated user
   * @param {string} accessToken - Google OAuth access token
   * @returns {Promise<Array>} List of GMB accounts
   */
  async getAccounts(accessToken) {
    try {
      const response = await this._googleFetch(
        `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch GMB accounts');
      }

      const data = await response.json();
      return data.accounts || [];
    } catch (error) {
      console.error('Error fetching GMB accounts:', error);
      throw error;
    }
  }

  /**
   * Get locations for a specific GMB account
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountName - The account name (e.g., 'accounts/12345')
   * @returns {Promise<Array>} List of locations
   */
  async getLocations(accessToken, accountName) {
    try {
      const readMask = [
        'storeCode',
        'regularHours',
        'name',
        'languageCode',
        'title',
        'phoneNumbers',
        'categories',
        'storefrontAddress',
        'websiteUri',
        'specialHours',
        'serviceArea',
        'labels',
        'adWordsLocationExtensions',
        'latlng',
        'openInfo',
        'metadata',
        'profile',
        'relationshipData',
        'moreHours'
      ].join(',');

      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=${encodeURIComponent(readMask)}&pageSize=100`;

      const response = await this._googleFetch(
        url,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch locations');
      }

      const data = await response.json();
      return data.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  /**
   * Get reviews for a specific location
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountName - The account name (e.g., 'accounts/12345')
   * @param {string} locationName - The location name (e.g., 'locations/67890')
   * @returns {Promise<Array>} List of reviews
   */
  async getReviews(accessToken, accountName, locationName) {
    try {
      let allReviews = [];
      let nextPageToken = null;
      let totalReviewCount = 0;
      let averageRating = 0;

      do {
        const url = `https://mybusiness.googleapis.com/v4/${accountName}/${locationName}/reviews` + 
                   (nextPageToken ? `?pageToken=${nextPageToken}` : '');
        
        const response = await this._googleFetch(
          url,
          { method: 'GET' },
          accessToken
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to fetch reviews');
        }

        const data = await response.json();
        
        // Add reviews from this page
        if (data.reviews && data.reviews.length > 0) {
          allReviews = allReviews.concat(data.reviews);
        }
        
        // Store metadata from first response
        if (!nextPageToken) {
          totalReviewCount = data.totalReviewCount || 0;
          averageRating = data.averageRating || 0;
        }
        
        nextPageToken = data.nextPageToken;
        
        // Safety check to prevent infinite loops
        if (allReviews.length > 10000) {
          console.warn('Reached maximum review limit of 10,000');
          break;
        }
        
      } while (nextPageToken);

      console.log(`Fetched ${allReviews.length} reviews out of ${totalReviewCount} total`);

      // Return the full response object with all reviews
      return {
        reviews: allReviews,
        totalReviewCount: totalReviewCount,
        averageRating: averageRating,
        nextPageToken: null
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  /**
   * Get performance metrics for a specific location
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - The location ID (e.g., '11157617678660838845')
   * @param {Object} dateRange - Date range object with startDate and endDate
   * @returns {Promise<Object>} Performance metrics data
   */
  async getPerformanceMetrics(accessToken, locationId, dateRange = null) {
    try {
      if (!locationId) {
        throw new Error('Location ID is required');
      }

      // Ensure we have a valid access token with proper scopes
      const token = await this._getAccessToken(accessToken);
      if (!token) {
        throw new Error('No valid access token available. Please re-authenticate with Google My Business.');
      }

      // Default to last 30 days (inclusive) if no date range provided
      const now = new Date();
      const start = new Date(now);
      start.setDate(now.getDate() - 29);
      const defaultDateRange = dateRange || {
        startDate: {
          year: start.getFullYear(),
          month: start.getMonth() + 1,
          day: start.getDate()
        },
        endDate: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate()
        }
      };

      const metrics = [
        'CALL_CLICKS',
        'WEBSITE_CLICKS', 
        'BUSINESS_DIRECTION_REQUESTS',
        'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
        'BUSINESS_IMPRESSIONS_MOBILE_SEARCH'
      ];

      const params = new URLSearchParams();
      metrics.forEach(metric => params.append('dailyMetrics', metric));
      params.append('dailyRange.startDate.year', defaultDateRange.startDate.year);
      params.append('dailyRange.startDate.month', defaultDateRange.startDate.month);
      params.append('dailyRange.startDate.day', defaultDateRange.startDate.day);
      params.append('dailyRange.endDate.year', defaultDateRange.endDate.year);
      params.append('dailyRange.endDate.month', defaultDateRange.endDate.month);
      params.append('dailyRange.endDate.day', defaultDateRange.endDate.day);

      const url = `https://businessprofileperformance.googleapis.com/v1/locations/${locationId}:fetchMultiDailyMetricsTimeSeries?${params.toString()}`;

      console.log(`[GMB Service] Fetching performance metrics from: ${url}`);

      const response = await this._googleFetch(
        url,
        { method: 'GET' },
        token
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific permission errors
        if (response.status === 403) {
          const errorMessage = errorData.error?.message || 'Permission denied';
          
          if (errorMessage.includes('caller does not have permission')) {
            throw new Error('Your Google account does not have permission to access Business Profile Performance data. Please ensure:\n' +
              '• You are the owner or manager of this business\n' +
              '• The business has performance data available\n' +
              '• You have re-authenticated with the correct Google account\n' +
              '• The Business Profile Performance API is enabled for your project');
          }
          
          throw new Error(`Permission denied: ${errorMessage}`);
        }
        
        if (response.status === 404) {
          throw new Error(`Business location not found. Please verify the location ID: ${locationId}`);
        }
        
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(`[GMB Service] Successfully fetched performance data:`, data);
      
      return this.processPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error;
    }
  }

  /**
   * Process raw performance data into a more usable format
   * @param {Object} rawData - Raw API response data
   * @returns {Object} Processed metrics data
   */
  processPerformanceData(rawData) {
    try {
      const processedMetrics = {};

      const accumulateFromTimeSeries = (metricKey, timeSeries) => {
        let totalValue = 0;
        let previousValue = 0;

        const dated = timeSeries?.datedValues || [];
        // Sum, treating missing values as 0; values may be strings
        const toNum = (v) => {
          const n = parseInt(v, 10);
          return Number.isNaN(n) ? 0 : n;
        };
        const totalAll = dated.reduce((sum, item) => sum + toNum(item.value), 0);

        // Change: compare second half vs first half when we have a decent window
        if (dated.length > 15) {
          const mid = Math.floor(dated.length / 2);
          const firstHalf = dated.slice(0, mid).reduce((s, it) => s + toNum(it.value), 0);
          const secondHalf = dated.slice(mid).reduce((s, it) => s + toNum(it.value), 0);
          previousValue = firstHalf;
          totalValue = secondHalf;
        } else {
          totalValue = totalAll;
        }

        let changePercent = 0;
        if (previousValue > 0) {
          changePercent = Math.round(((totalValue - previousValue) / previousValue) * 100);
        } else if (totalValue > 0) {
          changePercent = 100;
        }

        processedMetrics[metricKey] = {
          value: totalValue,
          change: changePercent,
          changeText: `${changePercent >= 0 ? '+' : ''}${changePercent}% vs last period`
        };
      };

      if (Array.isArray(rawData?.multiDailyMetricTimeSeries)) {
        rawData.multiDailyMetricTimeSeries.forEach((entry) => {
          // Shape A: entry has dailyMetric + dailyMetricTimeSeries.timeSeries
          if (entry?.dailyMetric && entry?.dailyMetricTimeSeries?.timeSeries) {
            accumulateFromTimeSeries(entry.dailyMetric, entry.dailyMetricTimeSeries.timeSeries);
            return;
          }
          // Shape B: entry has dailyMetricTimeSeries as an array of { dailyMetric, timeSeries }
          if (Array.isArray(entry?.dailyMetricTimeSeries)) {
            entry.dailyMetricTimeSeries.forEach((s) => {
              if (s?.dailyMetric && s?.timeSeries) {
                accumulateFromTimeSeries(s.dailyMetric, s.timeSeries);
              }
            });
          }
        });
      }

      return {
        localViews: processedMetrics.BUSINESS_IMPRESSIONS_DESKTOP_SEARCH?.value + processedMetrics.BUSINESS_IMPRESSIONS_MOBILE_SEARCH?.value || 0,
        localViewsChange: this.calculateAverageChange([
          processedMetrics.BUSINESS_IMPRESSIONS_DESKTOP_SEARCH?.change || 0,
          processedMetrics.BUSINESS_IMPRESSIONS_MOBILE_SEARCH?.change || 0
        ]),
        callClicks: processedMetrics.CALL_CLICKS?.value || 0,
        callClicksChange: processedMetrics.CALL_CLICKS?.change || 0,
        directionRequests: processedMetrics.BUSINESS_DIRECTION_REQUESTS?.value || 0,
        directionRequestsChange: processedMetrics.BUSINESS_DIRECTION_REQUESTS?.change || 0,
        websiteClicks: processedMetrics.WEBSITE_CLICKS?.value || 0,
        websiteClicksChange: processedMetrics.WEBSITE_CLICKS?.change || 0,
        rawData: processedMetrics
      };
    } catch (error) {
      console.error('Error processing performance data:', error);
      return {
        localViews: 0,
        localViewsChange: 0,
        callClicks: 0,
        callClicksChange: 0,
        directionRequests: 0,
        directionRequestsChange: 0,
        websiteClicks: 0,
        websiteClicksChange: 0,
        rawData: {}
      };
    }
  }

  /**
   * Calculate average change from multiple metrics
   * @param {Array} changes - Array of change percentages
   * @returns {number} Average change percentage
   */
  calculateAverageChange(changes) {
    const validChanges = changes.filter(change => !isNaN(change) && change !== null);
    if (validChanges.length === 0) return 0;
    return Math.round(validChanges.reduce((sum, change) => sum + change, 0) / validChanges.length);
  }

  /**
   * Refresh token using client ID and secret
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<Object>} New tokens
   */
  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Goog-User-Project': this.projectId
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || 'Failed to refresh token');
      }

      return await response.json();
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  }

  /**
   * Upload media (photo) to a specific location
   * Note: Google Business Profile API doesn't support direct browser uploads due to CORS restrictions.
   * This is a mock implementation that simulates successful upload for UI testing.
   * In production, this would require a server-side proxy or different approach.
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountId - Account ID string (e.g., '12345')
   * @param {string} locationId - Location ID string (e.g., '67890')
   * @param {File} file - The image file to upload
   * @returns {Promise<Object>} Upload result (mocked)
   */
  async uploadMedia(accessToken, accountId, locationId, file) {
    try {
      if (!accountId || !locationId || !file) {
        throw new Error('Invalid accountId, locationId, or file');
      }

      console.log('[GMBService] Mock photo upload initiated:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        accountId,
        locationId
      });

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a mock response that matches the expected format
      const mockResponse = {
        name: `accounts/${accountId}/locations/${locationId}/media/mock_${Date.now()}`,
        mediaFormat: 'PHOTO',
        sourceUrl: URL.createObjectURL(file), // Create a temporary URL for preview
        thumbnailUrl: URL.createObjectURL(file),
        googleUrl: URL.createObjectURL(file),
        locationAssociation: {
          category: 'ADDITIONAL'
        },
        createTime: new Date().toISOString(),
        category: 'ADDITIONAL'
      };

      console.log('[GMBService] Mock photo upload completed:', mockResponse);
      
      // Show user notification about mock upload
      if (typeof window !== 'undefined' && window.alert) {
        setTimeout(() => {
          alert('Photo upload simulated successfully! Note: This is a mock upload for testing. In production, server-side implementation would be required for Google Business Profile API.');
        }, 100);
      }

      return mockResponse;
    } catch (error) {
      console.error('Error in mock upload media:', error);
      throw error;
    }
  }

  /**
   * Update business profile information using Google Business Information API v1
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - Full location name (e.g., 'locations/12345')
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Update result
   */
  async updateBusinessProfile(accessToken, locationId, updateData) {
    try {
      if (!locationId || !updateData) {
        throw new Error('Invalid locationId or updateData');
      }

      // Ensure locationId is in correct format
      const fullLocationId = locationId.startsWith('locations/') ? locationId : `locations/${locationId}`;

      // Create update mask from the fields being updated
      const updateMask = Object.keys(updateData).join(',');

      const response = await this._googleFetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${fullLocationId}?updateMask=${updateMask}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updateData)
        },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to update business profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating business profile:', error);
      throw error;
    }
  }

  /**
   * Get Voice of Merchant verification state for a Business Profile location
   * API: https://mybusinessverifications.googleapis.com/v1/locations/{locationId}/VoiceOfMerchantState
   * @param {string} locationNameOrId - e.g., 'locations/11157617678660838845' or just the numeric ID
   * @param {string} accessToken - optional Google OAuth access token
   * @returns {Promise<{ raw: object, simplifiedStatus: 'verified'|'suspended'|'pending_verification'|'not_verified'|'unknown' }>} 
   */
  async getVoiceOfMerchantState(locationNameOrId, accessToken) {
    try {
      if (!locationNameOrId) throw new Error('locationNameOrId is required');
      const locName = String(locationNameOrId).includes('locations/')
        ? String(locationNameOrId)
        : `locations/${locationNameOrId}`;

      const url = `https://mybusinessverifications.googleapis.com/v1/${locName}/VoiceOfMerchantState`;
      console.log('[GMBService] Fetching VoiceOfMerchantState:', url);
      const response = await this._googleFetch(url, { method: 'GET' }, accessToken);
      if (!response.ok) {
        const rawText = await response.text().catch(() => '');
        console.error('[GMBService] VoiceOfMerchantState error', {
          url,
          status: response.status,
          statusText: response.statusText,
          body: rawText
        });
        let errorMessage = 'Failed to fetch VoiceOfMerchantState';
        try {
          const errorData = JSON.parse(rawText);
          errorMessage = errorData?.error?.message || errorMessage;
        } catch (_) {}
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Derive a simplified status from whatever fields are present
      const rawState = (data?.state || data?.status || data?.voiceOfMerchantState || '').toString().toUpperCase();
      let simplified = 'unknown';

      if (rawState.includes('VERIFIED')) simplified = 'verified';
      else if (rawState.includes('SUSPENDED')) simplified = 'suspended';
      else if (rawState.includes('PENDING')) simplified = 'pending_verification';
      else if (data?.isVerified === true) simplified = 'verified';
      else if (data?.isVerified === false) simplified = 'not_verified';
      else simplified = 'not_verified';

      return { raw: data, simplifiedStatus: simplified };
    } catch (error) {
      console.error('Error fetching VoiceOfMerchantState:', error);
      throw error;
    }
  }
}

export default new GMBService();