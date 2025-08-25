import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ScheduleDropdown from './ScheduleDropdown';

const ScheduleContainer = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#EF232A'
}));

const ScheduleRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap'
}));

const ScheduleText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const ScheduleSection = ({ formData, onFormChange }) => {
  const frequencyOptions = ['Weekly', 'Daily', 'Monthly'];
  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const periodOptions = ['Am', 'Pm'];

  const handleScheduleChange = (field, value) => {
    onFormChange('schedule', {
      ...formData.schedule,
      [field]: value
    });
  };

  return (
    <ScheduleContainer>
      <FieldLabel>Schedule*</FieldLabel>
      <ScheduleRow>
        <ScheduleDropdown
          value={formData.schedule.frequency}
          options={frequencyOptions}
          onChange={(value) => handleScheduleChange('frequency', value)}
          width="151px"
        />
        
        <ScheduleText>on</ScheduleText>
        
        <ScheduleDropdown
          value={formData.schedule.day}
          options={dayOptions}
          onChange={(value) => handleScheduleChange('day', value)}
          width="157px"
        />
        
        <ScheduleText>at</ScheduleText>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ScheduleDropdown
            value={`${formData.schedule.time} ${formData.schedule.period}`}
            options={[
              '10 : 20 Am', '11 : 30 Am', '12 : 00 Pm', 
              '01 : 00 Pm', '02 : 30 Pm', '03 : 45 Pm'
            ]}
            onChange={(value) => {
              const [time, period] = value.split(' ');
              handleScheduleChange('time', time);
              handleScheduleChange('period', period);
            }}
            width="151px"
          />
        </Box>
      </ScheduleRow>
    </ScheduleContainer>
  );
};

export default ScheduleSection;