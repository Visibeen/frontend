import React from 'react';
import { Box, Typography, Stack, Card, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuoteIcon from '../icons/QuoteIcon';

const TestimonialsContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '40px 30px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  maxWidth: '610px',
  spacing: 2
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#efb817',
  marginBottom: '10px'
}));

const TestimonialsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#171717',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const TestimonialsDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '29.70px',
  color: '#171717',
  marginBottom: '40px'
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: '1px solid #dadada',
  padding: '30px',
  marginBottom: '20px'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '29.70px',
  color: '#171717',
  marginBottom: '30px',
  marginTop: '20px'
}));

const AuthorInfo = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2,
  alignItems: 'center'
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '30px'
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#171717'
}));

const AuthorCompany = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  color: '#171717'
}));

const DecorationImage = styled('img')(({ theme }) => ({
  flex: 1,
  maxWidth: '630px',
  height: '630px',
  objectFit: 'contain'
}));

const TestimonialsSection = ({ testimonials }) => {
  const testimonial = testimonials?.[0];

  return (
    <TestimonialsContainer 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 3, md: 4 }}
    >
      <ContentContainer spacing={2}>
        <SectionLabel>
          Reviews
        </SectionLabel>
        <TestimonialsTitle>
          Testimonials
        </TestimonialsTitle>
        <TestimonialsDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </TestimonialsDescription>
        
        {testimonial && (
          <TestimonialCard>
            <QuoteIcon width={24} height={24} color="#171717" />
            <TestimonialText>
              {testimonial.review}
            </TestimonialText>
            <AuthorInfo direction="row" spacing={2}>
              <AuthorAvatar src={testimonial.avatar} alt={testimonial.name} />
              <Stack>
                <AuthorName>
                  {testimonial.name}
                </AuthorName>
                <AuthorCompany>
                  {testimonial.company}
                </AuthorCompany>
              </Stack>
            </AuthorInfo>
          </TestimonialCard>
        )}
      </ContentContainer>
      
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <DecorationImage 
          src="/images/testimonial-decoration.svg" 
          alt="Testimonials decoration" 
        />
      </Box>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;