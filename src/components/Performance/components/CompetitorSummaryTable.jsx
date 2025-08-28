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
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '../icons/StarIcon';

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
  backgroundColor: '#1E3A8A'
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

const RatingContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3px'
}));

const StatusText = styled(Typography)(({ theme, status }) => {
  let color = '#121927';
  if (status === 'Active') color = '#34A853';
  else if (status === 'Weak') color = '#EF232A';
  else if (status === 'Moderate') color = '#0B91D6';
  
  return {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color
  };
});

const CompetitorSummaryTable = ({ competitorSummary }) => {
  const columns = [
    'Metric', 
    'Your Business', 
    'Compared to Competitor A', 
    'Compared to Competitor A', 
    'Compared to Competitor C'
  ];

  const renderCellContent = (value, metric) => {
    // Handle GBP Rating with stars
    if (metric === 'GBP Rating' && typeof value === 'number') {
      return (
        <RatingContainer>
          <StarIcon width={16} height={16} color="#FBBC05" />
          <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
            {value.toFixed(1)}
          </Typography>
        </RatingContainer>
      );
    }
    
    // Handle Social Media Presence with colored text
    if (metric === 'Social Media Presence') {
      return <StatusText status={value}>{value}</StatusText>;
    }
    
    // Default rendering
    return (
      <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
        {value}
      </Typography>
    );
  };

  return (
    <SectionContainer>
      <SectionTitle>Competitor Summary Table</SectionTitle>
      
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
            {competitorSummary.map((item, index) => (
              <TableRow key={index}>
                <DataCell>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
                    {item.metric}
                  </Typography>
                </DataCell>
                <DataCell>
                  {renderCellContent(item.yourBusiness, item.metric)}
                </DataCell>
                <DataCell>
                  {renderCellContent(item.competitorA, item.metric)}
                </DataCell>
                <DataCell>
                  {renderCellContent(item.competitorB, item.metric)}
                </DataCell>
                <DataCell>
                  {renderCellContent(item.competitorC, item.metric)}
                </DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </SectionContainer>
  );
};

export default CompetitorSummaryTable;