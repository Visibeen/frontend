import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const IllustrationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '40px'
}));

const IllustrationImage = styled('img')(({ theme }) => ({
  width: '342px',
  height: '281px',
  objectFit: 'cover',
  border: 'none'
}));

const IllustrationSection = () => {
  return (
    <IllustrationContainer>
      <IllustrationImage 
        src="/assets/no-data-illustration.png" 
        alt="Account not found illustration"
      />
    </IllustrationContainer>
  );
};

export default IllustrationSection;