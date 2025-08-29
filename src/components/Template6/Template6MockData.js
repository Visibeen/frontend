// Mock data for Template 6 plumbing services website
export const mockRootProps = {
  businessInfo: {
    name: "LOGO",
    logo: "/images/template6-logo.png",
    heroTitle: "Plumbing Experts Right at Your Doorstep",
    heroSubtitle: "Our plumbers are the most recognized professionals globally because we're committed to excellent service, and nothing wears on homeowners like the idea of handling plumbing problems.",
    heroBackgroundImage: "/images/template6-hero-bg.jpg",
    phoneNumber: "+ (100) 234-5678"
  },
  navigation: {
    menuItems: ["Home", "Services", "About Us", "Blog"]
  },
  serviceRequest: {
    title: "Request Your Services Today",
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "John"
      },
      lastName: {
        label: "Last Name", 
        placeholder: "Doe"
      },
      phoneNumber: {
        label: "Phone Number",
        placeholder: "+123 000 000"
      },
      email: {
        label: "Email",
        placeholder: "Johndoe@gmail.com"
      },
      message: {
        label: "Message",
        placeholder: "Enter your message"
      }
    },
    submitText: "Submit"
  },
  services: {
    sectionLabel: "What We Do",
    title: "We Do The Best Plumbing Service & Maintenance",
    serviceList: [
      {
        id: 1,
        title: "Plumbing Installation",
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "installation",
        featured: true
      },
      {
        id: 2,
        title: "Plumbing Maintenance", 
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "maintenance"
      },
      {
        id: 3,
        title: "Plumbing Line Consultation",
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "consultation"
      },
      {
        id: 4,
        title: "General Plumbing",
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "general"
      },
      {
        id: 5,
        title: "Fixing Pipes",
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "fixing"
      },
      {
        id: 6,
        title: "Drain Cleaning",
        description: "Pellentesque lorem enim, porta quis orci a, maximus varius lorem. Suspendisse suscipit, lacus in",
        iconType: "drain"
      }
    ]
  },
  aboutUs: {
    sectionLabel: "About Us",
    title: "We Are Experts in Plumbing Service",
    description: "At [Your Plumbing Company Name], we're not just in the business of fixing pipes — we're in the business of building trust.\n\nFounded with a commitment to quality, reliability, and customer satisfaction, our team of licensed plumbing professionals has been proudly serving homes and businesses across [City/Region] for over [X] years. Whether it's a dripping faucet, a burst pipe, or a full plumbing overhaul, we handle every job — big or small — with the same care and attention to detail.\n\nWe know plumbing issues can be stressful, which is why we offer:",
    features: [
      "🔧 Fast, responsive service",
      "💧 Honest, upfront pricing", 
      "🧰 24/7 emergency support",
      "🛠️ Fully insured and certified technicians"
    ],
    closingText: "[Your Plumbing Company Name] is more than just a service — we're a team of local experts who care about our community and the people in it.",
    image: "/images/template6-about-plumber.jpg"
  },
  featuredProjects: {
    sectionLabel: "Featured Projects",
    title: "Our Latest updates",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper placerat metus. Cras venenatis mi non purus dictum, non tincidunt ligula varius.",
    projects: [
      {
        id: 1,
        title: "Water Line Repair",
        category: "Plumbing",
        image: "/images/template6-project1.jpg"
      },
      {
        id: 2,
        title: "Pipe Installation",
        category: "Plumbing", 
        image: "/images/template6-project2.jpg"
      }
    ]
  },
  testimonials: {
    sectionLabel: "Customer Review",
    title: "Our Partner & Customer Was Give The Best Review For Us",
    testimonialList: [
      {
        id: 1,
        name: "Alex - Home Owner",
        review: "Lorem ipsum dolor sit amet consectetur. Eget non auctor laoreet mauris id proin tincidunt tristique nam. Amet luctus vel tincidunt vulputate et purus feugiat. Risus nunc semper ornare natoque egestas lectus ultricies leo vulputate. Mattis purus ultricies dolor eleifend neque tellus. Ut mattis sit gravida ornare duis eget. Amet volutpat interdum elementum magna euismod nullam et et tellus.",
        avatar: "/images/template6-customer.jpg",
        rating: 5
      }
    ]
  },
  faq: {
    sectionLabel: "FAQ's",
    title: "Frequently Asked Questions",
    questions: [
      {
        id: 1,
        question: "What plumbing services do you offer?",
        answer: null,
        isExpanded: false
      },
      {
        id: 2,
        question: "Do you offer emergency plumbing services?",
        answer: null,
        isExpanded: false
      },
      {
        id: 3,
        question: "How can I prevent clogged drains?",
        answer: null,
        isExpanded: false
      },
      {
        id: 4,
        question: "Why is my water pressure low?",
        answer: null,
        isExpanded: false
      }
    ]
  },
  contactInfo: {
    title: "Contact us to get a quotation.",
    ctaText: "Contact Us",
    details: {
      address: "3249 Henery Street, Kansas",
      email: "info@template.com",
      phone: "+ (100) 234-5678",
      hours: {
        weekdays: "Monday- Saturday : 10:00am to 07:00pm.",
        sunday: "SUNDAY : CLOSED"
      }
    },
    navigation: {
      title: "Navigation",
      links: ["Home", "Service", "About Usa", "Blog", "FAQ's"]
    },
    services: {
      title: "Our Services",
      links: [
        "Plumbing Installation",
        "Plumbing Maintenance", 
        "Plumbing Line Consultation",
        "General Plumbing",
        "Drain Cleaning"
      ]
    },
    newsletter: {
      title: "Newsletter",
      description: "Get the latest tips and tricks, updates, offers and discount right into your mailbox.",
      placeholder: "Your Email",
      buttonText: "Subscribe Now"
    }
  },
  footer: {
    socialMedia: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      whatsapp: "#"
    },
    copyright: {
      text: "© Copyright 2025 by Visibeen. Designed & Developed by Visibeen.",
      links: ["Privacy & Police", "Terms & Conditions"]
    }
  }
};