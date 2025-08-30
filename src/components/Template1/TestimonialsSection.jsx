import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TestimonialCard from './TestimonialCard';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  backgroundColor: theme.palette.primary.main
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '40px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: 400,
  letterSpacing: '1px',
  lineHeight: '33px',
  textTransform: 'uppercase',
  color: '#ffffff'
}));

const TestimonialsGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const TestimonialsSection = ({ testimonials = [] }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Client Testimonial</SectionTitle>
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