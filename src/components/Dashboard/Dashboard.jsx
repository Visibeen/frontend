import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import GMBService from '../../services/GMBService';
import tokenManager from '../../auth/TokenManager';

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

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Allow providing a token via query param for dev: /dashboard?token=...
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
          try {
            sessionStorage.setItem('googleAccessToken', tokenFromUrl);
            localStorage.setItem('googleAccessToken', tokenFromUrl);
          } catch (_) {}
          tokenManager.set('google', { access_token: tokenFromUrl, token_type: 'Bearer' });
        }
        // If an env token is provided, seed TokenManager for convenience
        if (envGoogleAccessToken) {
          tokenManager.set('google', { access_token: envGoogleAccessToken, token_type: 'Bearer' });
        }

        // Check if we should use live API or fallback to mock
        if (!envUseLiveApi) {
          if (envDebugMode) {
            console.log('Using mock data - Live API disabled');
            console.log('Environment config:', {
              useLiveApi: envUseLiveApi,
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
              optimizationScore: '300/300',
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
          setLoading(false);
          return;
        }

        if (envDebugMode) {
          console.log('Using live GMB API with configuration:', {
            hasClientId: !!envGoogleClientId,
            hasProjectId: !!envGmbProjectId,
            useLiveApi: envUseLiveApi
          });
        }

        // Validate required configuration
        if (!envGmbProjectId) {
          throw new Error('GMB Project ID not configured. Please set REACT_APP_GMB_PROJECT_ID in your .env file.');
        }

        // 1) Get accounts via GMBService; TokenManager will inject/refresh token
        const accounts = await GMBService.getAccounts();

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

        // 2) Fetch locations for ALL accounts and show them as profiles on the dashboard
        const accessToken = tokenManager.get('google')?.access_token;
        const allLocations = [];
        for (const acct of accounts) {
          try {
            if (!acct?.name) continue;
            if (envDebugMode) console.log('Fetching locations for account:', acct.name);
            const locs = await GMBService.getLocations(accessToken, acct.name);
            if (Array.isArray(locs) && locs.length) {
              // Attach account context to each location
              locs.forEach(l => allLocations.push({ account: acct, loc: l }));
            }
          } catch (e) {
            console.warn('Failed to fetch locations for account', acct?.name, e?.message || e);
          }
        }

        if (envDebugMode) {
          console.log('Total locations found across accounts:', allLocations.length);
        }

        if (allLocations.length === 0) {
          // Fallback: present accounts as rows if no locations are returned
          const fallback = accounts.map((account) => {
            let mappedStatus = 'unverified';
            const verificationState = account.verificationState;
            if (verificationState === 'VERIFIED') mappedStatus = 'verified';
            else if (verificationState === 'PENDING_VERIFICATION' || verificationState === 'PENDING') mappedStatus = 'pending_verification';
            else if (verificationState === 'SUSPENDED') mappedStatus = 'suspended';
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
          setBusinesses(fallback);
          setLoading(false);
          return;
        }

        // Normalize locations to BusinessTable shape
        const normalized = allLocations.map(({ account, loc }) => {
          const id = loc.name?.split('/').pop();
          const address = loc.storefrontAddress?.addressLines?.join(', ') ||
                          loc.storefrontAddress?.locality ||
                          loc.storefrontAddress?.administrativeArea ||
                          'Address not available';
          const ver = loc.metadata?.verification?.status || account?.verificationState || 'UNKNOWN';
          let mappedStatus = 'unverified';
          if (ver === 'VERIFIED') mappedStatus = 'verified';
          else if (ver === 'PENDING_VERIFICATION' || ver === 'PENDING') mappedStatus = 'pending_verification';
          else if (ver === 'SUSPENDED') mappedStatus = 'suspended';
          return {
            id,
            name: loc.title || account?.accountName || envBusinessName,
            address,
            status: mappedStatus,
            optimizationScore: 'N/A',
            locationId: id,
            accountType: account?.type || 'UNKNOWN',
            verificationState: ver,
            vettedState: account?.vettedState || 'UNKNOWN'
          };
        });

        // If user has three profiles, they will appear; otherwise show all found
        setBusinesses(normalized);
        setLoading(false);
        return;
        
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
            Loading GMB accounts...
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
          Error loading GMB accounts: {error}
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
        title="Businesses" 
        subtitle="All Google Business Profile locations across your connected accounts." 
      />
      
      {/* Configuration Status (only shown in debug mode) */}
      
    
      
      {businesses.length === 0 ? (
        <NoBusinessesContainer>
          <Typography variant="h6" color="textSecondary">
            No GMB accounts found. Create your first Google My Business account.
          </Typography>
          <CreateBusinessButton onClick={() => navigate('/create-account')}>
            Create GMB Account
          </CreateBusinessButton>
        </NoBusinessesContainer>
      ) : (
        <BusinessTable businesses={businesses} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;