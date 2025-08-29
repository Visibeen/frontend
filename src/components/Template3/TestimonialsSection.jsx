import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TestimonialCard from './TestimonialCard';

const TestimonialsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '800px',
  backgroundColor: '#ffffff',
  backgroundImage: 'url(/images/template3-testimonials-bg.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 320px'
}));

const TestimonialsContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '60px',
  width: '100%'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '20px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  textTransform: 'capitalize',
  color: '#140a09',
  textAlign: 'center'
}));

const TitleHighlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const TestimonialsGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}));

const TestimonialsSection = ({ testimonials }) => {
  return (
    <TestimonialsContainer>
      <TestimonialsContent>
        <SectionHeader>
          <SectionTitle>
            What Client's Say About<br />
            Our <TitleHighlight>Services</TitleHighlight>
          </SectionTitle>
        </SectionHeader>
        
        <TestimonialsGrid>
          {testimonials?.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </TestimonialsGrid>
      </TestimonialsContent>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;