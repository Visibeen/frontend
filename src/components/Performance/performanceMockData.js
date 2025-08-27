// Mock data for performance dashboard

import { MetricType, TrendDirection, TimeRange, CompetitorRank, SocialMediaPresence, ReviewFrequency, PhotoType } from './enums';

// Data for global state store
export const mockStore = {
  selectedTimeRange: 'LAST_MONTH',
  selectedCampaign: 'Campaign 1',
  isLoading: false
};

// Data returned by API queries  
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
    currentRank: 14,
    totalPositions: 20,
    improvement: 2,
    description: 'You are in 3-pack more'
  },
  taskCompletion: {
    completedPercentage: 80,
    tasks: [
      { name: 'Lorem ipsum', completed: 8, total: 9 },
      { name: 'Lorem ipsum', completed: 6, total: 9 },
      { name: 'Lorem ipsum', completed: 8, total: 9 }
    ]
  },
  geoRankData: [
    { month: 'Jan 2025', value: 10 },
    { month: 'Feb 2025', value: 15 },
    { month: 'March 2025', value: 25 },
    { month: 'April 2025', value: 35 },
    { month: 'May 2025', value: 65 }
  ],
  keywordsData: [
    {
      searchTerm: 'Best dentist for kids',
      searchVolume: 1400,
      searchVolumeChange: 18,
      clientRanking: 'Not ranked',
      competitorRanking: '#3 SmileCare'
    },
    {
      searchTerm: 'Teeth whitening offers', 
      searchVolume: 3400,
      searchVolumeChange: 18,
      clientRanking: '#11',
      competitorRanking: '#4 White Smile'
    },
    {
      searchTerm: 'Child-Friendly Dental Care',
      searchVolume: 2300,
      searchVolumeChange: -12,
      clientRanking: '#2', 
      competitorRanking: '#4 WhiteSmiles'
    },
    {
      searchTerm: 'Gentle Dentist for Kids',
      searchVolume: 2700,
      searchVolumeChange: 18,
      clientRanking: '#8',
      competitorRanking: '#4 WhiteSmiles'
    },
    {
      searchTerm: 'Pediatric Dentist Near Me',
      searchVolume: 1400,
      searchVolumeChange: -8,
      clientRanking: '#5',
      competitorRanking: '#1 White Smile'
    }
  ],
  photoEngagementData: [
    {
      photoType: 'Exterior',
      views: 1400,
      competitorAComparison: -28,
      competitorBComparison: 20
    },
    {
      photoType: 'Interior',
      views: 894,
      competitorAComparison: 12,
      competitorBComparison: -12
    },
    {
      photoType: 'Post view',
      views: 94,
      competitorAComparison: 24,
      competitorBComparison: -30
    },
    {
      photoType: 'Offer view',
      views: 924,
      competitorAComparison: 25,
      competitorBComparison: 12
    },
    {
      photoType: 'Total Photo Views',
      views: 254,
      competitorAComparison: 25,
      competitorBComparison: 12
    }
  ],
  competitorSummary: [
    {
      metric: 'Profile Optomization score',
      yourBusiness: 280,
      competitorA: 288,
      competitorB: 250,
      competitorC: 230
    },
    {
      metric: 'Booster score',
      yourBusiness: 122,
      competitorA: 232,
      competitorB: 112,
      competitorC: 321
    },
    {
      metric: 'GBP Rating',
      yourBusiness: 4.5,
      competitorA: 5.0,
      competitorB: 4.0,
      competitorC: 3.5
    },
    {
      metric: 'Offer view',
      yourBusiness: 256,
      competitorA: 924,
      competitorB: 256,
      competitorC: 232
    },
    {
      metric: 'Local Keywords Ranking in Top 3',
      yourBusiness: 12,
      competitorA: 23,
      competitorB: 65,
      competitorC: 12
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
      yourBusiness: 34,
      competitorA: 55,
      competitorB: 23,
      competitorC: 77
    },
    {
      metric: 'Referring Domains',
      yourBusiness: 25,
      competitorA: 22,
      competitorB: 11,
      competitorC: 12
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

// Data passed as props to the root component
export const mockRootProps = {
  currentBusinessId: 'business_123',
  selectedTimeRange: 'LAST_MONTH'
};