import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '17px'
}));

const StatCard = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '16px'
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927'
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  border: '0.6px solid #F6F0F0',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px'
}));

const ChartImage = styled('img')(({ theme }) => ({
  width: '142px',
  height: '142px'
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  gap: '12px',
  width: '100%'
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const LegendLabel = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px'
}));

const LegendDot = styled(Box)(({ theme, color }) => ({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  backgroundColor: color
}));

const LegendText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#000000'
}));

const LegendCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#FBBC05'
}));

const LegendPercentage = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#0B91D6'
}));

const StatisticsSection = () => {
  const lowScoreData = [
    {
      label: 'Text',
      color: '#34A853',
      count: '94 Reviews',
      percentage: '58%'
    },
    {
      label: 'Non Text',
      color: 'rgba(52, 168, 83, 0.20)',
      count: '61 Reviews',
      percentage: '42%'
    }
  ];

  const repliedData = [
    {
      label: 'Replied',
      color: '#114069',
      count: '94 Reviews',
      percentage: '40%'
    },
    {
      label: 'Not Replied',
      color: 'rgba(17, 64, 105, 0.20)',
      count: '61 Reviews',
      percentage: '60%'
    }
  ];

  return (
    <SectionContainer>
      <StatCard>
        <CardTitle>Low score Reviews</CardTitle>
        <ChartContainer>
          <ChartImage src="/images/low-score-pie-chart.svg" alt="Low score reviews chart" />
          <LegendContainer>
            {lowScoreData.map((item, index) => (
              <LegendItem key={index}>
                <LegendLabel>
                  <LegendDot color={item.color} />
                  <LegendText>{item.label}</LegendText>
                </LegendLabel>
                <Stack direction="row" spacing={2}>
                  <LegendCount>{item.count}</LegendCount>
                  <LegendPercentage>{item.percentage}</LegendPercentage>
                </Stack>
              </LegendItem>
            ))}
          </LegendContainer>
        </ChartContainer>
      </StatCard>

      <StatCard>
        <CardTitle>Replied vs Not Replied</CardTitle>
        <ChartContainer>
          <ChartImage src="/images/replied-pie-chart.svg" alt="Replied vs not replied chart" />
          <LegendContainer>
            {repliedData.map((item, index) => (
              <LegendItem key={index}>
                <LegendLabel>
                  <LegendDot color={item.color} />
                  <LegendText>{item.label}</LegendText>
                </LegendLabel>
                <Stack direction="row" spacing={2}>
                  <LegendCount>{item.count}</LegendCount>
                  <LegendPercentage>{item.percentage}</LegendPercentage>
                </Stack>
              </LegendItem>
            ))}
          </LegendContainer>
        </ChartContainer>
      </StatCard>
    </SectionContainer>
  );
};

export default StatisticsSection;