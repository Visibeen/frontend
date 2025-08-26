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

const FilterTitle = styled(Typography)(({ theme }) => ({
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

const FilterSection = styled(Stack)(({ theme }) => ({
  gap: '26px'
}));

const FilterGroup = styled(Stack)(({ theme }) => ({
  gap: '17px'
}));

const FilterLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927'
}));

const FilterSelect = styled(FormControl)(({ theme }) => ({
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

const FilterPopup = ({ open, anchorEl, onClose, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Keep local state in sync with parent when opening or when filters change
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      duration: 'All time',
      rating: '5',
      response: 'Positive'
    };
    setLocalFilters(resetFilters);
  };

  const handleApply = () => {
    onApply(localFilters);
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
        <FilterTitle>Filter</FilterTitle>
        <Divider />
        
        <FilterSection>
          <FilterGroup>
            <FilterLabel>Select duration</FilterLabel>
            <FilterSelect fullWidth>
              <Select
                value={localFilters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                IconComponent={() => <DropdownIcon width={7} height={4} color="#a0a0aa" />}
              >
                <MenuItem value="All time">All time</MenuItem>
                <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                <MenuItem value="Last 30 days">Last 30 days</MenuItem>
                <MenuItem value="Last 90 days">Last 90 days</MenuItem>
                <MenuItem value="Last year">Last year</MenuItem>
              </Select>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Select rating</FilterLabel>
            <FilterSelect fullWidth>
              <Select
                value={localFilters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                IconComponent={() => <DropdownIcon width={7} height={4} color="#a0a0aa" />}
              >
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="1">1</MenuItem>
              </Select>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Select response</FilterLabel>
            <FilterSelect fullWidth>
              <Select
                value={localFilters.response}
                onChange={(e) => handleFilterChange('response', e.target.value)}
                IconComponent={() => <DropdownIcon width={7} height={4} color="#a0a0aa" />}
              >
                <MenuItem value="Positive">Positive</MenuItem>
                <MenuItem value="Negative">Negative</MenuItem>
                <MenuItem value="Neutral">Neutral</MenuItem>
                <MenuItem value="All">All</MenuItem>
              </Select>
            </FilterSelect>
          </FilterGroup>
        </FilterSection>
        
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

export default FilterPopup;