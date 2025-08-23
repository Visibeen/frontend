import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Stack, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import GMBService from '../../services/GMBService';
import { useAppContext } from '../../contexts/AppContext';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const MetricsGrid = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0'
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px',
  fontFamily: 'Inter, sans-serif'
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: '#0B91D6',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const MetricDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const Performance = () => {
  const { state } = useAppContext();
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, ensure we have proper GMB authentication
        console.log('[Performance] Checking GMB authentication...');
        
        // Try to get a fresh access token
        let accessToken;
        try {
          accessToken = await GMBService.getGoogleToken();
          console.log('[Performance] Got access token:', !!accessToken);
        } catch (authError) {
          console.error('[Performance] Authentication failed:', authError);
          throw new Error('GMB authentication required. Please re-authenticate with Google My Business to access performance data.');
        }

        // Get location data from context or state
        const targetLocation = state.selectedLocation || state.locationData || state.businesses?.[0];
        
        if (!targetLocation) {
          throw new Error('No business location found. Please select a business first.');
        }

        console.log('[Performance] Target location:', targetLocation);

        // Extract location ID - try multiple formats
        let locationId = targetLocation.place_id || targetLocation.id || targetLocation.locationId;
        
        // Try extracting from GMB location name format (accounts/123/locations/456)
        if (!locationId && targetLocation.name && targetLocation.name.includes('locations/')) {
          const parts = targetLocation.name.split('/');
          const locIndex = parts.indexOf('locations');
          if (locIndex !== -1 && parts[locIndex + 1]) {
            locationId = parts[locIndex + 1];
          }
        }

        // Try getting from business name if it contains location info
        if (!locationId && targetLocation.businessName) {
          console.log('[Performance] Trying to resolve location from business name:', targetLocation.businessName);
          // This would need additional logic to resolve business name to location ID
        }

        if (!locationId) {
          console.error('[Performance] No location ID found in:', targetLocation);
          throw new Error('Location ID not found. Please ensure your business is properly connected to GMB.');
        }

        console.log('[Performance] Using location ID:', locationId);

        // Fetch real performance metrics from GMB API with authentication
        const metrics = await GMBService.getPerformanceMetrics(accessToken, locationId);
        
        console.log('[Performance] Successfully fetched real GMB metrics:', metrics);
        
        if (!metrics || (metrics.localViews === 0 && metrics.callClicks === 0 && metrics.directionRequests === 0 && metrics.websiteClicks === 0)) {
          console.warn('[Performance] Received empty metrics, may indicate no data available for this period');
          setError('No performance data available for the selected time period. This may be normal for new businesses.');
        }
        
        setPerformanceData(metrics);

      } catch (err) {
        console.error('[Performance] Error fetching real performance data:', err);
        setError(`Failed to fetch real GMB data: ${err.message}`);
        setPerformanceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [state.selectedLocation, state.locationData, state.businesses]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num?.toLocaleString() || '0';
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change}% vs last month`;
  };

  const getMetrics = () => {
    if (!performanceData) return [];
    
    return [
      {
        title: 'Local Views (Last 30 days)',
        value: formatNumber(performanceData.localViews),
        description: formatChange(performanceData.localViewsChange),
        color: '#0B91D6',
        isPositive: performanceData.localViewsChange >= 0
      },
      {
        title: 'Calls from GBP (Last 30 days)',
        value: formatNumber(performanceData.callClicks),
        description: formatChange(performanceData.callClicksChange),
        color: '#10B981',
        isPositive: performanceData.callClicksChange >= 0
      },
      {
        title: 'Direction Requests (Last 30 days)',
        value: formatNumber(performanceData.directionRequests),
        description: formatChange(performanceData.directionRequestsChange),
        color: '#F59E0B',
        isPositive: performanceData.directionRequestsChange >= 0
      },
      {
        title: 'Website Clicks (Last 30 days)',
        value: formatNumber(performanceData.websiteClicks),
        description: formatChange(performanceData.websiteClicksChange),
        color: '#EF232A',
        isPositive: performanceData.websiteClicksChange >= 0
      }
    ];
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <PageHeader>
            <PageTitle>Performance</PageTitle>
            <PageSubtitle>Connecting to Google My Business API...</PageSubtitle>
          </PageHeader>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Authenticating and fetching real GMB performance data...
            </Typography>
          </Box>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (error && !performanceData) {
    return (
      <DashboardLayout>
        <PageContainer>
          <PageHeader>
            <PageTitle>Performance</PageTitle>
            <PageSubtitle>Real-time business performance metrics</PageSubtitle>
          </PageHeader>
          
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Unable to fetch real GMB data</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{error}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              To fix this 403 permission error:
            </Typography>
            <Typography variant="body2" component="div">
              <strong>1. Re-authenticate with proper scopes:</strong>
              <br />• Go to Dashboard and click "Connect Google My Business"
              <br />• Make sure to grant all requested permissions
              <br />• Use the Google account that owns/manages the business
              <br /><br />
              <strong>2. Verify business ownership:</strong>
              <br />• You must be the owner or manager of the business
              <br />• The business must be verified in Google My Business
              <br />• Performance data may take 24-48 hours to become available
              <br /><br />
              <strong>3. Check API configuration:</strong>
              <br />• Business Profile Performance API must be enabled
              <br />• Correct OAuth scopes must be configured
            </Typography>
          </Alert>

          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No performance data available
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Connect your GMB account to view real performance metrics
            </Typography>
          </Box>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Performance</PageTitle>
          <PageSubtitle>
            Real-time Google My Business performance metrics
          </PageSubtitle>
        </PageHeader>

        {error && performanceData && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        )}

        {performanceData && (
          <>
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2">
                ✅ Real GMB data successfully loaded from Google My Business API
              </Typography>
            </Alert>

            <MetricsGrid>
              {getMetrics().map((metric, index) => (
                <MetricCard key={index}>
                  <CardContent sx={{ padding: '24px' }}>
                    <MetricTitle>{metric.title}</MetricTitle>
                    <MetricValue sx={{ color: metric.color }}>
                      {metric.value}
                    </MetricValue>
                    <MetricDescription sx={{ 
                      color: metric.isPositive ? '#10B981' : '#EF4444',
                      fontWeight: 500
                    }}>
                      {metric.isPositive ? '↗' : '↘'} {metric.description}
                    </MetricDescription>
                  </CardContent>
                </MetricCard>
              ))}
            </MetricsGrid>
          </>
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default Performance;