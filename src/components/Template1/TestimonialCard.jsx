import React from 'react';
import { Box, Typography, Avatar, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const TestimonialContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  backgroundColor: 'transparent'
}));

const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
  width: '100px',
  height: '100px',
  border: '4px solid #ffffff',
  borderRadius: '50px'
}));

const TestimonialContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '10px'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '15.5px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#ffffff'
}));

const TestimonialName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  letterSpacing: '1px',
  lineHeight: '19.80px',
  textTransform: 'uppercase',
  color: '#ffffff'
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffeb3b',
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-block',
  marginTop: '8px'
}));

const TestimonialCard = ({ testimonial }) => {
  return (
    <TestimonialContainer>
      <TestimonialAvatar
        src={testimonial.image}
        alt={testimonial.name}
      />
      <TestimonialContent>
        <TestimonialText>
          {testimonial.review}
        </TestimonialText>
        <TestimonialName>
          {testimonial.name}
        </TestimonialName>
        <RatingContainer>
          <Rating
            value={testimonial.rating}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-icon': {
                color: '#000000'
              }
            }}
          />
        </RatingContainer>
      </TestimonialContent>
    </TestimonialContainer>
  );
};

export default TestimonialCard;