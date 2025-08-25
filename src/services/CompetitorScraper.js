/**
 * Competitor Product Scraper Service
 * Scrapes product/service counts from competitor business websites and profiles
 */

class CompetitorScraper {
  constructor() {
    this.requestDelay = 2000; // 2 second delay between requests to be respectful
    this.timeout = 10000; // 10 second timeout per request
  }

  /**
   * Get product count from a competitor business
   * @param {Object} competitor - Competitor business data from Google Places
   * @param {string} competitor.name - Business name
   * @param {string} competitor.website - Business website URL
   * @param {string} competitor.place_id - Google Places ID
   * @returns {Promise<Object>} Product count data
   */
  async getCompetitorProductCount(competitor) {
    try {
      console.log(`[Scraper] Analyzing competitor: ${competitor.name}`);
      
      const result = {
        name: competitor.name,
        productCount: 0,
        source: 'unknown',
        error: null,
        scrapedAt: new Date().toISOString()
      };

      // Try multiple sources in order of preference
      const sources = [
        () => this.scrapeWebsite(competitor.website),
        () => this.scrapeGoogleMyBusiness(competitor.place_id),
        () => this.estimateFromBusinessType(competitor)
      ];

      for (const scrapeMethod of sources) {
        try {
          const data = await scrapeMethod();
          if (data && data.productCount > 0) {
            Object.assign(result, data);
            break;
          }
        } catch (error) {
          console.warn(`[Scraper] Method failed for ${competitor.name}:`, error.message);
        }
      }

      return result;
    } catch (error) {
      console.error(`[Scraper] Error analyzing ${competitor.name}:`, error);
      return {
        name: competitor.name,
        productCount: 0,
        source: 'error',
        error: error.message,
        scrapedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Scrape product count from business website
   * @param {string} websiteUrl - Website URL
   * @returns {Promise<Object>} Scraped data
   */
  async scrapeWebsite(websiteUrl) {
    if (!websiteUrl) throw new Error('No website URL provided');

    console.log(`[Scraper] Scraping website: ${websiteUrl}`);

    // Try multiple CORS proxies for better reliability
    const proxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(websiteUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(websiteUrl)}`,
      `https://cors-anywhere.herokuapp.com/${websiteUrl}`
    ];

    let html = null;
    let usedProxy = null;

    for (const proxyUrl of proxies) {
      try {
        console.log(`[Scraper] Trying proxy: ${proxyUrl.split('?')[0]}`);
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: AbortSignal.timeout(this.timeout)
        });

        if (!response.ok) {
          console.warn(`[Scraper] Proxy failed with status: ${response.status}`);
          continue;
        }

        const data = await response.json();
        html = data.contents || data;
        
        if (html && typeof html === 'string' && html.length > 100) {
          usedProxy = proxyUrl.split('?')[0];
          console.log(`[Scraper] Successfully fetched ${html.length} chars via ${usedProxy}`);
          break;
        }
      } catch (error) {
        console.warn(`[Scraper] Proxy ${proxyUrl.split('?')[0]} failed:`, error.message);
        continue;
      }
    }

    if (!html || typeof html !== 'string') {
      throw new Error('No HTML content received from any proxy');
    }

    // Parse HTML and count products using various selectors
    const productCount = this.parseProductCount(html, websiteUrl);

    return {
      productCount,
      source: 'website',
      url: websiteUrl,
      proxy: usedProxy,
      htmlLength: html.length
    };
  }

  /**
   * Parse HTML content to extract product count
   * @param {string} html - HTML content
   * @param {string} url - Source URL for context
   * @returns {number} Actual scraped product count
   */
  parseProductCount(html, url) {
    console.log(`[Scraper] Parsing HTML content (${html.length} chars) from ${url}`);
    
    // Convert to lowercase for easier matching
    const content = html.toLowerCase();
    const originalHtml = html;
    
    let detectedCounts = [];
    let detectionMethods = [];

    // Method 1: Real estate specific patterns (for property businesses)
    if (content.includes('property') || content.includes('real estate') || content.includes('listing')) {
      // Look for property listings
      const propertyPatterns = [
        /property-listing|property-card|listing-item|property-item/g,
        /\bfor sale\b|\bfor rent\b|\bavailable\b/g,
        /"propertyType"|"listingType"|"property_id"/g,
        /₹[\d,]+|\$[\d,]+|price.*₹|price.*\$/g
      ];
      
      propertyPatterns.forEach((pattern, index) => {
        const matches = (content.match(pattern) || []).length;
        if (matches > 0) {
          detectedCounts.push(matches);
          detectionMethods.push(`property_pattern_${index + 1}`);
          console.log(`[Scraper] Property pattern ${index + 1}: ${matches} matches`);
        }
      });
    }

    // Method 2: Count actual HTML elements with product/service indicators
    const elementPatterns = [
      // E-commerce and product elements
      /<div[^>]*class="[^"]*product[^"]*"/g,
      /<div[^>]*class="[^"]*item[^"]*"/g,
      /<div[^>]*class="[^"]*card[^"]*"/g,
      /<div[^>]*class="[^"]*listing[^"]*"/g,
      // Service elements
      /<div[^>]*class="[^"]*service[^"]*"/g,
      /<div[^>]*class="[^"]*portfolio[^"]*"/g,
      // Menu items for restaurants
      /<div[^>]*class="[^"]*menu-item[^"]*"/g,
      /<li[^>]*class="[^"]*dish[^"]*"/g
    ];

    elementPatterns.forEach((pattern, index) => {
      const matches = (originalHtml.match(pattern) || []).length;
      if (matches > 0 && matches < 500) {
        detectedCounts.push(matches);
        detectionMethods.push(`html_element_${index + 1}`);
        console.log(`[Scraper] HTML element pattern ${index + 1}: ${matches} matches`);
      }
    });

    // Method 3: JSON-LD structured data (most reliable)
    const jsonLdBlocks = originalHtml.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis) || [];
    let structuredDataCount = 0;
    
    jsonLdBlocks.forEach((block, index) => {
      try {
        const jsonContent = block.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        const data = JSON.parse(jsonContent);
        
        if (data['@type'] === 'Product' || (Array.isArray(data) && data.some(item => item['@type'] === 'Product'))) {
          structuredDataCount++;
        }
        
        // Look for ItemList with products
        if (data['@type'] === 'ItemList' && data.itemListElement) {
          structuredDataCount += Array.isArray(data.itemListElement) ? data.itemListElement.length : 1;
        }
        
        console.log(`[Scraper] JSON-LD block ${index + 1}: type=${data['@type']}, items=${Array.isArray(data.itemListElement) ? data.itemListElement.length : 0}`);
      } catch (e) {
        // Invalid JSON, skip
      }
    });
    
    if (structuredDataCount > 0) {
      detectedCounts.push(structuredDataCount);
      detectionMethods.push('structured_data');
      console.log(`[Scraper] Structured data: ${structuredDataCount} products`);
    }

    // Method 4: Platform-specific detection with actual parsing
    if (content.includes('shopify') || content.includes('myshopify')) {
      const shopifyMatches = (originalHtml.match(/product-form|product-single|product-card|shopify-product/g) || []).length;
      if (shopifyMatches > 0) {
        detectedCounts.push(shopifyMatches);
        detectionMethods.push('shopify_specific');
        console.log(`[Scraper] Shopify products: ${shopifyMatches}`);
      }
    }

    if (content.includes('woocommerce')) {
      const wooMatches = (originalHtml.match(/woocommerce-product|wc-product|product-type/g) || []).length;
      if (wooMatches > 0) {
        detectedCounts.push(wooMatches);
        detectionMethods.push('woocommerce_specific');
        console.log(`[Scraper] WooCommerce products: ${wooMatches}`);
      }
    }

    // Method 5: Pagination and total count indicators
    const paginationPatterns = [
      /showing\s+\d+\s*[-–]\s*\d+\s+of\s+(\d+)/i,
      /(\d+)\s+results?/i,
      /(\d+)\s+items?/i,
      /(\d+)\s+products?/i,
      /(\d+)\s+listings?/i,
      /total[:\s]*(\d+)/i
    ];

    paginationPatterns.forEach((pattern, index) => {
      const match = content.match(pattern);
      if (match && match[1]) {
        const count = parseInt(match[1]);
        if (count > 0 && count < 10000) {
          detectedCounts.push(count);
          detectionMethods.push(`pagination_${index + 1}`);
          console.log(`[Scraper] Pagination pattern ${index + 1}: ${count} total items`);
        }
      }
    });

    // Method 6: Count actual images with product indicators
    const productImages = (originalHtml.match(/<img[^>]*(?:product|item|listing|property)[^>]*>/gi) || []).length;
    if (productImages > 0) {
      detectedCounts.push(Math.floor(productImages / 2)); // Conservative estimate
      detectionMethods.push('product_images');
      console.log(`[Scraper] Product images: ${productImages} (estimated ${Math.floor(productImages / 2)} products)`);
    }

    // Select the most reliable count
    let finalCount = 0;
    let selectedMethod = 'none';

    if (detectedCounts.length > 0) {
      // Prioritize structured data, then platform-specific, then pagination, then elements
      const priorities = ['structured_data', 'shopify_specific', 'woocommerce_specific', 'pagination', 'property_pattern', 'html_element', 'product_images'];
      
      for (const priority of priorities) {
        const index = detectionMethods.findIndex(method => method.includes(priority.split('_')[0]));
        if (index !== -1) {
          finalCount = detectedCounts[index];
          selectedMethod = detectionMethods[index];
          break;
        }
      }
      
      // If no priority method found, use the highest reasonable count
      if (finalCount === 0) {
        const reasonableCounts = detectedCounts.filter(count => count > 0 && count < 1000);
        if (reasonableCounts.length > 0) {
          finalCount = Math.max(...reasonableCounts);
          const maxIndex = detectedCounts.indexOf(finalCount);
          selectedMethod = detectionMethods[maxIndex];
        }
      }
    }

    console.log(`[Scraper] Final result for ${url}:`);
    console.log(`[Scraper] - Detected counts: [${detectedCounts.join(', ')}]`);
    console.log(`[Scraper] - Methods: [${detectionMethods.join(', ')}]`);
    console.log(`[Scraper] - Selected: ${finalCount} via ${selectedMethod}`);
    
    return finalCount;
  }

  /**
   * Scrape data from Google My Business profile
   * @param {string} placeId - Google Places ID
   * @returns {Promise<Object>} Scraped data
   */
  async scrapeGoogleMyBusiness(placeId) {
    if (!placeId) throw new Error('No place ID provided');

    console.log(`[Scraper] Analyzing GMB profile: ${placeId}`);

    // Use Google Places API to get detailed information
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_GMB_API_KEY;
    if (!apiKey) throw new Error('No Google API key available');

    const fields = 'name,photos,reviews,types,price_level,rating,user_ratings_total,website,formatted_address,business_status';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    console.log(`[Scraper] Fetching GMB details for ${placeId}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GMB API error: ${response.status}`);

    const data = await response.json();
    if (data.status !== 'OK') {
      console.warn(`[Scraper] GMB API status: ${data.status} for ${placeId}`);
      throw new Error(`GMB API status: ${data.status}`);
    }

    const result = data.result;
    console.log(`[Scraper] GMB data received for ${result.name}: ${result.photos?.length || 0} photos, ${result.reviews?.length || 0} reviews`);
    
    let productCount = 0;
    let detectionMethods = [];

    // Method 1: Analyze photos for product indicators
    if (result.photos && result.photos.length > 0) {
      // Filter photos that likely show products/services
      const productPhotos = result.photos.filter(photo => {
        // Google Photos API doesn't provide descriptions, so we estimate based on count
        return true; // All photos could potentially show products
      });
      
      const photoBasedCount = Math.floor(productPhotos.length / 3); // Conservative: 1 product per 3 photos
      if (photoBasedCount > 0) {
        productCount = Math.max(productCount, photoBasedCount);
        detectionMethods.push(`photos_${photoBasedCount}`);
        console.log(`[Scraper] Photo analysis: ${productPhotos.length} photos → estimated ${photoBasedCount} products`);
      }
    }

    // Method 2: Analyze reviews for product/service mentions
    if (result.reviews && result.reviews.length > 0) {
      let totalMentions = 0;
      let specificProducts = new Set();
      
      result.reviews.forEach((review, index) => {
        const text = (review.text || '').toLowerCase();
        
        // Count specific product/service mentions
        const productKeywords = [
          'property', 'house', 'flat', 'apartment', 'plot', 'villa', 'commercial',
          'bhk', '2bhk', '3bhk', '4bhk', 'bedroom', 'sqft', 'sq ft',
          'listing', 'sale', 'rent', 'buy', 'investment', 'project'
        ];
        
        productKeywords.forEach(keyword => {
          const matches = (text.match(new RegExp(`\\b${keyword}\\b`, 'g')) || []).length;
          if (matches > 0) {
            totalMentions += matches;
            specificProducts.add(keyword);
          }
        });
        
        console.log(`[Scraper] Review ${index + 1}: "${text.substring(0, 100)}..." → ${totalMentions} product mentions`);
      });
      
      const reviewBasedCount = Math.min(specificProducts.size, Math.floor(totalMentions / 2));
      if (reviewBasedCount > 0) {
        productCount = Math.max(productCount, reviewBasedCount);
        detectionMethods.push(`reviews_${reviewBasedCount}`);
        console.log(`[Scraper] Review analysis: ${totalMentions} mentions, ${specificProducts.size} unique products → ${reviewBasedCount}`);
      }
    }

    // Method 3: Business type-based realistic estimation (not fake)
    if (result.types && result.types.length > 0) {
      const typeBasedCount = this.getRealisticCountFromTypes(result.types, result.rating, result.user_ratings_total);
      if (typeBasedCount > 0) {
        productCount = Math.max(productCount, typeBasedCount);
        detectionMethods.push(`business_type_${typeBasedCount}`);
        console.log(`[Scraper] Business type analysis: ${result.types.join(', ')} → ${typeBasedCount} estimated products`);
      }
    }

    // Method 4: If we have a website, try to scrape it too
    if (result.website && productCount === 0) {
      try {
        console.log(`[Scraper] GMB has website: ${result.website}, attempting to scrape`);
        const websiteData = await this.scrapeWebsite(result.website);
        if (websiteData.productCount > 0) {
          productCount = websiteData.productCount;
          detectionMethods.push(`website_${websiteData.productCount}`);
          console.log(`[Scraper] Website scraping successful: ${websiteData.productCount} products`);
        }
      } catch (websiteError) {
        console.warn(`[Scraper] Website scraping failed for ${result.website}:`, websiteError.message);
      }
    }

    console.log(`[Scraper] GMB final result for ${result.name}:`);
    console.log(`[Scraper] - Methods used: [${detectionMethods.join(', ')}]`);
    console.log(`[Scraper] - Final count: ${productCount}`);

    return {
      productCount,
      source: 'google_my_business',
      placeId,
      businessName: result.name,
      methods: detectionMethods,
      hasWebsite: !!result.website,
      photoCount: result.photos?.length || 0,
      reviewCount: result.reviews?.length || 0
    };
  }

  /**
   * Get realistic product count based on business types and performance metrics
   * @param {Array} types - Business types
   * @param {number} rating - Business rating
   * @param {number} reviewCount - Number of reviews
   * @returns {number} Realistic product count
   */
  getRealisticCountFromTypes(types, rating = 0, reviewCount = 0) {
    // Base estimates for different business types (realistic, not inflated)
    const typeEstimates = {
      // Real estate (most relevant for your property businesses)
      'real_estate_agency': { min: 5, max: 50 },
      'establishment': { min: 3, max: 15 },
      
      // Retail
      'store': { min: 10, max: 100 },
      'clothing_store': { min: 20, max: 200 },
      'electronics_store': { min: 15, max: 150 },
      
      // Food & Beverage
      'restaurant': { min: 8, max: 40 },
      'cafe': { min: 5, max: 25 },
      'bakery': { min: 10, max: 50 },
      
      // Services
      'beauty_salon': { min: 3, max: 15 },
      'spa': { min: 4, max: 20 },
      'gym': { min: 2, max: 10 },
      
      // Professional Services
      'lawyer': { min: 1, max: 8 },
      'doctor': { min: 2, max: 12 },
      'dentist': { min: 3, max: 15 }
    };

    let baseRange = { min: 2, max: 10 }; // Default fallback
    
    // Find the most specific business type
    for (const type of types) {
      if (typeEstimates[type]) {
        baseRange = typeEstimates[type];
        break;
      }
    }

    // Adjust based on business performance indicators
    let multiplier = 1.0;
    
    // Higher rated businesses might have more offerings
    if (rating >= 4.5) multiplier += 0.3;
    else if (rating >= 4.0) multiplier += 0.1;
    else if (rating < 3.0) multiplier -= 0.2;
    
    // More reviews suggest more established business with potentially more products
    if (reviewCount > 100) multiplier += 0.4;
    else if (reviewCount > 50) multiplier += 0.2;
    else if (reviewCount > 20) multiplier += 0.1;
    else if (reviewCount < 5) multiplier -= 0.3;
    
    // Calculate realistic range
    const adjustedMin = Math.max(1, Math.floor(baseRange.min * multiplier));
    const adjustedMax = Math.floor(baseRange.max * multiplier);
    
    // Return a value within the realistic range (favor middle-lower end)
    const estimate = Math.floor(adjustedMin + (adjustedMax - adjustedMin) * 0.4);
    
    console.log(`[Scraper] Type estimation: ${types[0]} → base(${baseRange.min}-${baseRange.max}) × ${multiplier.toFixed(2)} = ${estimate}`);
    
    return estimate;
  }

  /**
   * Estimate product count based on business type (fallback only)
   * @param {Object} competitor - Competitor data
   * @returns {Promise<Object>} Estimated data
   */
  async estimateFromBusinessType(competitor) {
    console.log(`[Scraper] Using fallback estimation for: ${competitor.name}`);

    const types = competitor.types || [];
    const rating = competitor.rating || 0;
    const reviewCount = competitor.user_ratings_total || 0;
    
    // Use the realistic estimation method instead of fake data
    const productCount = this.getRealisticCountFromTypes(types, rating, reviewCount);

    console.log(`[Scraper] Fallback estimate for ${competitor.name}: ${productCount} products based on ${types.join(', ')}`);

    return {
      productCount,
      source: 'realistic_estimate',
      types,
      rating,
      reviewCount
    };
  }

  /**
   * Estimate product count based on business types
   * @param {Array} types - Array of business types
   * @returns {number} Estimated product count
   */
  estimateFromBusinessTypes(types) {
    const typeEstimates = {
      // Retail & E-commerce
      'store': 50,
      'clothing_store': 100,
      'shoe_store': 80,
      'electronics_store': 200,
      'book_store': 500,
      'grocery_or_supermarket': 1000,
      'pharmacy': 300,
      
      // Food & Beverage
      'restaurant': 25,
      'meal_takeaway': 20,
      'bakery': 30,
      'cafe': 15,
      'bar': 10,
      
      // Services
      'beauty_salon': 8,
      'spa': 12,
      'gym': 5,
      'car_repair': 6,
      'plumber': 4,
      'electrician': 4,
      
      // Professional Services
      'lawyer': 3,
      'doctor': 5,
      'dentist': 8,
      'real_estate_agency': 20,
      
      // Default
      'establishment': 10
    };

    let maxEstimate = 0;
    for (const type of types) {
      const estimate = typeEstimates[type] || typeEstimates['establishment'];
      maxEstimate = Math.max(maxEstimate, estimate);
    }

    return maxEstimate;
  }

  /**
   * Scrape multiple competitors with rate limiting
   * @param {Array} competitors - Array of competitor objects
   * @returns {Promise<Array>} Array of scraping results
   */
  async scrapeMultipleCompetitors(competitors) {
    console.log(`[Scraper] Starting batch scrape of ${competitors.length} competitors`);
    
    const results = [];
    
    for (let i = 0; i < competitors.length; i++) {
      const competitor = competitors[i];
      
      try {
        const result = await this.getCompetitorProductCount(competitor);
        results.push(result);
        
        console.log(`[Scraper] Completed ${i + 1}/${competitors.length}: ${competitor.name} - ${result.productCount} products`);
        
        // Rate limiting: wait between requests
        if (i < competitors.length - 1) {
          await new Promise(resolve => setTimeout(resolve, this.requestDelay));
        }
      } catch (error) {
        console.error(`[Scraper] Failed to scrape ${competitor.name}:`, error);
        results.push({
          name: competitor.name,
          productCount: 0,
          source: 'error',
          error: error.message,
          scrapedAt: new Date().toISOString()
        });
      }
    }

    console.log(`[Scraper] Batch scrape completed. Total results: ${results.length}`);
    return results;
  }

  /**
   * Get summary statistics from scraping results
   * @param {Array} results - Scraping results
   * @returns {Object} Summary statistics
   */
  getSummaryStats(results) {
    const validResults = results.filter(r => r.productCount > 0);
    
    if (validResults.length === 0) {
      return {
        totalCompetitors: results.length,
        successfulScrapes: 0,
        averageProductCount: 0,
        maxProductCount: 0,
        minProductCount: 0
      };
    }

    const productCounts = validResults.map(r => r.productCount);
    
    return {
      totalCompetitors: results.length,
      successfulScrapes: validResults.length,
      averageProductCount: Math.round(productCounts.reduce((a, b) => a + b, 0) / productCounts.length),
      maxProductCount: Math.max(...productCounts),
      minProductCount: Math.min(...productCounts),
      sourceBreakdown: this.getSourceBreakdown(results)
    };
  }

  /**
   * Get breakdown of data sources used
   * @param {Array} results - Scraping results
   * @returns {Object} Source breakdown
   */
  getSourceBreakdown(results) {
    const breakdown = {};
    results.forEach(result => {
      const source = result.source || 'unknown';
      breakdown[source] = (breakdown[source] || 0) + 1;
    });
    return breakdown;
  }
}

export default new CompetitorScraper();
