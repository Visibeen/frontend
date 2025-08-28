import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '../icons/TrendingUpIcon';
import TrendingDownIcon from '../icons/TrendingDownIcon';

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  borderRadius: '12px',
  border: 'none',
  backgroundColor: bgcolor || theme.palette.background.paper,
  boxShadow: 'none',
  height: '100%'
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '14px'
}));

const MetricValue = styled(Typography)(({ theme, valueColor }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  color: valueColor || '#121927',
  marginBottom: '18px'
}));

const ChangeIndicator = styled(Stack)(({ theme, isPositive }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px'
}));

const ChangeText = styled(Typography)(({ theme, isPositive }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: isPositive ? '#34A853' : '#EF232A'
}));

const MetricCard = ({ 
  title, 
  value, 
  change, 
  backgroundColor, 
  valueColor = '#121927',
  isLarge = false 
}) => {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
  
  return (
    <StyledCard bgcolor={backgroundColor}>
      <CardContent sx={{ padding: '14px' }}>
        <MetricTitle>{title}</MetricTitle>
        <MetricValue valueColor={valueColor}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </MetricValue>
        <ChangeIndicator isPositive={isPositive}>
          <TrendIcon 
            width={18} 
            height={10} 
            color={isPositive ? '#34A853' : '#EF232A'} 
          />
          <ChangeText isPositive={isPositive}>
            {isPositive ? '+' : ''}{change}% vs last month
          </ChangeText>
        </ChangeIndicator>
      </CardContent>
    </StyledCard>
  );
};

export default MetricCard;