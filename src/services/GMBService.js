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