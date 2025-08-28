import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GMBService from '../../services/GMBService';
import { useAppContext } from '../../contexts/AppContext';
import tokenManager from '../../auth/TokenManager';
import PerformanceDashboard from './PerformanceDashboard';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '24px'
}));

const ProfileControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid #e5e7eb'
}));

const ProfileInfoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}));

const ProfileIndicator = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#0B91D6'
}));

const ProfileSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 300,
  '& .MuiSelect-select': {
    paddingTop: '10px',
    paddingBottom: '10px'
  }
}));

const SwitchProfileButton = styled(Button)(({ theme }) => ({
  color: '#121927',
  backgroundColor: 'transparent',
  border: '1px solid #e5e7eb',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: '8px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    borderColor: '#d1d5db'
  },
  '&:disabled': {
    opacity: 0.6
  }
}));

const Performance = () => {
  const { state, actions } = useAppContext();
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false); // Changed from true to false
  const [error, setError] = useState(null);
  
  // Profile management state
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Add a ref to track if performance fetch is in progress
  const [isFetchingPerformance, setIsFetchingPerformance] = useState(false);
  
  console.log('[Performance] Component render:', {
    currentProfile: currentProfile?.name,
    profilesLoading,
    loading,
    isFetchingPerformance,
    availableProfiles: availableProfiles.length
  });
  
  // Load available profiles on component mount
  useEffect(() => {
    const loadAvailableProfiles = async () => {
      try {
        setProfilesLoading(true);
        
        // First try to get profiles from localStorage (cached from Dashboard)
        const cachedProfiles = localStorage.getItem('availableGMBProfiles');
        if (cachedProfiles) {
          try {
            const profiles = JSON.parse(cachedProfiles);
            if (Array.isArray(profiles) && profiles.length > 0) {
              console.log('[Performance] Using cached GMB profiles:', profiles.length);
              setAvailableProfiles(profiles);
              
              // Auto-select first profile
              const firstProfile = profiles[0];
              setSelectedProfileId(firstProfile.id);
              setCurrentProfile(firstProfile);
              
              setProfilesLoading(false);
              return; // Exit early with cached data
            }
          } catch (e) {
            console.warn('[Performance] Failed to parse cached profiles:', e);
          }
        }
        
        // If no cached data, try to get existing token without popup
        let accessToken;
        try {
          // Try to get existing token from storage first
          accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
          
          if (!accessToken) {
            // Try TokenManager without triggering new auth
            const tokenData = tokenManager.get('google');
            accessToken = tokenData?.access_token;
          }
          
          if (!accessToken) {
            throw new Error('No existing Google access token found. Please visit Dashboard first to connect your Google My Business account.');
          }
          
          console.log('[Performance] Using existing access token');
        } catch (authError) {
          console.error('[Performance] No existing authentication found:', authError);
          throw new Error('Please visit the Dashboard page first to connect your Google My Business account.');
        }

        // Get accounts using existing token (no popup)
        const accounts = await GMBService.getAccounts(accessToken);
        
        if (accounts.length === 0) {
          throw new Error('No GMB accounts found. Please ensure your Google account has access to Google My Business profiles.');
        }
        
        // Get all locations for all accounts
        const allLocations = [];
        for (const acct of accounts) {
          try {
            if (!acct?.name) continue;
            const locs = await GMBService.getLocations(accessToken, acct.name);
            if (Array.isArray(locs) && locs.length) {
              locs.forEach(l => allLocations.push({ account: acct, loc: l }));
            }
          } catch (e) {
            console.warn('Failed to fetch locations for account', acct?.name, e?.message || e);
          }
        }
        
        if (allLocations.length === 0) {
          throw new Error('No business locations found. Please ensure your Google My Business account has verified business locations.');
        }
        
        // Format profiles for selector (same format as BusinessProfile and ReputationBenchmarking)
        const profiles = allLocations.map(({ account, loc }) => ({
          id: loc.name?.split('/').pop(),
          name: loc.title || loc.locationName || 'Unnamed Location',
          address: loc.storefrontAddress ? 
            `${loc.storefrontAddress.addressLines?.join(', ') || ''}, ${loc.storefrontAddress.locality || ''}, ${loc.storefrontAddress.administrativeArea || ''}`.trim() :
            'Address not available',
          locationId: loc.name?.split('/').pop(),
          accountName: account.accountName || 'Business Account',
          verificationState: account.verificationState || 'UNKNOWN',
          // Store full objects for performance data fetching
          locationData: loc,
          accountData: account,
          fullLocationName: loc.name // Store full GMB location name format
        }));
        
        // Cache profiles for future use
        localStorage.setItem('availableGMBProfiles', JSON.stringify(profiles));
        
        setAvailableProfiles(profiles);
        
        // Auto-select first profile if available
        if (profiles.length > 0) {
          const firstProfile = profiles[0];
          setSelectedProfileId(firstProfile.id);
          setCurrentProfile(firstProfile);
        }
        
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError('Failed to load business profiles: ' + (err.message || 'Unknown error') + '\n\nPlease visit the Dashboard page first to connect your Google My Business account.');
      } finally {
        setProfilesLoading(false);
      }
    };
    
    loadAvailableProfiles();
  }, []); // Empty dependency array - only run once on mount
  
  // Handle profile change
  const handleProfileChange = useCallback((event) => {
    const selectedId = event.target.value;
    const selectedProfile = availableProfiles.find(p => p.id === selectedId);
    
    if (selectedProfile && selectedProfile.id !== currentProfile?.id) {
      console.log('[Performance] Switching profile from', currentProfile?.name, 'to', selectedProfile.name);
      setSelectedProfileId(selectedId);
      setCurrentProfile(selectedProfile);
      // Clear current performance data to show loading
      setPerformanceData(null);
      setError(null);
      
      // Note: Removed actions.setSelectedLocation to avoid triggering context updates
      // that could cause excessive re-renders in other components
    }
  }, [availableProfiles, currentProfile?.id, currentProfile?.name]);
  
  // Navigate to business profile page for current profile
  const handleViewBusinessProfile = useCallback(() => {
    if (currentProfile) {
      navigate(`/business-profile?id=${currentProfile.locationId}`);
    }
  }, [currentProfile, navigate]);

  useEffect(() => {
    // Only fetch performance data if we have a current profile and profiles are loaded
    if (!currentProfile || profilesLoading || isFetchingPerformance) {
      console.log('[Performance] Skipping fetch:', { currentProfile: !!currentProfile, profilesLoading, isFetchingPerformance });
      return;
    }
    
    const fetchPerformanceData = async () => {
      try {
        console.log('[Performance] Starting performance fetch for:', currentProfile.name);
        setIsFetchingPerformance(true);
        setLoading(true);
        setError(null);

        console.log('[Performance] Fetching performance data for profile:', currentProfile.name);
        
        // Get existing access token without triggering popup
        let accessToken;
        try {
          // Try to get existing token from storage first
          accessToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
          
          if (!accessToken) {
            // Try TokenManager without triggering new auth
            const tokenData = tokenManager.get('google');
            accessToken = tokenData?.access_token;
          }
          
          if (!accessToken) {
            throw new Error('No Google access token found. Please visit Dashboard to reconnect your account.');
          }
          
          console.log('[Performance] Using existing access token for performance data');
        } catch (authError) {
          console.error('[Performance] Authentication token not available:', authError);
          throw new Error('Google authentication required. Please visit the Dashboard page to connect your Google My Business account.');
        }

        // Use the selected profile's location data
        const locationId = currentProfile.locationId;
        
        if (!locationId) {
          throw new Error('Location ID not found for selected profile.');
        }

        console.log('[Performance] Using location ID:', locationId);
        console.log('[Performance] Profile details:', {
          name: currentProfile.name,
          address: currentProfile.address,
          locationId,
          accountName: currentProfile.accountName
        });

        // Fetch real performance metrics from GMB API with existing authentication
        const metrics = await GMBService.getPerformanceMetrics(accessToken, locationId);
        
        console.log('[Performance] Successfully fetched real GMB metrics:', metrics);
        
        if (!metrics || (metrics.localViews === 0 && metrics.callClicks === 0 && metrics.directionRequests === 0 && metrics.websiteClicks === 0)) {
          console.warn('[Performance] Received empty metrics, may indicate no data available for this period');
          setError(`No performance data available for ${currentProfile.name} in the selected time period. This may be normal for new businesses.`);
        }
        
        setPerformanceData(metrics);

      } catch (err) {
        console.error('[Performance] Error fetching real performance data:', err);
        if (err.message.includes('401') || err.message.includes('authentication') || err.message.includes('token')) {
          setError(`Authentication expired for ${currentProfile?.name || 'selected profile'}. Please visit the Dashboard page to reconnect your Google My Business account.`);
        } else {
          setError(`Failed to fetch performance data for ${currentProfile?.name || 'selected profile'}: ${err.message}`);
        }
        setPerformanceData(null);
      } finally {
        setLoading(false);
        setIsFetchingPerformance(false);
        console.log('[Performance] Performance fetch completed');
      }
    };

    fetchPerformanceData();
  }, [currentProfile?.locationId]); // Only depend on locationId to avoid unnecessary re-fetches

  // Transform real performance data to match the new UI component structure
  const transformedPerformanceData = useMemo(() => {
    if (!performanceData) return null;
    
    return {
      performanceMetrics: {
        localViews: performanceData.localViews || 0,
        localViewsChange: performanceData.localViewsChange || 0,
        callsFromGBP: performanceData.callClicks || 0,
        callsFromGBPChange: performanceData.callClicksChange || 0,
        directionRequests: performanceData.directionRequests || 0,
        directionRequestsChange: performanceData.directionRequestsChange || 0,
        websiteClicks: performanceData.websiteClicks || 0,
        websiteClicksChange: performanceData.websiteClicksChange || 0,
        newReviews: performanceData.newReviews || 0,
        newReviewsChange: performanceData.newReviewsChange || 0,
        organicClicks: performanceData.organicClicks || performanceData.websiteClicks || 0,
        organicClicksChange: performanceData.organicClicksChange || performanceData.websiteClicksChange || 0,
        avgSearchVolume: performanceData.avgSearchVolume || 0,
        avgSearchVolumeChange: performanceData.avgSearchVolumeChange || 0
      },
      // For now, use mock data for additional features not available in current GMB API
      localPackData: {
        currentRank: 14,
        totalPositions: 20,
        improvement: 2,
        description: 'You are in 3-pack more'
      },
      taskCompletion: {
        completedPercentage: 80,
        tasks: [
          { name: 'Business Information', completed: 8, total: 9 },
          { name: 'Photos & Media', completed: 6, total: 9 },
          { name: 'Customer Reviews', completed: 8, total: 9 }
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
          searchTerm: `${currentProfile?.name || 'Business'} near me`,
          searchVolume: 1400,
          searchVolumeChange: 18,
          clientRanking: 'Not ranked',
          competitorRanking: '#3 Competitor'
        },
        {
          searchTerm: `Best ${currentProfile?.name?.split(' ')[0]?.toLowerCase() || 'service'}`,
          searchVolume: 3400,
          searchVolumeChange: 18,
          clientRanking: '#11',
          competitorRanking: '#4 Competitor'
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
        }
      ],
      competitorSummary: [
        {
          metric: 'Profile Optimization Score',
          yourBusiness: 280,
          competitorA: 288,
          competitorB: 250,
          competitorC: 230
        },
        {
          metric: 'GBP Rating',
          yourBusiness: 4.5,
          competitorA: 5.0,
          competitorB: 4.0,
          competitorC: 3.5
        }
      ]
    };
  }, [performanceData, currentProfile]);

  // Handle export to PDF
  const handleExportToPDF = useCallback(() => {
    console.log('Exporting performance data to PDF for:', currentProfile?.name);
    // TODO: Implement PDF export functionality
  }, [currentProfile]);

  // Handle time range change
  const handleTimeRangeChange = useCallback((timeRange) => {
    console.log('Time range changed to:', timeRange, 'for profile:', currentProfile?.name);
    // TODO: Fetch data for new time range
  }, [currentProfile]);

  if (profilesLoading) {
    return (
      <PageContainer>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
            Loading Performance Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Connecting to Google My Business and loading your profiles...
          </Typography>
        </Box>
      </PageContainer>
    );
  }
  
  if (loading) {
    return (
      <PageContainer>
        {/* Profile Controls */}
        {currentProfile && (
          <ProfileControlsContainer>
            <ProfileInfoSection>
              <ProfileIndicator />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {currentProfile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Loading performance data...
                </Typography>
              </Box>
            </ProfileInfoSection>
          </ProfileControlsContainer>
        )}
        
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
            Loading Performance Data
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {currentProfile 
              ? `Fetching performance metrics for ${currentProfile.name}...`
              : 'Authenticating and fetching performance data...'
            }
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  if (error && !performanceData && availableProfiles.length === 0) {
    return (
      <PageContainer>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>No Business Profiles Found</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{error}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            📈 To view performance data:
          </Typography>
          <Typography variant="body2" component="div">
            <strong>1. Visit the Dashboard page first:</strong>
            <br />• Go to Dashboard and connect your Google My Business account
            <br />• Make sure to grant all requested permissions
            <br />• Use the Google account that owns/manages the business
            <br /><br />
            <strong>2. Verify business setup:</strong>
            <br />• You must be the owner or manager of the business
            <br />• The business must be verified in Google My Business
            <br />• Business must have an active Google My Business profile
            <br /><br />
            <strong>3. Check requirements:</strong>
            <br />• Business Profile Performance API must be enabled
            <br />• Performance data may take 24-48 hours to become available for new businesses
          </Typography>
        </Alert>

        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            No business profiles available
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Connect your Google My Business account to view performance metrics
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/dashboard')}
            sx={{ textTransform: 'none' }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Profile Controls */}
      {availableProfiles.length > 0 && (
        <ProfileControlsContainer>
          <ProfileInfoSection>
            <ProfileIndicator />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {currentProfile ? currentProfile.name : 'Select a profile'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentProfile ? currentProfile.address : 'Please select a business profile to view performance data'}
              </Typography>
            </Box>
          </ProfileInfoSection>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ProfileSelector size="small">
              <InputLabel>Select Business Profile</InputLabel>
              <Select
                value={selectedProfileId}
                onChange={handleProfileChange}
                label="Select Business Profile"
                disabled={loading || profilesLoading}
              >
                {availableProfiles.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {profile.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {profile.address}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </ProfileSelector>
            
            {currentProfile && (
              <SwitchProfileButton 
                onClick={handleViewBusinessProfile}
                disabled={loading}
              >
                View Full Profile
              </SwitchProfileButton>
            )}
          </Box>
        </ProfileControlsContainer>
      )}

      {/* Error Alert */}
      {error && performanceData && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      )}

      {/* Performance Dashboard */}
      {transformedPerformanceData ? (
        <PerformanceDashboard
          performanceData={transformedPerformanceData}
          loading={loading}
          error={null}
          onExportToPDF={handleExportToPDF}
          onTimeRangeChange={handleTimeRangeChange}
          selectedTimeRange="6 Month"
        />
      ) : (
        !loading && currentProfile && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No performance data available
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Performance data for {currentProfile.name} may take 24-48 hours to become available after business setup
            </Typography>
          </Box>
        )
      )}
      
      {/* No Profile Selected State */}
      {!currentProfile && !loading && availableProfiles.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Select a Business Profile
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Choose a business profile from the dropdown above to view performance data
          </Typography>
        </Box>
      )}
    </PageContainer>
  );
};

export default Performance;