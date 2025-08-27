import React from 'react';
import { 
  Box,
  Typography,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '4px',
  border: 'none',
  boxShadow: 'none',
  backgroundColor: 'transparent'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#34A853'
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#FFFFFF',
  padding: '16px',
  borderBottom: 'none'
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927',
  padding: '16px',
  borderBottom: '1px solid #F0F0F0'
}));

const ComparisonText = styled(Typography)(({ theme, isPositive }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: isPositive ? '#34A853' : '#EF232A'
}));

const PhotoEngagementTable = ({ photoEngagementData }) => {
  const columns = ['Photo Type', 'Views', 'Compared to Competitor A', 'Compared to Competitor B'];

  const renderComparisonCell = (value) => {
    const isPositive = value >= 0;
    return (
      <ComparisonText isPositive={isPositive}>
        {isPositive ? '+' : ''}{value}%
      </ComparisonText>
    );
  };

  return (
    <SectionContainer>
      <SectionTitle>Google Photo Engagement Report</SectionTitle>
      
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              {columns.map((column, index) => (
                <HeaderCell key={index}>{column}</HeaderCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {photoEngagementData.map((item, index) => (
              <TableRow key={index}>
                <DataCell>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
                    {item.photoType}
                  </Typography>
                </DataCell>
                <DataCell>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
                    {item.views} views
                  </Typography>
                </DataCell>
                <DataCell>
                  {renderComparisonCell(item.competitorAComparison)}
                </DataCell>
                <DataCell>
                  {renderComparisonCell(item.competitorBComparison)}
                </DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </SectionContainer>
  );
};

export default PhotoEngagementTable;