/**
 * Google My Business Notifications API Service
 * Handles real-time notifications for business profile updates
 */

import GMBService from './GMBService';

class GMBNotificationService {
  constructor() {
    this.accountId = null; // Will be set dynamically
    this.baseUrl = 'https://mybusinessnotifications.googleapis.com/v1';
    this.notificationCache = new Map();
    this.pollingInterval = null;
    this.listeners = new Set();
  }

  /**
   * Set the account ID dynamically based on the current profile
   * @param {string} accountId - The account ID to use
   */
  setAccountId(accountId) {
    console.log('[GMBNotificationService] Setting account ID to:', accountId);
    this.accountId = accountId;
  }

  /**
   * Auto-detect account ID from location
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - Location ID to find account for
   * @returns {Promise<string>} The account ID that owns this location
   */
  async detectAccountId(accessToken, locationId) {
    try {
      console.log('[GMBNotificationService] Auto-detecting account ID for location:', locationId);
      
      const accounts = await GMBService.getAccounts(accessToken);
      console.log('[GMBNotificationService] Available accounts:', accounts.map(a => ({ id: a.name?.split('/').pop(), name: a.accountName })));
      
      // Try to find the location in each account
      for (const account of accounts) {
        try {
          const locations = await GMBService.getLocations(accessToken, account.name);
          const foundLocation = locations.find(loc => loc.name.includes(locationId));
          if (foundLocation) {
            const accountId = account.name.split('/').pop();
            console.log('[GMBNotificationService] Found location in account:', accountId);
            this.setAccountId(accountId);
            return accountId;
          }
        } catch (e) {
          console.warn('[GMBNotificationService] Could not check locations for account:', account.name);
        }
      }
      
      throw new Error(`Location ${locationId} not found in any accessible account`);
    } catch (error) {
      console.error('[GMBNotificationService] Error detecting account ID:', error);
      throw error;
    }
  }

  /**
   * Get notification settings for the account
   * @param {string} accessToken - Google OAuth access token
   * @returns {Promise<Object>} Notification settings
   */
  async getNotificationSettings(accessToken) {
    try {
      if (!this.accountId) {
        throw new Error('Account ID not set. Call detectAccountId() first.');
      }
      
      const url = `${this.baseUrl}/accounts/${this.accountId}/notificationSetting`;
      console.log('[GMBNotificationService] Fetching notification settings from:', url);
      
      const token = await GMBService.getAccessToken(accessToken);
      console.log('[GMBNotificationService] Using access token:', token ? 'Token available' : 'No token');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[GMBNotificationService] Response status:', response.status, response.statusText);
      console.log('[GMBNotificationService] Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[GMBNotificationService] Error response body:', errorText);
        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.warn('[GMBNotificationService] Could not parse error response as JSON');
        }
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[GMBNotificationService] Notification settings response:', data);
      return data;
    } catch (error) {
      console.error('[GMBNotificationService] Error fetching notification settings:', error);
      throw error;
    }
  }

  /**
   * Update notification settings with Pub/Sub topic
   * @param {string} accessToken - Google OAuth access token
   * @param {string} pubsubTopic - Pub/Sub topic name
   * @returns {Promise<Object>} Updated notification settings
   */
  async updateNotificationSettings(accessToken, pubsubTopic) {
    try {
      if (!this.accountId) {
        throw new Error('Account ID not set. Call detectAccountId() first.');
      }
      
      const url = `${this.baseUrl}/accounts/${this.accountId}/notificationSetting?updateMask=pubsub_topic`;
      
      const requestBody = {
        pubsubTopic: pubsubTopic,
        notificationTypes: [
          'NEW_REVIEW',
          'UPDATED_REVIEW',
          'NEW_CUSTOMER_MEDIA',
          'NEW_QUESTION',
          'UPDATED_QUESTION',
          'NEW_ANSWER',
          'UPDATED_ANSWER',
          'DUPLICATE_LOCATION',
          'LOCATION_VERIFICATION'
        ]
      };

      const token = await GMBService.getAccessToken(accessToken);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to update notification settings');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }

  /**
   * Get recent notifications by polling the API
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - Location ID to filter notifications
   * @returns {Promise<Array>} Array of notifications
   */
  async getRecentNotifications(accessToken, locationId) {
    try {
      console.log('[GMBNotificationService] Getting recent notifications for location:', locationId);
      
      // Auto-detect account ID if not already set
      if (!this.accountId) {
        await this.detectAccountId(accessToken, locationId);
      }
      
      const correctAccountId = this.accountId;
      
      // Since direct notification retrieval might not be available,
      // we'll simulate by checking for recent changes in reviews, media, etc.
      const notifications = [];
      
      // Check for new reviews
      try {
        const accountName = `accounts/${correctAccountId}`;
        const locationName = `locations/${locationId}`;
        console.log('[GMBNotificationService] Fetching reviews from:', accountName, locationName);
        const reviewsData = await GMBService.getReviews(accessToken, accountName, locationName);
        console.log('[GMBNotificationService] Reviews data received:', reviewsData);
        
        if (reviewsData?.reviews?.length > 0) {
          // Get recent reviews (last 24 hours)
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          const recentReviews = reviewsData.reviews.filter(review => {
            if (!review.createTime) return false;
            const reviewDate = new Date(review.createTime);
            return reviewDate > yesterday;
          });

          console.log('[GMBNotificationService] Found', recentReviews.length, 'recent reviews');
          recentReviews.forEach(review => {
            const notification = {
              id: `review_${review.name?.split('/').pop() || Date.now()}`,
              type: 'NEW_REVIEW',
              title: 'New review received',
              description: `${review.reviewer?.displayName || 'A customer'} left a ${this.getStarRating(review.starRating)} star review`,
              timestamp: review.createTime,
              data: review,
              icon: review.starRating === 'FIVE' || review.starRating === 'FOUR' ? 'review' : 'review-red'
            };
            console.log('[GMBNotificationService] Adding review notification:', notification);
            notifications.push(notification);
          });
        }
      } catch (error) {
        console.warn('Error fetching recent reviews for notifications:', error);
      }

      // Check for new media
      try {
        console.log('[GMBNotificationService] Fetching media for account/location:', correctAccountId, locationId);
        
        // Try to get media - if entity not found, skip media notifications
        let mediaItems = [];
        try {
          mediaItems = await GMBService.getMedia(accessToken, correctAccountId, locationId);
          console.log('[GMBNotificationService] Media items received:', mediaItems?.length || 0, 'items');
        } catch (mediaError) {
          if (mediaError.message.includes('not found') || mediaError.message.includes('404')) {
            console.warn('[GMBNotificationService] Media not found for this account/location combination, skipping media notifications');
            console.warn('[GMBNotificationService] Account ID:', correctAccountId, 'Location ID:', locationId);
          } else {
            throw mediaError; // Re-throw if it's a different error
          }
        }
        
        if (mediaItems?.length > 0) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          const recentMedia = mediaItems.filter(item => {
            if (!item.createTime) return false;
            const mediaDate = new Date(item.createTime);
            return mediaDate > yesterday;
          });

          console.log('[GMBNotificationService] Found', recentMedia.length, 'recent media items');
          recentMedia.forEach(media => {
            const notification = {
              id: `media_${media.name?.split('/').pop() || Date.now()}`,
              type: 'NEW_CUSTOMER_MEDIA',
              title: 'New photo added to your profile',
              description: 'A customer has added a new photo to your business profile',
              timestamp: media.createTime,
              data: media,
              icon: 'photo'
            };
            console.log('[GMBNotificationService] Adding media notification:', notification);
            notifications.push(notification);
          });
        }
      } catch (error) {
        console.warn('Error fetching recent media for notifications:', error);
      }

      // Sort notifications by timestamp (newest first)
      notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      console.log('[GMBNotificationService] Total notifications found:', notifications.length);
      const result = notifications.slice(0, 10); // Return last 10 notifications
      console.log('[GMBNotificationService] Returning', result.length, 'notifications:', result);
      return result;
    } catch (error) {
      console.error('Error fetching recent notifications:', error);
      return [];
    }
  }

  /**
   * Convert star rating enum to number
   * @param {string} starRating - Star rating enum (e.g., 'FIVE', 'FOUR')
   * @returns {number} Numeric rating
   */
  getStarRating(starRating) {
    const ratingMap = {
      'ONE': 1,
      'TWO': 2,
      'THREE': 3,
      'FOUR': 4,
      'FIVE': 5
    };
    return ratingMap[starRating] || 0;
  }

  /**
   * Start polling for notifications
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - Location ID to monitor
   * @param {number} intervalMs - Polling interval in milliseconds (default: 5 minutes)
   */
  startPolling(accessToken, locationId, intervalMs = 300000) {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    // Initial fetch
    this.fetchAndNotify(accessToken, locationId);

    // Set up polling
    this.pollingInterval = setInterval(() => {
      this.fetchAndNotify(accessToken, locationId);
    }, intervalMs);

    console.log(`Started notification polling for location ${locationId} every ${intervalMs/1000} seconds`);
  }

  /**
   * Stop polling for notifications
   */
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      console.log('Stopped notification polling');
    }
  }

  /**
   * Fetch notifications and notify listeners
   * @param {string} accessToken - Google OAuth access token
   * @param {string} locationId - Location ID
   */
  async fetchAndNotify(accessToken, locationId) {
    try {
      console.log('[GMBNotificationService] Polling for notifications...');
      const notifications = await this.getRecentNotifications(accessToken, locationId);
      
      // Check for new notifications
      const newNotifications = notifications.filter(notification => {
        const cacheKey = `${locationId}_${notification.id}`;
        if (this.notificationCache.has(cacheKey)) {
          return false;
        }
        this.notificationCache.set(cacheKey, notification);
        return true;
      });

      if (newNotifications.length > 0) {
        console.log('[GMBNotificationService] Found', newNotifications.length, 'new notifications, notifying listeners');
        // Notify all listeners
        this.listeners.forEach(listener => {
          try {
            listener(newNotifications, notifications);
          } catch (error) {
            console.error('[GMBNotificationService] Error in notification listener:', error);
          }
        });
      } else {
        console.log('[GMBNotificationService] No new notifications found');
      }
    } catch (error) {
      console.error('Error in fetchAndNotify:', error);
    }
  }

  /**
   * Add a notification listener
   * @param {Function} listener - Callback function to handle notifications
   */
  addListener(listener) {
    this.listeners.add(listener);
  }

  /**
   * Remove a notification listener
   * @param {Function} listener - Callback function to remove
   */
  removeListener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * Clear notification cache
   */
  clearCache() {
    this.notificationCache.clear();
  }

  /**
   * Get cached notifications for a location
   * @param {string} locationId - Location ID
   * @returns {Array} Cached notifications
   */
  getCachedNotifications(locationId) {
    const notifications = [];
    for (const [key, notification] of this.notificationCache.entries()) {
      if (key.startsWith(`${locationId}_`)) {
        notifications.push(notification);
      }
    }
    return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Format notification for display
   * @param {Object} notification - Notification object
   * @returns {Object} Formatted notification
   */
  formatNotification(notification) {
    const timeAgo = this.getTimeAgo(notification.timestamp);
    
    return {
      ...notification,
      timeAgo,
      formattedTime: new Date(notification.timestamp).toLocaleString()
    };
  }

  /**
   * Get time ago string
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Time ago string
   */
  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}

export default new GMBNotificationService();
