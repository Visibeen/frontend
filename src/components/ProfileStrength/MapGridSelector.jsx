import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DropdownArrowNavIcon from '../icons/DropdownArrowNavIcon';

const SelectorContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#EF232A'
}));

const DropdownContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  minWidth: '540px',
  '&:hover': {
    borderColor: '#0B91D6'
  }
}));

const DropdownText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6'
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#ffffff',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  zIndex: 2000,
  maxHeight: '200px',
  overflowY: 'auto'
}));

const DropdownItem = styled(Box)(({ theme }) => ({
  padding: '12px 16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F3F4F6'
  }
}));

const MapGridSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const gridOptions = [
    '25  pins 5*5',
    '16  pins 4*4',
    '36  pins 6*6',
    '49  pins 7*7',
    '64  pins 8*8',
    '81  pins 9*9'
  ];

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectorContainer>
      <FieldLabel>Map Grid*</FieldLabel>
      <Box sx={{ position: 'relative' }}>
        <DropdownContainer onClick={() => setIsOpen(!isOpen)}>
          <DropdownText>{value}</DropdownText>
          <DropdownArrowNavIcon width={7} height={4} />
        </DropdownContainer>
        
        {isOpen && (
          <DropdownMenu>
            {gridOptions.map((option) => (
              <DropdownItem 
                key={option}
                onClick={() => handleSelect(option)}
              >
                <Typography sx={{ fontSize: '14px', color: '#121927' }}>
                  {option}
                </Typography>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Box>
    </SelectorContainer>
  );
};

export default MapGridSelector;