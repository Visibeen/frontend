import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Stack)(({ theme }) => ({
  gap: '6px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const ProfileStrengthHeader = () => {
  return (
    <HeaderContainer>
      <MainTitle>Profile Strength</MainTitle>
      <SubTitle>
        Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
      </SubTitle>
    </HeaderContainer>
  );
};

export default ProfileStrengthHeader;