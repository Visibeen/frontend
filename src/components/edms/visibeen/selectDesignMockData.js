// Data passed as props to the root component
export const mockRootProps = {
  accountInfo: {
    businessName: "E2E Digitech Pvt Ltd",
    contact: "+91 1234567890", 
    website: "www.e2edigitechpvtltd.com",
    address: "23 Maplewood Lane, IL 62704, USA",
    name: "John Doe",
    email: "john@e2edigitechpvtltd.com",
    altContact: "+91 9876543210"
  },
  designs: [
    {
      id: 1,
      title: "Plot on Sale",
      imageUrl: "/images/plot-on-sale-template.png"
    },
    {
      id: 2, 
      title: "Design 2",
      imageUrl: "/images/design-template-2.png"
    },
    {
      id: 3,
      title: "Design 3", 
      imageUrl: "/images/design-template5.png"
    },
    {
      id: 4,
      title: "Design 4",
      imageUrl: "/images/design-template-1.png"
    },
    {
      id: 5,
      title: "Design 5",
      imageUrl: "/images/design-template-3.png"
    },
    {
      id: 6,
      title: "Design 6",
      imageUrl: "/images/design-template6.png"
    }
  ]
};

// Export mockDesignTemplates for DesignTemplateGrid
export const mockDesignTemplates = mockRootProps.designs;

// Export mockFooterLinks for FooterSection
export const mockFooterLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" }
];