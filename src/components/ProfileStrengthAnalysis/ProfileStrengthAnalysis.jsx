import React, { useRef, useState } from 'react';
import { Box, Stack, Typography, Button, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import EditIcon from '../icons/EditIcon';
import AnalysisLoadingPopup from '../ProfileStrengthResults/components/AnalysisLoadingPopup';
import EnhancedScorePopup from '../ProfileStrengthResults/components/EnhancedScorePopup';

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
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [profileScore, setProfileScore] = useState(0);

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

  const handleContinue = () => {
    // Show analysis popup instead of navigating immediately
    setShowAnalysisPopup(true);
  };

  const handleAnalysisComplete = () => {
    // Calculate real profile strength score using the same logic as ProfileStrengthResults
    const calculateProfileScore = () => {
      const selectedBiz = accounts.find(a => a.name === selectedAccount) || null;
      const raw = selectedBiz?.raw || location.state?.selected || null;
      
      console.log('[ProfileStrengthAnalysis] Starting score calculation...');
      console.log('[ProfileStrengthAnalysis] Selected business:', selectedBiz);
      console.log('[ProfileStrengthAnalysis] Raw data:', raw);
      
      let score = 0;
      
      // 1) Verification status
      const verificationState = String(raw?.verificationState || '').toUpperCase();
      const isVerified = verificationState === 'VERIFIED' || raw?.verified === true;
      const isSoftSuspended = String(raw?.metadata?.placeSuspensionReason || '').toUpperCase().includes('SOFT');
      const isUnverified = !isVerified && !isSoftSuspended;
      
      let verPts = 0;
      if (isVerified) verPts = 0;
      else if (isSoftSuspended) verPts = -60;
      else if (isUnverified) verPts = -100;
      score += verPts;
      console.log('[Score] Verification:', { verificationState, isVerified, isSoftSuspended, isUnverified, points: verPts, totalScore: score });
      
      // 2) Business name contains city
      const businessTitle = raw?.title || raw?.name || raw?.businessName || selectedBiz?.name || '';
      const city = raw?.storefrontAddress?.locality || '';
      let namePts = 0;
      if (businessTitle && city && businessTitle.toLowerCase().includes(city.toLowerCase())) {
        namePts = 20;
      } else if (businessTitle) {
        namePts = 10;
      }
      score += namePts;
      console.log('[Score] Business Name:', { businessTitle, city, hasCity: businessTitle && city && businessTitle.toLowerCase().includes(city.toLowerCase()), points: namePts, totalScore: score });
      
      // 3) Address scoring
      let address = selectedBiz?.address || raw?.address || raw?.formattedAddress || '';
      if (raw?.storefrontAddress) {
        const sa = raw.storefrontAddress;
        const parts = [];
        if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
        if (sa.locality) parts.push(sa.locality);
        const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
        if (tail) parts.push(tail);
        const full = parts.join(', ').trim();
        if (full) address = full;
      }
      
      const hasCity = !!city && address.toLowerCase().includes(city.toLowerCase());
      const keywords = [...selectedKeywords, ...manualKeywords.split(',').map(k => k.trim()).filter(Boolean)]
        .slice(0, 3)
        .map(k => k.toLowerCase());
      const hasKeyword = keywords.some(k => address.toLowerCase().includes(k));
      const hasAnyAddressFields = !!(raw?.storefrontAddress?.locality || raw?.storefrontAddress?.administrativeArea || raw?.storefrontAddress?.postalCode);
      
      let addrPts = 0;
      if (hasCity && hasKeyword) {
        addrPts = 20;
      } else if (address) {
        addrPts = 12;
      } else if (!hasAnyAddressFields) {
        addrPts = 2;
      }
      score += addrPts;
      console.log('[Score] Address:', { address, city, keywords, hasCity, hasKeyword, hasAnyAddressFields, points: addrPts, totalScore: score });
      
      // 4) Phone number
      const hasPhone = !!(raw?.phoneNumbers?.primaryPhone || raw?.phoneNumbers?.additionalPhones?.length);
      const phonePts = hasPhone ? 100 : 0;
      score += phonePts;
      console.log('[Score] Phone:', { hasPhone, points: phonePts, totalScore: score });
      
      // 5) Description length
      const description = raw?.profile?.description || '';
      const wordCount = description ? (description.trim().split(/\s+/).filter(Boolean).length) : 0;
      let descPts = 0;
      if (wordCount > 0 && wordCount <= 400) {
        descPts = 5;
      } else if (wordCount >= 700) {
        descPts = 10;
      }
      score += descPts;
      console.log('[Score] Description:', { description: description.substring(0, 100) + '...', wordCount, points: descPts, totalScore: score });
      
      // 6) Website link presence
      const hasWebsite = !!raw?.websiteUri;
      const websitePts = hasWebsite ? 5 : 0;
      score += websitePts;
      console.log('[Score] Website:', { hasWebsite, websiteUri: raw?.websiteUri, points: websitePts, totalScore: score });
      
      // 7) Business hours
      const hasHours = !!(raw?.regularHours?.periods?.length || raw?.moreHours?.length);
      const hoursPts = hasHours ? 5 : 0;
      score += hoursPts;
      console.log('[Score] Hours:', { hasHours, points: hoursPts, totalScore: score });
      
      // 8) Labels
      const hasLabels = Array.isArray(raw?.labels) && raw.labels.length > 0;
      const labelPts = hasLabels ? 10 : 0;
      score += labelPts;
      console.log('[Score] Labels:', { hasLabels, labels: raw?.labels, points: labelPts, totalScore: score });
      
      // 9) Categories scoring
      const catInfo = raw?.categories || {};
      const primaryCategory = catInfo?.primaryCategory || catInfo?.primary || null;
      const additionalCats = Array.isArray(catInfo?.additionalCategories) ? catInfo.additionalCategories : [];
      
      let catBasePts = 0;
      let catExtraPts = 0;
      if (primaryCategory) catBasePts = 25;
      const extraCount = Math.max(0, Math.min(additionalCats.length, 2));
      catExtraPts = extraCount * 5;
      score += (catBasePts + catExtraPts);
      console.log('[Score] Categories:', { primaryCategory, additionalCats, catBasePts, catExtraPts, totalCatPts: catBasePts + catExtraPts, totalScore: score });
      
      // 10) City mentioned in category name
      const cityLc = city.toLowerCase();
      const extractCatNames = () => {
        const names = [];
        if (primaryCategory) {
          names.push(primaryCategory.displayName || primaryCategory.name || primaryCategory);
        }
        additionalCats.forEach((c) => {
          names.push(c?.displayName || c?.name || c);
        });
        return names.filter(Boolean);
      };
      const catNames = extractCatNames();
      const hasCityInCategory = !!(cityLc && catNames.some(n => String(n).toLowerCase().includes(cityLc)));
      const cityCatPts = hasCityInCategory ? 10 : 0;
      score += cityCatPts;
      console.log('[Score] City in Category:', { city, categoryNames: catNames, hasCityInCategory, points: cityCatPts, totalScore: score });

      // 11) Social media attached (+5 if present)
      let socialPts = 0;
      const socialDomains = ['facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'linkedin.com', 'youtube.com', 't.me', 'telegram.me', 'pinterest.', 'tiktok.com'];
      const looksSocialUrl = (u) => {
        if (!u || typeof u !== 'string') return false;
        const s = u.toLowerCase();
        return socialDomains.some(d => s.includes(d));
      };
      const collectLinks = () => {
        const out = [];
        const tl = raw || {};
        const candidates = [];
        if (Array.isArray(tl.socialLinks)) candidates.push(...tl.socialLinks);
        if (Array.isArray(tl?.profile?.socialLinks)) candidates.push(...tl.profile.socialLinks);
        if (Array.isArray(tl.links)) candidates.push(...tl.links);
        if (Array.isArray(tl.profiles)) candidates.push(...tl.profiles);
        if (Array.isArray(tl.additionalUrls)) candidates.push(...tl.additionalUrls);
        if (Array.isArray(tl?.profile?.urls)) candidates.push(...tl.profile.urls);
        if (tl.websiteUri) candidates.push(tl.websiteUri);
        candidates.forEach((v) => {
          if (!v) return;
          if (typeof v === 'string') out.push(v);
          else if (v?.url) out.push(v.url);
          else if (v?.link) out.push(v.link);
        });
        return out.filter(Boolean);
      };
      const allLinks = collectLinks();
      const hasSocial = allLinks.some(looksSocialUrl);
      socialPts = hasSocial ? 5 : 0;
      score += socialPts;
      console.log('[Score] Social Media:', { hasSocial, allLinks, points: socialPts, totalScore: score });

      // 12) Appointments link (+5 if present)
      let appointmentsPts = 0;
      const hasApptDirect = !!(
        raw?.appointmentLinks ||
        raw?.appointmentLink ||
        raw?.appointmentsLink ||
        raw?.profile?.appointmentLink ||
        raw?.profile?.appointmentUrl ||
        raw?.metadata?.appointmentLink
      );
      const attrs = raw?.attributes || {};
      const attrKeys = Object.keys(attrs).map(k => k.toLowerCase());
      const hasApptAttr = attrKeys.some(k => k.includes('appointment') || k.includes('booking'));
      const hasApptUrlInAttrs = Object.values(attrs).some(v => {
        if (typeof v === 'string') return /http(s)?:\/\//i.test(v) && (v.toLowerCase().includes('book') || v.toLowerCase().includes('appoint'));
        if (Array.isArray(v)) return v.some(x => typeof x === 'string' && /http(s)?:\/\//i.test(x) && (x.toLowerCase().includes('book') || x.toLowerCase().includes('appoint')));
        return false;
      });
      const hasAppt = !!(hasApptDirect || hasApptAttr || hasApptUrlInAttrs);
      appointmentsPts = hasAppt ? 5 : 0;
      score += appointmentsPts;
      console.log('[Score] Appointments:', { hasAppt, points: appointmentsPts, totalScore: score });

      // 13) Service area (+5 if present)
      let serviceAreaPts = 0;
      const sa = raw?.serviceArea || null;
      const hasServiceArea = !!(
        sa && (
          (Array.isArray(sa?.places) && sa.places.length > 0) ||
          sa?.placeId || sa?.radius || sa?.businessArea || sa?.regionCode ||
          Object.keys(sa || {}).length > 0
        )
      );
      serviceAreaPts = hasServiceArea ? 5 : 0;
      score += serviceAreaPts;
      console.log('[Score] Service Area:', { hasServiceArea, points: serviceAreaPts, totalScore: score });

      // 14) Book Appointment explicit (+5 if present)
      let bookApptPts = 0;
      const linkLooksBook = (u) => typeof u === 'string' && /http(s)?:\/\//i.test(u) && /(book|reserve|booking)/i.test(u);
      const hasBookByLinks = Array.isArray(allLinks) && allLinks.some(linkLooksBook);
      const hasBookByFields = !!(
        raw?.appointmentLinks ||
        raw?.appointmentLink ||
        raw?.appointmentsLink ||
        raw?.profile?.appointmentLink ||
        raw?.profile?.appointmentUrl ||
        raw?.metadata?.appointmentLink
      );
      const hasBookAppointment = !!(hasBookByLinks || hasBookByFields);
      bookApptPts = hasBookAppointment ? 5 : 0;
      score += bookApptPts;
      console.log('[Score] Book Appointment:', { hasBookAppointment, points: bookApptPts, totalScore: score });

      // 15) Q&A section present (+5 if present)
      let qaPts = 0;
      const qnaCandidates = [
        raw?.qna,
        raw?.qa,
        raw?.questions,
        raw?.questionsAndAnswers,
        raw?.communityQuestions
      ];
      const hasQAByStructure = qnaCandidates.some(v => Array.isArray(v) ? v.length > 0 : (v && typeof v === 'object' && Object.keys(v).length > 0));
      const hasQASection = !!hasQAByStructure;
      qaPts = hasQASection ? 5 : 0;
      score += qaPts;
      console.log('[Score] Q&A Section:', { hasQASection, points: qaPts, totalScore: score });

      // 16) Reviews vs competitors (simplified - just check if reviews exist)
      let reviewsPts = 0;
      const hasReviews = !!(raw?.reviews || raw?.reviewCount || raw?.rating);
      reviewsPts = hasReviews ? 5 : 0;
      score += reviewsPts;
      console.log('[Score] Reviews:', { hasReviews, points: reviewsPts, totalScore: score });
      
      // Ensure score is within reasonable bounds (0-300)
      const baseScore = 150; // Add base score to ensure reasonable range
      const finalScore = Math.max(0, Math.min(300, score + baseScore));
      
      console.log('[Score] FINAL CALCULATION:', {
        rawScore: score,
        baseScore: baseScore,
        finalScore: finalScore,
        breakdown: {
          verification: verPts,
          businessName: namePts,
          address: addrPts,
          phone: phonePts,
          description: descPts,
          website: websitePts,
          hours: hoursPts,
          labels: labelPts,
          categories: catBasePts + catExtraPts,
          cityInCategory: cityCatPts,
          socialMedia: socialPts,
          appointments: appointmentsPts,
          serviceArea: serviceAreaPts,
          bookAppointment: bookApptPts,
          qaSection: qaPts,
          reviews: reviewsPts
        }
      });
      
      return finalScore;
    };
    
    const calculatedScore = calculateProfileScore();
    setProfileScore(calculatedScore);
    
    // Hide analysis popup and show score popup
    setShowAnalysisPopup(false);
    setShowScorePopup(true);
  };

  const handleScorePopupClose = () => {
    setShowScorePopup(false);
    
    // Now navigate to results page with all the data
    // Merge predefined selected + manual keywords (manual split by comma)
    const manualParts = manualKeywords
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);
    const keywords = [...selectedKeywords, ...manualParts].slice(0, 3);

    // Resolve selected business for address and id
    const selectedBiz = accounts.find(a => a.name === selectedAccount) || null;
    // If we have the raw GMB location, format like BusinessProfile.jsx
    const raw = selectedBiz?.raw || location.state?.selected || null;
    let address = selectedBiz?.address || raw?.address || raw?.formattedAddress || '';
    // Always prefer storefrontAddress when available to build a complete address
    if (raw?.storefrontAddress) {
      const sa = raw.storefrontAddress;
      const parts = [];
      if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
      if (sa.locality) parts.push(sa.locality);
      const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
      if (tail) parts.push(tail);
      const full = parts.join(', ').trim();
      if (full) address = full;
    }

    // Build a robust account object: ensure id is always an Account ID (not a Location ID)
    const parseAccountIdFromName = (name) => {
      if (typeof name !== 'string') return undefined;
      // Expected shapes: "accounts/<accId>/locations/<locId>" or just "accounts/<accId>"
      const parts = name.split('/');
      const idx = parts.indexOf('accounts');
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
      return undefined;
    };

    const selectedRawName = raw?.name || location.state?.selected?.name;
    const derivedAccId = selectedBiz?.accountId 
      || parseAccountIdFromName(selectedRawName)
      || parseAccountIdFromName(location.state?.selected?.name);

    const account = selectedBiz
      ? {
          id: derivedAccId, // strictly an Account ID
          name: selectedBiz.name,
          locationId: selectedBiz.locationId,
          verificationState: raw?.verificationState || raw?.verification_status,
          accountName: derivedAccId ? `accounts/${derivedAccId}` : undefined
        }
      : {
          id: (location.state?.selected?.accountId) || parseAccountIdFromName(location.state?.selected?.name),
          name: selectedAccount,
          locationId: location.state?.selected?.locationId || location.state?.selected?.id,
          verificationState: location.state?.selected?.verificationState || location.state?.selected?.verification_status,
          accountName: ((location.state?.selected?.accountId) || parseAccountIdFromName(location.state?.selected?.name))
            ? `accounts/${(location.state?.selected?.accountId) || parseAccountIdFromName(location.state?.selected?.name)}`
            : undefined
        };

    // Ensure business object has all required fields for scoring
    const businessPayload = {
      ...raw,
      title: raw?.title || raw?.name || raw?.businessName || selectedBiz?.name,
      businessName: raw?.businessName || raw?.name || raw?.title || selectedBiz?.name,
      address: address,
      formattedAddress: address,
      locationId: selectedBiz?.locationId || raw?.locationId || raw?.id,
      accountId: selectedBiz?.accountId || raw?.accountId,
      accountName: selectedBiz?.accountId || raw?.accountName,
      name: raw?.name || (raw?.id ? `locations/${raw.id}` : (selectedBiz?.locationId ? `locations/${selectedBiz.locationId}` : undefined)),
      id: raw?.id || selectedBiz?.locationId,
      // Ensure storefrontAddress is properly structured for city extraction
      storefrontAddress: raw?.storefrontAddress || {
        addressLines: address ? [address.split(',')[0]] : [],
        locality: raw?.storefrontAddress?.locality || extractCityFromAddress(address),
        administrativeArea: raw?.storefrontAddress?.administrativeArea || extractStateFromAddress(address),
        postalCode: raw?.storefrontAddress?.postalCode || extractPostalCodeFromAddress(address)
      }
    };

    // Helper functions to extract address components
    function extractCityFromAddress(addr) {
      if (!addr) return '';
      const parts = addr.split(',').map(p => p.trim());
      // For "SCO 7 Hermitage Centralis, VIP Road, Zirakpur, Punjab 140603"
      // Find the part that comes before the state/postal code part
      for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        // If this part contains digits (postal code), skip it
        if (/\d/.test(part)) continue;
        // If this part looks like a state (contains common state names), skip it
        if (/punjab|haryana|delhi|maharashtra|gujarat|rajasthan|karnataka|tamil nadu|kerala|andhra pradesh|telangana|west bengal|bihar|uttar pradesh|madhya pradesh|odisha|jharkhand|chhattisgarh|uttarakhand|himachal pradesh|jammu|kashmir|goa|manipur|meghalaya|tripura|arunachal pradesh|mizoram|nagaland|sikkim/i.test(part)) continue;
        // This should be the city
        return part;
      }
      // Fallback: if we have at least 3 parts, take the third-to-last
      return parts.length >= 3 ? parts[parts.length - 3] : (parts.length >= 2 ? parts[parts.length - 2] : '');
    }

    function extractStateFromAddress(addr) {
      if (!addr) return '';
      const parts = addr.split(',').map(p => p.trim());
      const lastPart = parts[parts.length - 1] || '';
      // Extract state from "State PostalCode" format
      const stateMatch = lastPart.match(/^([A-Za-z\s]+)\s+\d+/);
      return stateMatch ? stateMatch[1].trim() : '';
    }

    function extractPostalCodeFromAddress(addr) {
      if (!addr) return '';
      const postalMatch = addr.match(/\b\d{6}\b/); // 6-digit postal code
      return postalMatch ? postalMatch[0] : '';
    }

    // Navigate to profile strength results page with state
    navigate('/profile-strength-results', {
      state: {
        account,
        keywords,
        address,
        business: businessPayload,
        businesses: passedBusinesses,
        locationData: raw,
        selectedLocation: raw,
        preCalculatedScore: profileScore // Pass the calculated score to skip re-calculation
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
                        {(accounts.length ? accounts : [{ id: 'acc-1', name: 'Account 1' }, { id: 'acc-2', name: 'Account 2' }]).map((acc) => (
                          <Box
                            key={acc.id}
                            onClick={() => {
                              setSelectedAccount(acc.name);
                              setAccountMenuOpen(false);
                              // Scroll to and focus keywords selector
                              if (keywordsSelectRef.current) {
                                keywordsSelectRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }}
                            sx={{
                              padding: '10px 14px',
                              cursor: 'pointer',
                              '&:hover': { backgroundColor: '#F9FAFB' }
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
        onComplete={handleAnalysisComplete}
      />
      
      {/* Enhanced Score Popup */}
      <EnhancedScorePopup
        open={showScorePopup}
        onClose={handleScorePopupClose}
        score={profileScore}
        maxScore={300}
      />
    </DashboardLayout>
  );
};

export default ProfileStrengthAnalysis;