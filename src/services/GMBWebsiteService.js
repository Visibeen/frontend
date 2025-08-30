/**
 * GMB Website Service
 * Handles fetching GMB data and creating websites with real business data
 */

import GMBService from './GMBService';
import GMBDataMapper from './GMBDataMapper';

class GMBWebsiteService {
  /**
   * Fetch user's GMB profile data and map it to template format
   * @param {number} templateId - Template ID (1-6)
   * @param {string} accessToken - Optional Google access token
   * @returns {Promise<Object>} Mapped template data with real GMB data
   */
  async createWebsiteWithGMBData(templateId, accessToken = null) {
    try {
      console.log(`[GMBWebsiteService] Creating website with template ${templateId}`);
      
      // Step 1: Get GMB accounts
      const accounts = await GMBService.getAccounts(accessToken);
      if (!accounts || accounts.length === 0) {
        throw new Error('No GMB accounts found. Please connect your Google My Business account first.');
      }

      console.log(`[GMBWebsiteService] Found ${accounts.length} GMB accounts`);
      
      // Step 2: Get locations for the first account
      const firstAccount = accounts[0];
      const accountName = firstAccount.name;
      const locations = await GMBService.getLocations(accessToken, accountName);
      
      if (!locations || locations.length === 0) {
        throw new Error('No business locations found in your GMB account.');
      }

      console.log(`[GMBWebsiteService] Found ${locations.length} locations`);
      
      // Step 3: Use the first location for website data
      const primaryLocation = locations[0];
      
      // Step 4: Get additional data for the location
      const locationId = this.extractLocationId(primaryLocation.name);
      let reviews = null;
      let attributes = null;
      
      try {
        // Try to get reviews (optional)
        reviews = await GMBService.getReviews(accessToken, accountName, primaryLocation.name);
        console.log(`[GMBWebsiteService] Fetched ${reviews?.reviews?.length || 0} reviews`);
      } catch (error) {
        console.warn('[GMBWebsiteService] Could not fetch reviews:', error.message);
      }
      
      try {
        // Try to get attributes (optional)
        attributes = await GMBService.getLocationAttributes(locationId, accessToken);
        console.log(`[GMBWebsiteService] Fetched ${attributes?.length || 0} attributes`);
      } catch (error) {
        console.warn('[GMBWebsiteService] Could not fetch attributes:', error.message);
      }

      // Step 5: Combine all GMB data
      const gmbData = {
        account: firstAccount,
        location: primaryLocation,
        reviews: reviews,
        attributes: attributes,
        locationId: locationId
      };

      console.log('[GMBWebsiteService] GMB data structure:', {
        hasAccount: !!gmbData.account,
        hasLocation: !!gmbData.location,
        hasReviews: !!gmbData.reviews,
        hasAttributes: !!gmbData.attributes,
        locationTitle: gmbData.location?.title,
        businessName: gmbData.location?.title
      });

      // Step 6: Map GMB data to template format
      const templateData = GMBDataMapper.mapGMBDataToTemplate(gmbData, templateId);
      
      console.log('[GMBWebsiteService] Successfully mapped GMB data to template format');
      
      return {
        success: true,
        templateData: templateData,
        gmbData: gmbData,
        templateId: templateId
      };

    } catch (error) {
      console.error('[GMBWebsiteService] Error creating website with GMB data:', error);
      
      // Return error with fallback to mock data
      return {
        success: false,
        error: error.message,
        templateData: null,
        fallbackToMock: true
      };
    }
  }

  /**
   * Extract location ID from location name
   * @param {string} locationName - e.g., "accounts/123/locations/456"
   * @returns {string} Location ID
   */
  extractLocationId(locationName) {
    if (!locationName) return null;
    const parts = locationName.split('/');
    return parts[parts.length - 1];
  }

  /**
   * Get user's primary GMB location (for quick access)
   * @param {string} accessToken - Optional Google access token
   * @returns {Promise<Object>} Primary location data
   */
  async getPrimaryLocation(accessToken = null) {
    try {
      const accounts = await GMBService.getAccounts(accessToken);
      if (!accounts || accounts.length === 0) {
        throw new Error('No GMB accounts found');
      }

      const locations = await GMBService.getLocations(accessToken, accounts[0].name);
      if (!locations || locations.length === 0) {
        throw new Error('No locations found');
      }

      return locations[0];
    } catch (error) {
      console.error('[GMBWebsiteService] Error getting primary location:', error);
      throw error;
    }
  }

  /**
   * Check if user has GMB access
   * @param {string} accessToken - Optional Google access token
   * @returns {Promise<boolean>} Whether user has GMB access
   */
  async hasGMBAccess(accessToken = null) {
    try {
      const accounts = await GMBService.getAccounts(accessToken);
      return accounts && accounts.length > 0;
    } catch (error) {
      console.error('[GMBWebsiteService] Error checking GMB access:', error);
      return false;
    }
  }

  /**
   * Get business categories from GMB data
   * @param {Object} gmbData - GMB data object
   * @returns {Array} Business categories
   */
  getBusinessCategories(gmbData) {
    const location = gmbData.location || {};
    return location.categories || [];
  }

  /**
   * Get business contact info from GMB data
   * @param {Object} gmbData - GMB data object
   * @returns {Object} Contact information
   */
  getContactInfo(gmbData) {
    const location = gmbData.location || {};
    const address = location.storefrontAddress || {};
    const phoneNumbers = location.phoneNumbers || {};
    
    return {
      businessName: location.title,
      address: address,
      phone: phoneNumbers.primaryPhone,
      website: location.websiteUri,
      hours: location.regularHours
    };
  }
}

export default new GMBWebsiteService();
