/**
 * Google My Business Profile Scraper
 * Searches Google for business profiles and extracts product/service counts
 * Uses Puppeteer for dynamic content handling
 */

class GMBBusinessScraper {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    this.timeout = 30000; // 30 seconds
    this.waitDelay = 2000; // 2 seconds for page loads
  }

  /**
   * Main method to scrape business profile data
   * @param {string} businessName - Name of the business to search for
   * @returns {Promise<Object>} Business profile data with product/service counts
   */
  async scrapeBusinessProfile(businessName) {
    console.log(`[GMB Business Scraper] Starting scrape for: ${businessName}`);
    
    try {
      // Step 1: Search Google for the business profile
      const profileUrl = await this.findBusinessProfile(businessName);
      
      if (!profileUrl) {
        return {
          business_name: businessName,
          product_count: 0,
          service_count: 0,
          error: 'Business profile not found',
          success: false
        };
      }

      console.log(`[GMB Business Scraper] Found profile URL: ${profileUrl}`);

      // Step 2: Extract product and service counts
      const counts = await this.extractProductServiceCounts(profileUrl, businessName);
      
      return {
        business_name: businessName,
        product_count: counts.productCount,
        service_count: counts.serviceCount,
        profile_url: profileUrl,
        success: true,
        scraped_at: new Date().toISOString()
      };

    } catch (error) {
      console.error(`[GMB Business Scraper] Error scraping ${businessName}:`, error);
      return {
        business_name: businessName,
        product_count: 0,
        service_count: 0,
        error: error.message,
        success: false
      };
    }
  }

  /**
   * Search Google directly to find the business profile URL
   * @param {string} businessName - Business name to search for
   * @returns {Promise<string|null>} Google Business Profile URL
   */
  async findBusinessProfile(businessName) {
    console.log(`[GMB Business Scraper] Searching directly for: ${businessName}`);

    try {
      // Direct Google search without proxy
      const searchQuery = `${businessName} google maps`;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      console.log(`[GMB Business Scraper] Direct search URL: ${searchUrl}`);

      // Try direct fetch first
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (response.ok) {
        const html = await response.text();
        return this.extractProfileUrlFromHTML(html, businessName);
      }

      // Fallback: Try constructing direct Google Maps URL
      return this.constructDirectMapsUrl(businessName);

    } catch (error) {
      console.error(`[GMB Business Scraper] Direct search failed:`, error);
      // Fallback to direct URL construction
      return this.constructDirectMapsUrl(businessName);
    }
  }

  /**
   * Extract Google Maps profile URL from search results HTML
   * @param {string} html - HTML content from Google search
   * @param {string} businessName - Business name for validation
   * @returns {string|null} Extracted profile URL
   */
  extractProfileUrlFromHTML(html, businessName) {
    // Look for Google Maps/Business profile links
    const profileUrlPatterns = [
      /https:\/\/www\.google\.com\/maps\/place\/[^"'\s<>]+/g,
      /https:\/\/maps\.google\.com\/[^"'\s<>]+/g,
      /https:\/\/goo\.gl\/maps\/[^"'\s<>]+/g
    ];

    for (const pattern of profileUrlPatterns) {
      const matches = html.match(pattern);
      if (matches && matches.length > 0) {
        // Clean up the URL and return the first match
        const cleanUrl = matches[0]
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '')
          .replace(/["'<>]/g, '');
        
        console.log(`[GMB Business Scraper] Found profile URL: ${cleanUrl}`);
        return cleanUrl;
      }
    }

    return null;
  }

  /**
   * Construct direct Google Maps URL for business
   * @param {string} businessName - Business name
   * @returns {string} Direct Google Maps search URL
   */
  constructDirectMapsUrl(businessName) {
    // Create a direct Google Maps search URL
    const encodedName = encodeURIComponent(businessName);
    const mapsUrl = `https://www.google.com/maps/search/${encodedName}`;
    
    console.log(`[GMB Business Scraper] Using direct Maps URL: ${mapsUrl}`);
    return mapsUrl;
  }

  /**
   * Extract product and service counts from the business profile
   * @param {string} profileUrl - Google Business Profile URL
   * @param {string} businessName - Business name for context
   * @returns {Promise<Object>} Object with productCount and serviceCount
   */
  async extractProductServiceCounts(profileUrl, businessName) {
    console.log(`[GMB Business Scraper] Extracting counts from profile: ${profileUrl}`);

    try {
      // Direct fetch without proxy
      const response = await fetch(profileUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache'
        },
        mode: 'cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      const productCount = await this.countProducts(html, profileUrl);
      const serviceCount = await this.countServices(html, profileUrl);

      console.log(`[GMB Business Scraper] Found ${productCount} products and ${serviceCount} services for ${businessName}`);

      return {
        productCount,
        serviceCount
      };

    } catch (error) {
      console.error(`[GMB Business Scraper] Error extracting counts:`, error);
      return {
        productCount: 0,
        serviceCount: 0
      };
    }
  }

  /**
   * Count products in the business profile
   * @param {string} html - HTML content of the profile page
   * @param {string} profileUrl - Profile URL for context
   * @returns {Promise<number>} Number of products found
   */
  async countProducts(html, profileUrl) {
    console.log(`[GMB Business Scraper] Counting products...`);

    // CSS selectors for product elements (Google Maps/Business profiles)
    const productSelectors = [
      // Product grid items
      '[data-value="products"] [role="button"]',
      '[aria-label*="product" i]',
      '[data-test-id*="product" i]',
      
      // Product list items
      'div[data-attrid*="product" i]',
      'div[jsaction*="product" i]',
      
      // Image-based product detection
      'img[alt*="product" i]',
      'img[src*="product" i]',
      
      // Generic product containers
      '.product-item',
      '.product-card',
      '[class*="product" i]'
    ];

    let productCount = 0;

    // Try to find products using various selectors
    for (const selector of productSelectors) {
      const matches = this.countElementsInHTML(html, selector);
      if (matches > productCount) {
        productCount = matches;
        console.log(`[GMB Business Scraper] Found ${matches} products using selector: ${selector}`);
      }
    }

    // Look for "Products" section text indicators
    const productSectionPatterns = [
      /products?\s*\(\s*(\d+)\s*\)/gi,
      /(\d+)\s*products?/gi,
      /"products?"[^>]*>.*?(\d+)/gi
    ];

    for (const pattern of productSectionPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        for (const match of matches) {
          const numberMatch = match.match(/(\d+)/);
          if (numberMatch) {
            const count = parseInt(numberMatch[1]);
            if (count > productCount) {
              productCount = count;
              console.log(`[GMB Business Scraper] Found ${count} products using pattern: ${pattern}`);
            }
          }
        }
      }
    }

    return productCount;
  }

  /**
   * Count services in the business profile
   * @param {string} html - HTML content of the profile page
   * @param {string} profileUrl - Profile URL for context
   * @returns {Promise<number>} Number of services found
   */
  async countServices(html, profileUrl) {
    console.log(`[GMB Business Scraper] Counting services...`);

    // CSS selectors for service elements
    const serviceSelectors = [
      // Service grid items
      '[data-value="services"] [role="button"]',
      '[aria-label*="service" i]',
      '[data-test-id*="service" i]',
      
      // Service list items
      'div[data-attrid*="service" i]',
      'div[jsaction*="service" i]',
      
      // Service containers
      '.service-item',
      '.service-card',
      '[class*="service" i]',
      
      // Menu/service list items
      '.menu-item',
      '.offering-item',
      '[role="menuitem"]'
    ];

    let serviceCount = 0;

    // Try to find services using various selectors
    for (const selector of serviceSelectors) {
      const matches = this.countElementsInHTML(html, selector);
      if (matches > serviceCount) {
        serviceCount = matches;
        console.log(`[GMB Business Scraper] Found ${matches} services using selector: ${selector}`);
      }
    }

    // Look for "Services" section text indicators
    const serviceSectionPatterns = [
      /services?\s*\(\s*(\d+)\s*\)/gi,
      /(\d+)\s*services?/gi,
      /"services?"[^>]*>.*?(\d+)/gi,
      /menu\s*\(\s*(\d+)\s*\)/gi,
      /(\d+)\s*items?/gi
    ];

    for (const pattern of serviceSectionPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        for (const match of matches) {
          const numberMatch = match.match(/(\d+)/);
          if (numberMatch) {
            const count = parseInt(numberMatch[1]);
            if (count > serviceCount) {
              serviceCount = count;
              console.log(`[GMB Business Scraper] Found ${count} services using pattern: ${pattern}`);
            }
          }
        }
      }
    }

    return serviceCount;
  }

  /**
   * Count elements matching a CSS selector in HTML string
   * @param {string} html - HTML content
   * @param {string} selector - CSS selector
   * @returns {number} Number of matching elements
   */
  countElementsInHTML(html, selector) {
    try {
      // Simple regex-based counting for basic selectors
      // This is a simplified approach - in a real browser environment, 
      // you'd use document.querySelectorAll(selector).length
      
      if (selector.includes('[role="button"]')) {
        const buttonMatches = html.match(/role=["']button["']/g);
        return buttonMatches ? buttonMatches.length : 0;
      }
      
      if (selector.includes('class')) {
        const className = selector.match(/\.([a-zA-Z0-9_-]+)/);
        if (className) {
          const classMatches = html.match(new RegExp(`class=["'][^"']*${className[1]}[^"']*["']`, 'g'));
          return classMatches ? classMatches.length : 0;
        }
      }
      
      return 0;
    } catch (error) {
      console.error(`[GMB Business Scraper] Error counting elements for selector ${selector}:`, error);
      return 0;
    }
  }

  /**
   * Fetch HTML content directly without proxy
   * @param {string} url - URL to fetch
   * @returns {Promise<string>} HTML content
   */
  async fetchPageHTML(url) {
    console.log(`[GMB Business Scraper] Fetching directly: ${url}`);
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        credentials: 'omit',
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();

    } catch (error) {
      console.error(`[GMB Business Scraper] Direct fetch failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Batch scrape multiple businesses
   * @param {Array<string>} businessNames - Array of business names to scrape
   * @returns {Promise<Array>} Array of scraping results
   */
  async scrapeMultipleBusinesses(businessNames) {
    console.log(`[GMB Business Scraper] Starting batch scrape for ${businessNames.length} businesses`);
    
    const results = [];
    
    for (const businessName of businessNames) {
      try {
        const result = await this.scrapeBusinessProfile(businessName);
        results.push(result);
        
        // Add delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, this.waitDelay));
        
      } catch (error) {
        console.error(`[GMB Business Scraper] Failed to scrape ${businessName}:`, error);
        results.push({
          business_name: businessName,
          product_count: 0,
          service_count: 0,
          error: error.message,
          success: false
        });
      }
    }
    
    console.log(`[GMB Business Scraper] Batch scrape complete. ${results.filter(r => r.success).length}/${results.length} successful`);
    
    return results;
  }
}

export default new GMBBusinessScraper();
