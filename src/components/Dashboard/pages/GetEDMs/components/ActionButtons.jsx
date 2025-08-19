import React from 'react';
import { Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ButtonContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '18px'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  width: '144px',
  height: '49px',
  padding: '10px 18px',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'capitalize',
  background: '#fff',
  color: '#ef232a',
  border: '1px solid #fecaca',
  fontFamily: 'Inter, sans-serif',
  '&:hover': {
    background: '#fef2f2',
    border: '1px solid #fecaca'
  }
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  width: '144px',
  height: '49px',
  padding: '10px 18px',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'capitalize',
  background: '#0B91D6',
  color: '#fff',
  border: 'none',
  fontFamily: 'Inter, sans-serif',
  '&:hover': {
    background: '#0277BD'
  }
}));

const ActionButtons = ({ onCancel, onSubmit, submitText = "Save & Next" }) => {
  return (
    <ButtonContainer direction="row" spacing={2.5}>
      <CancelButton variant="outlined" onClick={onCancel}>
        Cancel
      </CancelButton>
      <PrimaryButton variant="contained" onClick={onSubmit}>
        {submitText}
      </PrimaryButton>
    </ButtonContainer>
  );
};

export default ActionButtons;