import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '88px',
  height: '88px',
  marginLeft: '90px'
}));

const DynamicRatingChart = ({ reputationData }) => {
  const data = reputationData || {
    yourBusiness: { rating: 4.2, responseRate: 45, negativeRatio: 8 }
  };

  // Calculate values based on real data
  const rating = Number(data.yourBusiness.rating) || 4.2; // out of 5
  const responseRate = Number(data.yourBusiness.responseRate) || 45; // percent
  const negativeRatio = Number(data.yourBusiness.negativeRatio) || 8; // percent

  // Create path data similar to original SVG
  const centerX = 43.8689;
  const centerY = 43.8689;
  const radius = 40.7787;

  // Convert data points to normalized proportions so the full chart equals 360°
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const ratingPct = clamp(rating / 5, 0, 1);
  const responsePct = clamp(responseRate / 100, 0, 1);
  const negativePct = clamp(negativeRatio / 100, 0, 1);

  const total = ratingPct + responsePct + negativePct || 1;
  const rN = ratingPct / total;
  const rrN = responsePct / total;
  const negN = negativePct / total;

  const ratingAngle = rN * 360;
  const responseAngle = rrN * 360;
  const negativeAngle = negN * 360;

  // Generate paths for each segment in order: rating (blue), response (green), negative (red)
  const ratingPath = createArcPath(centerX, centerY, radius, 0, ratingAngle);
  const responsePath = createArcPath(centerX, centerY, radius, ratingAngle, ratingAngle + responseAngle);
  const negativePath = createArcPath(centerX, centerY, radius, ratingAngle + responseAngle, ratingAngle + responseAngle + negativeAngle);

  function createArcPath(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  return (
    <ChartContainer>
      <svg viewBox="0 0 87.7378 87.7378" width="88" height="88" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue segment (Rating) */}
        <path 
          d={ratingPath}
          fill="#0B91D6" 
          stroke="white" 
          strokeWidth="0.54599"
        />
        
        {/* Green segment (Response Rate) */}
        <path 
          d={responsePath}
          fill="#34A853" 
          stroke="white" 
          strokeWidth="0.54599"
        />

        {/* Red segment (Negative Ratio) */}
        <path 
          d={negativePath}
          fill="#EF232A" 
          stroke="white" 
          strokeWidth="0.54599"
        />
      </svg>
    </ChartContainer>
  );
};

export default DynamicRatingChart;
