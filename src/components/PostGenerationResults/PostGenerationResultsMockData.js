// Mock data for the Post Generation Results page

export const mockRootProps = {
  templatePreviews: [
    {
      id: 'template-1',
      thumbnail: '/images/template-preview.svg',
      selected: true,
      style: {
        background: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
        primaryColor: '#4CAF50',
        secondaryColor: '#1B5E20'
      }
    },
    {
      id: 'template-2', 
      thumbnail: '/images/template-preview.svg',
      selected: false,
      style: {
        background: 'linear-gradient(135deg, #1565C0 0%, #2196F3 100%)',
        primaryColor: '#2196F3',
        secondaryColor: '#1565C0'
      }
    },
    {
      id: 'template-3',
      thumbnail: '/images/template-preview.svg', 
      selected: false,
      style: {
        background: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)',
        primaryColor: '#FF9800',
        secondaryColor: '#E65100'
      }
    },
    {
      id: 'template-4',
      thumbnail: '/images/template-preview.svg',
      selected: false,
      style: {
        background: 'linear-gradient(135deg, #7B1FA2 0%, #9C27B0 100%)',
        primaryColor: '#9C27B0',
        secondaryColor: '#7B1FA2'
      }
    }
  ],
  generatedPost: {
    title: "Our Client",
    subtitle: "Best Feedback",
    userProfile: {
      name: "Dr. Amy Grantt",
      title: "Sr. Creative Head",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    testimonialText: "Consectetur adipiscing elit, sed diam nonummy nibh euismod tempor incididunt ut labore et dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea com.",
    rating: 5,
    ctaText: "Learn More"
  },
  sharingOptions: [
    { platform: 'email', label: 'Email' },
    { platform: 'facebook', label: 'Facebook' },
    { platform: 'whatsapp', label: 'Whats app' },
    { platform: 'instagram', label: 'Instagram' },
    { platform: 'copy_link', label: 'Copy link' }
  ]
};