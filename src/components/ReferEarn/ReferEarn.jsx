import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';

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

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0',
  marginBottom: '32px'
}));

const ReferralCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0'
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif'
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const ReferralCode = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  border: '2px dashed #0B91D6',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
  marginBottom: '24px'
}));

const CodeText = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '2px'
}));

const ShareButton = styled(Button)(({ theme }) => ({
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

const ReferralHistory = styled(Box)(({ theme }) => ({
  marginTop: '32px'
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px',
  fontFamily: 'Inter, sans-serif'
}));

const HistoryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const ReferralInfo = styled(Box)(({ theme }) => ({
  flex: 1
}));

const ReferralName = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927',
  fontFamily: 'Inter, sans-serif'
}));

const ReferralDate = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const ReferEarn = () => {
  const [email, setEmail] = useState('');

  const stats = [
    { label: 'Total Referrals', value: '12' },
    { label: 'Successful Referrals', value: '8' },
    { label: 'Total Earnings', value: '$240' },
    { label: 'Pending Earnings', value: '$120' }
  ];

  const referralHistory = [
    { name: 'John Smith', email: 'john@example.com', date: '2024-01-15', status: 'completed', earning: '$30' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', date: '2024-01-12', status: 'pending', earning: '$30' },
    { name: 'Mike Davis', email: 'mike@example.com', date: '2024-01-10', status: 'completed', earning: '$30' },
    { name: 'Emily Wilson', email: 'emily@example.com', date: '2024-01-08', status: 'completed', earning: '$30' }
  ];

  const handleSendInvite = () => {
    if (email) {
      console.log('Sending invite to:', email);
      setEmail('');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VISIBEEN2024');
    console.log('Referral code copied');
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'warning';
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Refer & Earn</PageTitle>
          <PageSubtitle>
            Refer friends and earn rewards for every successful referral
          </PageSubtitle>
        </PageHeader>

        <StatsCard>
          <CardContent sx={{ padding: '24px' }}>
            <Stack direction="row" spacing={4} justifyContent="space-around">
              {stats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </StatsCard>

        <ReferralCard>
          <CardContent sx={{ padding: '24px' }}>
            <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
              Your Referral Code
            </Typography>
            
            <ReferralCode>
              <CodeText>VISIBEEN2024</CodeText>
              <Typography variant="body2" sx={{ color: '#6b7280', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>
                Share this code with your friends
              </Typography>
            </ReferralCode>

            <Stack direction="row" spacing={2} sx={{ marginBottom: '24px' }}>
              <ShareButton onClick={handleCopyCode}>
                Copy Code
              </ShareButton>
              <ShareButton variant="outlined" sx={{ borderColor: '#0B91D6', color: '#0B91D6' }}>
                Share Link
              </ShareButton>
            </Stack>

            <Typography variant="h6" sx={{ marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
              Send Direct Invite
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Enter friend's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
              />
              <ShareButton onClick={handleSendInvite}>
                Send Invite
              </ShareButton>
            </Stack>
          </CardContent>
        </ReferralCard>

        <ReferralHistory>
          <HistoryTitle>Referral History</HistoryTitle>
          <ReferralCard>
            <CardContent sx={{ padding: '24px' }}>
              {referralHistory.map((referral, index) => (
                <HistoryItem key={index}>
                  <ReferralInfo>
                    <ReferralName>{referral.name}</ReferralName>
                    <ReferralDate>{referral.email} • {referral.date}</ReferralDate>
                  </ReferralInfo>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                      {referral.earning}
                    </Typography>
                    <Chip 
                      label={referral.status}
                      color={getStatusColor(referral.status)}
                      size="small"
                    />
                  </Box>
                </HistoryItem>
              ))}
            </CardContent>
          </ReferralCard>
        </ReferralHistory>
      </PageContainer>
    </DashboardLayout>
  );
};

export default ReferEarn;