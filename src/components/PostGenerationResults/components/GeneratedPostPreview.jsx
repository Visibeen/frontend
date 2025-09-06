import React from 'react';
import { Box, Stack, Typography, Avatar, Rating, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const PreviewContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  width: '716px',
  height: '500px',
  background: templateStyle?.background || 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
  borderRadius: '12px',
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: '24px'
}));

const WatermarkText = styled(Typography)(({ theme }) => ({
  display: 'none'
}));

const ContentCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '32px',
  maxWidth: '500px',
  textAlign: 'center',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
  position: 'relative'
}));

const TitleSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginBottom: '24px',
  gap: '8px'
}));

const MainTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 300,
  color: templateStyle?.primaryColor || '#4CAF50',
  fontStyle: 'italic'
}));

const SubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '32px',
  fontWeight: 700,
  color: templateStyle?.secondaryColor || '#1B5E20'
}));

const ProfileSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginBottom: '20px',
  gap: '12px'
}));

const ProfileAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  width: '80px',
  height: '80px',
  border: `3px solid ${templateStyle?.primaryColor || '#4CAF50'}`
}));

const ProfileName = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: templateStyle?.primaryColor || '#4CAF50'
}));

const ProfileTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#666666'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#333333',
  lineHeight: '1.6',
  marginBottom: '20px',
  fontStyle: 'italic'
}));

const StyledRating = styled(Rating, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  marginBottom: '20px',
  '& .MuiRating-iconFilled': {
    color: templateStyle?.primaryColor || '#4CAF50'
  }
}));

const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'templateStyle'
})(({ theme, templateStyle }) => ({
  backgroundColor: templateStyle?.secondaryColor || '#1B5E20',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '8px 24px',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: templateStyle?.primaryColor || '#2E7D32'
  }
}));

const QuoteIcon = styled(Box)(({ theme }) => ({
  display: 'none'
}));

const GeneratedPostPreview = ({ generatedPost, selectedTemplate }) => {
  const templateStyle = selectedTemplate?.style;
  
  return (
    <PreviewContainer templateStyle={templateStyle} className="post-preview-container">
      <WatermarkText>Image Not Included</WatermarkText>
      
      <ContentCard>
        <QuoteIcon className="quote-left" />
        <QuoteIcon className="quote-right" />
        
        <TitleSection>
          <MainTitle templateStyle={templateStyle}>{generatedPost.title}</MainTitle>
          <SubTitle templateStyle={templateStyle}>{generatedPost.subtitle}</SubTitle>
        </TitleSection>

        <ProfileSection>
          <ProfileAvatar 
            templateStyle={templateStyle}
            src={generatedPost.userProfile.avatar}
            alt={generatedPost.userProfile.name}
          />
          <Box>
            <ProfileName templateStyle={templateStyle}>{generatedPost.userProfile.name}</ProfileName>
            <ProfileTitle>{generatedPost.userProfile.title}</ProfileTitle>
          </Box>
        </ProfileSection>

        <TestimonialText>
          "{generatedPost.testimonialText}"
        </TestimonialText>

        <StyledRating 
          templateStyle={templateStyle}
          value={generatedPost.rating} 
          readOnly 
          size="small"
        />

        {/* <CTAButton templateStyle={templateStyle} variant="contained">
          {generatedPost.ctaText}
        </CTAButton> */}
      </ContentCard>
    </PreviewContainer>
  );
};

export default GeneratedPostPreview;