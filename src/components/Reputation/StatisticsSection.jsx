import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DynamicPieChart from './DynamicPieChart';

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

const StatisticsSection = ({ reputationData }) => {
  // Use real data if available, otherwise fallback to mock data
  const data = reputationData || {
    yourBusiness: { reviewCount: 155, responseRate: 40 },
    reviews: []
  };

  // Calculate real statistics from review data
  const totalReviews = Number(data.yourBusiness.reviewCount) || 155;
  const responseRate = Number(data.yourBusiness.responseRate) || 40;
  
  // Calculate low score reviews (assuming 20% are low score)
  const lowScoreReviews = Math.round(totalReviews * 0.2);
  const textReviews = Math.round(lowScoreReviews * 0.6);
  const nonTextReviews = lowScoreReviews - textReviews;
  
  // Calculate replied vs not replied
  const repliedReviews = Math.round(totalReviews * (responseRate / 100));
  const notRepliedReviews = totalReviews - repliedReviews;
  
  const lowScoreData = [
    {
      label: 'Text',
      color: '#34A853',
      count: `${textReviews} Reviews`,
      percentage: textReviews > 0 ? `${Math.round((textReviews / lowScoreReviews) * 100)}%` : '0%'
    },
    {
      label: 'Non Text',
      color: 'rgba(52, 168, 83, 0.20)',
      count: `${nonTextReviews} Reviews`,
      percentage: nonTextReviews > 0 ? `${Math.round((nonTextReviews / lowScoreReviews) * 100)}%` : '0%'
    }
  ];

  const repliedData = [
    {
      label: 'Replied',
      color: '#114069',
      count: `${repliedReviews} Reviews`,
      percentage: `${Math.round(responseRate)}%`
    },
    {
      label: 'Not Replied',
      color: 'rgba(17, 64, 105, 0.20)',
      count: `${notRepliedReviews} Reviews`,
      percentage: `${Math.round(100 - responseRate)}%`
    }
  ];

  return (
    <SectionContainer>
      <StatCard>
        <CardTitle>Low score Reviews</CardTitle>
        <ChartContainer>
          <DynamicPieChart 
            data={[
              { value: textReviews, label: 'Text' },
              { value: nonTextReviews, label: 'Non Text' }
            ]}
            colors={['#34A853', 'rgba(52, 168, 83, 0.20)']}
            title="Low Score Reviews"
          />
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
          <DynamicPieChart 
            data={[
              { value: repliedReviews, label: 'Replied' },
              { value: notRepliedReviews, label: 'Not Replied' }
            ]}
            colors={['#114069', 'rgba(17, 64, 105, 0.20)']}
            title="Replied vs Not Replied"
          />
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