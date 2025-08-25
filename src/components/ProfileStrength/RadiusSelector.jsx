import React from 'react';
import { Box, Typography, Stack, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectorContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927'
}));

const RadiusValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6'
}));

const UnitSelector = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '14px',
  flexWrap: 'wrap'
}));

const UnitButton = styled(Typography)(({ theme, selected }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: selected ? '#ffffff' : '#121927',
  backgroundColor: selected ? '#34A853' : '#ffffff',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  border: selected ? 'none' : '1px solid #E5E7EB',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: selected ? '#10B981' : '#F3F4F6'
  }
}));

const RadiusSelector = ({ value, selectedUnit, onValueChange, onUnitChange }) => {
  return (
    <SelectorContainer>
      <FieldLabel>Radius*</FieldLabel>
      <RadiusValue>{value} {selectedUnit}</RadiusValue>
      <Box sx={{ px: 1 }}>
        <Slider
          value={typeof value === 'number' ? value : 1}
          min={1}
          max={20}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(_, v) => onValueChange(v)}
          sx={{ maxWidth: 420 }}
        />
      </Box>
      <UnitSelector>
        <UnitButton 
          selected={selectedUnit === 'Km'}
          onClick={() => onUnitChange('Km')}
        >
          Km
        </UnitButton>
        <UnitButton 
          selected={selectedUnit === 'Miles'}
          onClick={() => onUnitChange('Miles')}
        >
          Miles
        </UnitButton>
      </UnitSelector>
    </SelectorContainer>
  );
};

export default RadiusSelector;