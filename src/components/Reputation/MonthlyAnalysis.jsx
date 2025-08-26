import React, { useState } from 'react';
import { Box, Typography, Stack, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DynamicMonthlyChart from './DynamicMonthlyChart';

const AnalysisContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const AnalysisHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '531px'
}));

const AnalysisTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927'
}));

const PeriodSelector = styled(FormControl)(({ theme }) => ({
  minWidth: '137px'
}));

const PeriodSelect = styled(Select)(({ theme }) => ({
  border: '0.2px solid #0B91D6',
  borderRadius: '8px',
  height: '50px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSelect-select': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#0B91D6',
    padding: '16px 30px 16px 16px'
  }
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '589px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ChartImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '1015px',
  height: 'auto',
  maxHeight: '589px',
  objectFit: 'contain'
}));

const MonthlyAnalysis = ({ reputationData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 Month');

  // Use real data if available
  const data = reputationData || {
    yourBusiness: { rating: 4.2, reviewCount: 0 }
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Generate chart data based on real business rating
  const generateChartData = () => {
    const baseRating = Number(data.yourBusiness.rating) || 4.2;
    const months = selectedPeriod === '1 Month' ? 1 : selectedPeriod === '3 Month' ? 3 : selectedPeriod === '6 Month' ? 6 : selectedPeriod === '12 Month' ? 12 : 24;
    
    // Generate realistic monthly variations around the base rating
    const monthlyData = [];
    for (let i = 0; i < months; i++) {
      const variation = (Math.random() - 0.5) * 0.4; // ±0.2 variation
      const monthRating = Math.max(1, Math.min(5, baseRating + variation));
      monthlyData.push(monthRating.toFixed(1));
    }
    
    console.log(`Generated ${months} months of rating data:`, monthlyData);
    return monthlyData;
  };

  // Generate data when period changes
  React.useEffect(() => {
    generateChartData();
  }, [selectedPeriod, data.yourBusiness.rating]);

  return (
    <AnalysisContainer>
      <AnalysisHeader>
        <AnalysisTitle>Monthly Rating Analysis</AnalysisTitle>
        <PeriodSelector>
          <PeriodSelect
            value={selectedPeriod}
            onChange={handlePeriodChange}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
          >
            <MenuItem value="1 Month">1 Month</MenuItem>
            <MenuItem value="3 Month">3 Month</MenuItem>
            <MenuItem value="6 Month">6 Month</MenuItem>
            <MenuItem value="12 Month">12 Month</MenuItem>
            <MenuItem value="All Time">All Time</MenuItem>
          </PeriodSelect>
        </PeriodSelector>
      </AnalysisHeader>
      
      <ChartContainer>
        <DynamicMonthlyChart 
          reputationData={data}
          selectedPeriod={selectedPeriod}
        />
      </ChartContainer>
    </AnalysisContainer>
  );
};

export default MonthlyAnalysis;