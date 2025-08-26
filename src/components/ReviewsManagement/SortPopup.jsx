import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Popover, MenuItem, Select, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import DropdownIcon from '../icons/DropdownIcon';

const PopoverContent = styled(Box)(({ theme }) => ({
  width: '300px',
  padding: '16px',
  border: '0.6px solid #0b91d6',
  borderRadius: '12px',
  backgroundColor: '#ffffff'
}));

const SortTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927',
  marginBottom: '16px'
}));

const Divider = styled(Box)(({ theme }) => ({
  height: '1px',
  backgroundColor: '#a0a0aa',
  border: '0.6px solid #a0a0aa',
  margin: '16px 0'
}));

const SortSection = styled(Stack)(({ theme }) => ({
  gap: '17px'
}));

const SortLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927'
}));

const SortSelect = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '0.2px solid #a0a0aa',
    backgroundColor: '#ffffff',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiSelect-select': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0b91d6',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '16px'
}));

const ResetButton = styled(Button)(({ theme }) => ({
  color: '#ef232a',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  backgroundColor: 'transparent',
  border: 'none',
  '&:hover': {
    backgroundColor: 'rgba(239, 35, 42, 0.04)'
  }
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0b91d6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  borderRadius: '4px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const SortPopup = ({ open, anchorEl, onClose, sortBy, onApply }) => {
  const [localSort, setLocalSort] = useState(sortBy);

  // Keep local state in sync with parent when opening or when sortBy changes
  useEffect(() => {
    if (open) {
      setLocalSort(sortBy);
    }
  }, [open, sortBy]);

  const handleSortChange = (value) => {
    setLocalSort(value);
  };

  const handleReset = () => {
    setLocalSort('new');
  };

  const handleApply = () => {
    onApply(localSort);
  };

  const getSortLabel = (value) => {
    switch (value) {
      case 'new': return 'Newest First';
      case 'old': return 'Oldest First';
      case 'high-rating': return 'High Rating';
      case 'low-rating': return 'Low Rating';
      default: return 'Newest First';
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
      }}
    >
      <PopoverContent>
        <SortTitle>Sort By</SortTitle>
        <Divider />
        
        <SortSection>
          <SortLabel>Sort order</SortLabel>
          <SortSelect fullWidth>
            <Select
              value={localSort}
              onChange={(e) => handleSortChange(e.target.value)}
              IconComponent={() => <DropdownIcon width={7} height={4} color="#a0a0aa" />}
            >
              <MenuItem value="new">Newest First</MenuItem>
              <MenuItem value="old">Oldest First</MenuItem>
              <MenuItem value="high-rating">High Rating</MenuItem>
              <MenuItem value="low-rating">Low Rating</MenuItem>
            </Select>
          </SortSelect>
        </SortSection>
        
        <Divider />
        
        <ActionButtons>
          <ResetButton onClick={handleReset}>
            Reset
          </ResetButton>
          <ApplyButton onClick={handleApply}>
            Apply
          </ApplyButton>
        </ActionButtons>
      </PopoverContent>
    </Popover>
  );
};

export default SortPopup;