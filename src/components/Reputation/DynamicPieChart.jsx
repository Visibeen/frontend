import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '142px',
  height: '142px'
}));

const DynamicPieChart = ({ data, colors, title }) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate percentage for the main segment
  const mainPercentage = total > 0 ? (data[0].value / total) * 100 : 50;
  
  // Create path for the main segment based on original SVG structure
  const centerX = 71;
  const centerY = 71;
  const radius = 71;
  
  // Calculate angle for main segment (data[0])
  const mainAngle = (mainPercentage / 100) * 360;
  
  function createArcPath(cx, cy, r, startAngle, endAngle) {
    if (endAngle - startAngle >= 360) {
      // Full circle
      return `M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy}`;
    }
    
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

  // Generate paths based on original SVG structure
  const mainPath = createArcPath(centerX, centerY, radius, 0, mainAngle);
  
  return (
    <ChartContainer>
      <svg viewBox="0 0 142 142" width="142" height="142" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle (secondary color) */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill={colors[1] || '#f0f0f0'}
        />
        
        {/* Main segment */}
        {mainAngle > 0 && (
          <path 
            d={mainPath}
            fill={colors[0] || '#34A853'} 
            stroke="white" 
            strokeWidth="2"
          />
        )}
      </svg>
    </ChartContainer>
  );
};

export default DynamicPieChart;
