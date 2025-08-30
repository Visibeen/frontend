import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TestimonialCard from './TestimonialCard';

const TestimonialsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '60px 30px',
  backgroundImage: 'url(/images/interior-testimonials-bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(34, 40, 56, 0.70)'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  alignItems: 'center',
  spacing: 4
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  textTransform: 'capitalize',
  color: '#ffffff',
  textAlign: 'center'
}));

const TestimonialsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '45px',
  fontWeight: 500,
  lineHeight: '48px',
  textTransform: 'capitalize',
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
    lineHeight: '38px'
  }
}));

const TestimonialsGrid = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  justifyContent: 'center',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3,
    alignItems: 'center'
  }
}));

const NavigationDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '30px'
}));

const Dot = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  '&.active': {
    backgroundColor: '#ffffff'
  }
}));

const TestimonialsSection = ({ testimonials }) => {
  return (
    <TestimonialsContainer>
      <Overlay />
      <ContentContainer spacing={4}>
        <Box textAlign="center">
          <SectionLabel>
            testimonials
          </SectionLabel>
          <TestimonialsTitle>
            The only thing matters to us!
          </TestimonialsTitle>
        </Box>
        
        <TestimonialsGrid 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 3, md: 4 }}
        >
          {testimonials?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </TestimonialsGrid>
        
        <NavigationDots>
          <Dot className="active" />
          <Dot />
          <Dot />
        </NavigationDots>
      </ContentContainer>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;