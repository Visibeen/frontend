import React from 'react';
import { Card, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '9px 11px 14px rgba(0, 0, 0, 0.10)',
  padding: '30px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '522px'
}));

const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
  width: '90px',
  height: '90px',
  borderRadius: '45px',
  alignSelf: 'center',
  marginBottom: '20px'
}));

const AuthorInfo = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  spacing: 1,
  marginBottom: '20px'
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  color: '#000000'
}));

const AuthorRole = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: 'rgba(0, 0, 0, 0.50)'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: 'rgba(0, 0, 0, 0.50)',
  textAlign: 'center',
  flex: 1
}));

const TestimonialCard = ({ testimonial }) => {
  return (
    <StyledCard>
      <TestimonialAvatar src={testimonial.avatar} alt={testimonial.name} />
      <AuthorInfo spacing={1}>
        <AuthorName>
          {testimonial.name}
        </AuthorName>
        <AuthorRole>
          {testimonial.role}
        </AuthorRole>
      </AuthorInfo>
      <TestimonialText>
        {testimonial.review}
      </TestimonialText>
    </StyledCard>
  );
};

export default TestimonialCard;