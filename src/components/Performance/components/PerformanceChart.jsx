import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import LegendDotIcon from '../icons/LegendDotIcon';

const ChartContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: theme.palette.background.paper,
  padding: '24px'
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

const FilterButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 55px 22px rgba(0, 0, 0, 0.01), 0px 86px 24px rgba(0, 0, 0, 0.00)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#F8F8F8'
  }
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.1)'
  }
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '24px',
  marginTop: '16px'
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px'
}));

const LegendText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#000000'
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
  marginTop: '16px',
  '&:hover': {
    backgroundColor: '#0A7BC4'
  }
}));

const PerformanceChart = ({ 
  data, 
  onViewGridData, 
  onAddCampaign,
  selectedWorkType = 'Wooden work',
  selectedFrequency = 'Weekly'
}) => {
  const chartData = {
    xAxis: [{ 
      scaleType: 'point', 
      data: data.months 
    }],
    series: [
      {
        data: data.goodRank,
        color: '#34A853',
        label: 'Good'
      },
      {
        data: data.poorRank,
        color: '#EF232A',
        label: 'Poor'
      },
      {
        data: data.averageRank,
        color: '#A0A0AA',
        label: 'Average Rank'
      }
    ]
  };

  return (
    <Box>
      <ChartTitle>Geo Rank Heatmap</ChartTitle>
      
      <ControlsRow>
        <FilterButton>{selectedWorkType}</FilterButton>
        <FilterButton>{selectedFrequency}</FilterButton>
        <AddButton onClick={onAddCampaign}>+ Add Campaign</AddButton>
      </ControlsRow>

      <ChartContainer>
        <LineChart
          width={1015}
          height={400}
          series={chartData.series}
          xAxis={chartData.xAxis}
          yAxis={[{
            min: 0,
            max: 100,
            tickNumber: 6
          }]}
          margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
          grid={{ horizontal: true, vertical: false }}
        />
        
        <LegendContainer>
          <LegendItem>
            <LegendDotIcon width={8} height={8} color="#34A853" />
            <LegendText>Good</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDotIcon width={8} height={8} color="#EF232A" />
            <LegendText>Poor</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDotIcon width={8} height={8} color="#A0A0AA" />
            <LegendText>Average Rank</LegendText>
          </LegendItem>
        </LegendContainer>
      </ChartContainer>

      <ViewDataButton onClick={onViewGridData}>
        View Grid Data
      </ViewDataButton>
    </Box>
  );
};

export default PerformanceChart;