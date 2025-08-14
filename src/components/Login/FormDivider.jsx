import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const DividerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '416px',
  height: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const DividerLine = styled(Box)(({ theme }) => ({
  width: '416px',
  height: '1px',
  borderRadius: '8px',
  border: '1px solid #A0A0AA',
  position: 'absolute'
}));

const DividerText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#A0A0AA',
  backgroundColor: '#ffffff',
  padding: '0 12px',
  position: 'relative',
  zIndex: 1
}));

const FormDivider = () => {
  return (
    <DividerContainer>
      <DividerLine />
      <DividerText>or</DividerText>
    </DividerContainer>
  );
};

export default FormDivider;