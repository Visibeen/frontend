import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GreenLeafIcon from '../icons/GreenLeafIcon';
import RedChartIcon from '../icons/RedChartIcon';
import YellowPieIcon from '../icons/YellowPieIcon';
import BarChartIcon from '../icons/BarChartIcon';
import PieChartFilledIcon from '../icons/PieChartFilledIcon';
import BlueCircleChartIcon from '../icons/BlueCircleChartIcon';

const StatsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '13px',
  flexWrap: 'wrap'
}));

const StatCard = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '4px',
  minWidth: '120px'
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'center'
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  color: '#121927',
  textAlign: 'center'
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const HeatmapStatsSection = ({ stats }) => {
  const statsData = [
    {
      label: 'Good',
      value: `${stats.good}%`,
      icon: <GreenLeafIcon width={40} height={40} />
    },
    {
      label: 'Poor',
      value: `${stats.poor}%`,
      icon: <RedChartIcon width={40} height={40} />
    },
    {
      label: 'Average',
      value: `${stats.average}%`,
      icon: <YellowPieIcon width={40} height={40} />
    },
    {
      label: 'Average Rank',
      value: stats.averageRank,
      icon: <BarChartIcon width={36} height={26} />
    },
    {
      label: 'Share of voice',
      value: `${stats.shareOfVoice}%`,
      icon: <PieChartFilledIcon width={40} height={40} />
    },
    {
      label: 'Out of Top 20',
      value: `${stats.outOfTop20}%`,
      icon: <BlueCircleChartIcon width={40} height={40} />
    }
  ];

  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatCard key={index}>
          <StatLabel>{stat.label}</StatLabel>
          <StatValue>{stat.value}</StatValue>
          <IconContainer>
            {stat.icon}
          </IconContainer>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default HeatmapStatsSection;