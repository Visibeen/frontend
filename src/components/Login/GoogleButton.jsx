import React from 'react';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from './GoogleIcon';

const StyledGoogleButton = styled(Button)(({ theme }) => ({
  width: '416px',
  height: '50px',
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  backgroundColor: '#ffffff',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    border: '0.2px solid #A0A0AA'
  }
}));

const GoogleButton = ({ onClick, ...props }) => {
  return (
    <StyledGoogleButton onClick={onClick} {...props}>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <GoogleIcon width={18} height={18} />
        <span>Continue with Google</span>
      </Stack>
    </StyledGoogleButton>
  );
};

export default GoogleButton;