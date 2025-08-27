// Mock data for performance dashboard

export const mockStore = {
  selectedTimeRange: 'monthly',
  selectedLocation: {
    id: 'location-1',
    name: 'Dental Care Center',
    address: '123 Main St, City, State'
  }
};

export const mockQuery = {
  performanceMetrics: {
    localViews: 2300,
    localViewsChange: 35,
    callsFromGBP: 221,
    callsFromGBPChange: 15,
    directionRequests: 12,
    directionRequestsChange: 5,
    websiteClicks: 2300,
    websiteClicksChange: 5,
    newReviews: 2300,
    newReviewsChange: 5,
    organicClicks: 2340,
    organicClicksChange: 18,
    avgSearchVolume: 340,
    avgSearchVolumeChange: -8
  },
  localPackData: {
    appearances: 14,
    totalPossible: 20,
    change: 2,
    description: 'You are in 3-pack more'
  },
  taskCompletion: {
    percentage: 80,
    tasks: [
      { name: 'Lorem ipsum', completed: 8, total: 9 },
      { name: 'Lorem ipsum', completed: 6, total: 9 },
      { name: 'Lorem ipsum', completed: 8, total: 9 }
    ]
  },
  chartData: {
    months: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    goodRank: [15, 18, 22, 35, 45, 60],
    poorRank: [10, 8, 12, 18, 25, 15],
    averageRank: [20, 15, 25, 30, 35, 45]
  },
  keywordsData: [
    {
      searchTerm: 'Best dentist for kids',
      searchVolume: 1400,
      searchVolumeChange: 18,
      clientRanking: 'Not ranked',
      competitorRanking: '#3  SmileCare'
    },
    {
      searchTerm: 'Teeth whitening offers',
      searchVolume: 3400,
      searchVolumeChange: 18,
      clientRanking: '#11',
      competitorRanking: '#4  White Smile'
    },
    {
      searchTerm: 'Child-Friendly Dental Care',
      searchVolume: 2300,
      searchVolumeChange: -12,
      clientRanking: '#2',
      competitorRanking: '#4  WhiteSmiles'
    },
    {
      searchTerm: 'Gentle Dentist for Kids',
      searchVolume: 2700,
      searchVolumeChange: 18,
      clientRanking: '#8',
      competitorRanking: '#4  WhiteSmiles'
    },
    {
      searchTerm: 'Pediatric Dentist Near Me',
      searchVolume: 1400,
      searchVolumeChange: -8,
      clientRanking: '#5',
      competitorRanking: '#1   White Smile'
    }
  ],
  photoEngagementData: [
    {
      photoType: 'Exterior',
      views: 1400,
      competitorA: -28,
      competitorB: 20
    },
    {
      photoType: 'Interior',
      views: 894,
      competitorA: 12,
      competitorB: -12
    },
    {
      photoType: 'Post view',
      views: 94,
      competitorA: 24,
      competitorB: -30
    },
    {
      photoType: 'Offer view',
      views: 924,
      competitorA: 25,
      competitorB: 12
    },
    {
      photoType: 'Total Photo Views',
      views: 254,
      competitorA: 25,
      competitorB: 12
    }
  ],
  competitorData: [
    {
      metric: 'Profile Optomization score',
      yourBusiness: '280',
      competitorA: '288',
      competitorB: '250',
      competitorC: '230'
    },
    {
      metric: 'Booster score',
      yourBusiness: '122',
      competitorA: '232',
      competitorB: '112',
      competitorC: '321'
    },
    {
      metric: 'GBP Rating',
      yourBusiness: '4.5',
      competitorA: '5.0',
      competitorB: '4.0',
      competitorC: '3.5'
    },
    {
      metric: 'Offer view',
      yourBusiness: '256',
      competitorA: '924',
      competitorB: '256',
      competitorC: '232'
    },
    {
      metric: 'Local Keywords Ranking in Top 3',
      yourBusiness: '12',
      competitorA: '23',
      competitorB: '65',
      competitorC: '12'
    },
    {
      metric: 'NAP Consistency',
      yourBusiness: '25%',
      competitorA: '56%',
      competitorB: '25%',
      competitorC: '12%'
    },
    {
      metric: 'Featured in Local Pack',
      yourBusiness: '16/20',
      competitorA: '11/20',
      competitorB: '14/20',
      competitorC: '16/20'
    },
    {
      metric: 'Backlinks',
      yourBusiness: '34',
      competitorA: '55',
      competitorB: '23',
      competitorC: '77'
    },
    {
      metric: 'Referring Domains',
      yourBusiness: '25',
      competitorA: '22',
      competitorB: '11',
      competitorC: '12'
    },
    {
      metric: 'Citations Present',
      yourBusiness: '18/25',
      competitorA: '11/25',
      competitorB: '24/25',
      competitorC: '22/25'
    },
    {
      metric: 'Social Media Presence',
      yourBusiness: 'Moderate',
      competitorA: 'Active',
      competitorB: 'Weak',
      competitorC: 'Active'
    },
    {
      metric: 'Featured in Local Pack',
      yourBusiness: 'Sometimes',
      competitorA: 'Always',
      competitorB: 'Frequently',
      competitorC: 'Frequently'
    },
    {
      metric: 'Review Velocity',
      yourBusiness: '2/month',
      competitorA: '3/month',
      competitorB: '4/month',
      competitorC: '6/month'
    }
  ]
};

export const mockRootProps = {
  selectedTimeRange: 'monthly',
  onTimeRangeChange: (range) => console.log('Time range changed:', range),
  onExportToPDF: () => console.log('Export to PDF clicked'),
  onViewGridData: () => console.log('View grid data clicked'),
  onGetTopKeywords: () => console.log('Get top 10 keywords clicked'),
  onAddCampaign: () => console.log('Add campaign clicked')
};