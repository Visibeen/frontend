import React from 'react';
import { Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const NextButton = styled(Button)(({ theme }) => ({
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

const FormActions = ({ onCancel, onNext }) => {
  const navigate = useNavigate();

  const handleNext = (event) => {
    event.preventDefault(); // Prevent form submission
    event.stopPropagation(); // Stop event bubbling
    
    console.log('FormActions: Next button clicked');
    
    // Call the parent's onNext function if provided
    if (onNext) {
      onNext();
    }
    
    // Always navigate to font style selection page
    console.log('FormActions: Navigating to /font-style-selection');
    navigate('/font-style-selection');
  };

  const handleCancel = (event) => {
    event.preventDefault(); // Prevent form submission
    event.stopPropagation(); // Stop event bubbling
    
    console.log('FormActions: Cancel button clicked');
    
    // Call the parent's onCancel function if provided
    if (onCancel) {
      onCancel();
    }
    
    // Navigate back to create post page
    navigate('/create-post');
  };

  return (
    <ActionsContainer>
      <CancelButton 
        type="button" 
        variant="outlined" 
        onClick={handleCancel}
      >
        Cancel
      </CancelButton>
      <NextButton 
        type="button" 
        variant="contained" 
        onClick={handleNext}
      >
        Next
      </NextButton>
    </ActionsContainer>
  );
};

export default FormActions;