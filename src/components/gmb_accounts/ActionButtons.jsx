import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  marginBottom: '40px'
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '12px 24px',
  borderRadius: '8px',
  minWidth: '106px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

const ExpertHelpButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#0B91D6',
  border: '1px solid #0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '12px 24px',
  borderRadius: '8px',
  minWidth: '139px',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.04)',
    borderColor: '#0B91D6'
  }
}));

const ActionButtons = ({ onCreateAccount, onTakeHelpOfExpert }) => {
  return (
    <ButtonContainer>
      <CreateAccountButton onClick={onCreateAccount}>
        Create Account
      </CreateAccountButton>
      <ExpertHelpButton onClick={onTakeHelpOfExpert}>
        Take Help Of Expert
      </ExpertHelpButton>
    </ButtonContainer>
  );
};

export default ActionButtons;