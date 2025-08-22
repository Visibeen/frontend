import React, { useRef, useState } from 'react';
import { Box, Stack, Typography, Button, TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import EditIcon from '../icons/EditIcon';

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
    if (!address && raw?.storefrontAddress) {
      const sa = raw.storefrontAddress;
      const parts = [];
      if (Array.isArray(sa.addressLines) && sa.addressLines.length) parts.push(sa.addressLines.join(', '));
      if (sa.locality) parts.push(sa.locality);
      const tail = [sa.administrativeArea, sa.postalCode].filter(Boolean).join(' ');
      if (tail) parts.push(tail);
      address = parts.join(', ').trim();
    }

    const account = selectedBiz
      ? { id: selectedBiz.accountId || selectedBiz.id, name: selectedBiz.name, locationId: selectedBiz.locationId }
      : { id: location.state?.selected?.accountId || location.state?.selected?.id, name: selectedAccount, locationId: location.state?.selected?.locationId || location.state?.selected?.id };

    // Navigate to profile strength results page with state
    navigate('/profile-strength-results', {
      state: {
        account,
        keywords,
        address,
        business: raw,
        businesses: passedBusinesses
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
    </DashboardLayout>
  );
};

export default ProfileStrengthAnalysis;