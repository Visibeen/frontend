import React from 'react';
import { Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6',
  marginBottom: '6px'
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const PageHeader = ({ title, subtitle }) => {
  return (
    <Stack spacing={0.75} sx={{ marginBottom: '24px' }}>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderSubtitle>{subtitle}</HeaderSubtitle>
    </Stack>
  );
};

export default PageHeader;