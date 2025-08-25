import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import PageHeader from '../Dashboard/components/PageHeader';
import BenchmarkingTable from './BenchmarkingTable';
import ReviewsOverview from './ReviewsOverview';
import StatisticsSection from './StatisticsSection';
import MonthlyAnalysis from './MonthlyAnalysis';

const PageContainer = styled(Stack)(({ theme }) => ({
  gap: '26px'
}));

const BenchmarkingSection = styled(Stack)(({ theme }) => ({
  gap: '36px'
}));

const BenchmarkingHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '16px'
}));

const BenchmarkingInfo = styled(Stack)(({ theme }) => ({
  gap: '6px',
  flex: 1
}));

const BenchmarkingTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const BenchmarkingSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const SyncButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  width: '150px',
  height: '45px',
  color: '#121927',
  textTransform: 'none',
  padding: '8px 16px',
  border: '1px solid #E5E7EB',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: '#F9FAFB'
  }
}));

const BenchmarkingContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '18px',
  alignItems: 'flex-start'
}));

const RatingChartContainer = styled(Stack)(({ theme }) => ({
  gap: '14px',
  alignItems: 'center'
}));

const RatingChart = styled('img')(({ theme }) => ({
  width: '88px',
  height: '88px',
  marginLeft: '90px'
}));

const ChartLegend = styled(Stack)(({ theme }) => ({
  gap: '8px',
  marginLeft: '50px'
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px'
}));

const LegendDot = styled(Box)(({ theme, color }) => ({
  width: '8px',
  height: '8px',
  backgroundColor: color
}));

const LegendText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#000000'
}));

const ReviewsSection = styled(Stack)(({ theme }) => ({
  gap: '26px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927'
}));

const ReputationBenchmarking = () => {
  const legendItems = [
    { color: '#0B91D6', label: 'Avg. Rating' },
    { color: '#34A853', label: 'Review Response Rate' },
    { color: '#EF232A', label: 'Negative Review Ratio' }
  ];

  return (
    <DashboardLayout>
      <PageContainer>
        <BenchmarkingSection>
          <BenchmarkingHeader>
            <BenchmarkingInfo>
              <BenchmarkingTitle>Reputation Benchmarking</BenchmarkingTitle>
              <BenchmarkingSubtitle>
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
              </BenchmarkingSubtitle>
            </BenchmarkingInfo>
            <SyncButton>
              Sync Contact
            </SyncButton>
          </BenchmarkingHeader>

          <BenchmarkingContent>
            <RatingChartContainer>
              <RatingChart src="/images/rating-pie-chart.svg" alt="Rating distribution chart" />
              <ChartLegend>
                {legendItems.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendDot color={item.color} />
                    <LegendText>{item.label}</LegendText>
                  </LegendItem>
                ))}
              </ChartLegend>
            </RatingChartContainer>
            
            <BenchmarkingTable />
          </BenchmarkingContent>
        </BenchmarkingSection>

        <ReviewsSection>
          <SectionTitle>Reviews Overview</SectionTitle>
          <ReviewsOverview />
        </ReviewsSection>

        <StatisticsSection />

        <MonthlyAnalysis />
      </PageContainer>
    </DashboardLayout>
  );
};

export default ReputationBenchmarking;