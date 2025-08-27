import React from 'react';
import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const TaskContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '50px',
  alignItems: 'center'
}));

const CircularContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '223px',
  height: '111px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F6F0F0',
  borderRadius: '50%'
}));

const PercentageText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  color: '#000000',
  textAlign: 'center'
}));

const CompletedText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  color: '#000000',
  textAlign: 'center'
}));

const TaskList = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const TaskItem = styled(Stack)(({ theme }) => ({
  gap: '14px'
}));

const TaskRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px'
}));

const TaskName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927',
  flex: 1
}));

const TaskRatio = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927'
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '4px',
  borderRadius: '2px',
  backgroundColor: '#F0F0F0',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#34A853',
    borderRadius: '2px'
  }
}));

const TaskCompletionWidget = ({ percentage, tasks }) => {
  return (
    <TaskContainer>
      <CircularContainer>
        <Stack alignItems="center" spacing={0.5}>
          <PercentageText>{percentage}%</PercentageText>
          <CompletedText>Task Completed</CompletedText>
        </Stack>
      </CircularContainer>
      
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <TaskRow>
              <TaskName>{task.name}</TaskName>
              <TaskRatio>{task.completed}/{task.total}</TaskRatio>
            </TaskRow>
            <StyledLinearProgress 
              variant="determinate" 
              value={(task.completed / task.total) * 100} 
            />
          </TaskItem>
        ))}
      </TaskList>
    </TaskContainer>
  );
};

export default TaskCompletionWidget;