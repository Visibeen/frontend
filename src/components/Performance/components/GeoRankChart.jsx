import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import DropdownIcon from '../icons/DropdownIcon';
import AddIcon from '../icons/AddIcon';

const ChartContainer = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const ControlsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px'
}));

const FilterSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '0.6px solid #F6F0F0',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 55px 22px rgba(0, 0, 0, 0.01), 0px 86px 24px rgba(0, 0, 0, 0.00)',
    fontSize: '14px',
    fontWeight: 400,
    color: '#0B91D6',
    fontFamily: 'Inter, sans-serif',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiSelect-select': {
    padding: '8px 16px',
    paddingRight: '32px'
  }
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '8px 16px',
  gap: '8px',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.1)'
  }
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.5px solid #F6F0F0',
  backgroundColor: '#FFFFFF',
  padding: '24px',
  marginBottom: '16px'
}));

const ViewDataButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  borderRadius: '4px',
  padding: '8px 16px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#0A7BC4'
  }
}));

const GeoRankChart = ({ geoRankData, onViewGridData, onAddCampaign }) => {
  const [selectedWork, setSelectedWork] = useState('Wooden work');
  const [selectedFrequency, setSelectedFrequency] = useState('Weekly');

  const chartData = geoRankData.map(item => item.value);
  const xAxisData = geoRankData.map(item => item.month);

  return (
    <ChartContainer>
      <ChartTitle>Geo Rank Heatmap</ChartTitle>
      
      <ControlsRow>
        <FilterSelect size="small">
          <Select
            value={selectedWork}
            onChange={(e) => setSelectedWork(e.target.value)}
            IconComponent={() => <DropdownIcon width={9} height={5} color="#0B91D6" />}
          >
            <MenuItem value="Wooden work">Wooden work</MenuItem>
            <MenuItem value="Metal work">Metal work</MenuItem>
            <MenuItem value="Glass work">Glass work</MenuItem>
          </Select>
        </FilterSelect>
        
        <FilterSelect size="small">
          <Select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            IconComponent={() => <DropdownIcon width={9} height={5} color="#0B91D6" />}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FilterSelect>
        
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0B91D6'
          }}
        >
          Campaign 1
        </Typography>
        
        <AddButton onClick={onAddCampaign}>
          <AddIcon width={12} height={12} color="#0B91D6" />
          Add Campaign
        </AddButton>
      </ControlsRow>

      <ChartWrapper>
        <LineChart
          width={1015}
          height={400}
          series={[
            {
              data: chartData,
              color: '#0B91D6',
              curve: 'linear'
            }
          ]}
          xAxis={[{
            scaleType: 'point',
            data: xAxisData
          }]}
          yAxis={[{
            min: 0,
            max: 80,
            tickNumber: 5
          }]}
          margin={{ left: 50, right: 50, top: 50, bottom: 80 }}
          grid={{ horizontal: true, vertical: false }}
        />
      </ChartWrapper>

      <ViewDataButton onClick={onViewGridData}>
        View Grid Data
      </ViewDataButton>
    </ChartContainer>
  );
};

export default GeoRankChart;