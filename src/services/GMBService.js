/**
 * Google My Business API Service
 * This service handles interactions with the Google My Business API
 * using the client ID and secret from the .env file
 */

import { auth, provider, signInWithPopup } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';

class GMBService {
  constructor() {
    this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    this.projectId = process.env.REACT_APP_GMB_PROJECT_ID;
    this.apiKey = process.env.REACT_APP_GMB_API_KEY;
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

      const response = await fetch(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': this.projectId
        }
      });

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
      provider.addScope('https://www.googleapis.com/auth/business.manage');
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      
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
      const response = await fetch(`https://mybusinessaccountmanagement.googleapis.com/v1/accounts`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': this.projectId
        }
      });

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
        'name',
        'title',
        'storefrontAddress',
        'websiteUri',
        'phoneNumbers',
        'languageCode',
        'metadata'
      ].join(',');

      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=${encodeURIComponent(readMask)}&pageSize=100`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': this.projectId
        }
      });

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

      const response = await fetch(`https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': this.projectId
        }
      });

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

      // Default to current month if no date range provided
      const now = new Date();
      const defaultDateRange = dateRange || {
        startDate: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: 1
        },
        endDate: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
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

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': this.projectId
        }
      });

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
      
      if (rawData.multiDailyMetricTimeSeries) {
        rawData.multiDailyMetricTimeSeries.forEach(series => {
          const metricType = series.dailyMetric;
          let totalValue = 0;
          let previousValue = 0;
          
          if (series.dailyMetricTimeSeries && series.dailyMetricTimeSeries.timeSeries) {
            const timeSeries = series.dailyMetricTimeSeries.timeSeries;
            
            // Calculate total for current period
            totalValue = timeSeries.datedValues?.reduce((sum, item) => {
              return sum + (parseInt(item.value) || 0);
            }, 0) || 0;

            // For change calculation, compare with previous period (simplified)
            const currentPeriodLength = timeSeries.datedValues?.length || 0;
            if (currentPeriodLength > 15) {
              const firstHalf = timeSeries.datedValues.slice(0, Math.floor(currentPeriodLength / 2));
              const secondHalf = timeSeries.datedValues.slice(Math.floor(currentPeriodLength / 2));
              
              previousValue = firstHalf.reduce((sum, item) => sum + (parseInt(item.value) || 0), 0);
              const currentValue = secondHalf.reduce((sum, item) => sum + (parseInt(item.value) || 0), 0);
              
              totalValue = currentValue;
            }
          }

          // Calculate percentage change
          let changePercent = 0;
          if (previousValue > 0) {
            changePercent = Math.round(((totalValue - previousValue) / previousValue) * 100);
          } else if (totalValue > 0) {
            changePercent = 100; // New metric with no previous data
          }

          processedMetrics[metricType] = {
            value: totalValue,
            change: changePercent,
            changeText: `${changePercent >= 0 ? '+' : ''}${changePercent}% vs last period`
          };
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