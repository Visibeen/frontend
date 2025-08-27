import React from 'react';
import { 
  Box,
  Typography,
  Button,
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
import TrendingUpIcon from '../icons/TrendingUpIcon';
import TrendingDownIcon from '../icons/TrendingDownIcon';

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
  backgroundColor: 'transparent',
  marginBottom: '16px'
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
  flexDirection: 'column',
  gap: '8px'
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

const RankingText = styled(Typography)(({ theme, isRanked }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: isRanked ? '#121927' : '#EF232A'
}));

const CompetitorText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#0B91D6'
}));

const ExpandButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#0A7BC4'
  }
}));

const KeywordsTable = ({ keywordsData, onExpandKeywords }) => {
  const columns = ['Search Term', 'Search Volume', 'Client Ranking', 'Competitor Ranking'];

  const renderVolumeCell = (item) => {
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
  };

  return (
    <SectionContainer>
      <SectionTitle>Top 5 Keywords</SectionTitle>
      
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
            {keywordsData.map((item, index) => (
              <TableRow key={index}>
                <DataCell>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#121927' }}>
                    {item.searchTerm}
                  </Typography>
                </DataCell>
                <DataCell>
                  {renderVolumeCell(item)}
                </DataCell>
                <DataCell>
                  <RankingText isRanked={item.clientRanking !== 'Not ranked'}>
                    {item.clientRanking}
                  </RankingText>
                </DataCell>
                <DataCell>
                  <CompetitorText>
                    {item.competitorRanking}
                  </CompetitorText>
                </DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <ExpandButton onClick={onExpandKeywords}>
        Click to get Top 10 Keywords
      </ExpandButton>
    </SectionContainer>
  );
};

export default KeywordsTable;