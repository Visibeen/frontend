import React, { useRef, useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import EditIcon from '../icons/EditIcon';
import GMBService from '../../services/GMBService';
import CompetitorDiscoveryService from '../../services/CompetitorDiscoveryService';
import { getYourData } from '../../utils/yourDataStore';

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start',
  maxWidth: '1200px'
}));

const ContentSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '40px'
}));

const HeaderSection = styled(Stack)(({ theme }) => ({
  gap: '6px'
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '17px'
}));

const SummaryCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  padding: '26px 26px',
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  position: 'relative'
}));

const SummaryColumn = styled(Stack)(({ theme }) => ({
  gap: '6px',
  flex: 1
}));

const SummaryLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const SummaryValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '95px',
  backgroundColor: '#F6F0F0'
}));

const EditButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '26px',
  right: '26px',
  minWidth: 'auto',
  padding: '4px',
  color: '#0B91D6',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const ResultsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '40px',
  padding: '40px 26px',
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  alignItems: 'flex-start'
}));

const ScoreSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '10px',
  minWidth: '214px'
}));

const ScoreLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#A0A0AA',
  textAlign: 'center'
}));

const ScoreValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  color: '#000000',
  textAlign: 'center'
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '302px',
  height: '301px'
}));

const ChartImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
}));

const AboutSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '10px'
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const AboutText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927',
  lineHeight: '19px',
  marginBottom: '76px'
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px'
}));

const LegendDot = styled(Box)(({ theme, color }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: color
}));

const LegendText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927',
  textTransform: 'capitalize'
}));

const ViewHeatMapButton = styled(Button)(({ theme }) => ({
  alignSelf: 'center',
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'capitalize',
  width: '140px',
  height: '40px',
  padding: 0,
  borderRadius: '8px',
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

// Futuristic Loading UI Components
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const slideIn = keyframes`
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(11, 145, 214, 0.95)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  borderRadius: '12px'
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  maxWidth: '500px',
  width: '100%',
  padding: '40px'
}));

const LoadingTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '8px'
}));

const LoadingSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center'
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: '8px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '4px',
    background: 'linear-gradient(90deg, #34A853 0%, #0B91D6 50%, #EA4335 100%)',
    backgroundSize: '200% 100%',
    animation: `${pulse} 2s ease-in-out infinite`
  }
}));

const CurrentStepText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#ffffff',
  textAlign: 'center',
  animation: `${slideIn} 0.5s ease-out`
}));

const ProgressPercentage = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center'
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  maxHeight: '200px',
  overflowY: 'auto',
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(5px)'
}));

const StepItem = styled(Box)(({ theme, completed }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 12px',
  borderRadius: '8px',
  backgroundColor: completed ? 'rgba(52, 168, 83, 0.2)' : 'rgba(255, 255, 255, 0.05)',
  border: completed ? '1px solid rgba(52, 168, 83, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  animation: completed ? `${slideIn} 0.5s ease-out` : 'none'
}));

const StepIcon = styled(Box)(({ theme, completed }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: completed ? '#34A853' : 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: '#ffffff',
  fontWeight: 'bold'
}));

const StepText = styled(Typography)(({ theme, completed }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: completed ? 600 : 400,
  color: completed ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
  flex: 1
}));

const legendItems = [
  { color: '#30302E', label: 'Direct' },
  { color: '#FBBC05', label: 'Links' },
  { color: '#34A853', label: 'Social Media' },
  { color: '#027DBD', label: 'Digital Marketing' }
];

const predefinedKeywords = [
  'Property',
  'Buy/Rent Property',
  'Builder',
  'Tiles work',
  'Wooden flowing',
  'Civil work'
];

const ProfileStrengthResults = () => {
  const location = useLocation();
  const state = location.state || {};
  const account = state.account || {};
  const business = state.business || {};
  const selectedKeywords = Array.isArray(state.keywords) ? state.keywords : [];
  let resolvedAddress = state.address || business.address || business.formattedAddress || '';
  if (!resolvedAddress && business?.storefrontAddress) {
    const sa = business.storefrontAddress;
    const parts = [];
    if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
    if (sa.locality) parts.push(sa.locality);
    const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
    if (tail) parts.push(tail);
    resolvedAddress = parts.join(', ').trim();
  }
  const resolvedAccountName = account.name || business.name || business.businessName || '';
  const [freshAddress, setFreshAddress] = useState('');
  const [targetLocation, setTargetLocation] = useState(business || state.locationData || state.selectedLocation || null);
  const [profileScore, setProfileScore] = useState(0);
  const [keywordsState, setKeywordsState] = useState(selectedKeywords);
  const [editKwOpen, setEditKwOpen] = useState(false);
  const [manualKw, setManualKw] = useState('');
  // Additional datasets to mirror Business Profile page
  const [reviewsData, setReviewsData] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  
  // Loading states for attractive UI
  const [isCalculating, setIsCalculating] = useState(true);
  const [currentStep, setCurrentStep] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepProgress, setStepProgress] = useState(0);
  

  // Ensure target location is always set with available data
  useEffect(() => {
    if (!targetLocation && (business || state.locationData || state.selectedLocation)) {
      const fallbackLocation = business || state.locationData || state.selectedLocation;
      console.log('[ProfileStrengthResults] Setting fallback target location:', fallbackLocation);
      setTargetLocation(fallbackLocation);
    }
  }, [business, state.locationData, state.selectedLocation, targetLocation]);

  useEffect(() => {
    const fetchFreshAddress = async () => {
      try {
        console.log('[ProfileStrengthResults] Starting data fetch with state:', {
          account,
          business,
          selectedKeywords,
          resolvedAddress,
          state
        });

        // Derive account id/name from multiple sources
        let accId = account?.id;
        if (!accId) accId = business?.accountId || business?.accountName;
        if (!accId && typeof business?.name === 'string' && business.name.includes('accounts/')) {
          // name might look like accounts/123/locations/456
          const parts = String(business.name).split('/');
          const idx = parts.indexOf('accounts');
          if (idx !== -1 && parts[idx + 1]) accId = parts[idx + 1];
        }
        if (!accId && Array.isArray(state.businesses)) {
          const withAcc = state.businesses.find(b => b?.accountId || b?.accountName || (typeof b?.name === 'string' && b.name.includes('accounts/')));
          if (withAcc) {
            accId = withAcc.accountId || withAcc.accountName;
            if (!accId && typeof withAcc.name === 'string' && withAcc.name.includes('accounts/')) {
              const parts = String(withAcc.name).split('/');
              const idx = parts.indexOf('accounts');
              if (idx !== -1 && parts[idx + 1]) accId = parts[idx + 1];
            }
          }
        }
        // derive location id from possible fields
        const locId = account?.locationId || business?.locationId || business?.id || (business?.name ? String(business.name).split('/').pop() : '');
        
        console.log('[ProfileStrengthResults] Derived IDs:', { accId, locId });
        
        if (!accId) {
          console.warn('[Results] No account id derived initially. Attempting discovery via accounts → locations...');
          try {
            const accountsList = await GMBService.getAccounts();
            console.debug('[Results] Accounts fetched for discovery:', Array.isArray(accountsList) ? accountsList.length : 0);
            let discoveredAccId = undefined;
            if (Array.isArray(accountsList)) {
              for (const acc of accountsList) {
                const accName = acc?.name; // 'accounts/<id>'
                const accIdCandidate = typeof accName === 'string' && accName.includes('accounts/') ? accName.split('/')[1] : undefined;
                if (!accIdCandidate) continue;
                try {
                  const locs = await GMBService.getLocations(undefined, accName);
                  const byId = (loc) => (loc?.name && (loc.name.includes(String(locId)) || String(loc.name).split('/').pop() === String(locId)));
                  const byTitle = (loc) => {
                    const selName = business?.title || business?.businessName || business?.name || '';
                    return selName && loc?.title && String(loc.title).toLowerCase() === String(selName).toLowerCase();
                  };
                  const match = Array.isArray(locs) ? (locs.find(byId) || locs.find(byTitle)) : null;
                  if (match) {
                    discoveredAccId = accIdCandidate;
                    console.debug('[Results] Discovered accountId via location match:', discoveredAccId, 'location:', match?.name);
                    // Prefer to use discovered accId and continue normal flow to keep logic unified
                    accId = discoveredAccId;
                    break;
                  }
                } catch (locErr) {
                  console.warn('[Results] Failed to list locations for', accName, locErr?.message || locErr);
                }
              }
            }
          } catch (discErr) {
            console.warn('[Results] Account discovery failed:', discErr?.message || discErr);
          }

          if (!accId) {
            console.warn('[Results] Could not determine account id after discovery. Falling back to passed business payload.');
            // Still try to set target location from business data for scoring
            if (business) {
              console.log('[Results] Setting target location from business data for scoring');
              setTargetLocation(business);
            }
            return;
          }
        }
        const accountName = String(accId).includes('accounts/') ? String(accId) : `accounts/${accId}`;
        console.debug('[Results] Fetching locations for', accountName, 'target locId:', locId);
        const locations = await GMBService.getLocations(undefined, accountName);
        console.debug('[Results] Locations fetched:', Array.isArray(locations) ? locations.length : 0);
        let target = null;
        if (Array.isArray(locations) && locations.length) {
          if (locId) {
            target = locations.find(l => (l.name && (l.name.includes(locId) || String(l.name).split('/').pop() === String(locId)))) || null;
          }
          if (!target) {
            // Try match by title/name
            const selName = business?.title || business?.businessName || business?.name || '';
            if (selName) {
              target = locations.find(l => (l.title && String(l.title).toLowerCase() === String(selName).toLowerCase()));
            }
          }
          if (!target) {
            target = locations[0];
          }
        }
        console.debug('[Results] Target location chosen:', target?.name || 'none');
        if (target) {
          setTargetLocation(target);
          // Fetch attributes for this location and attach for scoring
          try {
            if (target?.name) {
              const attrs = await GMBService.getLocationAttributes(target.name);
              console.debug('[Results] Attributes fetched:', Array.isArray(attrs) ? attrs.length : 0);
              setTargetLocation((prev) => ({ ...prev, attributesApi: attrs }));
            }
          } catch (e) {
            console.warn('[Results] Failed to fetch attributes:', e?.message || e);
          }

          // Fetch additional datasets to mirror BusinessProfile page
          try {
            const accountId = (accountName && accountName.includes('accounts/')) ? accountName.split('/')[1] : undefined;
            const locationName = target?.name || '';
            const locationIdFromName = locationName ? String(locationName).split('/').pop() : undefined;

            // Reviews (uses accountName and full location name)
            try {
              if (accountName && locationName) {
                const reviews = await GMBService.getReviews(undefined, accountName, locationName);
                setReviewsData({ reviews });
                console.debug('[Results] Reviews fetched:', Array.isArray(reviews) ? reviews.length : 0);
              }
            } catch (reviewsErr) {
              console.warn('[Results] Error fetching reviews:', reviewsErr);
              setReviewsData({ reviews: [] });
            }

            // Media (photos) requires accountId and locationId
            try {
              if (accountId && locationIdFromName) {
                let items = await GMBService.getMedia(undefined, accountId, locationIdFromName);
                items = Array.isArray(items) ? items : [];
                // Filter to photos with a usable URL
                items = items.filter(i => (i.mediaFormat === 'PHOTO' || !i.mediaFormat) && (i.googleUrl || i.thumbnailUrl || i.sourceUrl));
                // Sort by createTime desc
                items.sort((a, b) => {
                  const ta = a.createTime ? Date.parse(a.createTime) : 0;
                  const tb = b.createTime ? Date.parse(b.createTime) : 0;
                  return tb - ta;
                });
                setMediaItems(items);
                console.debug('[Results] Media items fetched:', items.length);
              }
            } catch (mediaErr) {
              console.warn('[Results] Error fetching media:', mediaErr);
              setMediaItems([]);
            }

            // Performance metrics (locationId only)
            try {
              if (locationIdFromName) {
                const metrics = await GMBService.getPerformanceMetrics(undefined, locationIdFromName);
                setPerformanceData(metrics);
                console.debug('[Results] Performance metrics fetched');
              }
            } catch (perfErr) {
              console.warn('[Results] Error fetching performance metrics:', perfErr);
              setPerformanceData(null);
            }

          } catch (extraErr) {
            console.warn('[Results] Error during extra datasets fetch:', extraErr);
          }
        }
        if (!target?.latlng?.latitude || !target?.latlng?.longitude) {
          console.debug('[Results] Target location lat/lng missing or incomplete. latlng field:', target?.latlng);
        } else {
          console.debug('[Results] Target location coordinates:', {
            lat: target?.latlng?.latitude,
            lng: target?.latlng?.longitude
          });
        }
        if (target?.storefrontAddress) {
          const sa = target.storefrontAddress;
          const parts = [];
          if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
          if (sa.locality) parts.push(sa.locality);
          const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
          if (tail) parts.push(tail);
          const formatted = parts.join(', ').trim();
          console.debug('[Results] Fresh address derived from API:', formatted);
          setFreshAddress(formatted);
        }
      } catch (e) {
        console.warn('Could not fetch fresh address:', e);
      }
    };
    fetchFreshAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id, business?.locationId, business?.id, business?.name]);

  // Fallback: try to pull an address from the passed businesses list
  let fallbackBusinessesAddress = '';
  if (!freshAddress && !resolvedAddress && Array.isArray(state.businesses) && state.businesses.length) {
    const locId = business?.locationId || business?.id || (business?.name ? String(business.name).split('/').pop() : '');
    const matchesSelected = state.businesses.find(b => {
      const bid = b?.locationId || b?.id || (b?.name ? String(b.name).split('/').pop() : '');
      return locId && bid && String(bid) === String(locId);
    });
    const candidate = matchesSelected || state.businesses.find(b => b?.address || b?.formattedAddress || b?.storefrontAddress);
    if (candidate) {
      if (candidate.storefrontAddress) {
        const sa = candidate.storefrontAddress;
        const parts = [];
        if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
        if (sa.locality) parts.push(sa.locality);
        const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
        if (tail) parts.push(tail);
        fallbackBusinessesAddress = parts.join(', ').trim();
      } else {
        fallbackBusinessesAddress = candidate.address || candidate.formattedAddress || '';
      }
    }
  }
  const displayAddress = (freshAddress || resolvedAddress || fallbackBusinessesAddress || '').trim();
  useEffect(() => {
    const chosen = freshAddress ? 'freshAddress' : (resolvedAddress ? 'resolvedAddress' : (fallbackBusinessesAddress ? 'fallbackBusinessesAddress' : 'none'));
    console.debug('[Results] Address source used:', chosen, 'value:', displayAddress);
  }, [freshAddress, resolvedAddress, fallbackBusinessesAddress, displayAddress]);

  // Compute profile strength score out of 300 based on provided rules
  useEffect(() => {
    let isMounted = true;
    const computeScore = async () => {
      if (!isMounted) return;
      setIsCalculating(true);
      setCurrentStep('Initializing analysis...');
      setStepProgress(0);
      await new Promise(resolve => setTimeout(resolve, 800)); // Brief pause for UX
      let score = 0;
      let verPts = 0, namePts = 0, addrPts = 0, phonePts = 0;
      
      const updateProgress = (step, progress, completed = []) => {
        if (!isMounted) return;
        setCurrentStep(step);
        setStepProgress(progress);
        setCompletedSteps(prev => [...new Set([...prev, ...completed])]);
      };

      // 1) Verification status (respect Dashboard-passed status/flags)
      updateProgress('Checking verification status...', 10);
      await new Promise(resolve => setTimeout(resolve, 600));
      const verificationStateRaw = account?.verificationState || '';
      const verificationState = String(verificationStateRaw).toUpperCase();
      const dashStatus = String(business?.status || state?.selected?.status || '').toLowerCase();
      const dashVerified = (business?.verified === true) || (state?.selected?.verified === true);
      const isVerified = (
        dashVerified ||
        dashStatus === 'verified' ||
        verificationState === 'VERIFIED' ||
        String(verificationStateRaw).toLowerCase() === 'verified' ||
        targetLocation?.metadata?.verified === true
      );
      try { console.debug('[Results] Verification inputs:', { verificationStateRaw, verificationState, dashStatus, dashVerified, resolvedIsVerified: isVerified }); } catch (_) {}
      const isSoftSuspended = (
        (targetLocation?.metadata?.placeSuspensionReason || '').toString().toUpperCase().includes('SOFT') ||
        (targetLocation?.metadata?.state || '').toString().toUpperCase().includes('SOFT')
      );
      const isUnverified = !isVerified && !isSoftSuspended;
      if (isVerified) verPts = 0;
      else if (isSoftSuspended) verPts = -60;
      else if (isUnverified) verPts = -100; // not specified; assuming 0
      score += verPts;
      updateProgress('Analyzing business name...', 20, ['Verification Status']);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2) Business name contains city
      const businessTitle = targetLocation?.title || business?.title || business?.businessName || '';
      const city = targetLocation?.storefrontAddress?.locality || '';
      if (businessTitle && city && businessTitle.toLowerCase().includes(city.toLowerCase())) {
        namePts = 20;
      } else if (businessTitle) {
        namePts = 10;
      }
      score += namePts;
      updateProgress('Evaluating address completeness...', 35, ['Business Name Analysis']);
      await new Promise(resolve => setTimeout(resolve, 600));

      // 3) Address scoring
      const addr = displayAddress;
      const hasCity = !!city && addr.toLowerCase().includes(city.toLowerCase());
      const keywords = (keywordsState && keywordsState.length ? keywordsState : [])
        .map(k => k.toLowerCase());
      const hasKeyword = keywords.some(k => addr.toLowerCase().includes(k));
      const hasAnyAddressFields = !!(targetLocation?.storefrontAddress?.locality || targetLocation?.storefrontAddress?.administrativeArea || targetLocation?.storefrontAddress?.postalCode);
      if (hasCity && hasKeyword) {
        addrPts = 20;
      } else if (addr) {
        addrPts = 12;
      } else if (!hasAnyAddressFields) {
        addrPts = 2;
      }
      score += addrPts;
      updateProgress('Checking contact information...', 45, ['Address Analysis']);
      await new Promise(resolve => setTimeout(resolve, 400));

      // 4) Phone number
      const hasPhone = !!(targetLocation?.phoneNumbers?.primaryPhone || targetLocation?.phoneNumbers?.additionalPhones?.length);
      phonePts = hasPhone ? 18 : 0;
      score += phonePts;
      updateProgress('Analyzing business description...', 55, ['Contact Information']);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 5) Description length
      let descPts = 0;
      const description = targetLocation?.profile?.description || '';
      const wordCount = description ? (description.trim().split(/\s+/).filter(Boolean).length) : 0;
      if (wordCount > 0 && wordCount <= 400) {
        descPts = 5;
      } else if (wordCount >= 700) {
        descPts = 10;
      } else {
        descPts = 0; // between 401 and 699, or empty
      }
      score += descPts;
      updateProgress('Checking website presence...', 65, ['Description Analysis']);
      await new Promise(resolve => setTimeout(resolve, 400));

      // 6) Website link presence
      let websitePts = 0;
      const hasWebsite = !!targetLocation?.websiteUri;
      websitePts = hasWebsite ? 5 : 0;
      score += websitePts;
      updateProgress('Evaluating business hours...', 72, ['Website Analysis']);
      await new Promise(resolve => setTimeout(resolve, 450));

      // 7) Business hours (timings)
      let hoursPts = 0;
      const hasHours = !!(targetLocation?.regularHours?.periods?.length || targetLocation?.moreHours?.length);
      hoursPts = hasHours ? 5 : 0;
      score += hoursPts;
      updateProgress('Checking business labels...', 78, ['Business Hours']);
      await new Promise(resolve => setTimeout(resolve, 400));

      // 8) Labels
      let labelPts = 0;
      const hasLabels = Array.isArray(targetLocation?.labels) && targetLocation.labels.length > 0;
      labelPts = hasLabels ? 10 : 0;
      score += labelPts;
      updateProgress('Analyzing business categories...', 85, ['Labels Analysis']);
      await new Promise(resolve => setTimeout(resolve, 500));

      // 8.0) Categories scoring: +25 for primary, +5 for first additional, +5 for second additional
      let catBasePts = 0;
      let catExtraPts = 0;
      const catInfo = targetLocation?.categories || {};
      const primaryCategory = catInfo?.primaryCategory || catInfo?.primary || null;
      // additionalCategories in Business Info API; also guard for arrays under different keys
      const additionalCats = Array.isArray(catInfo?.additionalCategories)
        ? catInfo.additionalCategories
        : (Array.isArray(catInfo)
            ? catInfo.slice(1) // if categories is an array, assume first is primary
            : []);
      const hasPrimary = !!primaryCategory;
      if (hasPrimary) catBasePts = 25;
      const extraCount = Math.max(0, Math.min(Array.isArray(additionalCats) ? additionalCats.length : 0, 2));
      catExtraPts = extraCount * 5; // +5 for first extra, +5 for second extra
      score += (catBasePts + catExtraPts);
      console.log('[Score] Categories check:', {
        hasPrimary,
        additionalCount: Array.isArray(additionalCats) ? additionalCats.length : 0,
        awardedPrimary: catBasePts,
        awardedAdditional: catExtraPts
      });

      // 8.0a) City mentioned in any category name (+10)
      let catCityPts = 0;
      const norm = (s) => (typeof s === 'string' ? s.toLowerCase() : '');
      const cityLc = norm(city);
      const extractCatNames = () => {
        const names = [];
        const pushStr = (v) => { if (typeof v === 'string' && v.trim()) names.push(v); };
        if (primaryCategory) {
          pushStr(primaryCategory.displayName || primaryCategory.name || primaryCategory);
        }
        (Array.isArray(additionalCats) ? additionalCats : []).forEach((c) => {
          pushStr(c?.displayName || c?.name || c);
        });
        return names;
      };
      const catNames = extractCatNames();
      const hasCityInCategory = !!(cityLc && catNames.some(n => norm(n).includes(cityLc)));
      catCityPts = hasCityInCategory ? 10 : 0;
      score += catCityPts;
      console.log('[Score] City-in-category check:', { city, categoryNames: catNames, awarded: catCityPts });

      // 8.1) Social media attached (+5 if present)
      let socialPts = 0;
      const socialDomains = ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'linkedin.com', 'youtube.com', 't.me', 'telegram.me', 'pinterest.', 'tiktok.com'];
      const looksSocialUrl = (u) => {
        if (!u || typeof u !== 'string') return false;
        const s = u.toLowerCase();
        return socialDomains.some(d => s.includes(d));
      };
      const collectLinks = () => {
        const out = [];
        const tl = targetLocation || {};
        const candidates = [];
        if (Array.isArray(tl.socialLinks)) candidates.push(...tl.socialLinks);
        if (Array.isArray(tl?.profile?.socialLinks)) candidates.push(...tl.profile.socialLinks);
        if (Array.isArray(tl.links)) candidates.push(...tl.links);
        if (Array.isArray(tl.profiles)) candidates.push(...tl.profiles);
        if (Array.isArray(tl.additionalUrls)) candidates.push(...tl.additionalUrls);
        if (Array.isArray(tl?.profile?.urls)) candidates.push(...tl.profile.urls);
        if (tl.websiteUri) candidates.push(tl.websiteUri);
        // Some structures might be objects with {type, url}
        candidates.forEach((v) => {
          if (!v) return;
          if (typeof v === 'string') out.push(v);
          else if (v?.url) out.push(v.url);
          else if (v?.link) out.push(v.link);
        });
        // Attributes may embed links
        const attrs = tl.attributes || {};
        Object.keys(attrs).forEach((k) => {
          const val = attrs[k];
          if (typeof val === 'string') out.push(val);
          if (Array.isArray(val)) val.forEach(x => { if (typeof x === 'string') out.push(x); });
        });
        // Also scan attributesApi array (Business Info API)
        const attrsApi = Array.isArray(tl.attributesApi) ? tl.attributesApi : [];
        attrsApi.forEach((a) => {
          // push any string-like fields commonly present
          ['displayName','attributeId','valueType'].forEach(k => {
            if (a && typeof a[k] === 'string') out.push(a[k]);
          });
          // inspect a.values which may contain strings/urls
          const vs = a?.values;
          if (vs && typeof vs === 'object') {
            Object.values(vs).forEach(v => {
              if (typeof v === 'string') out.push(v);
              if (Array.isArray(v)) v.forEach(x => { if (typeof x === 'string') out.push(x); });
            });
          }
        });
        return out.filter(Boolean);
      };
      const allLinks = collectLinks();
      const hasSocial = allLinks.some(looksSocialUrl);
      socialPts = hasSocial ? 5 : 0;
      score += socialPts;
      console.log('[Score] Social media check:', { hasSocial, awarded: socialPts });

      // 8.2) Appointments link (+5 if present)
      let appointmentsPts = 0;
      const hasApptDirect = !!(
        targetLocation?.appointmentLinks ||
        targetLocation?.appointmentLink ||
        targetLocation?.appointmentsLink ||
        targetLocation?.profile?.appointmentLink ||
        targetLocation?.profile?.appointmentUrl ||
        targetLocation?.metadata?.appointmentLink
      );
      const attrs = targetLocation?.attributes || {};
      const attrKeys = Object.keys(attrs).map(k => k.toLowerCase());
      const hasApptAttr = attrKeys.some(k => k.includes('appointment') || k.includes('booking'));
      const hasApptUrlInAttrs = Object.values(attrs).some(v => {
        if (typeof v === 'string') return /http(s)?:\/\//i.test(v) && (v.toLowerCase().includes('book') || v.toLowerCase().includes('appoint'));
        if (Array.isArray(v)) return v.some(x => typeof x === 'string' && /http(s)?:\/\//i.test(x) && (x.toLowerCase().includes('book') || x.toLowerCase().includes('appoint')));
        return false;
      });
      // Also scan attributesApi array for appointment/booking hints
      const attrsApi = Array.isArray(targetLocation?.attributesApi) ? targetLocation.attributesApi : [];
      const hasApptInAttrsApi = attrsApi.some(a => {
        const strings = [];
        if (a && typeof a.displayName === 'string') strings.push(a.displayName.toLowerCase());
        if (a && typeof a.attributeId === 'string') strings.push(a.attributeId.toLowerCase());
        // collect string values from a.values
        const vs = a?.values;
        if (vs && typeof vs === 'object') {
          Object.values(vs).forEach(v => {
            if (typeof v === 'string') strings.push(v.toLowerCase());
            if (Array.isArray(v)) v.forEach(x => { if (typeof x === 'string') strings.push(x.toLowerCase()); });
          });
        }
        return strings.some(s => s.includes('appointment') || s.includes('book') || (/http(s)?:\/\//i.test(s) && (s.includes('appoint') || s.includes('book'))));
      });
      const hasAppt = !!(hasApptDirect || hasApptAttr || hasApptUrlInAttrs || hasApptInAttrsApi);
      appointmentsPts = hasAppt ? 5 : 0;
      score += appointmentsPts;
      console.log('[Score] Appointments check:', { hasAppt, awarded: appointmentsPts });

      // 8.3) Service area (+5 if present)
      let serviceAreaPts = 0;
      const sa = targetLocation?.serviceArea || null;
      const hasServiceArea = !!(
        sa && (
          (Array.isArray(sa?.places) && sa.places.length > 0) ||
          sa?.placeId || sa?.radius || sa?.businessArea || sa?.regionCode ||
          Object.keys(sa || {}).length > 0
        )
      );
      serviceAreaPts = hasServiceArea ? 5 : 0;
      score += serviceAreaPts;
      console.log('[Score] Service area check:', { hasServiceArea, awarded: serviceAreaPts });

      // 8.4) Book Appointment explicit (+5 if present)
      let bookApptPts = 0;
      const linkLooksBook = (u) => typeof u === 'string' && /http(s)?:\/\//i.test(u) && /(book|reserve|booking)/i.test(u);
      const hasBookByLinks = Array.isArray(allLinks) && allLinks.some(linkLooksBook);
      const hasBookByFields = !!(
        targetLocation?.appointmentLinks ||
        targetLocation?.appointmentLink ||
        targetLocation?.appointmentsLink ||
        targetLocation?.profile?.appointmentLink ||
        targetLocation?.profile?.appointmentUrl ||
        targetLocation?.metadata?.appointmentLink
      );
      // look through attributesApi strings for book/reserve terms
      const attrsApiForBook = Array.isArray(targetLocation?.attributesApi) ? targetLocation.attributesApi : [];
      const hasBookInAttrsApi = attrsApiForBook.some(a => {
        const strs = [];
        if (a && typeof a.displayName === 'string') strs.push(a.displayName);
        if (a && typeof a.attributeId === 'string') strs.push(a.attributeId);
        const vs = a?.values;
        if (vs && typeof vs === 'object') {
          Object.values(vs).forEach(v => {
            if (typeof v === 'string') strs.push(v);
            if (Array.isArray(v)) v.forEach(x => { if (typeof x === 'string') strs.push(x); });
          });
        }
        return strs.some(s => /(book|reserve|appointment)/i.test(s));
      });
      const hasBookAppointment = !!(hasBookByLinks || hasBookByFields || hasBookInAttrsApi);
      bookApptPts = hasBookAppointment ? 5 : 0;
      score += bookApptPts;
      console.log('[Score] Book appointment check:', { hasBookAppointment, awarded: bookApptPts });

      // 8.5) Q&A section present (+5 if present)
      let qaPts = 0;
      const qnaCandidates = [
        targetLocation?.qna,
        targetLocation?.qa,
        targetLocation?.questions,
        targetLocation?.questionsAndAnswers,
        targetLocation?.communityQuestions
      ];
      const hasQAByStructure = qnaCandidates.some(v => Array.isArray(v) ? v.length > 0 : (v && typeof v === 'object' && Object.keys(v).length > 0));
      // Also scan attributesApi strings for Q&A hints
      const hasQAInAttrsApi = attrsApiForBook.some(a => {
        const strs = [];
        if (a && typeof a.displayName === 'string') strs.push(a.displayName);
        if (a && typeof a.attributeId === 'string') strs.push(a.attributeId);
        const vs = a?.values;
        if (vs && typeof vs === 'object') {
          Object.values(vs).forEach(v => {
            if (typeof v === 'string') strs.push(v);
            if (Array.isArray(v)) v.forEach(x => { if (typeof x === 'string') strs.push(x); });
          });
        }
        return strs.some(s => /(q&a|questions?\s*&?\s*answers?|community\s*qa)/i.test(s));
      });
      const hasQASection = !!(hasQAByStructure || hasQAInAttrsApi);
      qaPts = hasQASection ? 5 : 0;
      score += qaPts;
      console.log('[Score] Q&A check:', { hasQASection, awarded: qaPts });

      // 9) Review Rating scoring
      let reviewRatingPts = 0;
      updateProgress('Fetching business rating...', 88, ['Categories & Services']);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Check multiple sources for business rating
      const ratingCandidates = {
        targetLocationRating: targetLocation?.rating,
        targetLocationAverageRating: targetLocation?.averageRating,
        targetLocationGoogleRating: targetLocation?.googleRating,
        businessRating: business?.rating,
        businessAverageRating: business?.averageRating,
        businessGoogleRating: business?.googleRating,
        reviewsDataRating: reviewsData?.averageRating,
        stateLocationRating: state?.locationData?.rating || state?.selectedLocation?.rating,
        stateLocationAverageRating: state?.locationData?.averageRating || state?.selectedLocation?.averageRating
      };
      
      let myRating = (
        targetLocation?.rating ||
        targetLocation?.averageRating ||
        targetLocation?.googleRating ||
        business?.rating ||
        business?.averageRating ||
        business?.googleRating ||
        reviewsData?.averageRating ||
        state?.locationData?.rating ||
        state?.selectedLocation?.rating ||
        state?.locationData?.averageRating ||
        state?.selectedLocation?.averageRating ||
        0
      );
      
      // If no rating found in existing data, fetch from Places API
      if (!myRating || myRating === 0) {
        try {
          const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_GMB_API_KEY;
          const base = process.env.NODE_ENV === 'development' ? '/places' : 'https://maps.googleapis.com';
          
          // Get place_id from various sources
          let placeId = (
            targetLocation?.metadata?.placeId ||
            targetLocation?.placeId ||
            business?.placeId ||
            business?.place_id ||
            state?.locationData?.placeId ||
            state?.selectedLocation?.placeId ||
            null
          );
          
          // If no place_id, try to find it using business name and address
          if (!placeId && apiKey) {
            const businessTitle = targetLocation?.title || business?.title || business?.businessName || '';
            const displayAddress = (freshAddress || resolvedAddress || fallbackBusinessesAddress || '').trim();
            const queryParts = [businessTitle, displayAddress].filter(Boolean).join(' ').trim();
            
            if (queryParts) {
              console.log('[Review Rating] Finding place_id for rating lookup:', queryParts);
              const params = new URLSearchParams({
                input: queryParts,
                inputtype: 'textquery',
                fields: 'place_id,name,rating,user_ratings_total',
                key: apiKey
              });
              const findUrl = `${base}/maps/api/place/findplacefromtext/json?${params.toString()}`;
              const findResponse = await fetch(findUrl);
              
              if (findResponse.ok) {
                const findData = await findResponse.json();
                const candidate = Array.isArray(findData?.candidates) ? findData.candidates[0] : null;
                if (candidate?.place_id) {
                  placeId = candidate.place_id;
                  if (candidate.rating) {
                    myRating = candidate.rating;
                    console.log('[Review Rating] Found rating from Find Place API:', { placeId, rating: myRating });
                  }
                }
              }
            }
          }
          
          // If we have place_id but still no rating, get details
          if (placeId && (!myRating || myRating === 0) && apiKey) {
            console.log('[Review Rating] Fetching rating from Place Details API:', placeId);
            const params = new URLSearchParams({
              place_id: placeId,
              fields: 'place_id,name,rating,user_ratings_total',
              key: apiKey
            });
            const detailsUrl = `${base}/maps/api/place/details/json?${params.toString()}`;
            const detailsResponse = await fetch(detailsUrl);
            
            if (detailsResponse.ok) {
              const detailsData = await detailsResponse.json();
              if (detailsData?.result?.rating) {
                myRating = detailsData.result.rating;
                console.log('[Review Rating] Found rating from Place Details API:', { 
                  placeId, 
                  rating: myRating,
                  totalReviews: detailsData.result.user_ratings_total 
                });
              }
            }
          }
        } catch (error) {
          console.warn('[Review Rating] Failed to fetch rating from Places API:', error);
        }
      }
      
      console.log('[Review Rating] Starting calculation:', { 
        myRating,
        ratingCandidates,
        fetchedFromAPI: myRating > 0 && !Object.values(ratingCandidates).some(r => r > 0),
        formula: 'MIN((rating - 1) * 2.5, 20)',
        maxPoints: 20 
      });
      
      if (myRating > 1) {
        const rawCalculation = (myRating - 1) * 2.5;
        reviewRatingPts = Math.min(20, rawCalculation);
        score += reviewRatingPts;
        console.log('[Review Rating] Calculation complete:', { 
          myRating,
          rawCalculation: rawCalculation.toFixed(2),
          finalPoints: reviewRatingPts,
          capped: reviewRatingPts === 20,
          formula: `(${myRating} - 1) * 2.5 = ${rawCalculation.toFixed(2)} → ${reviewRatingPts} points`
        });
      } else {
        console.log('[Review Rating] No points awarded - rating must be > 1.0');
      }

      // 10) Response Rate scoring
      let responseRatePts = 0;
      updateProgress('Fetching response rate data...', 90, ['Review Rating']);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Check for response rate in existing data first (including Your Data store that backs CSV export)
      const responseRateCandidates = {
        performanceDataResponseRate: performanceData?.responseRate,
        performanceDataAvgResponseRate: performanceData?.averageResponseRate,
        performanceDataMessagingResponseRate: performanceData?.messagingResponseRate,
        targetLocationResponseRate: targetLocation?.responseRate,
        businessResponseRate: business?.responseRate
      };

      // Prefer stored values from Your Data (same as CSV export source)
      let responseRateFromStore90d;
      let responseRateFromStore30d;
      try {
        const yd = getYourData ? getYourData() : null;
        const psSnap = yd?.profileStrength || {};
        const bpSnap = yd?.businessProfile || {};
        const toNum = (v) => {
          if (typeof v === 'number') return v;
          const n = parseFloat(v);
          return Number.isFinite(n) ? n : undefined;
        };
        responseRateFromStore90d = toNum(psSnap.responseRate90d) ?? toNum(bpSnap.responseRate90d);
        responseRateFromStore30d = toNum(psSnap.responseRate30d) ?? toNum(bpSnap.responseRate30d);
      } catch (_) {}

      let responseRate = (
        (responseRateFromStore90d && responseRateFromStore90d > 0 ? responseRateFromStore90d : undefined) ??
        (responseRateFromStore30d && responseRateFromStore30d > 0 ? responseRateFromStore30d : undefined) ??
        (performanceData?.responseRate ?? performanceData?.averageResponseRate ?? performanceData?.messagingResponseRate) ??
        targetLocation?.responseRate ??
        business?.responseRate ??
        0
      );

      if (responseRateFromStore90d || responseRateFromStore30d) {
        console.log('[Response Rate] Using value from Your Data store', {
          responseRateFromStore90d,
          responseRateFromStore30d,
          chosen: responseRate
        });
      }
      
      // If no response rate found in existing data, fetch from GMB API for last 90 days
      if (!responseRate || responseRate === 0) {
        try {
          // Get account info from available data sources
          let accId = account?.id;
          if (!accId) accId = business?.accountId || business?.accountName;
          if (!accId && typeof business?.name === 'string' && business.name.includes('accounts/')) {
            const parts = String(business.name).split('/');
            const idx = parts.indexOf('accounts');
            if (idx !== -1 && parts[idx + 1]) accId = parts[idx + 1];
          }
          
          const accountName = accId ? (String(accId).includes('accounts/') ? String(accId) : `accounts/${accId}`) : undefined;
          const accountId = (accountName && accountName.includes('accounts/')) ? accountName.split('/')[1] : undefined;
          const locationName = targetLocation?.name || '';
          const locationIdFromName = locationName ? String(locationName).split('/').pop() : undefined;
          
          if (accountId && locationIdFromName) {
            console.log('[Response Rate] Fetching response rate from GMB API for last 90 days');
            
            // Calculate date range for last 90 days
            const now = new Date();
            const start = new Date(now);
            start.setDate(now.getDate() - 90);
            
            const dateRange = {
              startDate: {
                year: start.getFullYear(),
                month: start.getMonth() + 1,
                day: start.getDate()
              },
              endDate: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                day: now.getDate()
              }
            };
            
            // Fetch response rate metrics from GMB API
            const responseMetrics = await GMBService.getResponseRateMetrics(undefined, locationIdFromName, dateRange);
            
            if (responseMetrics?.responseRate) {
              responseRate = responseMetrics.responseRate;
              console.log('[Response Rate] Found response rate from GMB API:', {
                responseRate: `${responseRate}%`,
                dateRange: '90 days',
                source: 'GMB API'
              });
            }
          }
        } catch (error) {
          console.warn('[Response Rate] Failed to fetch response rate from GMB API:', error);
        }
      }
      
      console.log('[Response Rate] Starting calculation:', {
        responseRate,
        responseRateCandidates,
        formula: '(Response Rate) × (8 / 100)',
        maxPoints: 8
      });
      
      if (responseRate > 0) {
        // Formula: (Response Rate) × (8 / 100)
        // Response rate is typically a percentage (0-100), so we use it directly
        responseRatePts = (responseRate / 100) * 8;
        score += responseRatePts;
        console.log('[Response Rate] Calculation complete:', {
          responseRate: `${responseRate}%`,
          calculation: `(${responseRate} / 100) × 8 = ${responseRatePts.toFixed(2)}`,
          finalPoints: responseRatePts,
          formula: `${responseRate}% response rate → ${responseRatePts.toFixed(2)} points`
        });
      } else {
        console.log('[Response Rate] No points awarded - no response rate data found');
      }

      // 11) Reviews vs competitors (Places Nearby)
      let reviewsPts = 0;
      let velocityPts = 0; // New: Velocity score (max 12)
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_GMB_API_KEY;
        // Prefer explicit lat/lng passed from BusinessProfile; then fall back to GMB latlng shapes
        const explicitLatLng = state?.explicitLatLng; // { lat, lng }
        const coordCandidates = {
          explicit: explicitLatLng,
          target: targetLocation?.latlng,
          business: business?.latlng || business?.location?.latlng,
          state: state?.locationData?.latlng || state?.selectedLocation?.latlng
        };
        const fallbackLat = (coordCandidates.explicit?.lat != null)
          ? coordCandidates.explicit.lat
          : (coordCandidates.target?.latitude ?? coordCandidates.business?.latitude ?? coordCandidates.state?.latitude);
        const fallbackLng = (coordCandidates.explicit?.lng != null)
          ? coordCandidates.explicit.lng
          : (coordCandidates.target?.longitude ?? coordCandidates.business?.longitude ?? coordCandidates.state?.longitude);
        // Require explicit user keyword; no fallback to business title
        const keyword = (Array.isArray(keywords) && keywords.length > 0) ? keywords[0] : '';

        const base = process.env.NODE_ENV === 'development' ? '/places' : 'https://maps.googleapis.com';
        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        // 9.a Prefer provided place_id from selected business/location; else resolve via Find Place
        let myPlaceId = (
          targetLocation?.metadata?.placeId ||
          targetLocation?.placeId ||
          business?.placeId ||
          business?.place_id ||
          state?.locationData?.placeId ||
          state?.selectedLocation?.placeId ||
          null
        );
        let lat = fallbackLat;
        let lng = fallbackLng;
        const findPlace = async (query) => {
          const params = new URLSearchParams({
            input: query,
            inputtype: 'textquery',
            fields: 'place_id,name,geometry',
            key: apiKey || ''
          });
          const url = `${base}/maps/api/place/findplacefromtext/json?${params.toString()}`;
          const r = await fetch(url);
          if (!r.ok) throw new Error(`FindPlace HTTP ${r.status}`);
          const data = await r.json();
          if (data?.status && data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            console.warn('[Find Place] API status:', data.status, data?.error_message || '');
          }
          return data;
        };

        const getDetails = async (placeId) => {
          const params = new URLSearchParams({
            place_id: placeId,
            fields: 'place_id,name,geometry,formatted_address',
            key: apiKey || ''
          });
          const url = `${base}/maps/api/place/details/json?${params.toString()}`;
          const r = await fetch(url);
          if (!r.ok) throw new Error(`PlaceDetails HTTP ${r.status}`);
          const data = await r.json();
          if (data?.status && data.status !== 'OK') {
            console.warn('[Place Details] API status:', data.status, data?.error_message || '');
          }
          return data;
        };

        // 9.b Prefer coordinates from Place Details (place_id) for highest precision
        let usedSource = 'fallbacks';
        let coordsResolved = false;
        let geocodeTried = false;
        let geocodeSucceeded = false;
        const hasExplicit = (explicitLatLng && typeof explicitLatLng.lat === 'number' && typeof explicitLatLng.lng === 'number');

        if (myPlaceId) {
          try {
            const det = await getDetails(myPlaceId);
            const loc = det?.result?.geometry?.location;
            if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
              lat = loc.lat;
              lng = loc.lng;
              usedSource = 'place_details_primary';
              coordsResolved = true;
              console.debug('[Place Details] Primary coordinates from place_id:', { myPlaceId, lat, lng });
            }
          } catch (e) {
            console.warn('[Place Details] Primary fetch failed; will try fallbacks. Error:', e?.message || e);
          }
        }

        // If Place Details not available or failed, try explicit GMB coords
        if (!coordsResolved && hasExplicit) {
          lat = explicitLatLng.lat;
          lng = explicitLatLng.lng;
          usedSource = 'explicitLatLng';
          coordsResolved = true;
          console.debug('[Coords] Using explicit GMB coordinates from BusinessProfile:', { lat, lng });
        }

        // Only geocode address if explicit GMB coords are not provided
        const cityName = city || state?.selectedLocation?.address?.locality || '';
        const buildGeocodeAddress = () => {
          const parts = [];
          const addr = (displayAddress || '').replace(/[\n\r]+/g, ', ');
          if (addr) parts.push(addr);
          if (cityName && !addr.toLowerCase().includes(cityName.toLowerCase())) parts.push(cityName);
          if (businessTitle && !addr.toLowerCase().includes(businessTitle.toLowerCase())) parts.unshift(businessTitle);
          // Normalize commas and spaces
          return parts
            .filter(Boolean)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .join(', ')
            .replace(/\s*,\s*/g, ', ')
            .replace(/,{2,}/g, ',')
            .replace(/\s+/g, ' ')
            .trim();
        };
        const addressToGeocode = buildGeocodeAddress();
        if (!coordsResolved && apiKey && addressToGeocode) {
          try {
            geocodeTried = true;
            console.debug('[Geocode] Formatted address:', addressToGeocode);
            const params = new URLSearchParams({ address: addressToGeocode, key: apiKey || '' });
            const url = `${base}/maps/api/geocode/json?${params.toString()}`;
            const r = await fetch(url);
            if (!r.ok) throw new Error(`Geocode HTTP ${r.status}`);
            const data = await r.json();
            if (data?.status === 'OK' && Array.isArray(data.results) && data.results[0]?.geometry?.location) {
              const loc = data.results[0].geometry.location;
              if (typeof loc.lat === 'number' && typeof loc.lng === 'number') {
                lat = loc.lat;
                lng = loc.lng;
                geocodeSucceeded = true;
                usedSource = 'geocode_address';
                coordsResolved = true;
                console.debug('[Geocode] Using coordinates from address:', { addressToGeocode, lat, lng });
              }
            } else {
              console.debug('[Geocode] No results or non-OK status:', data?.status, data?.error_message || '');
            }
          } catch (e) {
            console.warn('[Geocode] Failed to geocode address; will try other sources. Error:', e?.message || e);
          }
        }

        // If still unresolved, prefer Place Details when place_id is known
        if (!geocodeSucceeded && !coordsResolved && myPlaceId) {
          try {
            const det = await getDetails(myPlaceId);
            const loc = det?.result?.geometry?.location;
            if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
              lat = loc.lat;
              lng = loc.lng;
              usedSource = 'place_details';
              coordsResolved = true;
              console.debug('[Place Details] Using provided place_id for geometry:', { myPlaceId, lat, lng });
            }
          } catch (e) {
            console.warn('[Place Details] Failed for provided place_id; falling back to Find Place if possible. Error:', e?.message || e);
          }
        }

        if (!coordsResolved && !myPlaceId) {
          const queryParts = [businessTitle, displayAddress].filter(Boolean).join(' ').trim();
          console.debug('[Find Place] Query:', queryParts);
          try {
            if (apiKey && queryParts) {
              const fp = await findPlace(queryParts);
              const candidate = Array.isArray(fp?.candidates) ? fp.candidates[0] : null;
              if (candidate?.place_id) {
                myPlaceId = candidate.place_id;
                // Prefer precise geometry from Details (can include more accurate coordinates)
                const det = await getDetails(myPlaceId);
                const loc = det?.result?.geometry?.location || candidate?.geometry?.location;
                if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
                  lat = loc.lat;
                  lng = loc.lng;
                }
                usedSource = 'find_place+details';
                coordsResolved = true;
                console.debug('[Find Place] Resolved my place_id and coordinates:', { myPlaceId, lat, lng });
              } else {
                console.debug('[Find Place] No candidate found. Using fallback coordinates.');
              }
            }
          } catch (e) {
            console.warn('[Find Place] Failed to resolve place_id; using fallbacks. Error:', e?.message || e);
          }
        }

        if (!coordsResolved) {
          // We are falling back to raw GMB latlng shapes
          usedSource = coordCandidates.target ? 'gmb_target_latlng' : (coordCandidates.business ? 'business_latlng' : (coordCandidates.state ? 'state_latlng' : 'none'));
        }
        console.debug('[Places Nearby] Coordinate sources:', {
          target: coordCandidates.target,
          business: coordCandidates.business,
          state: coordCandidates.state,
          explicit: coordCandidates.explicit,
          used: { lat, lng },
          usedSource,
          myPlaceId
        });

        const fetchNearby = async (radius, pageToken) => {
          const params = new URLSearchParams({
            location: `${lat},${lng}`,
            radius: String(radius),
            keyword: keyword || '',
            key: apiKey || ''
          });
          if (pageToken) params.append('pagetoken', pageToken);
          const url = `${base}/maps/api/place/nearbysearch/json?${params.toString()}`;
          const r = await fetch(url);
          if (!r.ok) {
            console.warn('[Places Nearby] HTTP error', r.status, r.statusText);
            throw new Error('Places Nearby fetch failed');
          }
          const data = await r.json();
          if (data?.status && data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            console.warn('[Places Nearby] API status:', data.status, data?.error_message || '');
          }
          return data;
        };

        // If no keyword provided, prompt user and stop
        if (!keyword) {
          console.debug('[Keywords] No keyword selected. Opening keyword editor dialog...');
          setEditKwOpen(true);
          return;
        }

        const resultsAll = [];
        if (apiKey && lat && lng && keyword) {
          const radii = [1000, 2000, 3000, 5000, 10000, 15000, 20000, 25000];
          console.groupCollapsed('[Places Nearby] Competitor discovery');
          console.log('Start params:', { lat, lng, keyword, radii });
          const seen = new Set();
          const makeKey = (p) => {
            if (!p) return null;
            if (p.place_id) return `id:${p.place_id}`;
            const n = (p.name || '').toLowerCase().trim();
            const v = (p.vicinity || '').toLowerCase().trim();
            const la = p.geometry?.location?.lat;
            const ln = p.geometry?.location?.lng;
            return `k:${n}|${v}|${la ?? ''},${ln ?? ''}`;
          };
          for (const rad of radii) {
            let pageToken = undefined;
            let pagesFetched = 0;
            console.log(`Radius ${rad}m: fetching...`);
            do {
              const data = await fetchNearby(rad, pageToken);
              const got = Array.isArray(data?.results) ? data.results.length : 0;
              let dupCount = 0;
              if (Array.isArray(data?.results)) {
                data.results.forEach((p) => {
                  const key = makeKey(p);
                  if (!key) return;
                  if (seen.has(key)) {
                    dupCount += 1; // skip duplicate
                    return;
                  }
                  seen.add(key);
                  resultsAll.push(p);
                });
              }
              pageToken = data?.next_page_token;
              pagesFetched += 1;
              console.log(`  Page ${pagesFetched}: status=${data?.status || 'n/a'}, got ${got} results, deduped ${dupCount}, total unique so far ${resultsAll.length}, next_page_token=${!!pageToken}`);
              if (pageToken) await sleep(2000);
            } while (pageToken && pagesFetched < 3 && resultsAll.length < 50);

            if (resultsAll.length >= 50) {
              console.log(`Reached 50+ competitors at radius ${rad}m, stopping radius expansion.`);
              break;
            }
          }

          // Identify "my" place by place_id when available; fallback to name+proximity
          const myName = (businessTitle || '').toLowerCase().trim();
          const toRad = (d) => (d * Math.PI) / 180;
          const haversine = (a, b) => {
            const R = 6371000; // meters
            const dLat = toRad((b.lat || 0) - (a.lat || 0));
            const dLng = toRad((b.lng || 0) - (a.lng || 0));
            const s1 = Math.sin(dLat / 2) ** 2;
            const s2 = Math.cos(toRad(a.lat || 0)) * Math.cos(toRad(b.lat || 0)) * Math.sin(dLng / 2) ** 2;
            return 2 * R * Math.asin(Math.sqrt(s1 + s2));
          };

          let myTotal = 0;
          let myCandidate = null;
          let myMatchBy = myPlaceId ? 'place_id' : 'name+proximity';
          if (myPlaceId) {
            myCandidate = resultsAll.find((p) => p.place_id === myPlaceId) || null;
          }
          if (!myCandidate) {
            myCandidate = resultsAll.find((p) => {
              const pName = (p.name || '').toLowerCase().trim();
              if (!p.geometry?.location) return false;
              const dist = haversine({ lat, lng }, { lat: p.geometry.location.lat, lng: p.geometry.location.lng });
              return myName && pName === myName && dist < 100; // name match and within 100m
            }) || null;
          }
          // If still not found and we have a place_id, use Place Details directly as a fallback for "my place"
          if (!myCandidate && myPlaceId) {
            try {
              const det = await getDetails(myPlaceId);
              const r = det?.result;
              if (r) {
                myCandidate = {
                  place_id: r.place_id || myPlaceId,
                  name: r.name,
                  user_ratings_total: r.user_ratings_total ?? 0,
                  rating: r.rating,
                  geometry: r.geometry,
                };
                myMatchBy = 'place_details_fallback';
                console.debug('[My Place] Using Place Details fallback:', { place_id: myPlaceId, name: r.name, user_ratings_total: myCandidate.user_ratings_total });
              }
            } catch (e) {
              console.warn('[My Place] Place Details fallback failed:', e?.message || e);
            }
          }
          if (myCandidate?.user_ratings_total != null) myTotal = myCandidate.user_ratings_total;
          console.log('My place match:', { found: !!myCandidate, myTotal, by: myMatchBy });

          // If not found by exact match, try best proximity by name contains
          if (!myTotal && myName) {
            const prox = resultsAll
              .map((p) => ({
                p,
                dist: p.geometry?.location ? haversine({ lat, lng }, { lat: p.geometry.location.lat, lng: p.geometry.location.lng }) : Infinity,
              }))
              .filter((x) => (x.p.name || '').toLowerCase().includes(myName))
              .sort((a, b) => a.dist - b.dist);
            if (prox[0]?.p?.user_ratings_total != null && prox[0].dist < 200) {
              myTotal = prox[0].p.user_ratings_total;
            }
            console.log('My place fuzzy/proximity check:', { candidate: prox[0]?.p?.name, dist: prox[0]?.dist, myTotal });
          }

          // Competitors average (exclude my candidate if matched)
          const competitors = resultsAll.filter((p) => p !== myCandidate && (p.user_ratings_total ?? 0) >= 0);
          const compTotals = competitors.map((p) => p.user_ratings_total || 0).filter((n) => typeof n === 'number');
          const compAvg = compTotals.length ? (compTotals.reduce((s, n) => s + n, 0) / compTotals.length) : 0;
          console.log('Competitor stats:', { totalFetched: resultsAll.length, competitorCount: competitors.length, compAvg });

          // Removed competitor products scraping and product-based comparison bonus
          // Proceed with generic competitor analysis without product data
          updateProgress('Analyzing competitors...', 96, ['Competitor Analysis']);
          await new Promise(resolve => setTimeout(resolve, 500));
          // Retain competitor discovery and distance table without product counts
          try {
            const compRows = competitors.map((p) => {
              const plat = p.geometry?.location?.lat;
              const plng = p.geometry?.location?.lng;
              const dist = (plat != null && plng != null) ? Math.round(haversine({ lat, lng }, { lat: plat, lng: plng })) : null;
              return {
                name: p.name || '(no name)',
                rating: p.rating ?? null,
                user_ratings_total: p.user_ratings_total ?? 0,
                distance_m: dist
              };
            });
            if (compRows.length) {
              console.table(compRows);
            }
          } catch (_) {
            // ignore console.table errors in some environments
          }

          if (compAvg > 0 && myTotal >= 0) {
            reviewsPts = Math.min(30, Math.round((myTotal / compAvg) * 30));
            score += reviewsPts;
            console.log('Review-based points computed:', { myTotal, compAvg, reviewsPts, capped: reviewsPts === 30 });
          }
          
          // 11.b) Velocity scoring (new reviews in last 30d vs competitor avg total reviews)
          try {
            // Get account info from available data sources - try multiple fallbacks
            let accId = account?.id;
            if (!accId) accId = business?.accountId || business?.accountName;
            if (!accId && typeof business?.name === 'string' && business.name.includes('accounts/')) {
              const parts = String(business.name).split('/');
              const idx = parts.indexOf('accounts');
              if (idx !== -1 && parts[idx + 1]) accId = parts[idx + 1];
            }
            
            // Try state sources
            if (!accId && state?.account?.id) accId = state.account.id;
            if (!accId && state?.selectedAccount?.id) accId = state.selectedAccount.id;
            if (!accId && state?.business?.accountId) accId = state.business.accountId;
            if (!accId && state?.locationData?.accountId) accId = state.locationData.accountId;
            if (!accId && state?.selectedLocation?.accountId) accId = state.selectedLocation.accountId;
            
            // Try extracting from location name pattern: accounts/{accountId}/locations/{locationId}
            if (!accId && targetLocation?.name) {
              const fullLocationName = String(targetLocation.name);
              if (fullLocationName.includes('accounts/') && fullLocationName.includes('/locations/')) {
                const match = fullLocationName.match(/accounts\/([^\/]+)\/locations/);
                if (match && match[1]) accId = match[1];
              }
            }
            
            const accountName = accId ? (String(accId).includes('accounts/') ? String(accId) : `accounts/${accId}`) : undefined;
            const accountId = (accountName && accountName.includes('accounts/')) ? accountName.split('/')[1] : undefined;
            const locationName = targetLocation?.name || '';
            const locationIdFromName = locationName ? String(locationName).split('/').pop() : undefined;

            // Debug logging for Velocity prerequisites
            console.log('[Velocity] Debug prerequisites:', {
              accountId,
              locationIdFromName,
              compAvg,
              accId,
              accountName,
              account: account ? { id: account.id, name: account.name } : null,
              business: business ? { 
                accountId: business.accountId, 
                accountName: business.accountName, 
                name: business.name 
              } : null,
              targetLocation: targetLocation ? { name: targetLocation.name } : null,
              state: state ? {
                selectedAccount: state.selectedAccount,
                account: JSON.stringify(state.account),
                locationData: JSON.stringify(state.locationData),
                selectedLocation: JSON.stringify(state.selectedLocation),
                business: JSON.stringify(state.business)
              } : null
            });

            if (accountId && locationIdFromName && compAvg > 0) {
              updateProgress('Calculating review velocity...', 97, ['Competitor Analysis']);
              // Fetch count of reviews in last 30 days
              const newReviews30 = await GMBService.getNewReviewsCountLast30Days(undefined, accountId, locationIdFromName);
              const rawVelocity = (newReviews30 / compAvg) * 12;
              velocityPts = Math.min(12, Number.isFinite(rawVelocity) ? rawVelocity : 0);
              score += velocityPts;
              console.log('[Velocity] Computation:', {
                newReviews30,
                compAvg,
                rawVelocity: Number.isFinite(rawVelocity) ? rawVelocity.toFixed(3) : rawVelocity,
                finalPoints: velocityPts,
                formula: 'MIN((New_Reviews_30d / AvgCompetitorReviews) * 12, 12)',
                maxPoints: 12
              });
              // Structured velocity log via service helper
              CompetitorDiscoveryService.logVelocityCalculation({
                newReviews30,
                avgCompetitorReviews: compAvg,
                rawPoints: rawVelocity,
                finalPoints: velocityPts
              });
            } else {
              console.log('[Velocity] Skipped: missing account/location or compAvg <= 0', { accountId, locationIdFromName, compAvg });
            }
          } catch (ve) {
            console.warn('[Velocity] Failed to compute velocity score:', ve);
          }
          console.groupEnd();
        }
      } catch (e) {
        // Swallow errors; keep points at 0
      }

      // Console breakdown (raw only)
      try {
        console.groupCollapsed('[Profile Strength] Scoring Breakdown');
        console.log('Account verificationState:', account?.verificationState);
        console.log('Target location:', targetLocation?.name || targetLocation?.title || '(none)');
        console.log('Title:', businessTitle);
        console.log('City:', city);
        console.log('Address used:', addr);
        console.log('Selected keywords:', keywords);
        console.table([
          { factor: 'Verification', details: { isVerified, isSoftSuspended, isUnverified }, points: verPts },
          { factor: 'Business name contains city', details: { containsCity: !!(businessTitle && city && businessTitle.toLowerCase().includes(city.toLowerCase())) }, points: namePts },
          { factor: 'Address', details: { hasCity, hasKeyword, hasAnyAddressFields }, points: addrPts },
          { factor: 'Phone number', details: { hasPhone }, points: phonePts },
          { factor: 'Description length', details: { wordCount }, points: descPts },
          { factor: 'Website link', details: { hasWebsite }, points: websitePts },
          { factor: 'Timings (hours)', details: { hasHours }, points: hoursPts },
          { factor: 'Labels', details: { hasLabels }, points: labelPts },
          { factor: 'Categories (primary)', details: { hasPrimary: !!primaryCategory }, points: catBasePts },
          { factor: 'Categories (additional)', details: { additionalCount: Array.isArray(additionalCats) ? additionalCats.length : 0 }, points: catExtraPts },
          { factor: 'Category mentions city', details: { hasCityInCategory }, points: catCityPts },
          { factor: 'Social media attached', details: { hasSocial }, points: socialPts },
          { factor: 'Appointments link', details: { hasAppt }, points: appointmentsPts },
          { factor: 'Service area', details: { hasServiceArea }, points: serviceAreaPts },
          { factor: 'Book appointment (explicit)', details: { hasBookAppointment }, points: bookApptPts },
          { factor: 'Q&A section present', details: { hasQASection }, points: qaPts },
          { factor: 'Review Rating', details: { myRating, capped: reviewRatingPts === 20 }, points: reviewRatingPts },
          { factor: 'Response Rate', details: { responseRate: `${responseRate}%` }, points: responseRatePts },
          { factor: 'Reviews vs competitors', details: {}, points: reviewsPts },
          { factor: 'Velocity (30d)', details: { formula: 'min((new30/compAvg)*12,12)' }, points: velocityPts },
          { factor: 'TOTAL (raw)', details: {}, points: score }
        ]);
        console.groupEnd();
      } catch (_) {}

      updateProgress('Finalizing analysis...', 98, ['Competitor Analysis']);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isMounted) {
        // Round to nearest integer before saving
        setProfileScore(Math.round(score));
        updateProgress('Analysis complete!', 100, ['Final Score Calculation']);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsCalculating(false);
      }
    };

    computeScore();
    return () => { isMounted = false; };
  }, [account?.verificationState, targetLocation, displayAddress, keywordsState, business?.title, business?.businessName]);

  // Edit icon now opens the keyword editor dialog
  const openKeywordEditor = () => setEditKwOpen(true);

  const handleViewHeatMap = () => {
    // Handle view heat map action
    console.log('View Heat Map clicked');
  };

  const toggleKeyword = (kw) => {
    setKeywordsState((prev) => {
      const exists = prev.includes(kw);
      if (exists) return prev.filter(k => k !== kw);
      if (prev.length >= 3) return prev; // limit 3
      return [...prev, kw];
    });
  };

  const handleSaveKeywords = () => {
    // Merge manual keywords (comma-separated), enforce limit 3
    const manualParts = manualKw.split(',').map(s => s.trim()).filter(Boolean);
    setKeywordsState((prev) => [...prev, ...manualParts].slice(0, 3));
    setEditKwOpen(false);
  };

  // Define all analysis steps for the loading UI
  const analysisSteps = [
    'Verification Status',
    'Business Name Analysis', 
    'Address Analysis',
    'Contact Information',
    'Description Analysis',
    'Website Analysis',
    'Business Hours',
    'Labels Analysis',
    'Categories & Services',
    'Competitor Analysis',
    'Final Score Calculation'
  ];

  return (
    <DashboardLayout>
      <MainContent>
        <ContentSection style={{ position: 'relative' }}>
          {isCalculating && (
            <LoadingOverlay>
              <LoadingContainer>
                <LoadingTitle>Analyzing Your Profile Strength</LoadingTitle>
                <LoadingSubtitle>
                  Our AI is performing a comprehensive analysis of your business profile
                </LoadingSubtitle>
                
                <ProgressSection>
                  <ProgressPercentage>{stepProgress}%</ProgressPercentage>
                  <ProgressBar variant="determinate" value={stepProgress} />
                  <CurrentStepText key={currentStep}>{currentStep}</CurrentStepText>
                </ProgressSection>

                <StepsContainer>
                  {analysisSteps.map((step, index) => (
                    <StepItem key={step} completed={completedSteps.includes(step)}>
                      <StepIcon completed={completedSteps.includes(step)}>
                        {completedSteps.includes(step) ? '✓' : index + 1}
                      </StepIcon>
                      <StepText completed={completedSteps.includes(step)}>
                        {step}
                      </StepText>
                    </StepItem>
                  ))}
                </StepsContainer>
              </LoadingContainer>
            </LoadingOverlay>
          )}

          <HeaderSection>
            <MainTitle>Profile Strength</MainTitle>
            <Description>
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
            </Description>
          </HeaderSection>

          <SummaryCard>
            <SummaryColumn>
              <SummaryLabel>Select Account*</SummaryLabel>
              <SummaryValue>{resolvedAccountName || '—'}</SummaryValue>
            </SummaryColumn>
            
            <VerticalDivider />
            
            <SummaryColumn>
              <SummaryLabel>Selected Keyword*</SummaryLabel>
              <SummaryValue>{keywordsState.length ? keywordsState.join(', ') : '—'}</SummaryValue>
            </SummaryColumn>
            
            <VerticalDivider />
            
            <SummaryColumn>
              <SummaryLabel>Location*</SummaryLabel>
              <SummaryValue>{displayAddress || '—'}</SummaryValue>
            </SummaryColumn>

            <EditButton onClick={openKeywordEditor}>
              <EditIcon width={17} height={17} color="#0B91D6" />
            </EditButton>
          </SummaryCard>

          <ResultsSection>
            <ScoreSection>
              <ScoreLabel>Profile Strength Score</ScoreLabel>
              <ScoreValue>{profileScore} / 300</ScoreValue>
            </ScoreSection>

            <ChartContainer>
              <ChartImage 
                src="/images/profile-strength-chart.svg" 
                alt="Profile Strength Chart"
              />
            </ChartContainer>

            <AboutSection>
              <AboutTitle>About Company Strength</AboutTitle>
              <AboutText>
                Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.
              </AboutText>
              
              <LegendContainer>
                {legendItems.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendDot color={item.color} />
                    <LegendText>{item.label}</LegendText>
                  </LegendItem>
                ))}
              </LegendContainer>
            </AboutSection>
          </ResultsSection>

          <ViewHeatMapButton onClick={handleViewHeatMap}>
            View Heat Map
          </ViewHeatMapButton>

        </ContentSection>
      </MainContent>

      <Dialog open={editKwOpen} onClose={() => setEditKwOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Keywords (max 3)</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {predefinedKeywords.map((kw) => (
              <Chip
                key={kw}
                label={kw}
                color={keywordsState.includes(kw) ? 'primary' : 'default'}
                onClick={() => toggleKeyword(kw)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
          <TextField
            fullWidth
            label="Add manual keywords (comma-separated)"
            placeholder="e.g., Spa, Zirakpur"
            value={manualKw}
            onChange={(e) => setManualKw(e.target.value)}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Currently selected: {keywordsState.join(', ') || '—'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditKwOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveKeywords}>Save</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProfileStrengthResults;