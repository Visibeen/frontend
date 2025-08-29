import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';

const rotateIn = keyframes`
  0% { 
    transform: rotate(-90deg) scale(0.3);
    opacity: 0;
  }
  50% { 
    transform: rotate(0deg) scale(1.1);
    opacity: 0.8;
  }
  100% { 
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
  }
  50% { 
    filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
  }
`;

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '320px',
  height: '320px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  animation: `${rotateIn} 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both, ${glow} 3s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '280px',
    height: '280px',
    transform: 'translate(-50%, -50%)',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1
  }
}));

const CenterContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  width: '140px',
  height: '140px',
  justifyContent: 'center',
  backdropFilter: 'blur(15px)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
}));

const CenterScore = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '36px',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 4px 16px rgba(0,0,0,0.3)',
  lineHeight: 1,
  letterSpacing: '-1px'
}));

const CenterLabel = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.9)',
  textTransform: 'uppercase',
  letterSpacing: '1px'
}));

const AnimatedDonutChart = ({ score = 0, maxScore = 500, animate = false }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  // Calculate breakdown based on score with modern colors
  const getScoreBreakdown = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    
    // Define score categories with fresh modern colors
    const categories = [
      { label: 'Verification & Basic Info', value: 0, color: '#10b981', maxValue: 150 }, // Emerald
      { label: 'Content & Description', value: 0, color: '#3b82f6', maxValue: 100 }, // Blue  
      { label: 'Contact & Hours', value: 0, color: '#f59e0b', maxValue: 120 }, // Amber
      { label: 'Categories & Services', value: 0, color: '#ef4444', maxValue: 130 } // Red
    ];

    // Distribute score across categories based on typical profile strength factors
    let remainingScore = score;
    
    categories.forEach((category, index) => {
      if (remainingScore > 0) {
        const allocation = Math.min(remainingScore, category.maxValue);
        category.value = allocation;
        remainingScore -= allocation;
      }
    });

    // Filter out zero values and add remaining capacity with gradient
    const activeCategories = categories.filter(cat => cat.value > 0);
    const totalCapacity = categories.reduce((sum, cat) => sum + cat.maxValue, 0);
    const remainingCapacity = totalCapacity - score;

    if (remainingCapacity > 0) {
      activeCategories.push({
        label: 'Growth Potential',
        value: remainingCapacity,
        color: 'rgba(255, 255, 255, 0.15)'
      });
    }

    return activeCategories;
  };

  useEffect(() => {
    if (animate && score > 0) {
      const breakdown = getScoreBreakdown(score, maxScore);
      
      // Start with zero values
      const initialData = breakdown.map(item => ({
        ...item,
        value: 0,
        id: item.label
      }));
      
      setAnimatedData(initialData);
      setShowChart(true);

      // Animate to final values
      setTimeout(() => {
        const finalData = breakdown.map(item => ({
          ...item,
          id: item.label
        }));
        setAnimatedData(finalData);
      }, 800);
    }
  }, [animate, score, maxScore]);

  if (!showChart) return null;

  return (
    <ChartContainer>
      <PieChart
        series={[
          {
            data: animatedData,
            innerRadius: 90,
            outerRadius: 140,
            paddingAngle: 3,
            cornerRadius: 6,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 85, additionalRadius: -8, color: 'gray' }
          }
        ]}
        width={320}
        height={320}
        slotProps={{
          legend: { hidden: true }
        }}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <CenterContent>
        <CenterScore>{score}</CenterScore>
        <CenterLabel>Score</CenterLabel>
      </CenterContent>
    </ChartContainer>
  );
};

export default AnimatedDonutChart;