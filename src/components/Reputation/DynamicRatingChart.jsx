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

  // Calculate percentages based on real data
  const rating = Number(data.yourBusiness.rating) || 4.2;
  const responseRate = Number(data.yourBusiness.responseRate) || 45;
  const negativeRatio = Number(data.yourBusiness.negativeRatio) || 8;

  // Create path data similar to original SVG
  const centerX = 43.8689;
  const centerY = 43.8689;
  const radius = 40.7787;

  // Calculate angles for each segment based on data
  const ratingAngle = (rating / 5) * 120; // Rating gets up to 120 degrees
  const responseAngle = (responseRate / 100) * 120; // Response rate gets up to 120 degrees
  const negativeAngle = 360 - ratingAngle - responseAngle; // Remaining angle

  // Generate path for rating segment (blue)
  const ratingPath = createArcPath(centerX, centerY, radius, 0, ratingAngle);
  
  // Generate path for response rate segment (green)
  const responsePath = createArcPath(centerX, centerY, radius, ratingAngle, ratingAngle + responseAngle);
  
  // Generate path for negative segment (red) - fills remaining space
  const negativePath = createArcPath(centerX, centerY, radius, ratingAngle + responseAngle, 360);

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
        {/* Background circle */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill="#EF232A" 
          stroke="white" 
          strokeWidth="0.272995"
        />
        
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
      </svg>
    </ChartContainer>
  );
};

export default DynamicRatingChart;
