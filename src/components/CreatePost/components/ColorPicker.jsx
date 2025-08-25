import React from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DropdownArrowIcon from '../../icons/DropdownArrowIcon';

const ColorPickerContainer = styled(FormControl)(({ theme }) => ({
  width: '100%'
}));

const ColorSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '0.2px solid #A0A0AA',
    height: '50px',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px'
  }
}));

const ColorPreview = styled(Box)(({ theme }) => ({
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

const ColorPicker = ({ value, onChange }) => {
  const colorOptions = [
    { value: '#EF232A', label: '#EF232A' },
    { value: '#0B91D6', label: '#0B91D6' },
    { value: '#28A745', label: '#28A745' },
    { value: '#FFC107', label: '#FFC107' }
  ];

  return (
    <ColorPickerContainer>
      <ColorSelect
        value={value}
        onChange={onChange}
        IconComponent={() => <DropdownArrowIcon width={7} height={4} color="#0B91D6" />}
        sx={{ 
          '& .MuiSelect-icon': {
            right: '16px'
          }
        }}
      >
        {colorOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ColorPreview sx={{ backgroundColor: option.value }} />
              <ColorText sx={{ color: option.value }}>{option.label}</ColorText>
            </Box>
          </MenuItem>
        ))}
      </ColorSelect>
    </ColorPickerContainer>
  );
};

export default ColorPicker;