import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '556px',
  height: '144px'
}));

const DynamicReviewsChart = ({ reputationData }) => {
  const data = reputationData || {
    yourBusiness: { rating: 4.2, reviewCount: 44 },
    reviews: []
  };

  // Normalize reviews array from possible shapes
  const reviewsArray = Array.isArray(data.reviews) ? data.reviews : (data.reviews?.reviews || []);

  // Convert Google's enum rating to number
  const toNumeric = (star) => {
    if (typeof star === 'number') return star;
    const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    return map[String(star || '').toUpperCase()] || 0;
  };

  // Build counts per star either from real reviews or estimate from avg/total
  const buildCounts = (avgRating, totalReviews) => {
    const ratings = [5, 4, 3, 2, 1];
    // Use actual reviews when available
    if (reviewsArray.length > 0) {
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviewsArray.forEach(r => {
        const n = Math.round(toNumeric(r.starRating));
        if (n >= 1 && n <= 5) counts[n]++;
      });
      return ratings.map((rating, idx) => ({ rating, count: counts[rating], yPosition: idx * 36 }));
    }

    // Fallback estimation using avg and total
    const safeRating = Number(avgRating) || 4.2;
    const safeTotal = Number(totalReviews) || 0;
    const percentages = {};
    ratings.forEach(r => {
      if (r === Math.floor(safeRating)) percentages[r] = 0.4;
      else if (Math.abs(r - safeRating) === 1) percentages[r] = 0.25;
      else percentages[r] = Math.max(0.05, 0.1 / Math.max(1, Math.abs(r - safeRating)));
    });
    return ratings.map((rating, idx) => ({
      rating,
      count: Math.max(0, Math.floor(safeTotal * percentages[rating])),
      yPosition: idx * 36
    }));
  };

  const raw = buildCounts(data.yourBusiness.rating, data.yourBusiness.reviewCount);

  // Scale widths proportionally to max count (max width ~371 like original). Minimum visible width 6px when count > 0.
  const maxCount = Math.max(1, ...raw.map(i => i.count));
  const chartData = raw.map(item => ({
    ...item,
    width: item.count === 0 ? 0 : Math.max(6, (item.count / maxCount) * 371)
  }));

  return (
    <ChartContainer>
      <svg viewBox="0 0 556 144" width="556" height="144" fill="none" xmlns="http://www.w3.org/2000/svg">
        {chartData.map((item, index) => {
          const yPos = item.yPosition;
          return (
            <g key={index}>
              {/* Background bar (light gray) */}
              <path 
                d={`M556,${yPos + 4}c2.21,0 4,-1.791 4,-4c0,-2.209 -1.79,-4 -4,-4v4zM556,${yPos}v-4h-556v4v4h556z`}
                fill="#A0A0AA" 
                fillOpacity="0.2"
              />
              
              {/* Data bar (green) */}
              <path 
                d={`M0,${yPos - 4}c-2.209,0 -4,1.791 -4,4c0,2.209 1.791,4 4,4v-4zM${item.width},${yPos}v-4h-${item.width}v4v4h${item.width}z`}
                fill="#34A853"
              />
            </g>
          );
        })}
      </svg>
    </ChartContainer>
  );
};

export default DynamicReviewsChart;
