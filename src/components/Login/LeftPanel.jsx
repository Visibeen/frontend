import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibeenLogo from '../../assets/VisibeenLogo.png';
const GradientPanel = styled(Box)(({ theme }) => ({
  width: '50%',
  minHeight: '100vh',
  background: 'linear-gradient(153.69deg, rgba(239,35,42,1) 24.52%, rgba(11,145,214,1) 80.91%, rgba(2,125,189,1) 100%)',
  color: '#ffffff',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(7.5),
  '&::before': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(156, 25, 25, 0.07)',
    width: '109px',
    height: '131px',
    bottom: '131px',
    left: '0px',
    zIndex: 1
  }
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: '119px',
  height: '40px',
  marginBottom: theme.spacing(12.5),
  marginTop: '-10px',
  position: 'relative',
  zIndex: 2
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '32px',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: theme.spacing(2.5),
  position: 'relative',
  zIndex: 2,
  lineHeight: '39px'
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '32px',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: theme.spacing(7.5),
  position: 'relative',
  zIndex: 2,
  maxWidth: '441px',
  lineHeight: '43.5px'
}));

const ServicesText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#ffffff',
  position: 'relative',
  zIndex: 2
}));

const LeftPanel = () => {
  return (
    <GradientPanel>
      <LogoImage src={VisibeenLogo} alt="Visibeen Logo" />
      <Stack spacing={7.5}>
        <Stack spacing={2.5}>
          <MainHeading>Think Unlimited</MainHeading>
          <SubText>
            Join over <strong>62,000+ Digital marketing and business</strong> owners around the world
          </SubText>
        </Stack>
        <ServicesText>Services test</ServicesText>
      </Stack>
    </GradientPanel>
  );
};

export default LeftPanel;