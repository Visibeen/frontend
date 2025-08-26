import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DropdownArrowNavIcon from '../icons/DropdownArrowNavIcon';

const DropdownContainer = styled(Box)(({ theme, width }) => ({
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: width || 'auto',
  position: 'relative',
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
  zIndex: 10,
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

const ScheduleDropdown = ({ value, options, onChange, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer width={width} onClick={() => setIsOpen(!isOpen)}>
      <DropdownText>{value}</DropdownText>
      <DropdownArrowNavIcon width={7} height={4} />
      
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem 
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              <Typography sx={{ fontSize: '14px', color: '#121927' }}>
                {option}
              </Typography>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default ScheduleDropdown;