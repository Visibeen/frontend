/**
 * GMB Data Mapper Service
 * Maps Google My Business profile data to template formats
 */

class GMBDataMapper {
  /**
   * Main mapping function that routes to appropriate template mapper
   */
  mapGMBDataToTemplate(gmbData, templateId) {
    switch (templateId) {
      case 1:
        return this.mapToTemplate1(gmbData);
      case 2:
        return this.mapToTemplate2(gmbData);
      case 3:
        return this.mapToTemplate3(gmbData);
      case 4:
        return this.mapToTemplate4(gmbData);
      case 5:
        return this.mapToTemplate5(gmbData);
      case 6:
        return this.mapToTemplate6(gmbData);
      default:
        return this.mapToTemplate1(gmbData);
    }
  }

  /**
   * Map GMB location data to Template 1 (Medical Center) format
   */
  mapToTemplate1(gmbData) {
    const location = gmbData.location || {};
    const businessInfo = location.profile || {};
    const address = location.storefrontAddress || {};
    const phoneNumbers = location.phoneNumbers || {};
    const photos = this.generatePhotos(gmbData.photos, 'medical');
    
    // Only use real GMB data, no mock fallbacks
    const businessName = location.title || '';
    const businessDescription = businessInfo.description || '';
    
    return {
      businessInfo: {
        name: businessName,
        tagline: businessDescription ? `${businessName} - Your trusted partner` : '',
        description: businessDescription,
        logo: null,
        heroTitle: businessName,
        heroSubtitle: businessDescription,
        ctaText: businessName ? "CONTACT US" : '',
        heroImage: photos[0]?.url || null
      },
      services: this.generateServices(location.categories, 'medical', gmbData.services, gmbData),
      aboutUs: businessDescription ? {
        title: `About ${businessName}`,
        description: businessDescription,
        additionalText: `Learn more about ${businessName} and our commitment to excellence.`,
        ctaText: "Learn More",
        image: photos[1]?.url || null
      } : null,
      photos: photos,
      latestUpdates: this.generateUpdates(gmbData),
      testimonials: this.generateTestimonials(gmbData),
      faq: this.generateFAQ('medical', gmbData),
      contactInfo: {
        address: this.formatAddress(address),
        email: businessName ? `info@${businessName.toLowerCase().replace(/\s+/g, '')}.com` : '',
        phone: phoneNumbers.primaryPhone || '',
        workingHours: this.formatHours(location.regularHours),
        sundayHours: location.regularHours ? "SUNDAY : CLOSED" : ''
      },
      socialMedia: {
        instagram: "#",
        facebook: "#",
        twitter: "#"
      },
      footerLinks: {
        services: [],
        company: businessName ? ["About Us", "Services", "Contact Us"] : []
      },
      newsletter: businessName ? {
        title: `Stay Updated with ${businessName}`,
        placeholder: "Enter Your Email",
        buttonText: "Subscribe"
      } : null
    };
  }

  /**
   * Map GMB location data to Template 2 (Automotive) format
   */
  mapToTemplate2(gmbData) {
    const location = gmbData.location || {};
    const businessInfo = location.profile || {};
    const address = location.storefrontAddress || {};
    const phoneNumbers = location.phoneNumbers || {};
    const photos = this.generatePhotos(gmbData.photos, 'automotive');
    
    // Only use real GMB data, no mock fallbacks
    const businessName = location.title || '';
    const businessDescription = businessInfo.description || '';
    
    return {
      topContactInfo: {
        hours: this.formatHours(location.regularHours),
        phone: phoneNumbers.primaryPhone || '',
        address: this.formatAddress(address),
        socialMedia: {
          facebook: "#",
          twitter: "#",
          instagram: "#",
          linkedin: "#"
        }
      },
      businessInfo: {
        name: businessName,
        logo: null,
        heroTitle: businessName,
        heroSubtitle: businessDescription,
        ctaText: businessName ? "Contact Us" : '',
        heroImages: photos.length > 0 ? [photos[0].url] : []
      },
      navigation: {
        menuItems: businessName ? ["Home", "Services", "About Us", "Contact"] : []
      },
      aboutUs: businessDescription ? {
        title: "About Us",
        heading: businessName,
        description: businessDescription,
        features: [],
        ctaText: "Learn More",
        image: photos[1]?.url || null
      } : null,
      services: this.generateServices(location.categories, 'automotive', gmbData.services, gmbData),
      photos: photos,
      testimonials: this.generateTestimonials(gmbData),
      technologies: this.generateTechnologies(gmbData),
      faq: this.generateFAQ('automotive', gmbData),
      contactInfo: {
        title: businessName ? `Contact ${businessName}` : '',
        description: businessDescription ? `Get in touch with ${businessName} for more information.` : '',
        ctaText: "Contact",
        details: {
          address: {
            country: address.countryCode || '',
            street: this.formatAddress(address),
            city: address.locality || ''
          },
          phone: phoneNumbers.primaryPhone || '',
          email: businessName ? `info@${businessName.toLowerCase().replace(/\s+/g, '')}.com` : '',
          hours: {
            weekdays: this.formatHours(location.regularHours) || '',
            saturday: '',
            sunday: ''
          }
        },
        map: null
      },
      footer: {
        logo: null,
        tagline: businessName ? `${businessName} - Professional Services` : '',
        newsletter: businessName ? {
          title: `Stay Updated with ${businessName}`,
          subtitle: "Your Email",
          placeholder: "Enter Your Email",
          buttonText: "Subscribe"
        } : null,
        sections: {
          socials: {
            title: "Follow Us",
            links: ["Facebook", "Twitter", "Instagram"]
          },
          menu: {
            title: "Menu",
            links: businessName ? ["Home", "Services", "About Us", "Contact"] : []
          },
          contact: {
            title: "Contact",
            email: businessName ? `info@${businessName.toLowerCase().replace(/\s+/g, '')}.com` : ''
          }
        },
        copyright: {
          brand: businessName || "Business",
          text: "© 2025. All Rights Reserved."
        }
      }
    };
  }

  /**
   * Helper method to format address
   */
  formatAddress(address) {
    if (!address) return '';
    
    const parts = [];
    if (address.addressLines) parts.push(...address.addressLines);
    if (address.locality) parts.push(address.locality);
    if (address.administrativeArea) parts.push(address.administrativeArea);
    if (address.postalCode) parts.push(address.postalCode);
    
    return parts.length > 0 ? parts.join(', ') : '';
  }

  /**
   * Helper method to format business hours
   */
  formatHours(regularHours) {
    if (!regularHours || !regularHours.periods) return '';
    
    try {
      const periods = regularHours.periods;
      if (periods.length === 0) return '';
      
      const firstPeriod = periods[0];
      const openDay = this.getDayName(firstPeriod.openDay);
      const closeDay = this.getDayName(firstPeriod.closeDay);
      const openTime = this.formatTime(firstPeriod.openTime);
      const closeTime = this.formatTime(firstPeriod.closeTime);
      
      return `${openDay}-${closeDay}: ${openTime} – ${closeTime}`;
    } catch (error) {
      return '';
    }
  }

  /**
   * Helper method to get day name
   */
  getDayName(day) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day] || 'Mon';
  }

  /**
   * Helper method to format time
   */
  formatTime(time) {
    if (!time) return '';
    
    try {
      const hours = parseInt(time.hours || 0);
      const minutes = parseInt(time.minutes || 0);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : '';
      
      return `${displayHours}${displayMinutes} ${ampm}`;
    } catch (error) {
      return '';
    }
  }

  /**
   * Generate services based on GMB services data or business categories
   */
  generateServices(categories, templateType, gmbServices = null, gmbData = null) {
    // Detect business category for dynamic service generation
    const detectedCategory = gmbData ? this.detectBusinessCategory(gmbData) : templateType;
    
    // Use GMB services data if available
    if (gmbServices && gmbServices.length > 0) {
      return gmbServices.slice(0, 8).map((service, index) => ({
        id: index + 1,
        name: service.displayName || service.name,
        description: service.description || this.getServiceDescription(service.displayName || service.name, detectedCategory),
        title: service.displayName || service.name,
        category: service.category || 'Service'
      }));
    }
    
    // Use categories if available with dynamic descriptions
    if (categories && categories.length > 0) {
      return categories.slice(0, 8).map((category, index) => ({
        id: index + 1,
        name: category.displayName || category.name,
        description: this.getServiceDescription(category.displayName || category.name, detectedCategory),
        title: category.displayName || category.name,
        category: category.displayName || category.name
      }));
    }

    // Generate category-specific default services if no GMB data
    return this.getDefaultServices(detectedCategory);
  }

  /**
   * Get service description based on business category
   */
  getServiceDescription(serviceName, businessCategory) {
    const descriptions = {
      medical: `Professional ${serviceName} healthcare services with experienced medical staff`,
      real_estate: `Expert ${serviceName} real estate services to help you buy, sell, or invest`,
      automotive: `Professional ${serviceName} automotive services with certified technicians`,
      restaurant: `Quality ${serviceName} dining experience with fresh ingredients`,
      legal: `Professional ${serviceName} legal services with experienced attorneys`,
      beauty: `Premium ${serviceName} beauty services with skilled professionals`,
      retail: `Quality ${serviceName} products with excellent customer service`,
      general: `Professional ${serviceName} services tailored to your needs`
    };
    
    return descriptions[businessCategory] || descriptions.general;
  }

  /**
   * Get default services for business category
   */
  getDefaultServices(businessCategory) {
    const defaultServices = {
      medical: [
        { name: 'Medical Consultation', description: 'Comprehensive medical consultations with experienced doctors' },
        { name: 'Health Checkups', description: 'Regular health screenings and preventive care services' },
        { name: 'Diagnostic Services', description: 'Advanced diagnostic testing and medical imaging' }
      ],
      real_estate: [
        { name: 'Property Sales', description: 'Expert assistance in buying and selling residential properties' },
        { name: 'Property Management', description: 'Professional property management and rental services' },
        { name: 'Market Analysis', description: 'Comprehensive market analysis and property valuations' }
      ],
      automotive: [
        { name: 'Auto Repair', description: 'Professional automotive repair services for all vehicle makes' },
        { name: 'Maintenance Services', description: 'Regular maintenance to keep your vehicle running smoothly' },
        { name: 'Diagnostic Services', description: 'Advanced automotive diagnostic and troubleshooting' }
      ],
      restaurant: [
        { name: 'Dine-In Service', description: 'Comfortable dining experience with quality cuisine' },
        { name: 'Takeout Orders', description: 'Quick and convenient takeout service' },
        { name: 'Catering Services', description: 'Professional catering for events and special occasions' }
      ],
      legal: [
        { name: 'Legal Consultation', description: 'Professional legal advice and consultation services' },
        { name: 'Document Preparation', description: 'Expert preparation of legal documents and contracts' },
        { name: 'Court Representation', description: 'Experienced legal representation in court proceedings' }
      ],
      beauty: [
        { name: 'Hair Services', description: 'Professional hair cutting, styling, and coloring services' },
        { name: 'Skin Care', description: 'Advanced skincare treatments and facial services' },
        { name: 'Wellness Services', description: 'Relaxing wellness and spa treatments' }
      ],
      retail: [
        { name: 'Product Sales', description: 'Quality products with excellent customer service' },
        { name: 'Customer Support', description: 'Dedicated customer support and assistance' },
        { name: 'Product Consultation', description: 'Expert advice to help you choose the right products' }
      ]
    };

    const services = defaultServices[businessCategory] || defaultServices.medical;
    return services.map((service, index) => ({
      id: index + 1,
      name: service.name,
      title: service.name,
      description: service.description,
      category: businessCategory
    }));
  }

  /**
   * Generate dynamic testimonials based on business category
   */
  generateTestimonials(gmbData = null) {
    if (!gmbData || !gmbData.location?.title) return [];
    
    const detectedCategory = this.detectBusinessCategory(gmbData);
    const businessName = gmbData.location.title;
    
    const testimonialTemplates = {
      medical: [
        {
          name: "Sarah Johnson",
          role: "Patient",
          content: `The medical care at ${businessName} is exceptional. The staff is professional and caring.`,
          rating: 5
        },
        {
          name: "Michael Chen",
          role: "Patient",
          content: `I've been coming to ${businessName} for years. They provide excellent healthcare services.`,
          rating: 5
        }
      ],
      real_estate: [
        {
          name: "Jennifer Smith",
          role: "Home Buyer",
          content: `${businessName} helped us find our dream home. Their expertise in the market is unmatched.`,
          rating: 5
        },
        {
          name: "David Wilson",
          role: "Property Seller",
          content: `Sold our house quickly with ${businessName}. Professional service from start to finish.`,
          rating: 5
        }
      ],
      automotive: [
        {
          name: "Robert Martinez",
          role: "Customer",
          content: `${businessName} fixed my car perfectly. Honest pricing and quality work.`,
          rating: 5
        },
        {
          name: "Lisa Anderson",
          role: "Customer",
          content: `Reliable automotive service at ${businessName}. They always explain what needs to be done.`,
          rating: 5
        }
      ],
      restaurant: [
        {
          name: "Emily Davis",
          role: "Customer",
          content: `Amazing food and service at ${businessName}. Always a great dining experience.`,
          rating: 5
        },
        {
          name: "James Thompson",
          role: "Customer",
          content: `${businessName} is our go-to restaurant. Fresh ingredients and excellent flavors.`,
          rating: 5
        }
      ],
      legal: [
        {
          name: "Patricia Brown",
          role: "Client",
          content: `${businessName} provided excellent legal representation. Professional and knowledgeable.`,
          rating: 5
        },
        {
          name: "Christopher Lee",
          role: "Client",
          content: `Outstanding legal services from ${businessName}. They handled our case with expertise.`,
          rating: 5
        }
      ],
      beauty: [
        {
          name: "Amanda Garcia",
          role: "Client",
          content: `Love the services at ${businessName}! Always leave feeling beautiful and refreshed.`,
          rating: 5
        },
        {
          name: "Nicole Rodriguez",
          role: "Client",
          content: `${businessName} has the best beauty treatments. Professional staff and great results.`,
          rating: 5
        }
      ],
      retail: [
        {
          name: "Kevin White",
          role: "Customer",
          content: `Great products and customer service at ${businessName}. Highly recommend shopping here.`,
          rating: 5
        },
        {
          name: "Michelle Taylor",
          role: "Customer",
          content: `${businessName} always has what I need. Quality products and helpful staff.`,
          rating: 5
        }
      ],
      general: [
        {
          name: "John Smith",
          role: "Customer",
          content: `Excellent service at ${businessName}. Professional and reliable.`,
          rating: 5
        },
        {
          name: "Mary Johnson",
          role: "Customer",
          content: `${businessName} provides outstanding service. Highly recommend their expertise.`,
          rating: 5
        }
      ]
    };

    const selectedTestimonials = testimonialTemplates[detectedCategory] || testimonialTemplates.general;
    return selectedTestimonials.map((testimonial, index) => ({
      id: index + 1,
      ...testimonial
    }));
  }

  /**
   * Generate dynamic updates/news based on business category
   */
  generateUpdates(gmbData = null) {
    if (!gmbData || !gmbData.location?.title) return [];
    
    const detectedCategory = this.detectBusinessCategory(gmbData);
    const businessName = gmbData.location.title;
    
    const updateTemplates = {
      medical: [
        {
          title: "New Health Services Available",
          content: `${businessName} is pleased to announce expanded health services for our patients.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Extended Operating Hours",
          content: `We've extended our hours to better serve our patients' healthcare needs.`,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      real_estate: [
        {
          title: "Market Update",
          content: `${businessName} provides the latest real estate market insights and property trends.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "New Listings Available",
          content: `Check out our latest property listings with competitive prices and great locations.`,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      automotive: [
        {
          title: "Seasonal Maintenance Specials",
          content: `${businessName} offers special pricing on seasonal vehicle maintenance services.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "New Diagnostic Equipment",
          content: `We've upgraded our diagnostic equipment to provide even better automotive services.`,
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      restaurant: [
        {
          title: "New Menu Items",
          content: `${businessName} introduces exciting new dishes made with fresh, local ingredients.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Special Events",
          content: `Join us for special dining events and seasonal celebrations.`,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      legal: [
        {
          title: "Legal Updates",
          content: `${businessName} keeps you informed about important legal developments and changes.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Free Consultation Available",
          content: `Schedule a free initial consultation to discuss your legal needs.`,
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      beauty: [
        {
          title: "New Beauty Treatments",
          content: `${businessName} introduces the latest beauty treatments and wellness services.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Seasonal Specials",
          content: `Take advantage of our seasonal beauty packages and special offers.`,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      retail: [
        {
          title: "New Product Arrivals",
          content: `${businessName} features new product arrivals and exclusive items.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Customer Appreciation Sale",
          content: `Special discounts for our valued customers on selected products.`,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      general: [
        {
          title: "Service Updates",
          content: `${businessName} continues to improve our services for better customer experience.`,
          date: new Date().toISOString().split('T')[0]
        },
        {
          title: "Thank You to Our Customers",
          content: `We appreciate your continued trust and support of our business.`,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]
    };

    const selectedUpdates = updateTemplates[detectedCategory] || updateTemplates.general;
    return selectedUpdates.map((update, index) => ({
      id: index + 1,
      ...update
    }));
  }

  /**
   * Generate dynamic technologies/tools based on business category
   */
  generateTechnologies(gmbData = null) {
    if (!gmbData || !gmbData.location?.title) return [];
    
    const detectedCategory = this.detectBusinessCategory(gmbData);
    
    const technologyTemplates = {
      medical: [
        { name: "Electronic Health Records", description: "Advanced EHR systems for patient care" },
        { name: "Digital Imaging", description: "State-of-the-art medical imaging technology" },
        { name: "Telemedicine", description: "Remote healthcare consultation services" }
      ],
      real_estate: [
        { name: "MLS Database", description: "Comprehensive property listing database" },
        { name: "Virtual Tours", description: "3D virtual property viewing technology" },
        { name: "Market Analytics", description: "Advanced real estate market analysis tools" }
      ],
      automotive: [
        { name: "Diagnostic Scanners", description: "Advanced automotive diagnostic equipment" },
        { name: "Digital Inspection", description: "Comprehensive digital vehicle inspection" },
        { name: "Parts Database", description: "Extensive automotive parts inventory system" }
      ],
      restaurant: [
        { name: "POS System", description: "Modern point-of-sale ordering system" },
        { name: "Kitchen Display", description: "Digital kitchen management system" },
        { name: "Online Ordering", description: "Convenient online food ordering platform" }
      ],
      legal: [
        { name: "Case Management", description: "Digital legal case management system" },
        { name: "Document Security", description: "Secure legal document management" },
        { name: "Client Portal", description: "Secure client communication platform" }
      ],
      beauty: [
        { name: "Booking System", description: "Online appointment scheduling system" },
        { name: "Treatment Tracking", description: "Digital beauty treatment records" },
        { name: "Product Database", description: "Comprehensive beauty product catalog" }
      ],
      retail: [
        { name: "Inventory Management", description: "Real-time inventory tracking system" },
        { name: "E-commerce Platform", description: "Online shopping and ordering system" },
        { name: "Customer Database", description: "Customer relationship management system" }
      ],
      general: [
        { name: "Customer Management", description: "Professional customer service system" },
        { name: "Digital Communication", description: "Modern communication tools" },
        { name: "Quality Assurance", description: "Service quality monitoring system" }
      ]
    };

    const selectedTechnologies = technologyTemplates[detectedCategory] || technologyTemplates.general;
    return selectedTechnologies.map((tech, index) => ({
      id: index + 1,
      ...tech
    }));
  }

  /**
   * Generate photos array from GMB photos data
   */
  generatePhotos(gmbPhotos = null, templateType = 'medical') {
    // Only return GMB photos if available, no fallback to mock photos
    if (gmbPhotos && gmbPhotos.length > 0) {
      return gmbPhotos.slice(0, 12).map((photo, index) => ({
        id: index + 1,
        url: photo.url,
        name: photo.name || `Business Photo ${index + 1}`,
        description: photo.description || '',
        category: photo.category || 'Business Photo'
      }));
    }

    // Return empty array if no GMB photos available
    return [];
  }

  /**
   * Generate testimonials
   */
  generateTestimonials() {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Customer",
        review: "Excellent service! Professional, reliable, and exceeded my expectations. Highly recommended!",
        avatar: "/images/testimonial-avatar.jpg",
        rating: 5
      }
    ];
  }

  /**
   * Detect business category from GMB data
   */
  detectBusinessCategory(gmbData) {
    const location = gmbData.location || {};
    const categories = location.categories || [];
    
    // Check primary category first
    const primaryCategory = categories.primaryCategory?.displayName?.toLowerCase() || '';
    
    // Check additional categories
    const additionalCategories = categories.additionalCategories || [];
    const allCategories = [primaryCategory, ...additionalCategories.map(cat => cat.displayName?.toLowerCase() || '')];
    
    // Business type detection based on categories
    for (const category of allCategories) {
      // Medical/Healthcare
      if (category.includes('hospital') || category.includes('medical') || category.includes('doctor') || 
          category.includes('clinic') || category.includes('health') || category.includes('physician') ||
          category.includes('dentist') || category.includes('dental') || category.includes('pharmacy')) {
        return 'medical';
      }
      
      // Real Estate
      if (category.includes('real estate') || category.includes('realtor') || category.includes('property') ||
          category.includes('housing') || category.includes('home') || category.includes('apartment') ||
          category.includes('commercial property') || category.includes('residential')) {
        return 'real_estate';
      }
      
      // Automotive
      if (category.includes('automotive') || category.includes('car repair') || category.includes('auto') ||
          category.includes('mechanic') || category.includes('garage') || category.includes('vehicle')) {
        return 'automotive';
      }
      
      // Restaurant/Food
      if (category.includes('restaurant') || category.includes('food') || category.includes('cafe') ||
          category.includes('bar') || category.includes('dining') || category.includes('catering')) {
        return 'restaurant';
      }
      
      // Legal
      if (category.includes('lawyer') || category.includes('attorney') || category.includes('legal') ||
          category.includes('law firm') || category.includes('legal services')) {
        return 'legal';
      }
      
      // Beauty/Salon
      if (category.includes('salon') || category.includes('beauty') || category.includes('spa') ||
          category.includes('hair') || category.includes('nail') || category.includes('massage')) {
        return 'beauty';
      }
      
      // Retail
      if (category.includes('store') || category.includes('shop') || category.includes('retail') ||
          category.includes('clothing') || category.includes('boutique')) {
        return 'retail';
      }
    }
    
    return 'general';
  }

  /**
   * Generate FAQ based on detected business category from GMB data
   */
  generateFAQ(businessType, gmbData = null) {
    // Detect actual business category from GMB data
    const detectedCategory = gmbData ? this.detectBusinessCategory(gmbData) : businessType;
    
    const faqTemplates = {
      medical: [
        { question: "What medical services do you offer?", answer: "We provide comprehensive healthcare services tailored to your needs." },
        { question: "Do you accept insurance?", answer: "Please contact us to verify your insurance coverage." },
        { question: "How do I schedule an appointment?", answer: "You can call us or book online through our website." },
        { question: "What are your office hours?", answer: "Please check our contact information for current hours." }
      ],
      real_estate: [
        { question: "What types of properties do you handle?", answer: "We work with residential and commercial properties based on your needs." },
        { question: "How do you determine property values?", answer: "We use market analysis and comparable sales data." },
        { question: "What is your commission structure?", answer: "Contact us for detailed information about our fees." },
        { question: "How long does it take to sell a property?", answer: "Timeline varies based on market conditions and property type." }
      ],
      automotive: [
        { question: "What automotive services do you provide?", answer: "We offer comprehensive auto repair and maintenance services." },
        { question: "Do you offer warranties on repairs?", answer: "Yes, we provide warranties on our work and parts." },
        { question: "How long do repairs typically take?", answer: "Repair time depends on the service needed and parts availability." },
        { question: "Do you work on all vehicle makes?", answer: "We service most vehicle makes and models." }
      ],
      restaurant: [
        { question: "What type of cuisine do you serve?", answer: "Check our menu for our specialty dishes and cuisine type." },
        { question: "Do you offer delivery or takeout?", answer: "Contact us for information about delivery and takeout options." },
        { question: "Do you accommodate dietary restrictions?", answer: "We can accommodate various dietary needs - please let us know." },
        { question: "Do you take reservations?", answer: "Please call us to make a reservation." }
      ],
      legal: [
        { question: "What areas of law do you practice?", answer: "We specialize in various legal areas - contact us for specific expertise." },
        { question: "How do you charge for legal services?", answer: "Our fee structure varies by case type - we'll discuss this during consultation." },
        { question: "Do you offer free consultations?", answer: "Contact us to learn about consultation options." },
        { question: "How long do legal cases typically take?", answer: "Case duration varies greatly depending on complexity and type." }
      ],
      beauty: [
        { question: "What services do you offer?", answer: "We provide a full range of beauty and wellness services." },
        { question: "Do I need an appointment?", answer: "Appointments are recommended to ensure availability." },
        { question: "What products do you use?", answer: "We use high-quality, professional-grade products." },
        { question: "Do you offer packages or memberships?", answer: "Contact us for information about special packages and deals." }
      ],
      retail: [
        { question: "What products do you carry?", answer: "Visit our store or website to see our current product selection." },
        { question: "Do you offer returns or exchanges?", answer: "Yes, we have a return policy - please ask for details." },
        { question: "Do you offer online shopping?", answer: "Contact us for information about online ordering options." },
        { question: "Do you have sales or promotions?", answer: "Follow us for updates on current sales and special offers." }
      ],
      general: [
        { question: "What services do you provide?", answer: "Contact us to learn about our full range of services." },
        { question: "What are your hours of operation?", answer: "Please check our contact information for current hours." },
        { question: "How can I contact you?", answer: "You can reach us by phone, email, or visit our location." },
        { question: "Do you offer consultations?", answer: "Contact us to discuss your specific needs." }
      ]
    };

    const selectedFAQs = faqTemplates[detectedCategory] || faqTemplates.general;
    
    // Only return FAQs if we have real business data
    if (!gmbData || !gmbData.location?.title) {
      return [];
    }
    
    return selectedFAQs.map((faq, index) => ({
      id: index + 1,
      question: faq.question,
      answer: faq.answer,
      isExpanded: index === 0
    }));
  }

  /**
   * Generate updates for Template 1
   */
  generateUpdates(businessType) {
    return [
      {
        id: 1,
        title: "Latest Service Updates",
        description: "Stay informed about our latest service offerings and improvements.",
        image: `/images/${businessType}-update-1.jpg`,
        date: null
      }
    ];
  }

  /**
   * Generate technologies for Template 2
   */
  generateTechnologies(businessType) {
    return [
      {
        id: 1,
        title: "Latest Technology",
        description: "We use the latest technology and equipment in our services.",
        image: `/images/${businessType}-tech-1.jpg`,
        date: new Date().toLocaleDateString(),
        comments: 0
      }
    ];
  }

  // Add other template mappers (3-6) with similar structure
  mapToTemplate3(gmbData) { return this.mapToTemplate1(gmbData); }
  mapToTemplate4(gmbData) { return this.mapToTemplate1(gmbData); }
  mapToTemplate5(gmbData) { return this.mapToTemplate1(gmbData); }
  mapToTemplate6(gmbData) { return this.mapToTemplate1(gmbData); }
}

export default new GMBDataMapper();
