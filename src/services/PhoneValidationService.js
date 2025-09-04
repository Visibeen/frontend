/**
 * Phone Validation Service
 * Checks if a phone number is linked to multiple Google My Business profiles
 * Based on the standalone phone number checker functionality
 */

class PhoneValidationService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;
    this.baseUrl = 'https://places.googleapis.com/v1/places:searchText';
  }

  /**
   * Format phone number for Indian and Bangladesh numbers
   * @param {string} phone - Raw phone number
   * @returns {string} Formatted phone number
   */
  formatPhoneNumber(phone) {
    if (!phone) return '';
    
    let cleaned = phone.replace(/[^\d+]/g, "");
    
    // If it already starts with +91, keep it
    if (cleaned.startsWith("+91")) {
      return cleaned;
    }
    
    // If it starts with +, but not +91, replace with +91
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.substring(1);
    }
    
    // If it starts with 91 and has 12 digits total, keep as is
    if (cleaned.startsWith("91") && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    // Special handling for Bangladesh numbers starting with 017
    if (cleaned.startsWith("017")) {
      // Remove the leading 0 and return without +91
      return cleaned.substring(1);
    }
    
    // If it starts with 0, remove the leading 0 (common in Indian numbers)
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }
    
    // For 10-digit Indian mobile numbers, add +91
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      return `+91${cleaned}`;
    }
    
    // For any other number, add +91 prefix
    if (cleaned.length > 0) {
      return `+91${cleaned}`;
    }
    
    return phone;
  }

  /**
   * Generate phone number search variations for comprehensive matching
   * @param {string} phoneNumber - Original phone number
   * @returns {Array<string>} Array of phone number variations to search
   */
  generateSearchVariations(phoneNumber) {
    const formattedPhone = this.formatPhoneNumber(phoneNumber);
    const searchVariations = [
      formattedPhone, // Formatted version (with +91 or without for Bangladesh)
      phoneNumber.replace(/\D/g, ""), // Just digits
      phoneNumber, // Original format
      phoneNumber.replace(/\D/g, "").replace(/^0/, ""), // Remove leading 0
    ];

    // Derive last 10 digits to build consistent Indian formats (+91 and spaced national)
    const onlyDigits = phoneNumber.replace(/\D/g, "");
    const last10 = onlyDigits.slice(-10);
    if (last10.length === 10) {
      // +91 without spaces
      searchVariations.push(`+91${last10}`);
      // Indian national format with space: 5+5 (e.g., 78140 03130)
      searchVariations.push(`${last10.slice(0,5)} ${last10.slice(5)}`);
      // +91 with spaced national format
      searchVariations.push(`+91 ${last10.slice(0,5)} ${last10.slice(5)}`);
    }

    // For Indian numbers, also try without +91
    if (formattedPhone.startsWith("+91")) {
      searchVariations.push(formattedPhone.replace("+91", "")); // Without +91
      searchVariations.push("0" + formattedPhone.replace("+91", "")); // With leading 0
    }

    // For Bangladesh numbers starting with 17, also try with +880
    if (formattedPhone.startsWith("17")) {
      searchVariations.push("+880" + formattedPhone); // With Bangladesh country code
      searchVariations.push("0" + formattedPhone); // With leading 0
    }

    // Remove duplicates
    return [...new Set(searchVariations)];
  }

  /**
   * Check if two phone numbers match after normalization
   * @param {string} searchPhone - Phone number being searched
   * @param {string} placePhone - Phone number from place data
   * @returns {boolean} True if phones match
   */
  phonesMatch(searchPhone, placePhone) {
    if (!searchPhone || !placePhone) return false;
    
    const cleanedSearchPhone = searchPhone.replace(/\D/g, "");
    const cleanedPlacePhone = placePhone.replace(/\D/g, "");
    
    // Normalize both numbers by removing country codes and leading zeros
    const normalizePhone = (phone) => {
      return phone.replace(/^(91|880)/, "").replace(/^0+/, "");
    };
    
    const normalizedSearch = normalizePhone(cleanedSearchPhone);
    const normalizedPlace = normalizePhone(cleanedPlacePhone);
    
    // Get last 10 digits for comparison
    const searchLast10 = normalizedSearch.slice(-10);
    const placeLast10 = normalizedPlace.slice(-10);
    
    // Match if core numbers are the same
    return searchLast10 === placeLast10 || 
           normalizedSearch === normalizedPlace ||
           normalizedSearch.includes(placeLast10) ||
           normalizedPlace.includes(searchLast10);
  }

  /**
   * Search for businesses linked to a phone number
   * @param {string} phoneNumber - Phone number to search
   * @returns {Promise<Array>} Array of businesses linked to the phone number
   */
  async findBusinessesLinkedToPhone(phoneNumber) {
    if (!phoneNumber || !this.apiKey) {
      console.warn('[PhoneValidation] Missing phone number or API key');
      return [];
    }

    try {
      console.log('[PhoneValidation] Searching for businesses linked to phone:', phoneNumber);
      
      const searchVariations = this.generateSearchVariations(phoneNumber);
      const allBusinesses = [];
      
      console.log('[PhoneValidation] Phone search variations:', searchVariations);

      // Search with each phone variation
      for (const searchPhone of searchVariations) {
        try {
          const requestBody = {
            textQuery: searchPhone,
            maxResultCount: 20
          };

          const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": this.apiKey,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.businessStatus,places.types,places.primaryTypeDisplayName"
          };

          const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody)
          });

          if (response.ok) {
            const data = await response.json();
            
            if (data.places && data.places.length > 0) {
              // Add unique businesses to our results
              data.places.forEach((business) => {
                const existingBusiness = allBusinesses.find(b => b.id === business.id);
                if (!existingBusiness) {
                  allBusinesses.push(business);
                }
              });
            }
          }
        } catch (searchErr) {
          console.warn('[PhoneValidation] Search variation failed:', searchPhone, searchErr.message);
          // Continue with other variations
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Filter businesses that actually match the phone number
      const matchedBusinesses = allBusinesses.filter((business) => {
        const placePhone = business.nationalPhoneNumber || business.internationalPhoneNumber;
        return placePhone && this.phonesMatch(phoneNumber, placePhone);
      });

      console.log('[PhoneValidation] Phone validation results:', {
        searchedPhone: phoneNumber,
        totalCandidates: allBusinesses.length,
        matchedBusinesses: matchedBusinesses.length,
        businesses: matchedBusinesses.map(b => ({
          name: b.displayName?.text || 'Unknown',
          phone: b.nationalPhoneNumber || b.internationalPhoneNumber,
          id: b.id
        }))
      });

      return matchedBusinesses;

    } catch (error) {
      console.error('[PhoneValidation] Error searching for phone-linked businesses:', error);
      return [];
    }
  }

  /**
   * Calculate phone number score based on uniqueness
   * @param {string} phoneNumber - Phone number to check
   * @param {string} currentBusinessId - Current business place ID to exclude from count
   * @returns {Promise<Object>} Score and analysis
   */
  async calculatePhoneScore(phoneNumber, currentBusinessId = null) {
    try {
      console.log('[PhoneValidation] Calculating phone score for:', phoneNumber);

      // No phone number = 0 points
      if (!phoneNumber) {
        return {
          score: 0,
          analysis: {
            hasPhone: false,
            linkedBusinesses: 0,
            isUnique: false,
            reason: 'No phone number provided'
          }
        };
      }

      // Find all businesses linked to this phone number
      const linkedBusinesses = await this.findBusinessesLinkedToPhone(phoneNumber);
      
      // Exclude current business from count if provided
      const otherBusinesses = currentBusinessId 
        ? linkedBusinesses.filter(b => b.id !== currentBusinessId)
        : linkedBusinesses;

      const linkedCount = otherBusinesses.length;
      let score = 0;
      let reason = '';

      if (linkedCount === 0) {
        // Phone number is unique to this business = 18 points
        score = 18;
        reason = 'Phone number is unique to your business';
      } else {
        // Phone number is shared with other businesses = 3 points
        score = 3;
        reason = `Phone number is shared with ${linkedCount} other business${linkedCount > 1 ? 'es' : ''}`;
      }

      const analysis = {
        hasPhone: true,
        linkedBusinesses: linkedCount,
        isUnique: linkedCount === 0,
        reason,
        otherBusinessNames: otherBusinesses.map(b => b.displayName?.text || 'Unknown Business').slice(0, 5)
      };

      console.log('[PhoneValidation] Phone score calculated:', {
        phoneNumber,
        score,
        analysis
      });

      return { score, analysis };

    } catch (error) {
      console.error('[PhoneValidation] Error calculating phone score:', error);
      return {
        score: 0,
        analysis: {
          hasPhone: !!phoneNumber,
          linkedBusinesses: 0,
          isUnique: false,
          reason: 'Error checking phone number uniqueness',
          error: error.message
        }
      };
    }
  }

  /**
   * Validate if phone number is properly formatted
   * @param {string} phoneNumber - Phone number to validate
   * @returns {Object} Validation result
   */
  validatePhoneFormat(phoneNumber) {
    if (!phoneNumber) {
      return { isValid: false, reason: 'No phone number provided' };
    }

    const cleaned = phoneNumber.replace(/\D/g, "");
    
    // Check for minimum length (10 digits for Indian mobile)
    if (cleaned.length < 10) {
      return { isValid: false, reason: 'Phone number too short' };
    }

    // Check for maximum length (15 digits max for international)
    if (cleaned.length > 15) {
      return { isValid: false, reason: 'Phone number too long' };
    }

    // For Indian numbers, check if starts with valid mobile prefix
    const last10 = cleaned.slice(-10);
    if (cleaned.startsWith('91') || cleaned.length === 10) {
      if (!/^[6-9]/.test(last10)) {
        return { isValid: false, reason: 'Invalid Indian mobile number format' };
      }
    }

    return { isValid: true, formatted: this.formatPhoneNumber(phoneNumber) };
  }
}

export default new PhoneValidationService();
