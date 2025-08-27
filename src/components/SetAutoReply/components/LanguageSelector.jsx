import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SelectorContainer = styled(Box)(({ theme }) => ({
  marginBottom: '24px'
}));

const SelectorLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: '8px'
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '540px',
  height: '50px',
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  backgroundColor: '#ffffff',
  '& .MuiSelect-select': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0B91D6',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const LanguageSelector = ({ selectedLanguage, languageOptions, onLanguageChange }) => {
  const options = languageOptions || [];
  
  return (
    <SelectorContainer>
      <SelectorLabel>Review Language</SelectorLabel>
      <FormControl fullWidth>
        <StyledSelect
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          IconComponent={ExpandMoreIcon}
        >
          {options.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </SelectorContainer>
  );
};

export default LanguageSelector;
