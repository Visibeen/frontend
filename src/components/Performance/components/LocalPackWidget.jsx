import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '../icons/TrendingUpIcon';

const WidgetContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px'
}));

const CircularContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '169px',
  height: '172px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F6F0F0',
  borderRadius: '50%'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px'
}));

const AppearancesText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#A0A0AA',
  textAlign: 'center'
}));

const RatioText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#000000',
  textAlign: 'center'
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const ChangeContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
  marginTop: '8px'
}));

const ChangeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#34A853'
}));

const LocalPackWidget = ({ appearances, totalPossible, change, description }) => {
  return (
    <WidgetContainer>
      <CircularContainer>
        <ContentContainer>
          <AppearancesText>Local Appearances</AppearancesText>
          <RatioText>{appearances}/{totalPossible}</RatioText>
          <DescriptionText>{description}</DescriptionText>
          <ChangeContainer>
            <TrendingUpIcon width={18} height={10} color="#34A853" />
            <ChangeText>+{change} vs last month</ChangeText>
          </ChangeContainer>
        </ContentContainer>
      </CircularContainer>
    </WidgetContainer>
  );
};

export default LocalPackWidget;