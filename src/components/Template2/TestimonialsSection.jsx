import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TestimonialCard from './TestimonialCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px',
  gap: '20px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18.20px',
  textTransform: 'uppercase',
  color: '#565969'
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  }
}));

const TestimonialsGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    gap: '20px'
  }
}));

const TestimonialsSection = ({ testimonials = [] }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>testimonials</SectionTitle>
        <SectionHeading>What Client's say about</SectionHeading>
      </SectionHeader>
      
      <TestimonialsGrid>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </TestimonialsGrid>
    </SectionContainer>
  );
};

export default TestimonialsSection;