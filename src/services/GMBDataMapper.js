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
    
    return {
      businessInfo: {
        name: location.title || "Medical Center",
        tagline: "Your trusted healthcare partner",
        description: businessInfo.description || "Professional healthcare services you can trust.",
        logo: null,
        heroTitle: location.title || "Healthcare Professional",
        heroSubtitle: businessInfo.description || "Providing quality medical care",
        ctaText: "BOOK NOW"
      },
      services: this.generateServices(location.categories, 'medical'),
      aboutUs: {
        title: "About Us",
        description: businessInfo.description || "We are committed to providing excellent healthcare services.",
        additionalText: "Our experienced team is dedicated to your health and wellbeing.",
        ctaText: "Read more",
        image: "/images/medical-team.jpg"
      },
      latestUpdates: this.generateUpdates('medical'),
      testimonials: this.generateTestimonials(),
      faq: this.generateFAQ('medical'),
      contactInfo: {
        address: this.formatAddress(address),
        email: "info@" + (location.title || "medical").toLowerCase().replace(/\s+/g, '') + ".com",
        phone: phoneNumbers.primaryPhone || "+1 386-688-3295",
        workingHours: this.formatHours(location.regularHours),
        sundayHours: "SUNDAY : CLOSED"
      },
      socialMedia: {
        instagram: "#",
        facebook: "#",
        twitter: "#"
      },
      footerLinks: {
        services: ["Medical Consultation", "Health Checkups", "Emergency Care", "Specialist Services"],
        company: ["Service", "About Us", "Patient Testimonials", "Blog", "Latest updates", "Contact Us"]
      },
      newsletter: {
        title: "Join a Newsletter",
        placeholder: "Enter Your Email",
        buttonText: "Send"
      }
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
    
    return {
      topContactInfo: {
        hours: this.formatHours(location.regularHours),
        phone: phoneNumbers.primaryPhone || "1-800-458-56987",
        address: this.formatAddress(address),
        socialMedia: {
          facebook: "#",
          twitter: "#",
          instagram: "#",
          linkedin: "#"
        }
      },
      businessInfo: {
        name: location.title || "Automotive Services",
        logo: "/images/template2-logo.png",
        heroTitle: businessInfo.description || "Professional automotive services",
        heroSubtitle: "Expert automotive repair and maintenance services",
        ctaText: "let's talk",
        heroImages: ["/images/automotive-hero.jpg"]
      },
      navigation: {
        menuItems: ["Home", "Services", "About Us", "Blog", "Contacts"]
      },
      aboutUs: {
        title: "who we are",
        heading: location.title || "Professional Automotive Services",
        description: businessInfo.description || "We provide comprehensive automotive services.",
        features: [
          "Expert technicians",
          "Quality parts and service",
          "Competitive pricing"
        ],
        ctaText: "Info About Us",
        image: "/images/automotive-hero.jpg"
      },
      services: this.generateServices(location.categories, 'automotive'),
      testimonials: this.generateTestimonials(),
      technologies: this.generateTechnologies('automotive'),
      faq: this.generateFAQ('automotive'),
      contactInfo: {
        title: "Have Questions? Get in touch!",
        description: "Contact us for all your automotive service needs.",
        ctaText: "Subscribe",
        details: {
          address: {
            country: "USA —",
            street: this.formatAddress(address),
            city: address.locality || "Your City"
          },
          phone: phoneNumbers.primaryPhone || "+1 840 841 25 69",
          email: "info@" + (location.title || "automotive").toLowerCase().replace(/\s+/g, '') + ".com",
          hours: {
            weekdays: this.formatHours(location.regularHours) || "Mon-Fri: 9 AM – 6 PM",
            saturday: "Saturday: 9 AM – 4 PM",
            sunday: "Sunday: Closed"
          }
        },
        map: "/images/contact-map.svg"
      },
      footer: {
        logo: "/images/footer-logo.png",
        tagline: "We develop & create automotive solutions",
        newsletter: {
          title: "Join a Newsletter",
          subtitle: "Your Email",
          placeholder: "Enter Your Email",
          buttonText: "Send"
        },
        sections: {
          socials: {
            title: "Socials",
            links: ["Facebook", "Twitter", "Instagram"]
          },
          menu: {
            title: "Menu",
            links: ["Home", "Services", "About Us", "Contacts"]
          },
          contact: {
            title: "Say Hello",
            email: "info@" + (location.title || "automotive").toLowerCase().replace(/\s+/g, '') + ".com"
          }
        },
        copyright: {
          brand: "visibeen",
          text: "© 2025. All Rights Reserved."
        }
      }
    };
  }

  /**
   * Helper method to format address
   */
  formatAddress(address) {
    if (!address) return "123 Main Street, Your City, State 12345";
    
    const parts = [];
    if (address.addressLines) parts.push(...address.addressLines);
    if (address.locality) parts.push(address.locality);
    if (address.administrativeArea) parts.push(address.administrativeArea);
    if (address.postalCode) parts.push(address.postalCode);
    
    return parts.length > 0 ? parts.join(', ') : "123 Main Street, Your City, State 12345";
  }

  /**
   * Helper method to format business hours
   */
  formatHours(regularHours) {
    if (!regularHours || !regularHours.periods) return "Mon-Fri: 9 AM – 6 PM";
    
    try {
      const periods = regularHours.periods;
      if (periods.length === 0) return "Mon-Fri: 9 AM – 6 PM";
      
      const firstPeriod = periods[0];
      const openDay = this.getDayName(firstPeriod.openDay);
      const closeDay = this.getDayName(firstPeriod.closeDay);
      const openTime = this.formatTime(firstPeriod.openTime);
      const closeTime = this.formatTime(firstPeriod.closeTime);
      
      return `${openDay}-${closeDay}: ${openTime} – ${closeTime}`;
    } catch (error) {
      return "Mon-Fri: 9 AM – 6 PM";
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
    if (!time) return "9 AM";
    
    try {
      const hours = parseInt(time.hours || 9);
      const minutes = parseInt(time.minutes || 0);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : '';
      
      return `${displayHours}${displayMinutes} ${ampm}`;
    } catch (error) {
      return "9 AM";
    }
  }

  /**
   * Generate services based on business categories
   */
  generateServices(categories, templateType) {
    const serviceTemplates = {
      medical: [
        { name: "General Consultation", description: "Comprehensive medical consultations and health assessments." },
        { name: "Health Checkups", description: "Regular health screenings and preventive care services." },
        { name: "Emergency Care", description: "24/7 emergency medical services and urgent care." },
        { name: "Specialist Services", description: "Specialized medical treatments and consultations." }
      ],
      automotive: [
        { name: "Engine Repair", description: "Professional engine diagnostics and repair services." },
        { name: "Brake Service", description: "Complete brake system inspection and maintenance." },
        { name: "Oil Change", description: "Regular oil changes and fluid maintenance services." }
      ]
    };

    const defaultServices = serviceTemplates[templateType] || serviceTemplates.medical;
    
    if (categories && categories.length > 0) {
      return categories.slice(0, 8).map((category, index) => ({
        id: index + 1,
        name: category.displayName || category.name || defaultServices[index % defaultServices.length].name,
        description: defaultServices[index % defaultServices.length].description,
        title: category.displayName || category.name || defaultServices[index % defaultServices.length].name,
        image: `/images/${templateType}-service-${(index % 4) + 1}.jpg`
      }));
    }

    return defaultServices.map((service, index) => ({
      id: index + 1,
      name: service.name,
      title: service.name,
      description: service.description,
      image: `/images/${templateType}-service-${(index % 4) + 1}.jpg`
    }));
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
   * Generate FAQ based on business type
   */
  generateFAQ(businessType) {
    const faqTemplates = {
      medical: [
        { question: "What services do you offer?", answer: "We offer comprehensive medical services including consultations, checkups, and specialized treatments." },
        { question: "Do you accept insurance?", answer: null },
        { question: "What are your hours?", answer: null },
        { question: "How do I schedule an appointment?", answer: null }
      ],
      automotive: [
        { question: "What automotive services do you provide?", answer: "We offer complete automotive repair and maintenance services." },
        { question: "Do you offer warranties?", answer: null },
        { question: "How long do repairs typically take?", answer: null }
      ]
    };

    const defaultFAQ = faqTemplates[businessType] || faqTemplates.medical;
    
    // Return array directly for compatibility with template components
    return defaultFAQ.map((faq, index) => ({
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
