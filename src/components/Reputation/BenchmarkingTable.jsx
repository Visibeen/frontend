import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const TableContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '16px',
  marginLeft: '250px',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '0.6px solid #D9D9D9'
}));

const TableColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '124px',
  borderRight: '0.6px solid #D9D9D9',
  '&:last-child': {
    borderRight: 'none'
  }
}));

const TableHeader = styled(Box)(({ theme }) => ({
  height: '50px',
  backgroundColor: '#ffffff',
  borderBottom: '0.6px solid #D9D9D9',
  borderRadius: '12px 0px 0px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const TableCell = styled(Box)(({ theme }) => ({
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 12px'
}));

const CellText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const ColumnHeaderText = styled(Typography)(({ theme, color }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: color || '#0B91D6',
  textAlign: 'center'
}));

const BenchmarkingTable = ({ reputationData }) => {
  // Use real data if available, otherwise fallback to mock data
  const data = reputationData || {
    yourBusiness: { rating: 4.6, responseRate: 52, negativeRatio: 6, reviewCount: 20 },
    cityAverage: { rating: 4.2, responseRate: 36, negativeRatio: 23, reviewCount: 180 },
    topCompetitor: { rating: 4.4, responseRate: 48, negativeRatio: 44, reviewCount: 60 }
  };

  // Helper function to safely format numbers and avoid NaN
  const safeNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  const safeRating = (value) => safeNumber(value, 4.0).toFixed(1);
  const safePercentage = (value) => `${Math.round(safeNumber(value, 0))}%`;
  const safeCount = (value) => Math.max(0, Math.round(safeNumber(value, 0))).toString();

  const tableData = [
    {
      header: '',
      rows: ['Your Business', 'City Average', 'Top Competitor']
    },
    {
      header: 'Average Rating',
      color: '#0B91D6',
      rows: [
        safeRating(data.yourBusiness.rating),
        safeRating(data.cityAverage.rating),
        safeRating(data.topCompetitor.rating)
      ]
    },
    {
      header: 'Review Response Rate',
      color: '#34A853',
      rows: [
        safePercentage(data.yourBusiness.responseRate),
        safePercentage(data.cityAverage.responseRate),
        safePercentage(data.topCompetitor.responseRate)
      ]
    },
    {
      header: 'Negative Review Ratio',
      color: '#EF232A',
      rows: [
        safePercentage(data.yourBusiness.negativeRatio),
        safePercentage(data.cityAverage.negativeRatio),
        safePercentage(data.topCompetitor.negativeRatio)
      ]
    },
    {
      header: 'Review Count',
      color: '#121927',
      rows: [
        safeCount(data.yourBusiness.reviewCount),
        safeCount(data.cityAverage.reviewCount),
        safeCount(data.topCompetitor.reviewCount)
      ]
    }
  ];

  return (
    <TableContainer>
      {tableData.map((column, columnIndex) => (
        <TableColumn key={columnIndex}>
          <TableHeader>
            {column.header && (
              <ColumnHeaderText color={column.color}>
                {column.header}
              </ColumnHeaderText>
            )}
          </TableHeader>
          {column.rows.map((cellData, rowIndex) => (
            <TableCell key={rowIndex}>
              <CellText>{cellData}</CellText>
            </TableCell>
          ))}
        </TableColumn>
      ))}
    </TableContainer>
  );
};

export default BenchmarkingTable;