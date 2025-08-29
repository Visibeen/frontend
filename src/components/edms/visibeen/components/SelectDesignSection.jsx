import React from 'react';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DesignGrid from './DesignGrid';

const SectionContainer = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'center'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  gap: '6px',
  alignItems: 'center',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927'
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  maxWidth: '600px'
}));

const SelectDesignSection = ({ designs, onDesignSelect, accountInfo }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Select Design</SectionTitle>
        <SectionDescription>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </SectionDescription>
      </SectionHeader>
      <DesignGrid 
        designs={designs}
        onDesignSelect={onDesignSelect}
        accountInfo={accountInfo}
      />
    </SectionContainer>
  );
};

export default SelectDesignSection;