import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getYourData } from '../../utils/yourDataStore';
import { Box, Stack, Typography, Button, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import CompetitorDiscoveryService from '../../services/CompetitorDiscoveryService';
import ReviewsScoring from '../Performance/components/ReviewsScoring';
import AnalysisLoadingPopup from '../ProfileStrengthResults/components/AnalysisLoadingPopup';

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

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  color: '#121927'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '20px'
}));

const FormSection = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const FormFieldContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: '8px'
}));

const StyledSelect = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 18px',
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#0B91D6'
  }
}));

const SelectPlaceholder = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const KeywordsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '14px',
  marginTop: '16px'
}));

const KeywordChip = styled(Chip)(({ theme, selected }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  height: '32px',
  borderRadius: '16px',
  backgroundColor: selected ? '#34A853' : '#ffffff',
  color: selected ? '#ffffff' : '#121927',
  border: selected ? 'none' : '1px solid #E5E7EB',
  '&:hover': {
    backgroundColor: selected ? '#2E8B47' : '#F9FAFB'
  },
  '& .MuiChip-label': {
    padding: '6px 12px'
  }
}));

const ManualKeywordsField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    '& fieldset': {
      border: '0.2px solid #A0A0AA'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6',
      borderWidth: '1px'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927',
      padding: '16px 18px',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
}));

const ContinueButton = styled(Button)(({ theme }) => ({
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

const predefinedKeywords = [
  'Property',
  'Buy/Rent Property', 
  'Builder',
  'Tiles work',
  'Wooden flowing',
  'Civil work'
];

const ProfileStrengthAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedBusinesses = location.state?.businesses || [];
  const accounts = passedBusinesses.map(b => {
    // Try to derive accountId and locationId from multiple sources
    const parsedAccId = (typeof b?.name === 'string' && b.name.includes('accounts/')) ? b.name.split('/')[1] : undefined;
    const accId = b.accountId || b.accountName || parsedAccId;
    const parsedLocId = (typeof b?.name === 'string' && b.name.includes('/locations/')) ? b.name.split('/').pop() : undefined;
    const locId = b.locationId || b.id || parsedLocId;
    return {
      id: accId || locId, // keep backward compatibility but prefer account id
      name: b.name || b.businessName,
      address: b.address || b.formattedAddress,
      raw: b,
      accountId: accId,
      locationId: locId
    };
  });

  const [selectedAccount, setSelectedAccount] = useState(location.state?.selected?.name || '');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [manualKeywords, setManualKeywords] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [showAnalysisPopup, setShowAnalysisPopup] = useState(false);
  const [competitorScoreData, setCompetitorScoreData] = useState(null);

  const accountSelectRef = useRef(null);
  const keywordsSelectRef = useRef(null);
  const manualInputRef = useRef(null);

  const handleKeywordToggle = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else if (selectedKeywords.length < 3) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
    // After selecting a keyword, move focus to manual keywords input
    if (manualInputRef.current) {
      manualInputRef.current.focus();
    }
  };

  const handleOpenEdit = () => setEditDialogOpen(true);
  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setNewKeyword('');
  };
  const handleRemoveKeyword = (k) => setSelectedKeywords(selectedKeywords.filter(x => x !== k));
  const handleAddKeyword = () => {
    const k = newKeyword.trim();
    if (!k) return;
    if (selectedKeywords.length >= 3) return;
    if (selectedKeywords.includes(k)) return;
    setSelectedKeywords([...selectedKeywords, k]);
    setNewKeyword('');
  };

  const handleContinue = async () => {
    // Show analysis popup
    setShowAnalysisPopup(true);

    // Merge predefined selected + manual keywords (manual split by comma)
    const manualParts = manualKeywords
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);
    const keywords = [...selectedKeywords, ...manualParts].slice(0, 3);

    // Run competitor discovery in the background
    try {
      const selectedBiz = accounts.find(a => a.name === selectedAccount) || {};
      const raw = selectedBiz?.raw || location.state?.selected || {};
      
      console.log('[Competitor Discovery] Debug - selectedAccount:', selectedAccount);
      console.log('[Competitor Discovery] Debug - selectedBiz:', selectedBiz);
      console.log('[Competitor Discovery] Debug - raw data:', raw);
      console.log('[Competitor Discovery] Debug - location.state:', location.state);
      
      let latitude = raw?.latlng?.latitude;
      let longitude = raw?.latlng?.longitude;
      const placeId = raw?.id || raw?.place_id;
      
      console.log('[Competitor Discovery] Debug - initial latitude:', latitude);
      console.log('[Competitor Discovery] Debug - initial longitude:', longitude);
      console.log('[Competitor Discovery] Debug - placeId:', placeId);
      
      // If we don't have coordinates, try different approaches
      if (!latitude || !longitude) {
        // Try to fetch from place ID first
        if (placeId) {
          console.log('[Competitor Discovery] Fetching coordinates from place ID:', placeId);
          try {
            const placeDetails = await CompetitorDiscoveryService.getPlaceDetails(placeId);
            
            if (placeDetails?.geometry?.location) {
              latitude = placeDetails.geometry.location.lat;
              longitude = placeDetails.geometry.location.lng;
              console.log('[Competitor Discovery] Fetched coordinates - lat:', latitude, 'lng:', longitude);
            }
          } catch (placeError) {
            console.warn('[Competitor Discovery] Failed to fetch place details from place ID:', placeError);
          }
        }
        
        // If still no coordinates, try geocoding the address
        if ((!latitude || !longitude) && raw?.address) {
          console.log('[Competitor Discovery] Attempting to geocode address:', raw.address);
          try {
            const geocodeResult = await CompetitorDiscoveryService.geocodeAddress(raw.address);
            if (geocodeResult?.lat && geocodeResult?.lng) {
              latitude = geocodeResult.lat;
              longitude = geocodeResult.lng;
              console.log('[Competitor Discovery] Geocoded coordinates - lat:', latitude, 'lng:', longitude);
            }
          } catch (geocodeError) {
            console.warn('[Competitor Discovery] Failed to geocode address:', geocodeError);
          }
        }
        
        // Final fallback: use a default location (Delhi, India as example)
        if (!latitude || !longitude) {
          console.warn('[Competitor Discovery] Using default location (Delhi, India) as fallback');
          latitude = 28.6139;
          longitude = 77.2090;
        }
      }
      
      const allKeywords = [...selectedKeywords, ...manualKeywords.split(',').map(k => k.trim()).filter(Boolean)].slice(0, 3);
      const primaryKeyword = allKeywords[0];
      
      console.log('[Competitor Discovery] Debug - selectedKeywords:', selectedKeywords);
      console.log('[Competitor Discovery] Debug - manualKeywords:', manualKeywords);
      console.log('[Competitor Discovery] Debug - allKeywords:', allKeywords);
      console.log('[Competitor Discovery] Debug - primaryKeyword:', primaryKeyword);

      if (latitude && longitude && primaryKeyword) {
        console.log('[Competitor Discovery] Starting analysis for keyword:', primaryKeyword);
        
        const competitors = await CompetitorDiscoveryService.findCompetitors({
          latitude,
          longitude,
          keyword: primaryKeyword,
          excludePlaceId: placeId
        });

        // Just pass the competitor data to ProfileStrengthResults for velocity calculation there
        console.log('[Competitor Discovery] Found competitors:', competitors.length);
        
        // Navigate to results with raw competitor data (velocity calculation will happen in ProfileStrengthResults)
        navigate('/profile-strength-results', {
          state: {
            business: selectedBiz,
            keywords,
            address,
            competitors: competitors, // Pass raw competitor data
            selected: raw
          }
        });
        return; // Exit early since we've navigated
      } else {
        console.warn('[Competitor Discovery] Missing location or keyword. Skipping analysis.');
        console.warn('[Competitor Discovery] Missing data - latitude:', latitude, 'longitude:', longitude, 'primaryKeyword:', primaryKeyword);
      }
    } catch (error) {
      console.error('Failed to run competitor discovery:', error);
    }

    // Resolve selected business for address and id
    const selectedBiz = accounts.find(a => a.name === selectedAccount) || null;
    const raw = selectedBiz?.raw || location.state?.selected || null;
    let address = selectedBiz?.address || raw?.address || raw?.formattedAddress || '';
    
    if (raw?.storefrontAddress) {
      const sa = raw.storefrontAddress;
      const parts = [];
      if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
      if (sa.locality) parts.push(sa.locality);
      if (sa.administrativeArea) parts.push(sa.administrativeArea);
      if (sa.postalCode) parts.push(sa.postalCode);
      if (sa.regionCode) parts.push(sa.regionCode);
      address = parts.join(', ');
    }

    // Navigate to results without competitor data (fallback case)
    navigate('/profile-strength-results', {
      state: {
        business: selectedBiz,
        keywords,
        address,
        competitors: [], // No competitors found
        selected: raw
      }
    });
  };

  return (
    <DashboardLayout>
      <MainContent>
        <ContentSection>
          <HeaderSection>
            <MainTitle>Just one step</MainTitle>
            <SubTitle>Let's analyses the strength of your profile</SubTitle>
          </HeaderSection>
          
          <Description>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </Description>

          <FormSection>
            <FormContainer>
              <FormFieldContainer>
                <Box>
                  <FieldLabel>Select Account*</FieldLabel>
                  <Box sx={{ position: 'relative' }}>
                    <StyledSelect ref={accountSelectRef} onClick={() => setAccountMenuOpen((v) => !v)}>
                      <SelectPlaceholder>{selectedAccount || 'Enter Account'}</SelectPlaceholder>
                      <DropdownArrowIcon width={7} height={4} color="#0B91D6" />
                    </StyledSelect>
                    {accountMenuOpen && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: '52px',
                          backgroundColor: '#fff',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          zIndex: 10,
                          maxHeight: '220px',
                          overflowY: 'auto'
                        }}
                      >
                        {accounts.map((acc) => (
                          <Box
                            key={acc.name}
                            sx={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              '&:hover': { backgroundColor: '#F9FAFB' }
                            }}
                            onClick={() => {
                              setSelectedAccount(acc.name);
                              setAccountMenuOpen(false);
                            }}
                          >
                            {acc.name}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box>
                  <FieldLabel>Select Your keywords*(Select up-to three)</FieldLabel>
                  <StyledSelect ref={keywordsSelectRef} onClick={() => manualInputRef.current && manualInputRef.current.focus()}>
                    {selectedKeywords.length ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedKeywords.map((k) => (
                          <Chip
                            key={k}
                            label={k}
                            size="small"
                            onDelete={() => handleKeywordToggle(k)}
                            sx={{
                              borderRadius: '16px',
                              backgroundColor: '#0B91D6',
                              color: '#fff',
                              '& .MuiChip-deleteIcon': { color: '#fff' }
                            }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <SelectPlaceholder>Select keywords</SelectPlaceholder>
                    )}
                    <DropdownArrowIcon width={7} height={4} color="#A0A0AA" />
                  </StyledSelect>
                  
                  <KeywordsContainer>
                    {predefinedKeywords.map((keyword) => (
                      <KeywordChip
                        key={keyword}
                        label={keyword}
                        selected={selectedKeywords.includes(keyword)}
                        onClick={() => handleKeywordToggle(keyword)}
                        clickable
                      />
                    ))}
                  </KeywordsContainer>
                </Box>
              </FormFieldContainer>

              <Box>
                <FieldLabel>Write Keywords Manually</FieldLabel>
                <ManualKeywordsField
                  fullWidth
                  placeholder="Enter keywords"
                  value={manualKeywords}
                  onChange={(e) => setManualKeywords(e.target.value)}
                  variant="outlined"
                  inputRef={manualInputRef}
                />
              </Box>
            </FormContainer>

            <ContinueButton onClick={handleContinue}>
              Continue
            </ContinueButton>
          
          </FormSection>
        </ContentSection>
      </MainContent>

      {/* Analysis Loading Popup */}
      <AnalysisLoadingPopup 
        open={showAnalysisPopup}
        onClose={() => setShowAnalysisPopup(false)}
      />
    </DashboardLayout>
  );
};

export default ProfileStrengthAnalysis;