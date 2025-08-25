import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SEOContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(93.12deg, rgba(11,145,214,1) 0%, rgba(239,35,42,1) 100%)',
  padding: '80px 0',
  display: 'flex',
  justifyContent: 'center'
}));

const SEOContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '97px',
  alignItems: 'center',
  maxWidth: '1440px',
  padding: '0 66px'
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const SEOIllustration = styled('img')(({ theme }) => ({
  width: '188px',
  height: '175px'
}));

const ContentSection = styled(Stack)(({ theme }) => ({
  gap: '24px',
  flex: 1
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '46px',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '16px'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '40px',
  color: '#ffffff'
}));

const SEOSolutionSection = () => {
  return (
    <SEOContainer>
      <SEOContent>
        <IllustrationContainer>
          <SEOIllustration 
            src="/images/seo-solution.svg" 
            alt="SEO Solution Illustration" 
          />
        </IllustrationContainer>
        
        <ContentSection>
          <SectionTitle>
            All-in-One Local SEO Solution for Every Business, On Every Device.
          </SectionTitle>
          <TestimonialText>
            "Designed to work for any local business, we have you covered. With mobile-first visibility and one easy dashboard to manage reviews, rankings, and listings, your business stays in control wherever your customers search."
          </TestimonialText>
        </ContentSection>
      </SEOContent>
    </SEOContainer>
  );
};

export default SEOSolutionSection;