import React from 'react';
import { Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const ToggleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '18px',
  alignItems: 'center',
  marginBottom: '40px'
}));

const ManualButton = styled(Button)(({ theme, selected }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  color: selected ? '#ffffff' : '#121927',
  backgroundColor: selected ? '#0B91D6' : 'transparent',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: selected ? '#0980C2' : 'rgba(11, 145, 214, 0.04)'
  }
}));

const AIButton = styled(Button)(({ theme, selected }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  color: selected ? '#ffffff' : '#121927',
  backgroundColor: selected ? '#FBBC05' : 'transparent',
  border: selected ? 'none' : '0.6px solid #f6f0f0',
  borderRadius: '8px',
  padding: '12px 16px',
  minWidth: '150px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '&:hover': {
    backgroundColor: selected ? '#E6A800' : 'rgba(251, 188, 5, 0.04)'
  }
}));

const AIIcon = styled(StarIcon)(({ theme, selected }) => ({
  width: '13px',
  height: '13px',
  color: selected ? '#ffffff' : '#FBBC05'
}));

const ReplyModeToggle = ({ selectedMode, onModeChange }) => {
  return (
    <ToggleContainer>
      <ManualButton
        selected={selectedMode === 'Manually'}
        onClick={() => onModeChange('Manually')}
      >
        Manually
      </ManualButton>
      
      <AIButton
        selected={selectedMode === 'Reply with Ai'}
        onClick={() => onModeChange('Reply with Ai')}
      >
        <AIIcon selected={selectedMode === 'Reply with Ai'} />
        Reply with Ai
      </AIButton>
    </ToggleContainer>
  );
};

export default ReplyModeToggle;