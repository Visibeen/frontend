import React, { useState } from 'react';
import { Box, Typography, Stack, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

const MonthlyAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6 Month');

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

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
            <MenuItem value="3 Month">3 Month</MenuItem>
            <MenuItem value="6 Month">6 Month</MenuItem>
            <MenuItem value="12 Month">12 Month</MenuItem>
          </PeriodSelect>
        </PeriodSelector>
      </AnalysisHeader>
      
      <ChartContainer>
        <ChartImage 
          src="/images/monthly-rating-chart.svg" 
          alt="Monthly rating analysis chart" 
        />
      </ChartContainer>
    </AnalysisContainer>
  );
};

export default MonthlyAnalysis;