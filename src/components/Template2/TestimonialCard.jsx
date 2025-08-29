import React from 'react';
import { Card, CardContent, Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '../icons/StarIcon';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  border: '1px solid rgba(156, 196, 207, 0.25)',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.50)',
  padding: '30px',
  maxWidth: '417px',
  backgroundColor: '#ffffff'
}));

const RatingContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '10.4px',
  marginBottom: '20px'
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969',
  marginBottom: '30px'
}));

const ClientInfo = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '15px'
}));

const ClientAvatar = styled(Avatar)(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '35px'
}));

const ClientDetails = styled(Stack)(({ theme }) => ({
  gap: '-1px'
}));

const ClientName = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '28.60px',
  color: '#140a09'
}));

const ClientRole = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#565969'
}));

const TestimonialCard = ({ testimonial }) => {
  return (
    <StyledCard>
      <CardContent sx={{ padding: 0 }}>
        <RatingContainer>
          {[...Array(testimonial.rating)].map((_, index) => (
            <StarIcon key={index} width={15} height={14} color="#34a853" />
          ))}
        </RatingContainer>
        
        <TestimonialText>
          {testimonial.review}
        </TestimonialText>
        
        <ClientInfo>
          <ClientAvatar
            src={testimonial.image}
            alt={testimonial.name}
          />
          <ClientDetails>
            <ClientName>
              {testimonial.name}
            </ClientName>
            <ClientRole>
              {testimonial.role}
            </ClientRole>
          </ClientDetails>
        </ClientInfo>
      </CardContent>
    </StyledCard>
  );
};

export default TestimonialCard;