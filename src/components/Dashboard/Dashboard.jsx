import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import PageHeader from './components/PageHeader';
import BusinessTable from './components/BusinessTable';

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

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Allow providing a token via query param for dev: /dashboard?token=...
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
          sessionStorage.setItem('googleAccessToken', tokenFromUrl);
        }

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
          setLoading(false);
          return;
        }

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
          throw new Error(locJson?.error?.message || 'Failed to fetch locations');
        }

        const locations = locJson.locations || [];
        // Normalize to existing table fields
        const normalized = locations.map((loc) => ({
          id: loc.name?.split('/').pop(),
          name: loc.title,
          address: loc.storefrontAddress?.addressLines?.join(', '),
          status: loc.metadata?.verification?.status || 'verified',
          optimizationScore: 'N/A',
          locationId: loc.name?.split('/').pop(),
        }));

        setBusinesses(normalized);
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
            Loading businesses...
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
          Error loading businesses: {error}
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
        subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development." 
      />
      {businesses.length === 0 ? (
        <NoBusinessesContainer>
          <Typography variant="h6" color="textSecondary">
            No businesses found. Create your first business profile.
          </Typography>
          <CreateBusinessButton onClick={() => navigate('/create-account')}>
            Create Business
          </CreateBusinessButton>
        </NoBusinessesContainer>
      ) : (
        <BusinessTable businesses={businesses} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;