import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#F8F8F8',
  '@media (max-width: 768px)': {
    flexDirection: 'column'
  }
}));

const Login = () => {
  return (
    <LoginContainer>
      <LeftPanel />
      <RightPanel />
    </LoginContainer>
  );
};


export default Login;