import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import SuccessCheckIcon from './SuccessCheckIcon';

const SuccessContainer = styled(Box)(({ theme }) => ({
  width: '416px',
  height: '38px',
  borderRadius: '4px',
  backgroundColor: '#34A853',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  gap: '10px'
}));

const SuccessText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#ffffff',
  lineHeight: '15px'
}));

const SuccessAlert = ({ message }) => {
  return (
    <SuccessContainer>
      <SuccessCheckIcon width={15} height={15} color="#ffffff" />
      <SuccessText>{message}</SuccessText>
    </SuccessContainer>
  );
};

export default SuccessAlert;