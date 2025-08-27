import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledGenerateButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '8px',
  padding: '12px 32px',
  minWidth: '120px',
  marginTop: '40px',
  '&:hover': {
    backgroundColor: '#0980C2'
  },
  '&:disabled': {
    backgroundColor: '#A0A0AA',
    color: '#ffffff'
  }
}));

const GenerateButton = ({ onClick, disabled = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Navigate to post generation results page
    console.log('Generate completed - navigating to results page');
    navigate('/post-generation-results');
  };

  return (
    <StyledGenerateButton 
      variant="contained" 
      onClick={handleClick}
      disabled={disabled}
    >
      Generate
    </StyledGenerateButton>
  );
};

export default GenerateButton;