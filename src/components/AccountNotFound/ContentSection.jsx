import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  textAlign: 'center',
  marginBottom: '40px'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '32px',
  fontWeight: 600,
  color: '#121927'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302e',
  maxWidth: '497px',
  margin: '0 auto'
}));

const ContentSection = () => {
  return (
    <ContentContainer>
      <Title>Account Not Found</Title>
      <Description>
        Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
      </Description>
    </ContentContainer>
  );
};

export default ContentSection;