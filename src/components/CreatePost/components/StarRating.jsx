import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarRatingIcon from '../../icons/StarRatingIcon';

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '-1px'
}));

const StarRating = ({ rating = 0, maxRating = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <RatingContainer>
      <StarRatingIcon width={120} height={24} color="#FFD700" />
    </RatingContainer>
  );
};

export default StarRating;