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
      // Store basic token (may not include refresh token in client-only flow)
      if (googleAccessToken) {
        tokenManager.set('google', { access_token: googleAccessToken, token_type: 'Bearer' });
      }
      
      console.log('Google OAuth token received:', !!googleAccessToken);
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
      // Extract IDs from names
      const accountId = (accountName || '').split('/')[1];
      const locationId = (locationName || '').split('/')[1];
      
      if (!accountId || !locationId) {
        throw new Error('Invalid account or location identifiers');
      }

      const response = await this._googleFetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch reviews');
      }

      const data = await response.json();
      return data.reviews || [];
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

      const response = await this._googleFetch(
        url,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch performance metrics');
      }

      const data = await response.json();
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
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
}

export default new GMBService();