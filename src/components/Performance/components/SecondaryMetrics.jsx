import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MetricCard from './MetricCard';

const SecondaryContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '19px',
  marginBottom: '26px'
}));

const SecondaryMetrics = ({ performanceMetrics }) => {
  return (
    <SecondaryContainer>
      <MetricCard
        title="Organic Clicks This Month"
        value={performanceMetrics.organicClicks}
        change={performanceMetrics.organicClicksChange}
        backgroundColor="rgba(52, 168, 83, 0.10)"
        valueColor="#34A853"
      />
      
      <MetricCard
        title="Avg. Google Search Volume"
        value={performanceMetrics.avgSearchVolume}
        change={performanceMetrics.avgSearchVolumeChange}
        backgroundColor="rgba(239, 35, 42, 0.10)"
        valueColor="#EF232A"
      />
    </SecondaryContainer>
  );
};

export default SecondaryMetrics;