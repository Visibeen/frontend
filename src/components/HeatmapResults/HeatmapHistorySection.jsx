import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import GridHistoryIcon from '../icons/GridHistoryIcon';

const HistoryContainer = styled(Stack)(({ theme }) => ({
  gap: '26px'
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927'
}));

const HistoryTable = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  overflow: 'hidden'
}));

const TableHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '91px'
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#ffffff',
  minWidth: '80px'
}));

const TableRow = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '91px',
  borderBottom: '1px solid #F6F0F0'
}));

const CellText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#000000',
  minWidth: '80px'
}));

const GridIconContainer = styled(Box)(({ theme }) => ({
  width: '42px',
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const HeatmapHistorySection = ({ history }) => {
  return (
    <HistoryContainer>
      <HistoryTitle>Heat Map History</HistoryTitle>
      
      <HistoryTable>
        <TableHeader>
          <HeaderText>Grid</HeaderText>
          <HeaderText>Grid size</HeaderText>
          <HeaderText>Keyword</HeaderText>
          <HeaderText>Radius</HeaderText>
          <HeaderText>Listing</HeaderText>
          <HeaderText>Average Rank</HeaderText>
          <HeaderText>Date</HeaderText>
        </TableHeader>
        
        {history.map((item, index) => (
          <TableRow key={index}>
            <GridIconContainer>
              <GridHistoryIcon width={42} height={42} />
            </GridIconContainer>
            <CellText>{item.gridSize}</CellText>
            <CellText>{item.keyword}</CellText>
            <CellText>{item.radius}</CellText>
            <CellText>{item.listing}</CellText>
            <CellText>{item.averageRank}</CellText>
            <CellText>{item.date}</CellText>
          </TableRow>
        ))}
      </HistoryTable>
    </HistoryContainer>
  );
};

export default HeatmapHistorySection;