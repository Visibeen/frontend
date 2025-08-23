// Centralized OAuth 2.0 configuration
// Reads from environment variables prefixed with REACT_APP_

const oauthConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '',
    projectId: process.env.REACT_APP_GMB_PROJECT_ID || '',
    apiKey: process.env.REACT_APP_GMB_API_KEY || '',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/businessprofileperformance',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  },
};

export default oauthConfig;
