import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import TaskCompletionWidget from './TaskCompletionWidget';

const ChartsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '19px',
  marginBottom: '26px'
}));

const ChartSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const LocalPackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px'
}));

const RankingInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center'
}));

const RankingLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#A0A0AA',
  marginBottom: '6px'
}));

const RankingValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#000000',
  marginBottom: '8px'
}));

const RankingDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#000000',
  marginBottom: '16px'
}));

const ImprovementText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#34A853',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}));

const ChartsSection = ({ localPackData, taskCompletion }) => {
  const pieData = [
    { id: 0, value: 70, color: '#34A853' },
    { id: 1, value: 30, color: '#F0F0F0' }
  ];

  return (
    <ChartsContainer>
      <ChartSection>
        <SectionTitle>Local Pack Appearances</SectionTitle>
        <LocalPackContainer>
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 60,
                outerRadius: 85,
                paddingAngle: 2,
                cornerRadius: 5
              }
            ]}
            width={169}
            height={172}
            legend={{ hidden: true }}
          />
          
          <RankingInfo>
            <RankingLabel>Local Appearances</RankingLabel>
            <RankingValue>
              {localPackData.currentRank}/{localPackData.totalPositions}
            </RankingValue>
            <RankingDescription>
              {localPackData.description}
            </RankingDescription>
            <ImprovementText>
              ↗ +{localPackData.improvement} vs last month
            </ImprovementText>
          </RankingInfo>
        </LocalPackContainer>
      </ChartSection>
      
      <ChartSection>
        <SectionTitle>Task Assign vs Complete</SectionTitle>
        <TaskCompletionWidget
          percentage={taskCompletion.completedPercentage}
          tasks={taskCompletion.tasks}
        />
      </ChartSection>
    </ChartsContainer>
  );
};

export default ChartsSection;