import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
<<<<<<< HEAD
import PageHeader from './components/PageHeader';
import BusinessTable from './components/BusinessTable';

=======
import GMBService from '../../services/GMBService';
import PageHeader from './components/PageHeader';
import BusinessTable from './components/BusinessTable';

// .env-driven config
const envUseMockGmb = (process.env.REACT_APP_USE_MOCK_GMB || 'false') === 'true';
const envGoogleAccessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN || '';
const envBusinessName = process.env.REACT_APP_BUSINESS_NAME || 'E2E Networks Limited';
const envGoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
const envGoogleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '';
const envGmbApiKey = process.env.REACT_APP_GMB_API_KEY || '';
const envGmbProjectId = process.env.REACT_APP_GMB_PROJECT_ID || '';
const envUseLiveApi = (process.env.REACT_APP_USE_LIVE_API || 'true') === 'true';
const envDebugMode = (process.env.REACT_APP_DEBUG_MODE || 'false') === 'true';

>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: '16px'
}));

const NoBusinessesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: '16px',
  textAlign: 'center'
}));

const CreateBusinessButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
=======
  // Display current configuration when debug mode is enabled
  useEffect(() => {
    if (envDebugMode) {
      console.log('Dashboard Environment Configuration:', {
        useLiveApi: envUseLiveApi,
        useMockGmb: envUseMockGmb,
        hasGoogleClientId: !!envGoogleClientId,
        hasGoogleClientSecret: !!envGoogleClientSecret,
        hasGmbApiKey: !!envGmbApiKey,
        hasGmbProjectId: !!envGmbProjectId,
        businessName: envBusinessName,
        debugMode: envDebugMode
      });
    }
  }, []);

>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Allow providing a token via query param for dev: /dashboard?token=...
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
          sessionStorage.setItem('googleAccessToken', tokenFromUrl);
        }

<<<<<<< HEAD
        const accessToken = sessionStorage.getItem('googleAccessToken') || localStorage.getItem('googleAccessToken');
        if (!accessToken) {
          // Set mock data for demo purposes
          const mockBusinesses = [
            {
              id: '1',
              name: 'E2E Networks Limited',
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'verified',
              optimizationScore: '300/500',
              locationId: '1'
            },
            {
              id: '2',
              name: 'E2E Networks Limited',
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'unverified',
              optimizationScore: 'Pending',
              locationId: '2'
            },
            {
              id: '3',
              name: 'E2E Networks Limited',
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'suspended',
              optimizationScore: 'Check now',
              locationId: '3'
            }
          ];
          setBusinesses(mockBusinesses);
=======
        // Prefer .env token if provided
        const accessToken = envGoogleAccessToken || sessionStorage.getItem('googleAccessToken') || localStorage.getItem('googleAccessToken');
        
        // Check if we should use live API or fallback to mock
        if (!envUseLiveApi || !accessToken) {
          if (envDebugMode) {
            console.log('Using mock data - Live API disabled or no access token');
            console.log('Environment config:', {
              useLiveApi: envUseLiveApi,
              hasAccessToken: !!accessToken,
              useMockGmb: envUseMockGmb,
              businessName: envBusinessName
            });
          }
          
          // Set mock data for demo purposes - using realistic verification states
          const mockBusinesses = [
            {
              id: '1',
              name: envBusinessName,
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'unverified', // More realistic default
              optimizationScore: '300/500',
              locationId: '1',
              verificationState: 'UNVERIFIED'
            },
            {
              id: '2',
              name: envBusinessName,
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'pending_verification',
              optimizationScore: 'Pending',
              locationId: '2',
              verificationState: 'PENDING_VERIFICATION'
            },
            {
              id: '3',
              name: envBusinessName,
              address: '23 Maplewood Lane,IL 62704,USA',
              status: 'verified',
              optimizationScore: 'Check now',
              locationId: '3',
              verificationState: 'VERIFIED'
            }
          ];
          
          if (envUseMockGmb) {
            setBusinesses(mockBusinesses);
          } else {
            setBusinesses([]);
          }
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
          setLoading(false);
          return;
        }

<<<<<<< HEAD
        // 1) Get accounts from the correct endpoint
        const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const accountsJson = await accountsRes.json();
        if (!accountsRes.ok) {
          throw new Error(accountsJson?.error?.message || 'Failed to fetch accounts');
        }

        const accounts = accountsJson.accounts || [];
        if (accounts.length === 0) {
          setBusinesses([]);
          return;
        }

        // 2) Fetch locations for first account as an example
        const accountName = accounts[0].name; // e.g., accounts/123456789
        const locRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const locJson = await locRes.json();
        if (!locRes.ok) {
=======
        if (envDebugMode) {
          console.log('Using live GMB API with configuration:', {
            hasAccessToken: !!accessToken,
            hasClientId: !!envGoogleClientId,
            hasProjectId: !!envGmbProjectId,
            useLiveApi: envUseLiveApi
          });
          
          // Decode and show access token info (if it's a JWT)
          if (accessToken && accessToken.split('.').length === 3) {
            try {
              const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
              console.log('Access Token Info:', {
                iss: tokenPayload.iss,
                scope: tokenPayload.scope,
                aud: tokenPayload.aud,
                exp: new Date(tokenPayload.exp * 1000).toISOString()
              });
            } catch (e) {
              console.log('Could not decode token payload');
            }
          }
        }

        // Validate required configuration
        if (!envGmbProjectId) {
          throw new Error('GMB Project ID not configured. Please set REACT_APP_GMB_PROJECT_ID in your .env file.');
        }

        // 1) Get accounts directly via GMBService (frontend-only)
        const accounts = await GMBService.getAccounts(accessToken);
        if (accounts.length === 0) {
          if (envDebugMode) {
            console.log('No GMB accounts found');
          }
          setBusinesses([]);
          setLoading(false);
          return;
        }

        if (envDebugMode) {
          console.log('Found GMB accounts:', accounts.length);
          console.log('First account details:', accounts[0]);
        }

        // Validate account name format
        const firstAccount = accounts[0];
        if (!firstAccount.name || !firstAccount.name.startsWith('accounts/')) {
          throw new Error(`Invalid account format: ${firstAccount.name}. Expected format: accounts/{accountId}`);
        }

        // 2) Fetch locations for first account as an example
        const accountName = firstAccount.name; // e.g., accounts/112694470912208112675
        if (envDebugMode) {
          console.log('Fetching locations for account:', accountName);
          console.log('Full account object:', accounts[0]);
        }
        
        // Since we don't need location data, let's use the account information directly
        if (envDebugMode) {
          console.log('Skipping locations API call - using account data directly');
        }
        
        // Convert accounts to business format without calling locations API
        const normalized = accounts.map((account) => {
          // Map GMB verification states to our status format
          let mappedStatus = 'unverified'; // Default to unverified
          const verificationState = account.verificationState;
          
          if (verificationState === 'VERIFIED') {
            mappedStatus = 'verified';
          } else if (verificationState === 'PENDING_VERIFICATION' || verificationState === 'PENDING') {
            mappedStatus = 'pending_verification';
          } else if (verificationState === 'SUSPENDED') {
            mappedStatus = 'suspended';
          } else if (verificationState === 'UNVERIFIED' || !verificationState) {
            mappedStatus = 'unverified';
          }
          
          return {
            id: account.name?.split('/').pop(),
            name: account.accountName || envBusinessName,
            address: 'Account level - no location data',
            status: mappedStatus,
            optimizationScore: account.vettedState || 'N/A',
            locationId: account.name?.split('/').pop(),
            accountType: account.type || 'UNKNOWN',
            verificationState: account.verificationState || 'UNKNOWN',
            vettedState: account.vettedState || 'UNKNOWN'
          };
        });
        
        if (envDebugMode) {
          console.log('Converted accounts to business format:', normalized);
        }
        
        setBusinesses(normalized);
        setLoading(false);
        return;
        
        // Comment out the locations API call since we don't need it
        /*
        const locRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (envDebugMode) {
          console.log('Locations API response status:', locRes.status);
          console.log('Locations API URL:', `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`);
        }
        
        const locJson = await locRes.json();
        if (!locRes.ok) {
          if (envDebugMode) {
            console.error('Locations API Error Details:', {
              status: locRes.status,
              error: locJson?.error,
              accountName: accountName,
              fullUrl: `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`
            });
          }
          
          // Try alternative API endpoint if the first one fails
          if (locRes.status === 400 && locJson?.error?.code === 400) {
            if (envDebugMode) {
              console.log('Trying alternative GMB API endpoint...');
            }
            
            // Try the older GMB API endpoint
            const altLocRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
              headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
            });
            
            if (envDebugMode) {
              console.log('Alternative API response status:', altLocRes.status);
            }
            
            if (altLocRes.ok) {
              const altLocJson = await altLocRes.json();
              const locations = altLocJson.locations || [];
              if (envDebugMode) {
                console.log('Found GMB locations via alternative API:', locations.length);
              }
              
              // Normalize to existing table fields
              const normalized = locations.map((loc) => ({
                id: loc.name?.split('/').pop(),
                name: loc.title || envBusinessName,
                address: loc.storefrontAddress?.addressLines?.join(', ') || 'Address not available',
                status: loc.metadata?.verification?.status || 'verified',
                optimizationScore: 'N/A',
                locationId: loc.name?.split('/').pop(),
              }));
              
              setBusinesses(normalized);
              setLoading(false);
              return;
            }
          }
          
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
          throw new Error(locJson?.error?.message || 'Failed to fetch locations');
        }

        const locations = locJson.locations || [];
<<<<<<< HEAD
        // Normalize to existing table fields
        const normalized = locations.map((loc) => ({
          id: loc.name?.split('/').pop(),
          name: loc.title,
          address: loc.storefrontAddress?.addressLines?.join(', '),
=======
        if (envDebugMode) {
          console.log('Found GMB locations:', locations.length);
        }
        
        // Normalize to existing table fields
        const normalized = locations.map((loc) => ({
          id: loc.name?.split('/').pop(),
          name: loc.title || envBusinessName,
          address: loc.storefrontAddress?.addressLines?.join(', ') || 'Address not available',
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
          status: loc.metadata?.verification?.status || 'verified',
          optimizationScore: 'N/A',
          locationId: loc.name?.split('/').pop(),
        }));

        setBusinesses(normalized);
<<<<<<< HEAD
=======
        */
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
    // we want to re-run if query string changes (token passed)
  }, [location.search]);

  if (loading) {
    return (
      <DashboardLayout>
        <PageHeader 
          title="Businesses" 
          subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development." 
        />
        <LoadingContainer>
          <CircularProgress size={40} sx={{ color: '#0B91D6' }} />
          <Typography variant="body1" color="textSecondary">
<<<<<<< HEAD
            Loading businesses...
=======
            Loading GMB accounts...
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
          </Typography>
        </LoadingContainer>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <PageHeader 
          title="Businesses" 
          subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development." 
        />
        <Alert severity="error" sx={{ marginBottom: '24px' }}>
<<<<<<< HEAD
          Error loading businesses: {error}
=======
          Error loading GMB accounts: {error}
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ backgroundColor: '#0B91D6' }}
        >
          Retry
        </Button>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader 
<<<<<<< HEAD
        title="Businesses" 
        subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development." 
      />
      {businesses.length === 0 ? (
        <NoBusinessesContainer>
          <Typography variant="h6" color="textSecondary">
            No businesses found. Create your first business profile.
          </Typography>
          <CreateBusinessButton onClick={() => navigate('/create-account')}>
            Create Business
=======
        title="GMB Accounts" 
        subtitle="Google My Business accounts and their verification status. No location data required." 
      />
      
      {/* Configuration Status (only shown in debug mode) */}
      
    
      
      {businesses.length === 0 ? (
        <NoBusinessesContainer>
          <Typography variant="h6" color="textSecondary">
            No GMB accounts found. Create your first Google My Business account.
          </Typography>
          <CreateBusinessButton onClick={() => navigate('/create-account')}>
            Create GMB Account
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
          </CreateBusinessButton>
        </NoBusinessesContainer>
      ) : (
        <BusinessTable businesses={businesses} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;