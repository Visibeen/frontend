import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MetricCard from './MetricCard';

const MetricsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '25px',
  marginBottom: '26px'
}));

const MetricsGrid = ({ performanceMetrics }) => {
  const metrics = [
    {
      title: 'Local Views',
      value: performanceMetrics.localViews,
      change: performanceMetrics.localViewsChange,
      backgroundColor: '#34A853'
    },
    {
      title: 'Calls from GBP',
      value: performanceMetrics.callsFromGBP,
      change: performanceMetrics.callsFromGBPChange,
      backgroundColor: '#34A853'
    },
    {
      title: 'Direction Requests',
      value: performanceMetrics.directionRequests,
      change: performanceMetrics.directionRequestsChange,
      backgroundColor: '#EF232A'
    },
    {
      title: 'Website Clicks',
      value: performanceMetrics.websiteClicks,
      change: performanceMetrics.websiteClicksChange,
      backgroundColor: '#34A853'
    },
    {
      title: 'New Reviews',
      value: performanceMetrics.newReviews,
      change: performanceMetrics.newReviewsChange,
      backgroundColor: '#34A853'
    }
  ];

  return (
    <MetricsContainer>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          backgroundColor={metric.backgroundColor}
          valueColor="#FFFFFF"
        />
      ))}
    </MetricsContainer>
  );
};

export default MetricsGrid;