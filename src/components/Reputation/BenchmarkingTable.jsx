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

const BenchmarkingTable = () => {
  const tableData = [
    {
      header: '',
      rows: ['Your Business', 'City Average', 'Top Competitor']
    },
    {
      header: 'Average Rating',
      color: '#0B91D6',
      rows: ['4.6', '4.2', '4.4']
    },
    {
      header: 'Review Response Rate',
      color: '#34A853',
      rows: ['52%', '36%', '48%']
    },
    {
      header: 'Negative Review Ratio',
      color: '#EF232A',
      rows: ['6%', '23%', '44%']
    },
    {
      header: 'Review Count',
      color: '#121927',
      rows: ['20', '180', '60']
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