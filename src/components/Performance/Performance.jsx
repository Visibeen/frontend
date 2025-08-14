import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const MetricsGrid = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0'
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px',
  fontFamily: 'Inter, sans-serif'
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: '#0B91D6',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const MetricDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const Performance = () => {
  const metrics = [
    {
      title: 'Total Views',
      value: '12,847',
      description: 'Profile views this month',
      color: '#0B91D6'
    },
    {
      title: 'Search Appearances',
      value: '8,234',
      description: 'Times your business appeared in search',
      color: '#10B981'
    },
    {
      title: 'Customer Actions',
      value: '1,456',
      description: 'Calls, directions, and website visits',
      color: '#F59E0B'
    },
    {
      title: 'Photo Views',
      value: '3,892',
      description: 'Views on your business photos',
      color: '#EF232A'
    }
  ];

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Performance</PageTitle>
          <PageSubtitle>
            Track your business performance and engagement metrics
          </PageSubtitle>
        </PageHeader>

        <MetricsGrid>
          {metrics.map((metric, index) => (
            <MetricCard key={index}>
              <CardContent sx={{ padding: '24px' }}>
                <MetricTitle>{metric.title}</MetricTitle>
                <MetricValue sx={{ color: metric.color }}>
                  {metric.value}
                </MetricValue>
                <MetricDescription>{metric.description}</MetricDescription>
              </CardContent>
            </MetricCard>
          ))}
        </MetricsGrid>
      </PageContainer>
    </DashboardLayout>
  );
};

export default Performance;