/**
 * Google My Business Product Scraper
 * Extracts product data from GMB profiles using browser automation
 */

class GMBProductScraper {
  constructor() {
    this.maxRetries = 3;
    this.retryDelay = 2000;
    this.timeout = 30000;
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  /**
   * Main function to scrape products from a GMB profile
   * @param {string} input - Business name, location, or direct GMB URL
   * @returns {Promise<Object>} Scraped product data
   */
  async scrapeGMBProducts(input) {
    console.log(`[GMB Scraper] Starting scrape for: ${input}`);
    
    try {
      const profileUrl = await this.resolveProfileUrl(input);
      console.log(`[GMB Scraper] Resolved URL: ${profileUrl}`);
      
      const products = await this.fetchProfileProducts(profileUrl);
      const productCount = products.length;
      
      console.log(`[GMB Scraper] Found ${productCount} products for ${input}`);
      
      return {
        input,
        profileUrl,
        products,
        productCount,
        scrapedAt: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`[GMB Scraper] Error scraping ${input}:`, error);
      return {
        input,
        products: [],
        productCount: 0,
        error: error.message,
        scrapedAt: new Date().toISOString(),
        success: false
      };
    }
  }

  /**
   * Resolve input to a valid GMB profile URL
   * @param {string} input - Business name, location, or URL
   * @returns {Promise<string>} GMB profile URL
   */
  async resolveProfileUrl(input) {
    // If it's already a GMB URL, return it
    if (input.includes('google.com/maps') || input.includes('business.google.com')) {
      return input;
    }

    // Search for the business on Google Maps
    const searchQuery = encodeURIComponent(input);
    const searchUrl = `https://www.google.com/maps/search/${searchQuery}`;
    
    console.log(`[GMB Scraper] Searching for business: ${searchUrl}`);
    
    // Use browser automation to find the first business result
    return await this.findBusinessInSearch(searchUrl, input);
  }

  /**
   * Find business profile URL from Google Maps search results
   * @param {string} searchUrl - Google Maps search URL
   * @param {string} businessName - Original business name for matching
   * @returns {Promise<string>} GMB profile URL
   */
  async findBusinessInSearch(searchUrl, businessName) {
    // This would use Puppeteer/Playwright in a real implementation
    // For now, we'll construct a likely URL format
    const encodedName = encodeURIComponent(businessName.replace(/[^\w\s]/g, '').replace(/\s+/g, '+'));
    return `https://www.google.com/maps/place/${encodedName}`;
  }

  /**
   * Extract products from a GMB profile page
   * @param {string} profileUrl - GMB profile URL
   * @returns {Promise<Array>} Array of product objects
   */
  async fetchProfileProducts(profileUrl) {
    console.log(`[GMB Scraper] Fetching products from: ${profileUrl}`);
    
    let attempt = 0;
    while (attempt < this.maxRetries) {
      try {
        attempt++;
        console.log(`[GMB Scraper] Attempt ${attempt}/${this.maxRetries}`);
        
        const products = await this.scrapeProductsWithBrowser(profileUrl);
        return products;
        
      } catch (error) {
        console.warn(`[GMB Scraper] Attempt ${attempt} failed:`, error.message);
        
        if (attempt < this.maxRetries) {
          console.log(`[GMB Scraper] Retrying in ${this.retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Scrape products using browser automation - specifically from GMB Products section
   * @param {string} profileUrl - GMB profile URL
   * @returns {Promise<Array>} Array of products
   */
  async scrapeProductsWithBrowser(profileUrl) {
    console.log(`[GMB Scraper] Navigating to GMB Products section for: ${profileUrl}`);
    
    // First, try to get the main profile page
    const mainPageHtml = await this.fetchPageHTML(profileUrl);
    
    // Look for Products section or try to construct Products URL
    const productsUrl = await this.findProductsSection(profileUrl, mainPageHtml);
    
    if (productsUrl && productsUrl !== profileUrl) {
      console.log(`[GMB Scraper] Found Products section URL: ${productsUrl}`);
      const productsHtml = await this.fetchPageHTML(productsUrl);
      return this.parseGMBProductsSection(productsHtml, productsUrl);
    } else {
      console.log(`[GMB Scraper] No separate Products section found, parsing main page`);
      return this.parseGMBProductsSection(mainPageHtml, profileUrl);
    }
  }

  /**
   * Fetch HTML content from a URL using multiple CORS proxy fallbacks
   * @param {string} url - URL to fetch
   * @returns {Promise<string>} HTML content
   */
  async fetchPageHTML(url) {
    const proxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
      `https://cors-anywhere.herokuapp.com/${url}`
    ];
    
    let lastError;
    
    for (let i = 0; i < proxies.length; i++) {
      const proxyUrl = proxies[i];
      console.log(`[GMB Scraper] Trying proxy ${i + 1}/${proxies.length}: ${proxyUrl.split('?')[0]}`);
      
      try {
        const response = await fetch(proxyUrl, {
          headers: {
            'User-Agent': this.userAgent,
            'Accept': i === 1 ? 'text/html' : 'application/json', // corsproxy.io returns HTML directly
            'X-Requested-With': 'XMLHttpRequest'
          },
          signal: AbortSignal.timeout(this.timeout)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const responseText = await response.text();
        
        if (!responseText || responseText.trim() === '') {
          throw new Error('Empty response received from proxy');
        }

        // Handle different proxy response formats
        if (i === 1) {
          // corsproxy.io returns HTML directly
          return responseText;
        } else {
          // Other proxies return JSON with contents
          let data;
          try {
            data = JSON.parse(responseText);
          } catch (jsonError) {
            console.error('[GMB Scraper] JSON parse error:', jsonError);
            throw new Error(`Invalid JSON response: ${jsonError.message}`);
          }

          const html = data.contents;
          if (!html) {
            throw new Error('No HTML content received from proxy');
          }
          
          return html;
        }
        
      } catch (error) {
        console.error(`[GMB Scraper] Proxy ${i + 1} failed:`, error.message);
        lastError = error;
        
        // Add delay between proxy attempts
        if (i < proxies.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // All proxies failed, try direct fetch as last resort
    try {
      console.log('[GMB Scraper] All proxies failed, trying direct fetch...');
      const directResponse = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent
        },
        signal: AbortSignal.timeout(this.timeout)
      });
      
      if (directResponse.ok) {
        return await directResponse.text();
      }
    } catch (directError) {
      console.error('[GMB Scraper] Direct fetch also failed:', directError);
    }
    
    throw new Error(`All proxy attempts failed. Last error: ${lastError?.message || 'Unknown error'}`);
  }

  /**
   * Find the Products section URL from the main GMB profile
   * @param {string} profileUrl - Main GMB profile URL
   * @param {string} html - HTML content of main page
   * @returns {Promise<string>} Products section URL
   */
  async findProductsSection(profileUrl, html) {
    // Look for Products tab/section links in the HTML
    const productsSectionPatterns = [
      // Direct Products section links
      /href="([^"]*products[^"]*)"[^>]*>.*?Products/i,
      /href="([^"]*\/products)"[^>]*>/i,
      // Data attributes that might indicate Products section
      /data-value="products"[^>]*href="([^"]*)"/i,
      // Menu items or tabs
      /<[^>]*data-tab[^>]*products[^>]*href="([^"]*)"/i
    ];

    for (const pattern of productsSectionPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        let productsUrl = match[1];
        
        // Make sure it's a complete URL
        if (productsUrl.startsWith('/')) {
          const baseUrl = new URL(profileUrl);
          productsUrl = baseUrl.origin + productsUrl;
        } else if (!productsUrl.startsWith('http')) {
          productsUrl = profileUrl + '/' + productsUrl;
        }
        
        console.log(`[GMB Scraper] Found Products section link: ${productsUrl}`);
        return productsUrl;
      }
    }

    // Try to construct Products URL based on common GMB patterns
    if (profileUrl.includes('google.com/maps/place/')) {
      // Try adding /products to the URL
      const productsUrl = profileUrl.includes('?') 
        ? profileUrl.replace('?', '/products?')
        : profileUrl + '/products';
      
      console.log(`[GMB Scraper] Attempting constructed Products URL: ${productsUrl}`);
      return productsUrl;
    }

    // If no specific Products section found, return original URL
    return profileUrl;
  }

  /**
   * Parse products specifically from GMB Products section
   * @param {string} html - HTML content from Products section
   * @param {string} url - Source URL
   * @returns {Array} Array of product objects
   */
  parseGMBProductsSection(html, url) {
    console.log(`[GMB Scraper] Parsing GMB Products section (${html.length} chars)`);
    
    const products = [];
    
    try {
      // Focus only on actual GMB Products section content
      const gmbProducts = this.extractActualGMBProducts(html);
      products.push(...gmbProducts);
      
      // Remove duplicates based on product name
      const uniqueProducts = this.removeDuplicates(products);
      
      console.log(`[GMB Scraper] Found ${uniqueProducts.length} actual GMB products`);
      return uniqueProducts;
      
    } catch (error) {
      console.error(`[GMB Scraper] Error parsing GMB products:`, error);
      return [];
    }
  }

  /**
   * Extract actual products added by business owner to GMB profile
   * @param {string} html - HTML content
   * @returns {Array} Array of products
   */
  extractActualGMBProducts(html) {
    const products = [];
    
    try {
      console.log(`[GMB Scraper] Looking for actual GMB products added by business owner`);
      
      // Method 1: GMB Products section specific selectors
      const gmbProductSelectors = [
        // Main products container
        'div[data-value="products"]',
        'div[data-attrid="kc:/business/gmb_services:services"]',
        'div[data-attrid*="products"]',
        
        // Individual product cards
        'div[jsaction*="product"]',
        'div[data-attrid*="product_item"]',
        'div[class*="product-card"]',
        'div[class*="gmb-product"]',
        
        // Product listings
        '[role="listitem"][data-attrid*="product"]',
        '[data-attrid*="business_products"]'
      ];

      // Look for product containers first
      let productContainerFound = false;
      
      for (const selector of gmbProductSelectors) {
        const containerRegex = new RegExp(`<div[^>]*${selector.replace(/[\[\]]/g, '\\$&')}[^>]*>(.*?)</div>`, 'gis');
        const containerMatches = html.match(containerRegex) || [];
        
        if (containerMatches.length > 0) {
          productContainerFound = true;
          console.log(`[GMB Scraper] Found ${containerMatches.length} product containers with selector: ${selector}`);
          
          containerMatches.forEach((container, index) => {
            const extractedProducts = this.parseProductContainer(container, index);
            products.push(...extractedProducts);
          });
        }
      }

      // Method 2: Look for product grid/list structure
      if (!productContainerFound) {
        const productGridPatterns = [
          // Product grid items
          /<div[^>]*class="[^"]*product[^"]*"[^>]*>.*?<\/div>/gis,
          /<div[^>]*data-[^>]*product[^>]*>.*?<\/div>/gis,
          
          // Service items (for service businesses)
          /<div[^>]*class="[^"]*service[^"]*"[^>]*>.*?<\/div>/gis,
          /<li[^>]*class="[^"]*product[^"]*"[^>]*>.*?<\/li>/gis
        ];

        productGridPatterns.forEach((pattern, patternIndex) => {
          const matches = html.match(pattern) || [];
          console.log(`[GMB Scraper] Pattern ${patternIndex + 1} found ${matches.length} potential products`);
          
          matches.forEach((match, matchIndex) => {
            const product = this.parseIndividualProduct(match, `pattern_${patternIndex + 1}_${matchIndex + 1}`);
            if (product) {
              products.push(product);
            }
          });
        });
      }

      // Method 3: Look for structured data specifically for products
      const structuredProducts = this.extractStructuredGMBProducts(html);
      products.push(...structuredProducts);
      
      console.log(`[GMB Scraper] Total products found: ${products.length}`);
      
    } catch (error) {
      console.warn(`[GMB Scraper] Error extracting GMB products:`, error.message);
    }
    
    return products;
  }

  /**
   * Parse individual product container
   * @param {string} containerHtml - HTML of product container
   * @param {number} containerIndex - Container index
   * @returns {Array} Array of products from this container
   */
  parseProductContainer(containerHtml, containerIndex) {
    const products = [];
    
    try {
      // Look for individual product items within the container
      const productItemPatterns = [
        // Product name patterns
        /<h3[^>]*>(.*?)<\/h3>/gi,
        /<h4[^>]*>(.*?)<\/h4>/gi,
        /<div[^>]*class="[^"]*name[^"]*"[^>]*>(.*?)<\/div>/gi,
        /<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/span>/gi,
        
        // Product with price patterns
        /<div[^>]*class="[^"]*price[^"]*"[^>]*>.*?([₹$][\d,]+).*?<\/div>/gi
      ];

      productItemPatterns.forEach((pattern, patternIndex) => {
        let match;
        while ((match = pattern.exec(containerHtml)) !== null) {
          const productName = match[1].replace(/<[^>]*>/g, '').trim();
          
          if (productName && productName.length > 2 && productName.length < 100) {
            // Look for price in the same context
            const priceMatch = containerHtml.match(new RegExp(`${productName}.*?([₹$][\\d,]+)`, 'i'));
            
            products.push({
              name: productName,
              description: '',
              price: priceMatch ? priceMatch[1] : '',
              category: 'gmb_product',
              imageUrl: '',
              source: `container_${containerIndex}_pattern_${patternIndex}`
            });
          }
        }
      });
      
      console.log(`[GMB Scraper] Container ${containerIndex} yielded ${products.length} products`);
      
    } catch (error) {
      console.warn(`[GMB Scraper] Error parsing container ${containerIndex}:`, error.message);
    }
    
    return products;
  }

  /**
   * Parse individual product element
   * @param {string} productHtml - HTML of individual product
   * @param {string} source - Source identifier
   * @returns {Object|null} Product object or null
   */
  parseIndividualProduct(productHtml, source) {
    try {
      // Extract product name
      const namePatterns = [
        /<h[1-6][^>]*>(.*?)<\/h[1-6]>/i,
        /<div[^>]*class="[^"]*name[^"]*"[^>]*>(.*?)<\/div>/i,
        /<span[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/span>/i,
        />([^<]{5,50})</  // Generic text content
      ];

      let productName = '';
      for (const pattern of namePatterns) {
        const match = productHtml.match(pattern);
        if (match && match[1]) {
          productName = match[1].replace(/<[^>]*>/g, '').trim();
          if (productName.length > 2) break;
        }
      }

      if (!productName) return null;

      // Extract price
      const priceMatch = productHtml.match(/[₹$][\d,]+/);
      
      // Extract description
      const descMatch = productHtml.match(/<p[^>]*>(.*?)<\/p>/i);
      
      return {
        name: productName,
        description: descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '',
        price: priceMatch ? priceMatch[0] : '',
        category: 'gmb_product',
        imageUrl: '',
        source
      };
      
    } catch (error) {
      console.warn(`[GMB Scraper] Error parsing individual product:`, error.message);
      return null;
    }
  }

  /**
   * Extract structured data specifically for GMB products
   * @param {string} html - HTML content
   * @returns {Array} Array of products
   */
  extractStructuredGMBProducts(html) {
    const products = [];
    
    try {
      // Look for JSON-LD with GMB-specific product data
      const jsonLdBlocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis) || [];
      
      jsonLdBlocks.forEach((block, index) => {
        try {
          const jsonContent = block.replace(/<script[^>]*>|<\/script>/gi, '').trim();
          const data = JSON.parse(jsonContent);
          
          // Look for LocalBusiness with products
          if (data['@type'] === 'LocalBusiness' && data.hasOfferCatalog) {
            const catalog = data.hasOfferCatalog;
            if (catalog.itemListElement && Array.isArray(catalog.itemListElement)) {
              catalog.itemListElement.forEach((item, itemIndex) => {
                if (item.item && item.item['@type'] === 'Product') {
                  products.push({
                    name: item.item.name || `Product ${itemIndex + 1}`,
                    description: item.item.description || '',
                    price: item.item.offers?.price || '',
                    category: item.item.category || 'gmb_product',
                    imageUrl: item.item.image || '',
                    source: `structured_data_${index}`
                  });
                }
              });
            }
          }
          
          // Direct product arrays
          if (Array.isArray(data) && data.some(item => item['@type'] === 'Product')) {
            data.forEach((item, itemIndex) => {
              if (item['@type'] === 'Product') {
                products.push({
                  name: item.name || `Product ${itemIndex + 1}`,
                  description: item.description || '',
                  price: item.offers?.price || '',
                  category: item.category || 'gmb_product',
                  imageUrl: item.image || '',
                  source: `structured_array_${index}`
                });
              }
            });
          }
          
        } catch (e) {
          // Invalid JSON, skip
        }
      });
      
      console.log(`[GMB Scraper] Found ${products.length} products in structured data`);
      
    } catch (error) {
      console.warn(`[GMB Scraper] Error extracting structured GMB products:`, error.message);
    }
    
    return products;
  }

  /**
   * Extract products from JSON-LD structured data
   * @param {string} html - HTML content
   * @returns {Array} Array of products
   */
  extractJSONLDProducts(html) {
    const products = [];
    
    try {
      const jsonLdBlocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis) || [];
      
      jsonLdBlocks.forEach((block, index) => {
        try {
          const jsonContent = block.replace(/<script[^>]*>|<\/script>/gi, '').trim();
          const data = JSON.parse(jsonContent);
          
          if (data['@type'] === 'Product') {
            products.push(this.formatProduct(data, 'json-ld'));
          } else if (Array.isArray(data)) {
            data.forEach(item => {
              if (item['@type'] === 'Product') {
                products.push(this.formatProduct(item, 'json-ld'));
              }
            });
          } else if (data['@type'] === 'LocalBusiness' && data.hasOfferCatalog) {
            // Extract products from offer catalog
            const catalog = data.hasOfferCatalog;
            if (catalog.itemListElement) {
              catalog.itemListElement.forEach(item => {
                if (item.item && item.item['@type'] === 'Product') {
                  products.push(this.formatProduct(item.item, 'json-ld'));
                }
              });
            }
          }
        } catch (e) {
          console.warn(`[GMB Scraper] Invalid JSON-LD block ${index}:`, e.message);
        }
      });
      
      console.log(`[GMB Scraper] Found ${products.length} products in JSON-LD`);
    } catch (error) {
      console.warn(`[GMB Scraper] JSON-LD extraction failed:`, error.message);
    }
    
    return products;
  }

  /**
   * Extract products from HTML elements
   * @param {string} html - HTML content
   * @returns {Array} Array of products
   */
  extractHTMLProducts(html) {
    const products = [];
    
    try {
      // Common product selectors for GMB pages
      const productSelectors = [
        // Google My Business product cards
        'div[data-value="products"]',
        'div[data-attrid="kc:/business/gmb_services:services"]',
        '[data-attrid*="product"]',
        '[data-attrid*="service"]',
        // Menu items for restaurants
        'div[data-attrid*="menu"]',
        '[data-attrid*="dish"]',
        // General product patterns
        '.product-item',
        '.service-item',
        '.menu-item'
      ];

      productSelectors.forEach(selector => {
        const regex = new RegExp(`<div[^>]*class="[^"]*${selector.replace('.', '')}[^"]*"[^>]*>(.*?)</div>`, 'gis');
        const matches = html.match(regex) || [];
        
        matches.forEach(match => {
          const product = this.parseProductFromElement(match);
          if (product) {
            products.push(product);
          }
        });
      });
      
      console.log(`[GMB Scraper] Found ${products.length} products in HTML elements`);
    } catch (error) {
      console.warn(`[GMB Scraper] HTML extraction failed:`, error.message);
    }
    
    return products;
  }

  /**
   * Extract GMB-specific product information
   * @param {string} html - HTML content
   * @returns {Array} Array of products
   */
  extractGMBProducts(html) {
    const products = [];
    
    try {
      // Look for GMB services/products section
      const servicePatterns = [
        // Services mentioned in reviews or descriptions
        /(?:service|product|offering):\s*([^<\n,]{3,50})/gi,
        // Price patterns that might indicate products
        /₹[\d,]+\s*(?:for|per)?\s*([^<\n,]{3,30})/gi,
        /\$[\d,]+\s*(?:for|per)?\s*([^<\n,]{3,30})/gi,
        // Property-specific patterns
        /(?:bhk|bedroom|sqft|sq\.?\s*ft).*?([^<\n,]{5,40})/gi
      ];

      servicePatterns.forEach((pattern, index) => {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          const productName = match[1].trim();
          if (productName && productName.length > 2) {
            products.push({
              name: productName,
              description: '',
              price: '',
              category: 'service',
              imageUrl: '',
              source: `pattern_${index + 1}`
            });
          }
        }
      });
      
      console.log(`[GMB Scraper] Found ${products.length} products via GMB patterns`);
    } catch (error) {
      console.warn(`[GMB Scraper] GMB pattern extraction failed:`, error.message);
    }
    
    return products;
  }

  /**
   * Parse product from HTML element
   * @param {string} elementHtml - HTML element content
   * @returns {Object|null} Product object or null
   */
  parseProductFromElement(elementHtml) {
    try {
      const nameMatch = elementHtml.match(/>([^<]{3,100})</);
      const priceMatch = elementHtml.match(/[₹$][\d,]+/);
      
      if (nameMatch) {
        return {
          name: nameMatch[1].trim(),
          description: '',
          price: priceMatch ? priceMatch[0] : '',
          category: 'product',
          imageUrl: '',
          source: 'html_element'
        };
      }
    } catch (error) {
      console.warn(`[GMB Scraper] Error parsing element:`, error.message);
    }
    
    return null;
  }

  /**
   * Format product data consistently
   * @param {Object} rawProduct - Raw product data
   * @param {string} source - Data source
   * @returns {Object} Formatted product
   */
  formatProduct(rawProduct, source) {
    return {
      name: rawProduct.name || rawProduct.title || 'Unknown Product',
      description: rawProduct.description || rawProduct.summary || '',
      price: rawProduct.price || rawProduct.offers?.price || '',
      category: rawProduct.category || rawProduct.productCategory || 'general',
      imageUrl: rawProduct.image || rawProduct.photo || '',
      source
    };
  }

  /**
   * Get product count and details for the user's own business profile
   * @param {Object} businessData - Business data object with name, place_id, website, etc.
   * @returns {Promise<Object>} Business product data
   */
  static async getMyBusinessProducts(businessData) {
    console.log(`[GMB Scraper] Scraping products for user's business: ${businessData.name}`);
    
    const scraper = new GMBProductScraper();
    const result = {
      name: businessData.name,
      place_id: businessData.place_id,
      website: businessData.website,
      products: [],
      productCount: 0,
      scrapingSuccess: false,
      error: null,
      scrapingMethods: []
    };

    try {
      let products = [];
      
      // Method 1: Try GMB profile URL using place_id
      if (businessData.place_id) {
        const gmbUrl = `https://www.google.com/maps/place/?q=place_id:${businessData.place_id}`;
        try {
          console.log(`[GMB Scraper] Trying GMB profile URL: ${gmbUrl}`);
          products = await scraper.scrapeProductsWithBrowser(gmbUrl);
          if (products.length > 0) {
            result.scrapingSuccess = true;
            result.scrapingMethods.push('GMB Profile');
          }
        } catch (error) {
          console.warn(`[GMB Scraper] GMB profile scraping failed:`, error.message);
          result.scrapingMethods.push('GMB Profile (Failed)');
        }
      }

      // Method 2: Try direct GMB URL construction if available
      if (products.length === 0 && businessData.name) {
        try {
          const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(businessData.name)}`;
          console.log(`[GMB Scraper] Trying GMB search URL: ${searchUrl}`);
          products = await scraper.scrapeProductsWithBrowser(searchUrl);
          if (products.length > 0) {
            result.scrapingSuccess = true;
            result.scrapingMethods.push('GMB Search');
          }
        } catch (error) {
          console.warn(`[GMB Scraper] GMB search scraping failed:`, error.message);
          result.scrapingMethods.push('GMB Search (Failed)');
        }
      }

      // Method 3: Try website scraping as fallback
      if (products.length === 0 && businessData.website) {
        try {
          console.log(`[GMB Scraper] Trying website URL: ${businessData.website}`);
          products = await scraper.scrapeProductsWithBrowser(businessData.website);
          if (products.length > 0) {
            result.scrapingSuccess = true;
            result.scrapingMethods.push('Website');
          }
        } catch (error) {
          console.warn(`[GMB Scraper] Website scraping failed:`, error.message);
          result.scrapingMethods.push('Website (Failed)');
        }
      }

      result.products = products;
      result.productCount = products.length;
      
      if (products.length > 0) {
        console.log(`[GMB Scraper] Found ${products.length} products for your business!`);
        console.log(`[GMB Scraper] Products found: ${products.slice(0, 5).map(p => p.name).join(', ')}${products.length > 5 ? '...' : ''}`);
        console.log(`[GMB Scraper] Scraping methods used: ${result.scrapingMethods.join(', ')}`);
      } else {
        console.log(`[GMB Scraper] No products found for your business`);
        result.error = 'No products found using any scraping method';
      }

    } catch (error) {
      console.error(`[GMB Scraper] Error scraping your business products:`, error);
      result.error = error.message;
    }

    return result;
  }

  /**
   * Get competitor product counts for multiple businesses
   * @param {Array} competitors - Array of competitor objects with name, place_id, website, etc.
   * @returns {Promise<Object>} Results object with competitor data and summary
   */
  static async getCompetitorProductCounts(competitors) {
    console.log(`[GMB Scraper] Starting batch scraping for ${competitors.length} competitors`);
    
    const scraper = new GMBProductScraper();
    const results = {
      competitors: [],
      summary: {
        totalScraped: 0,
        successfulScrapes: 0,
        totalProducts: 0,
        averageProducts: 0
      }
    };

    for (const competitor of competitors) {
      try {
        console.log(`[GMB Scraper] Scraping products for: ${competitor.name}`);
        
        const competitorResult = {
          name: competitor.name,
          place_id: competitor.place_id,
          website: competitor.website,
          products: [],
          productCount: 0,
          scrapingSuccess: false,
          error: null
        };

        // Try to scrape products using multiple methods
        let products = [];
        
        // Method 1: Try GMB profile URL if available
        if (competitor.place_id) {
          const gmbUrl = `https://www.google.com/maps/place/?q=place_id:${competitor.place_id}`;
          try {
            products = await scraper.scrapeProductsWithBrowser(gmbUrl);
            if (products.length > 0) {
              competitorResult.scrapingSuccess = true;
            }
          } catch (error) {
            console.warn(`[GMB Scraper] GMB scraping failed for ${competitor.name}:`, error.message);
          }
        }

        // Method 2: Try website scraping if GMB failed
        if (products.length === 0 && competitor.website) {
          try {
            products = await scraper.scrapeProductsWithBrowser(competitor.website);
            if (products.length > 0) {
              competitorResult.scrapingSuccess = true;
            }
          } catch (error) {
            console.warn(`[GMB Scraper] Website scraping failed for ${competitor.name}:`, error.message);
          }
        }

        competitorResult.products = products;
        competitorResult.productCount = products.length;
        
        if (products.length > 0) {
          console.log(`[GMB Scraper] Found ${products.length} products for ${competitor.name}`);
          console.log(`[GMB Scraper] Products: ${products.slice(0, 3).map(p => p.name).join(', ')}${products.length > 3 ? '...' : ''}`);
        } else {
          console.log(`[GMB Scraper] No products found for ${competitor.name}`);
        }

        results.competitors.push(competitorResult);
        results.summary.totalScraped++;
        
        if (competitorResult.scrapingSuccess) {
          results.summary.successfulScrapes++;
          results.summary.totalProducts += competitorResult.productCount;
        }

        // Add delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`[GMB Scraper] Error scraping ${competitor.name}:`, error);
        results.competitors.push({
          name: competitor.name,
          place_id: competitor.place_id,
          website: competitor.website,
          products: [],
          productCount: 0,
          scrapingSuccess: false,
          error: error.message
        });
      }
    }

    // Calculate summary statistics
    if (results.summary.successfulScrapes > 0) {
      results.summary.averageProducts = Math.round(results.summary.totalProducts / results.summary.successfulScrapes);
    }

    console.log(`[GMB Scraper] Batch scraping complete. ${results.summary.successfulScrapes}/${results.summary.totalScraped} successful`);
    console.log(`[GMB Scraper] Total products found: ${results.summary.totalProducts}, Average: ${results.summary.averageProducts}`);

    return results;
  }

  /**
   * Scrape multiple profiles in batch
   * @param {Array} profileInputs - Array of profile names or URLs
   * @returns {Promise<Object>} Batch scraping results
   */
  async scrapeMultipleProfiles(profileInputs) {
    console.log(`[GMB Scraper] Batch scraping ${profileInputs.length} profiles`);
    
    const results = [];
    const summary = {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      totalProducts: 0
    };

    for (const input of profileInputs) {
      try {
        console.log(`[GMB Scraper] Processing: ${input}`);
        
        const products = await this.scrapeProductsWithBrowser(input);
        
        const result = {
          input,
          success: true,
          productCount: products.length,
          products,
          error: null,
          scrapedAt: new Date().toISOString()
        };
        
        results.push(result);
        summary.successful++;
        summary.totalProducts += products.length;
        
        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`[GMB Scraper] Failed to scrape ${input}:`, error);
        
        results.push({
          input,
          success: false,
          productCount: 0,
          products: [],
          error: error.message,
          scrapedAt: new Date().toISOString()
        });
        
        summary.failed++;
      }
      
      summary.totalProcessed++;
    }

    console.log(`[GMB Scraper] Batch complete: ${summary.successful}/${summary.totalProcessed} successful`);
    
    return {
      results,
      summary
    };
  }

  /**
   * Get summary of scraped data for competitor analysis
   * @param {Array} competitors - Array of competitor data
   * @returns {Promise<Array>} Simplified competitor product data
   */
  async getCompetitorProductCounts(competitors) {
    console.log(`[GMB Scraper] Getting product counts for ${competitors.length} competitors`);
    
    const competitorInputs = competitors.map(comp => comp.name);
    const batchResult = await this.scrapeMultipleProfiles(competitorInputs);
    
    // Return simplified format for competitor analysis
    return batchResult.results.map((result, index) => ({
      name: competitors[index].name,
      place_id: competitors[index].place_id,
      productCount: result.productCount,
      products: result.products.map(p => p.name), // Only product names
      source: 'gmb_scraper',
      success: result.success,
      error: result.error || null,
      scrapedAt: result.scrapedAt
    }));
  }

  /**
   * Remove duplicate products based on product name
   * @param {Array} products - Array of product objects
   * @returns {Array} Array of unique products
   */
  removeDuplicates(products) {
    const seen = new Set();
    return products.filter(product => {
      const key = product.name?.toLowerCase().trim();
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

export default new GMBProductScraper();
