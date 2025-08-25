import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import SecondaryCheckIcon from '../icons/SecondaryCheckIcon';

const PerformanceContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(239, 35, 42, 0.02)',
  borderRadius: '36px',
  padding: '80px 0',
  margin: '0 66px',
  display: 'flex',
  justifyContent: 'center'
}));

const PerformanceContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '97px',
  alignItems: 'center',
  maxWidth: '1440px',
  padding: '0 66px'
}));

const MockupImage = styled('img')(({ theme }) => ({
  width: '718px',
  height: '508px',
  borderRadius: '24px',
  border: '0.6px solid rgba(160, 160, 170, 0.60)'
}));

const ContentSection = styled(Stack)(({ theme }) => ({
  gap: '60px',
  flex: 1
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '46px',
  fontWeight: 700,
  lineHeight: '60px',
  color: '#121927'
}));

const BenefitsList = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const BenefitItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'flex-start'
}));

const BenefitText = styled(Typography)(({ theme, primary }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  color: primary ? '#121927' : '#A0A0AA'
}));

const AdditionalText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '34px',
  color: '#A0A0AA'
}));

const PerformanceSection = () => {
  const benefits = [
    {
      text: 'Accurate, real-time analytics at your fingertips',
      primary: true,
      icon: <CheckmarkIcon width={17} height={12} />
    },
    {
      text: 'See the impact of every move you make',
      primary: false,
      icon: <SecondaryCheckIcon width={16} height={12} />
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#F8F8F8', padding: '80px 0' }}>
      <PerformanceContainer>
        <PerformanceContent>
          <MockupImage 
            src="/images/performance-dashboard.png" 
            alt="Performance Analytics Dashboard" 
          />
          
          <ContentSection>
            <SectionTitle>
              Performance You<br />
              Can <Box component="span" sx={{ color: '#0B91D6' }}>Measure</Box>
            </SectionTitle>
            
            <BenefitsList>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  {benefit.icon}
                  <BenefitText primary={benefit.primary}>
                    {benefit.text}
                  </BenefitText>
                </BenefitItem>
              ))}
              <Box sx={{ paddingLeft: '26px' }}>
                <AdditionalText>
                  Monitor key metrics that move your business forward
                </AdditionalText>
              </Box>
            </BenefitsList>
          </ContentSection>
        </PerformanceContent>
      </PerformanceContainer>
    </Box>
  );
};

export default PerformanceSection;