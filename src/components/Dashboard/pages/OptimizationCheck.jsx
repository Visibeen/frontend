import React, { useMemo, useState } from 'react';
import { Box, Stack, Typography, Select, MenuItem, TextField, Chip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

const PageWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '32px',
  width: '720px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  border: '0.6px solid #F6F0F0'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '28px',
  color: '#0B91D6',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '18px',
  color: '#121927',
}));

const Helper = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  color: '#8C8C97',
}));

const Label = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  color: '#121927',
}));

const FieldWrap = styled(Stack)(({ theme }) => ({
  gap: '6px',
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: '#0B91D6',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  textTransform: 'none',
  padding: '10px 24px',
  borderRadius: '8px',
  '&:hover': { backgroundColor: '#0a7db7' }
}));

const presetKeywords = ['Property', 'Buy/Rent Property', 'Builder', 'Tiles work', 'Wooden flooring', 'Civil work'];

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const OptimizationCheck = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const locationId = query.get('locationId') || '';

  const [account, setAccount] = useState('');
  const [selected, setSelected] = useState(['Property', 'Buy/Rent Property', 'Builder', 'Tiles work', 'Wooden flooring', 'Civil work']);
  const [manual, setManual] = useState('');

  const toggleKeyword = (kw) => {
    setSelected((prev) => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]);
  };

  const handleContinue = () => {
    // TODO: call backend to start optimization check
    // For now navigate to business profile with a flag
    if (locationId) {
      navigate(`/business-profile?id=${locationId}&optFlow=1`);
    } else {
      navigate('/business-profile');
    }
  };

  return (
    <Box p={3}>
      <Stack spacing={2} mb={3}>
        <Title>Just one step</Title>
        <SubTitle>Let's analyses the strength of your profile</SubTitle>
        <Helper>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
        </Helper>
      </Stack>

      <PageWrap>
        <Card>
          <Stack spacing={2}>
            <FieldWrap>
              <Label>Select Account</Label>
              <Select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                displayEmpty
                sx={{ width: '100%' }}
              >
                <MenuItem value=""><em>Enter Account</em></MenuItem>
                {/* Placeholder options; ideally populated from API */}
                <MenuItem value="acc-1">Account 1</MenuItem>
                <MenuItem value="acc-2">Account 2</MenuItem>
              </Select>
            </FieldWrap>

            <FieldWrap>
              <Label>
                Select your keywords <Helper component="span" sx={{ ml: 1 }}>(Select up to three)</Helper>
              </Label>
              <TextField placeholder="Select keywords" fullWidth />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {presetKeywords.map((kw) => (
                  <Chip
                    key={kw}
                    label={kw}
                    onClick={() => toggleKeyword(kw)}
                    color={selected.includes(kw) ? 'success' : 'default'}
                    sx={{
                      mb: 1,
                      cursor: 'pointer',
                      backgroundColor: selected.includes(kw) ? '#34C759' : '#F1F5F9',
                      color: selected.includes(kw) ? '#fff' : '#30302E',
                    }}
                  />
                ))}
              </Stack>
            </FieldWrap>

            <FieldWrap>
              <Label>Write Keywords Manually</Label>
              <TextField
                placeholder="Enter keywords"
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                fullWidth
              />
            </FieldWrap>

            <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
          </Stack>
        </Card>
      </PageWrap>
    </Box>
  );
};

export default OptimizationCheck;
