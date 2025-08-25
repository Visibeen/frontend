import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import SecondaryCheckIcon from '../icons/SecondaryCheckIcon';

const RankingsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '60px'
}));

const RankingsHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '46px',
  fontWeight: 700,
  color: '#121927'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927',
  maxWidth: '623px'
}));

const FeaturesRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap'
}));

const FeatureItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center'
}));

const FeatureText = styled(Typography)(({ theme, primary }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  color: primary ? '#121927' : '#A0A0AA'
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}));

const RankingsChart = styled('img')(({ theme }) => ({
  width: '762px',
  height: '442px',
  borderRadius: '9px',
  border: '0.45px solid #F6F0F0'
}));

const RankingsSection = () => {
  const features = [
    {
      text: 'GMB Optimization',
      primary: true,
      icon: <CheckmarkIcon width={17} height={12} />
    },
    {
      text: 'Local citation building',
      primary: false,
      icon: <SecondaryCheckIcon width={16} height={12} />
    },
    {
      text: 'On-page SEO for local intent',
      primary: false,
      icon: <SecondaryCheckIcon width={16} height={12} />
    }
  ];

  return (
    <RankingsContainer>
      <RankingsHeader>
        <SectionTitle>
          Boost <Box component="span" sx={{ color: '#0B91D6' }}>Google</Box> Rankings
        </SectionTitle>
        <SectionSubtitle>
          Climb to the top of local search results and stay ahead of competitors.
        </SectionSubtitle>
      </RankingsHeader>

      <FeaturesRow>
        {features.map((feature, index) => (
          <FeatureItem key={index}>
            {feature.icon}
            <FeatureText primary={feature.primary}>
              {feature.text}
            </FeatureText>
          </FeatureItem>
        ))}
      </FeaturesRow>

      <ChartContainer>
        <RankingsChart 
          src="/images/rankings-chart.svg" 
          alt="Google Rankings Growth Chart" 
        />
      </ChartContainer>
    </RankingsContainer>
  );
};

export default RankingsSection;