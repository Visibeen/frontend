/**
 * Google My Business API Service
 * This service handles interactions with the Google My Business API
 * using the client ID and secret from the .env file
 */

import { auth, provider } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogleOnce } from '../utils/googlePopupAuth';
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
    
    // Log configuration for debugging (without exposing secrets)
    if (process.env.REACT_APP_DEBUG_MODE === 'true') {
      console.log('🔧 GMBService Configuration:', {
        hasClientId: !!this.clientId,
        hasClientSecret: !!this.clientSecret,
        hasProjectId: !!this.projectId,
        hasApiKey: !!this.apiKey,
        projectId: this.projectId || '(not set - will work without it)'
      });
    }
    
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

  // Public method to get access token (for external services)
  async getAccessToken(providedToken) {
    return this._getAccessToken(providedToken);
  }

  // Internal: fetch helper that attaches token and retries once on 401 after refresh
  async _googleFetch(url, options = {}, accessToken) {
    const token = await this._getAccessToken(accessToken);
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    // Only include X-Goog-User-Project if project ID is configured and valid
    // This header requires specific Google Cloud permissions
    if (this.projectId && this.projectId !== 'undefined' && this.projectId.trim()) {
      headers['X-Goog-User-Project'] = this.projectId;
    }

    let res = await fetch(url, { ...options, headers });
    
    // Handle specific permission errors for X-Goog-User-Project
    if (res.status === 403 && this.projectId) {
      console.warn('Permission denied with X-Goog-User-Project header. Retrying without it...');
      const headersWithoutProject = { ...headers };
      delete headersWithoutProject['X-Goog-User-Project'];
      res = await fetch(url, { ...options, headers: headersWithoutProject });
    }
    
    if (res.status === 401) {
      // Try refresh once
      const newToken = await tokenManager.getValidAccessToken('google');
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      if (this.projectId && headers['X-Goog-User-Project']) {
        delete retryHeaders['X-Goog-User-Project'];
      }
      res = await fetch(url, { ...options, headers: retryHeaders });
      // If still unauthorized, clear tokens and redirect to login
      if (res.status === 401 && typeof window !== 'undefined') {
        try {
          tokenManager.remove('google');
          localStorage.removeItem('googleAccessToken');
          sessionStorage.removeItem('googleAccessToken');
        } catch (_) {}
        window.alert('Your Google session has expired. Please log in again.');
        window.location.href = '/login';
        return res;
      }
    }
    return res;
  }

  /**
   * Get media (photos and videos) for a specific location
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
   * Upload video to a specific location
   * Uses GMB v4 media endpoint.
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountId - Account ID string (e.g., '12345')
   * @param {string} locationId - Location ID string (e.g., '67890')
   * @param {File} videoFile - Video file to upload
   * @returns {Promise<Object>} Upload result
   */
  async uploadVideo(accessToken, accountId, locationId, videoFile) {
    try {
      if (!accountId || !locationId) {
        throw new Error('Invalid accountId or locationId');
      }

      if (!videoFile) {
        throw new Error('Video file is required');
      }

      // Validate file type
      const allowedTypes = ['video/mp4', 'video/mov', 'video/avi'];
      if (!allowedTypes.includes(videoFile.type)) {
        throw new Error('Invalid video format. Only MP4, MOV, and AVI files are supported.');
      }

      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (videoFile.size > maxSize) {
        throw new Error('Video file size must be less than 100MB');
      }

      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('media', videoFile);

      // First, create the media item metadata
      const mediaMetadata = {
        mediaFormat: 'VIDEO',
        category: 'PROFILE',
        description: videoFile.name || 'Business video'
      };

      const response = await this._googleFetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mediaMetadata)
        },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create video media item');
      }

      const mediaItem = await response.json();
      
      // Now upload the actual video file
      const uploadResponse = await this._googleFetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media/${mediaItem.name}/mediaFiles`,
        {
          method: 'POST',
          body: formData
        },
        accessToken
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error?.message || 'Failed to upload video file');
      }

      return mediaItem;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  /**
   * Get Google OAuth token using Firebase Authentication
   * Enhanced with better refresh token handling and storage
   * @returns {Promise<string>} The access token
   */
  async getGoogleToken() {
    try {
      // Add required GMB scopes to the provider
      oauthConfig.google.scopes.forEach((s) => provider.addScope(s));
      
      // Request access token directly from Google with enhanced parameters
      provider.setCustomParameters({
        'access_type': 'offline',
        'prompt': 'consent', // Force consent to ensure refresh token
        'client_id': this.clientId,
        'include_granted_scopes': true
      });

      const result = await signInWithGoogleOnce(auth, provider, (p) => {
        p.setCustomParameters({
          prompt: 'consent',
          include_granted_scopes: 'true'
        });
      });
      
      // Get the OAuth access token (not Firebase ID token)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleAccessToken = credential?.accessToken || '';
      const refreshToken = credential?.refreshToken || null;
      
      // Store token using enhanced auto management
      if (googleAccessToken) {
        console.log('🔐 Google OAuth token received, setting up auto-management...');
        
        // Calculate expiration time (Google tokens typically expire in 1 hour)
        const expiresIn = 3600; // 1 hour in seconds
        const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
        
        // Store in TokenManager with complete metadata
        const tokenData = {
          access_token: googleAccessToken,
          token_type: 'Bearer',
          expires_in: expiresIn,
          expires_at: expiresAt,
          created_at: Date.now(),
          scope: oauthConfig.google.scopes.join(' '),
          refresh_token: refreshToken
        };
        
        tokenManager.set('google', tokenData);
        
        // Sync to legacy storage for backward compatibility
        localStorage.setItem('googleAccessToken', googleAccessToken);
        sessionStorage.setItem('googleAccessToken', googleAccessToken);
        
        // Store refresh token securely if available
        if (refreshToken) {
          localStorage.setItem('googleRefreshToken', refreshToken);
          console.log('✅ Refresh token stored for automatic renewal');
        }
        
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
   * Initialize OAuth2 flow with authorization code exchange
   * Alternative to Firebase popup flow for server-side apps
   * @param {string} authorizationCode - Authorization code from OAuth callback
   * @returns {Promise<Object>} Token data
   */
  async exchangeAuthorizationCode(authorizationCode) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: oauthConfig.google.redirectUri
      });

      const response = await fetch(oauthConfig.google.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || 'Failed to exchange authorization code');
      }

      const tokenData = await response.json();
      
      // Calculate expiration timestamp
      if (tokenData.expires_in) {
        tokenData.expires_at = Math.floor(Date.now() / 1000) + tokenData.expires_in;
      }
      tokenData.created_at = Date.now();
      
      // Store tokens
      tokenManager.set('google', tokenData);
      
      if (tokenData.refresh_token) {
        localStorage.setItem('googleRefreshToken', tokenData.refresh_token);
      }
      
      console.log('✅ Authorization code exchanged successfully');
      return tokenData;
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      throw error;
    }
  }

  /**
   * Generate OAuth2 authorization URL for manual redirect flow
   * @returns {string} Authorization URL
   */
  generateAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: oauthConfig.google.redirectUri,
      scope: oauthConfig.google.scopes.join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true'
    });

    return `${oauthConfig.google.authEndpoint}?${params.toString()}`;
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
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || 'Failed to fetch GMB accounts';
        
        // Enhanced error handling for common permission issues
        if (response.status === 403) {
          if (errorMessage.includes('does not have required permission') || 
              errorMessage.includes('serviceusage.services.use')) {
            throw new Error(
              'Google Cloud project permission error. This can be resolved by:\n' +
              '1. Using your personal Google account instead of the project service account\n' +
              '2. Ensuring your Google account has access to Google My Business\n' +
              '3. Removing the project ID from environment variables if not needed\n' +
              '4. Contacting your Google Cloud administrator to grant the required permissions\n\n' +
              `Original error: ${errorMessage}`
            );
          }
          throw new Error(`Permission denied: ${errorMessage}`);
        }
        
        if (response.status === 401) {
          throw new Error('Authentication failed. Please reconnect your Google account.');
        }
        
        throw new Error(errorMessage);
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
   * Get count of new reviews in the last 30 days for a specific location
   * Uses the same Reviews v4 endpoint and filters by review timestamp.
   * @param {string} accessToken - Google OAuth access token (optional; auto-resolved if not provided)
   * @param {string} accountId - Account ID string (e.g., '12345') or full name 'accounts/12345'
   * @param {string} locationId - Location ID string (e.g., '67890') or full name 'locations/67890'
   * @returns {Promise<number>} Count of reviews created/updated in the last 30 days
   */
  async getNewReviewsCountLast30Days(accessToken, accountId, locationId) {
    try {
      if (!accountId || !locationId) {
        throw new Error('accountId and locationId are required');
      }

      const token = await this._getAccessToken(accessToken);
      const acc = String(accountId).includes('accounts/') ? String(accountId).split('/')[1] : String(accountId);
      const loc = String(locationId).includes('locations/') ? String(locationId).split('/')[1] : String(locationId);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      let newCount = 0;
      let nextPageToken = null;

      // We page until there are no more pages OR we detect that the page's reviews are all older than 30 days
      // Note: API may not be sorted strictly; we conservatively scan all pages but short-circuit if an entire page is old
      do {
        const url = `https://mybusiness.googleapis.com/v4/accounts/${acc}/locations/${loc}/reviews` +
                    (nextPageToken ? `?pageToken=${encodeURIComponent(nextPageToken)}` : '');

        const response = await this._googleFetch(
          url,
          { method: 'GET' },
          token
        );

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          console.warn('[GMBService] getNewReviewsCountLast30Days failed:', { status: response.status, error: err });
          break;
        }

        const data = await response.json();
        const pageReviews = Array.isArray(data?.reviews) ? data.reviews : [];

        let pageAllOld = pageReviews.length > 0; // assume old until proven new
        for (const r of pageReviews) {
          const ts = r?.createTime || r?.updateTime || r?.reviewTime || null;
          let d = null;
          if (ts) {
            // createTime can be RFC3339; Date can parse it
            d = new Date(ts);
          }
          if (d && !isNaN(d.getTime())) {
            if (d >= thirtyDaysAgo) {
              newCount += 1;
              pageAllOld = false; // found a recent one
            }
          } else {
            // If timestamp missing or unparsable, skip safely
            pageAllOld = false; // do not prematurely stop due to unknown
          }
        }

        // Stop early if this page had items and all of them were older than 30 days
        if (pageReviews.length > 0 && pageAllOld) {
          break;
        }

        nextPageToken = data?.nextPageToken || null;
        // Safety: avoid huge scans
        if (newCount > 5000) {
          console.warn('[GMBService] Aborting review scan after 5000 recent reviews (unlikely)');
          break;
        }
      } while (nextPageToken);

      return newCount;
    } catch (error) {
      console.error('[GMBService] Error counting new reviews (30d):', error);
      return 0;
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
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      
      // Only include X-Goog-User-Project if project ID is configured
      if (this.projectId && this.projectId !== 'undefined' && this.projectId.trim()) {
        headers['X-Goog-User-Project'] = this.projectId;
      }
      
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers,
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // If permission denied with project header, try without it
        if (response.status === 403 && headers['X-Goog-User-Project']) {
          console.warn('Permission denied with X-Goog-User-Project in refresh. Retrying without it...');
          const headersWithoutProject = { ...headers };
          delete headersWithoutProject['X-Goog-User-Project'];
          
          const retryResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: headersWithoutProject,
            body: new URLSearchParams({
              client_id: this.clientId,
              client_secret: this.clientSecret,
              refresh_token: refreshToken,
              grant_type: 'refresh_token'
            })
          });
          
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
        
        throw new Error(errorData.error_description || 'Failed to refresh token');
      }

      return await response.json();
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  /**
   * Get local posts for a specific location
   * Uses GMB v4 localPosts endpoint.
   * @param {string} accessToken - Google OAuth access token
   * @param {string} accountId - Account ID string (e.g., '12345')
   * @param {string} locationId - Location ID string (e.g., '67890')
   * @returns {Promise<Array>} List of local posts
   */
  async getLocalPosts(accessToken, accountId, locationId) {
    try {
      if (!accountId || !locationId) {
        throw new Error('Invalid accountId or locationId for local posts');
      }

      console.log(`[GMBService] Fetching local posts for account: ${accountId}, location: ${locationId}`);

      const response = await this._googleFetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`,
        { method: 'GET' },
        accessToken
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[GMBService] Local posts API error:`, {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        if (response.status === 404) {
          console.warn(`[GMBService] Local posts not found for account ${accountId}, location ${locationId}`);
          return [];
        }
        
        throw new Error(errorData.error?.message || 'Failed to fetch local posts');
      }

      const data = await response.json();
      console.log(`[GMBService] Local posts response:`, data);
      
      return Array.isArray(data.localPosts) ? data.localPosts : [];
    } catch (error) {
      console.error('Error fetching local posts:', error);
      // Don't throw error, return empty array to allow other features to work
      return [];
    }
  }

  /**
   * Get products for a specific location
   * Uses My Business API v4: GET /v4/accounts/{accountId}/locations/{locationId}/products
   * @param {string} locationNameOrId - e.g., 'locations/1234567890' or just the numeric ID
   * @param {string} accessToken - optional Google OAuth access token
   * @param {string} accountId - optional account ID, will be fetched if not provided
   * @returns {Promise<Array>} Array of product objects
   */
  async getProducts(locationNameOrId, accessToken, accountId = null) {
    try {
      if (!locationNameOrId) throw new Error('locationNameOrId is required');
      
      // Extract location ID from full name if needed
      const locationId = String(locationNameOrId).includes('locations/')
        ? String(locationNameOrId).split('/')[1]
        : String(locationNameOrId);

      // Get account ID if not provided
      if (!accountId) {
        const accounts = await this.getAccounts(accessToken);
        if (accounts.length === 0) throw new Error('No accounts found');
        accountId = accounts[0].name.split('/')[1]; // Extract ID from 'accounts/123456'
      }

      const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/products`;
      
      console.log(`[GMBService] Fetching products from URL: ${url}`);
      console.log(`[GMBService] Using account: ${accountId}, location: ${locationId}`);
      console.log(`[GMBService] Access token available: ${!!accessToken}`);
      
      const response = await this._googleFetch(
        url,
        { method: 'GET' },
        accessToken
      );

      console.log(`[GMBService] Products API response status: ${response.status}`);
      console.log(`[GMBService] Products API response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[GMBService] Products API error:`, {
          status: response.status,
          statusText: response.statusText,
          url: url,
          error: errorData,
          errorMessage: errorData.error?.message || 'Unknown error'
        });
        return [];
      }

      const data = await response.json();
      console.log(`[GMBService] Products API response data:`, data);
      console.log(`[GMBService] Products found: ${data.products ? data.products.length : 0}`);
      return data.products || [];
    } catch (error) {
      console.error('[GMBService] Error fetching products:', error);
      console.error('[GMBService] Error details:', {
        message: error.message,
        stack: error.stack,
        locationId: locationNameOrId
      });
      
      // Return mock data when API fails due to CORS
      if (error.message === 'Failed to fetch') {
        console.warn('[GMBService] Returning mock products data due to CORS limitations');
        return this._getMockProducts();
      }
      return [];
    }
  }

  /**
   * Get services for a specific location from categories data
   * Extracts services from location.categories.primaryCategory.serviceTypes
   * @param {string} locationNameOrId - e.g., 'locations/1234567890' or just the numeric ID
   * @param {string} accessToken - optional Google OAuth access token
   * @returns {Promise<Array>} Array of service objects extracted from categories
   */
  async getServices(locationNameOrId, accessToken) {
    try {
      if (!locationNameOrId) throw new Error('locationNameOrId is required');
      
      console.log(`[GMBService] Extracting services from location categories for: ${locationNameOrId}`);
      
      // Get account and then fetch locations to find the specific location data
      const accounts = await this.getAccounts(accessToken);
      if (accounts.length === 0) throw new Error('No accounts found');
      
      const accountName = accounts[0].name;
      const locations = await this.getLocations(accessToken, accountName);
      
      // Extract location ID from locationNameOrId
      const locationId = String(locationNameOrId).includes('locations/')
        ? String(locationNameOrId).split('/')[1]
        : String(locationNameOrId);
      
      // Find the specific location
      const locationData = locations.find(loc => 
        loc.name.includes(locationId) || loc.name.endsWith(locationId)
      );
      
      if (!locationData || !locationData.categories) {
        console.warn('[GMBService] No categories found in location data');
        return this._getMockServices();
      }

      const services = [];
      
      // Extract services from primary category
      if (locationData.categories.primaryCategory && locationData.categories.primaryCategory.serviceTypes) {
        const serviceTypes = locationData.categories.primaryCategory.serviceTypes;
        console.log(`[GMBService] Found ${serviceTypes.length} service types in primary category`);
        
        serviceTypes.forEach(serviceType => {
          // Skip photo and image-related services
          const displayName = serviceType.displayName.toLowerCase();
          if (displayName.includes('photo') || displayName.includes('photos') || 
              displayName.includes('photography') || displayName.includes('photographer') ||
              displayName.includes('image') || displayName.includes('images') ||
              displayName.includes('imaging') || displayName.includes('picture') ||
              displayName.includes('pictures')) {
            return;
          }
          
          // Clean service ID by removing 'job_type_id:' prefix
          const cleanServiceId = serviceType.serviceTypeId.replace('job_type_id:', '');
          
          services.push({
            name: `locations/${locationNameOrId}/services/${cleanServiceId}`,
            serviceId: cleanServiceId,
            displayName: serviceType.displayName,
            category: locationData.categories.primaryCategory.displayName,
            isOffered: true,
            serviceTypeId: cleanServiceId
          });
        });
      }

      // Extract services from additional categories if they exist
      if (locationData.categories.additionalCategories) {
        locationData.categories.additionalCategories.forEach(category => {
          if (category.serviceTypes) {
            category.serviceTypes.forEach(serviceType => {
              // Skip photo and image-related services
              const displayName = serviceType.displayName.toLowerCase();
              if (displayName.includes('photo') || displayName.includes('photos') || 
                  displayName.includes('photography') || displayName.includes('photographer') ||
                  displayName.includes('image') || displayName.includes('images') ||
                  displayName.includes('imaging') || displayName.includes('picture') ||
                  displayName.includes('pictures')) {
                return;
              }
              
              // Clean service ID by removing 'job_type_id:' prefix
              const cleanServiceId = serviceType.serviceTypeId.replace('job_type_id:', '');
              
              services.push({
                name: `locations/${locationNameOrId}/services/${cleanServiceId}`,
                serviceId: cleanServiceId,
                displayName: serviceType.displayName,
                category: category.displayName,
                isOffered: true,
                serviceTypeId: cleanServiceId
              });
            });
          }
        });
      }

      console.log(`[GMBService] Extracted ${services.length} services from categories`);
      return services;
      
    } catch (error) {
      console.error('[GMBService] Error extracting services from categories:', error);
      console.error('[GMBService] Error details:', {
        message: error.message,
        stack: error.stack,
        locationId: locationNameOrId
      });
      
      // Return mock data when extraction fails
      console.warn('[GMBService] Returning mock services data due to extraction failure');
      return this._getMockServices();
    }
  }

  /**
   * Get mock products data when API fails due to CORS
   * @returns {Array} Array of mock product objects
   * @private
   */
  _getMockProducts() {
    return [
      {
        name: 'locations/8588992893892271088/products/product1',
        productId: 'product1',
        title: 'Premium Web Design',
        description: 'Custom responsive website design with modern UI/UX',
        price: {
          currencyCode: 'USD',
          units: '999',
          nanos: 0
        },
        category: 'Web Development',
        labels: ['Featured', 'Popular']
      },
      {
        name: 'locations/8588992893892271088/products/product2',
        productId: 'product2',
        title: 'SEO Optimization Package',
        description: 'Complete SEO audit and optimization for better search rankings',
        price: {
          currencyCode: 'USD',
          units: '499',
          nanos: 0
        },
        category: 'Digital Marketing',
        labels: ['Best Value']
      },
      {
        name: 'locations/8588992893892271088/products/product3',
        productId: 'product3',
        title: 'Mobile App Development',
        description: 'Native iOS and Android app development',
        price: {
          currencyCode: 'USD',
          units: '2999',
          nanos: 0
        },
        category: 'Mobile Development',
        labels: ['Enterprise']
      }
    ];
  }

  /**
   * Get mock services data when API fails due to CORS
   * @returns {Array} Array of mock service objects
   * @private
   */
  _getMockServices() {
    return [
      {
        name: 'locations/8588992893892271088/services/service1',
        serviceId: 'service1',
        displayName: 'Website Consultation',
        description: 'Free 30-minute consultation to discuss your website needs',
        category: 'Consultation',
        isOffered: true
      },
      {
        name: 'locations/8588992893892271088/services/service2',
        serviceId: 'service2',
        displayName: 'Technical Support',
        description: '24/7 technical support for all our web solutions',
        category: 'Support',
        isOffered: true
      },
      {
        name: 'locations/8588992893892271088/services/service3',
        serviceId: 'service3',
        displayName: 'Website Maintenance',
        description: 'Monthly website updates, security patches, and backups',
        category: 'Maintenance',
        isOffered: true
      },
      {
        name: 'locations/8588992893892271088/services/service4',
        serviceId: 'service4',
        displayName: 'Domain & Hosting Setup',
        description: 'Complete domain registration and hosting configuration',
        category: 'Infrastructure',
        isOffered: true
      }
    ];
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

  /**
   * Get response rate metrics for a specific location over the last 90 days
   * @param {string} accessToken - optional Google OAuth access token
   * @param {string} locationId - Location ID (numeric part only)
   * @param {Object} dateRange - Date range object with startDate and endDate
   * @returns {Promise<Object>} Response rate metrics data
   */
  async getResponseRateMetrics(accessToken, locationId, dateRange = null) {
    try {
      if (!locationId) {
        throw new Error('Location ID is required');
      }

      // Ensure we have a valid access token
      const token = await this._getAccessToken(accessToken);
      if (!token) {
        throw new Error('No valid access token available. Please re-authenticate with Google My Business.');
      }

      // Default to last 90 days if no date range provided
      const now = new Date();
      const start = new Date(now);
      start.setDate(now.getDate() - 90);
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

      // Response rate related metrics
      const metrics = [
        'BUSINESS_CONVERSATIONS',
        'BUSINESS_DIRECTION_REQUESTS',
        'CALL_CLICKS'
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

      console.log(`[GMB Service] Fetching response rate metrics from: ${url}`);

      const response = await this._googleFetch(
        url,
        { method: 'GET' },
        token
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('[GMB Service] Response rate metrics fetch failed:', {
          status: response.status,
          error: errorData
        });
        return { responseRate: 0 };
      }

      const data = await response.json();
      console.log('[GMB Service] Response rate metrics response:', data);

      // Calculate response rate from the metrics
      // This is a simplified calculation - you may need to adjust based on actual API response structure
      let totalConversations = 0;
      let totalResponses = 0;

      if (data.multiDailyMetricTimeSeries) {
        data.multiDailyMetricTimeSeries.forEach(series => {
          if (series.dailyMetricTimeSeries) {
            series.dailyMetricTimeSeries.forEach(dailySeries => {
              if (dailySeries.dailyMetrics) {
                dailySeries.dailyMetrics.forEach(metric => {
                  if (metric.metric === 'BUSINESS_CONVERSATIONS') {
                    totalConversations += parseInt(metric.value || 0);
                  }
                  // Add other response-related metrics as needed
                });
              }
            });
          }
        });
      }

      // Calculate response rate percentage
      const responseRate = totalConversations > 0 ? Math.min(100, (totalResponses / totalConversations) * 100) : 0;

      return {
        responseRate: responseRate,
        totalConversations: totalConversations,
        totalResponses: totalResponses,
        dateRange: defaultDateRange,
        raw: data
      };

    } catch (error) {
      console.error('Error fetching response rate metrics:', error);
      // Return default values instead of throwing to prevent breaking the scoring
      return { responseRate: 0 };
    }
  }
}

export default new GMBService();