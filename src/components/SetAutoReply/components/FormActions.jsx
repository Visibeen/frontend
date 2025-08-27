import React from 'react';
import { Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ActionsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '40px'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#EF232A',
  backgroundColor: 'transparent',
  border: '1px solid #EF232A',
  borderRadius: '8px',
  padding: '12px 24px',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: 'rgba(239, 35, 42, 0.04)',
    border: '1px solid #EF232A'
  }
}));

const SaveButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '8px',
  padding: '12px 24px',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const FormActions = ({ onCancel, onSave }) => {
  return (
    <ActionsContainer>
      <CancelButton variant="outlined" onClick={onCancel}>
        Cancel
      </CancelButton>
      <SaveButton variant="contained" onClick={onSave}>
        Save
      </SaveButton>
    </ActionsContainer>
  );
};

export default FormActions;