import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '../icons/TrendingUpIcon';
import TrendingDownIcon from '../icons/TrendingDownIcon';
import StarIcon from '../icons/StarIcon';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '4px',
  border: 'none',
  boxShadow: 'none',
  backgroundColor: 'transparent'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#0B91D6'
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

const VolumeContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
}));

const VolumeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#121927'
}));

const ChangeContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px'
}));

const ChangeText = styled(Typography)(({ theme, isPositive }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: isPositive ? '#34A853' : '#EF232A'
}));

const RatingContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3px'
}));

const DataTable = ({ title, columns, data, type = 'default' }) => {
  const renderCellContent = (item, column, index) => {
    if (type === 'keywords' && column === 'Search Volume') {
      const change = item.searchVolumeChange;
      const isPositive = change >= 0;
      const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
      
      return (
        <VolumeContainer>
          <VolumeText>{item.searchVolume.toLocaleString()}/month</VolumeText>
          <ChangeContainer>
            <TrendIcon 
              width={14} 
              height={7} 
              color={isPositive ? '#34A853' : '#EF232A'} 
            />
            <ChangeText isPositive={isPositive}>
              {isPositive ? '+' : ''}{change}% vs last month
            </ChangeText>
          </ChangeContainer>
        </VolumeContainer>
      );
    }
    
    if (type === 'photos' && (column === 'Compared to Competitor A' || column === 'Compared to Competitor B')) {
      const value = column === 'Compared to Competitor A' ? item.competitorA : item.competitorB;
      const isPositive = value >= 0;
      
      return (
        <ChangeText isPositive={isPositive}>
          {isPositive ? '+' : ''}{value}%
        </ChangeText>
      );
    }
    
    if (type === 'competitor' && column === 'GBP Rating') {
      const rating = parseFloat(item.yourBusiness || item.competitorA || item.competitorB || item.competitorC);
      return (
        <RatingContainer>
          <StarIcon width={16} height={16} color="#FBBC05" />
          <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
            {rating}
          </Typography>
        </RatingContainer>
      );
    }
    
    // Default cell content
    const columnKey = column.toLowerCase().replace(/\s+/g, '');
    let value = '';
    
    if (type === 'keywords') {
      switch (column) {
        case 'Search Term':
          value = item.searchTerm;
          break;
        case 'Client Ranking':
          value = item.clientRanking;
          break;
        case 'Competitor Ranking':
          value = item.competitorRanking;
          break;
        default:
          value = item[columnKey] || '';
      }
    } else if (type === 'photos') {
      switch (column) {
        case 'Photo Type':
          value = item.photoType;
          break;
        case 'Views':
          value = `${item.views} views`;
          break;
        default:
          value = item[columnKey] || '';
      }
    } else if (type === 'competitor') {
      switch (column) {
        case 'Metric':
          value = item.metric;
          break;
        case 'Your Business':
          value = item.yourBusiness;
          break;
        case 'Compared to Competitor A':
          value = item.competitorA;
          break;
        case 'Compared to Competitor B':
          value = item.competitorB;
          break;
        case 'Compared to Competitor C':
          value = item.competitorC;
          break;
        default:
          value = item[columnKey] || '';
      }
    }
    
    return value;
  };

  return (
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
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column, colIndex) => (
                <DataCell key={colIndex}>
                  {renderCellContent(item, column, index)}
                </DataCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default DataTable;