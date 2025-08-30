import React from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '695px',
  backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url("/images/template6-hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  padding: '0 64px',
  gap: '40px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '40px 24px',
    minHeight: 'auto'
  }
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '40px',
  maxWidth: '571px'
}));

const TitleContainer = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  letterSpacing: '-0.96px',
  lineHeight: '58px',
  color: '#ffffff'
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '-0.36px',
  lineHeight: '23px',
  color: '#ffffff'
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '571px',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(50px)',
  borderRadius: '4px',
  padding: '40px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '500px'
  }
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '-0.64px',
  lineHeight: '40px',
  color: '#ffffff',
  marginBottom: '16px'
}));

const FormContent = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const InputRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

const InputColumn = styled(Stack)(({ theme }) => ({
  gap: '8px',
  flex: 1
}));

const InputGroup = styled(Stack)(({ theme }) => ({
  gap: '9px'
}));

const InputLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  color: '#ffffff'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: '-0.28px',
      color: '#ffffff',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1
      }
    }
  },
  '& .MuiOutlinedInput-multiline': {
    padding: '12px'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '-0.36px',
  padding: '16px',
  borderRadius: '4px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const HeroSection = ({ businessInfo, serviceRequest }) => {
  const { heroTitle, heroSubtitle } = businessInfo || {};
  const { title, fields, submitText } = serviceRequest || {};

  return (
    <HeroContainer>
      <ContentContainer>
        <TitleContainer>
          <HeroTitle>
            {heroTitle || 'Plumbing Experts Right at Your Doorstep'}
          </HeroTitle>
          <HeroSubtitle>
            {heroSubtitle || "Our plumbers are the most recognized professionals globally because we're committed to excellent service, and nothing wears on homeowners like the idea of handling plumbing problems."}
          </HeroSubtitle>
        </TitleContainer>
      </ContentContainer>

      <FormContainer>
        <FormTitle>
          {title || 'Request Your Services Today'}
        </FormTitle>
        
        <FormContent>
          <InputRow>
            <InputColumn>
              <InputGroup>
                <InputLabel>{fields?.firstName?.label || 'First Name'}</InputLabel>
                <StyledTextField
                  placeholder={fields?.firstName?.placeholder || 'John'}
                  variant="outlined"
                  fullWidth
                />
              </InputGroup>
              <InputGroup>
                <InputLabel>{fields?.phoneNumber?.label || 'Phone Number'}</InputLabel>
                <StyledTextField
                  placeholder={fields?.phoneNumber?.placeholder || '+123 000 000'}
                  variant="outlined"
                  fullWidth
                />
              </InputGroup>
            </InputColumn>
            
            <InputColumn>
              <InputGroup>
                <InputLabel>{fields?.lastName?.label || 'Last Name'}</InputLabel>
                <StyledTextField
                  placeholder={fields?.lastName?.placeholder || 'Doe'}
                  variant="outlined"
                  fullWidth
                />
              </InputGroup>
              <InputGroup>
                <InputLabel>{fields?.email?.label || 'Email'}</InputLabel>
                <StyledTextField
                  placeholder={fields?.email?.placeholder || 'Johndoe@gmail.com'}
                  variant="outlined"
                  fullWidth
                />
              </InputGroup>
            </InputColumn>
          </InputRow>
          
          <InputGroup>
            <InputLabel>{fields?.message?.label || 'Message'}</InputLabel>
            <StyledTextField
              placeholder={fields?.message?.placeholder || 'Enter your message'}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
          </InputGroup>
          
          <SubmitButton fullWidth>
            {submitText || 'Submit'}
          </SubmitButton>
        </FormContent>
      </FormContainer>
    </HeroContainer>
  );
};

export default HeroSection;