import React from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const FiltersContainer = styled(Box)(({ theme }) => ({
  marginBottom: '24px'
}));

const FiltersLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: '8px'
}));

const ChipsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '14px',
  marginBottom: '16px'
}));

const RatingChip = styled(Chip)(({ theme, selected }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: selected ? '#ffffff' : '#121927',
  backgroundColor: selected ? '#4CAF50' : '#f5f5f5',
  border: 'none',
  borderRadius: '16px',
  padding: '6px 12px',
  height: '32px',
  '&:hover': {
    backgroundColor: selected ? '#45A049' : '#e0e0e0'
  },
  '& .MuiChip-label': {
    padding: '0 8px'
  }
}));

const KeywordsInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '12px 16px',
  border: 'none',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  backgroundColor: 'transparent',
  '&::placeholder': {
    color: '#A0A0AA'
  }
}));

const RatingFilters = ({ ratingOptions, selectedRatings, keywords, onRatingToggle, onKeywordsChange }) => {
  const handleRatingClick = (rating) => {
    onRatingToggle(rating);
  };

  return (
    <FiltersContainer>
      <FiltersLabel>Select Ratings</FiltersLabel>
      <ChipsContainer>
        {ratingOptions.map((option) => (
          <RatingChip
            key={option.value}
            label={option.label}
            selected={selectedRatings.includes(option.label)}
            onClick={() => handleRatingClick(option.label)}
            clickable
          />
        ))}
      </ChipsContainer>
      <KeywordsInput
        type="text"
        placeholder="Select keywords"
        value={keywords}
        onChange={(e) => onKeywordsChange(e.target.value)}
      />
    </FiltersContainer>
  );
};

export default RatingFilters;