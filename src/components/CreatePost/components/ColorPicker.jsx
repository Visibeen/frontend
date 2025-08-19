import React, { useState } from 'react';
import { Box, Typography, Stack, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import DropdownArrowIcon from '../../icons/DropdownArrowIcon';

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927'
}));

const ColorPickerContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  padding: '12px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '540px'
}));

const ColorDisplay = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px'
}));

const ColorSwatch = styled(Box)(({ theme }) => ({
  width: '25px',
  height: '25px',
  borderRadius: '4px'
}));

const ColorText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#EF232A'
}));

const colorOptions = [
  { value: '#EF232A', label: '#EF232A' },
  { value: '#0B91D6', label: '#0B91D6' },
  { value: '#34A853', label: '#34A853' },
  { value: '#F59E0B', label: '#F59E0B' },
  { value: '#8B5CF6', label: '#8B5CF6' }
];

const ColorPicker = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    onChange(color);
    handleClose();
  };

  return (
    <FieldContainer>
      <FieldLabel>Background Color</FieldLabel>
      
      <ColorPickerContainer onClick={handleClick}>
        <ColorDisplay>
          <ColorSwatch sx={{ backgroundColor: value }} />
          <ColorText>{value}</ColorText>
        </ColorDisplay>
        
        <DropdownArrowIcon width={7} height={4} color="#A0A0AA" />
      </ColorPickerContainer>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {colorOptions.map((color) => (
          <MenuItem 
            key={color.value}
            onClick={() => handleColorSelect(color.value)}
            sx={{ gap: '8px' }}
          >
            <ColorSwatch sx={{ backgroundColor: color.value }} />
            <Typography sx={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: color.value
            }}>
              {color.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </FieldContainer>
  );
};

export default ColorPicker;