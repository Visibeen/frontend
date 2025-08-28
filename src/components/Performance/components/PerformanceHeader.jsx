import React from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExportIcon from '../icons/ExportIcon';
import DropdownIcon from '../icons/DropdownIcon';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '32px'
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  flex: 1
}));

const HeaderRight = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '6px',
  fontFamily: 'Inter, sans-serif'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  fontFamily: 'Inter, sans-serif'
}));

const ExportButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '10px 16px',
  gap: '10px',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.20)',
    borderColor: '#A0A0AA'
  }
}));

const TimeRangeSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 137,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '0.2px solid #A0A0AA',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 400,
    color: '#0B91D6',
    fontFamily: 'Inter, sans-serif',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  },
  '& .MuiSelect-select': {
    padding: '12px 16px',
    paddingRight: '40px'
  }
}));

const PerformanceHeader = ({ 
  onExportToPDF, 
  selectedTimeRange = '6 Month',
  onTimeRangeChange 
}) => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <PageTitle>Performance</PageTitle>
        <PageSubtitle>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic.
        </PageSubtitle>
      </HeaderLeft>
      
      <HeaderRight>
        <ExportButton onClick={onExportToPDF}>
          <ExportIcon width={17} height={17} color="#121927" />
          Export to PDF
        </ExportButton>
        
        <TimeRangeSelect size="small">
          <Select
            value={selectedTimeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value)}
            IconComponent={() => <DropdownIcon width={7} height={4} color="#0B91D6" />}
          >
            <MenuItem value="1 Week">1 Week</MenuItem>
            <MenuItem value="1 Month">1 Month</MenuItem>
            <MenuItem value="3 Month">3 Month</MenuItem>
            <MenuItem value="6 Month">6 Month</MenuItem>
            <MenuItem value="1 Year">1 Year</MenuItem>
          </Select>
        </TimeRangeSelect>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default PerformanceHeader;