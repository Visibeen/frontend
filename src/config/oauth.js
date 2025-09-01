// Centralized OAuth 2.0 configuration
// Reads from environment variables prefixed with REACT_APP_

const oauthConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '',
    projectId: process.env.REACT_APP_GMB_PROJECT_ID || '',
    apiKey: process.env.REACT_APP_GMB_API_KEY || '',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback`,
    scopes: [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/businessprofileperformance',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    // OAuth2 flow parameters
    params: {
      response_type: 'code',
      access_type: 'offline', // Request refresh token
      prompt: 'consent',      // Force consent screen to ensure refresh token
      include_granted_scopes: true
    }
  },
};

export default oauthConfig;
