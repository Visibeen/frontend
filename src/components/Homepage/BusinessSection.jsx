import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import SecondaryCheckIcon from '../icons/SecondaryCheckIcon';

const BusinessContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0',
  display: 'flex',
  justifyContent: 'center'
}));

const BusinessContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '97px',
  alignItems: 'center',
  maxWidth: '1440px',
  padding: '0 66px'
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

const MockupImage = styled('img')(({ theme }) => ({
  width: '718px',
  height: '508px',
  borderRadius: '24px',
  border: '0.6px solid rgba(160, 160, 170, 0.60)'
}));

const BusinessSection = () => {
  const benefits = [
    {
      text: 'Let data guide every move',
      primary: false,
      icon: <SecondaryCheckIcon width={16} height={12} />
    },
    {
      text: 'See where you stand and where you\'re headed',
      primary: true,
      icon: <CheckmarkIcon width={17} height={12} />
    },
    {
      text: 'Track goals and crush KPIs',
      primary: false,
      icon: <SecondaryCheckIcon width={16} height={12} />
    }
  ];

  return (
    <BusinessContainer>
      <BusinessContent>
        <ContentSection>
          <SectionTitle>
            Watch your<br />
            business thrive<br />
            with <Box component="span" sx={{ color: '#0B91D6' }}>Visibeen</Box>
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
          </BenefitsList>
        </ContentSection>

        <MockupImage 
          src="/images/reputation-dashboard.png" 
          alt="Reputation Benchmarking Dashboard" 
        />
      </BusinessContent>
    </BusinessContainer>
  );
};

export default BusinessSection;