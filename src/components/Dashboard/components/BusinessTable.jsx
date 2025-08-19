import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography, 
  Stack 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  boxShadow: 'none',
  overflow: 'hidden'
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  '& .MuiTableCell-head': {
    backgroundColor: '#0B91D6',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    padding: '16px 24px',
    border: 'none'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: '0.6px solid #F6F0F0'
  },
  '& .MuiTableCell-body': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    padding: '20px 24px',
    border: 'none'
  }
}));

const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#30302E',
  marginBottom: '4px'
}));

const BusinessAddress = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#30302E'
}));

const OptimizationScore = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#30302E'
}));

const ViewProfileButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6',
  textTransform: 'none',
  padding: '4px 8px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

const CheckNowLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0B91D6',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));

const BusinessTable = ({ businesses = [] }) => {
  const navigate = useNavigate();

  const handleViewProfile = (business) => {
    // Use the actual business/location ID from the business data
    const locationId = business.locationId || business.id || '112694470912208112675';
    navigate(`/business-profile?id=${locationId}`);
  };

  const getOptimizationDisplay = (business) => {
    if (business.status?.toLowerCase() === 'suspended') {
      return <CheckNowLink>Check now</CheckNowLink>;
    }
    if (business.status?.toLowerCase() === 'unverified') {
      return <OptimizationScore>Pending</OptimizationScore>;
    }
    return <OptimizationScore>{business.optimizationScore || business.score || 'N/A'}</OptimizationScore>;
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell>Business</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Optimization score</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {businesses.map((business, index) => (
            <StyledTableRow key={business.id || business._id || index}>
              <TableCell>
                <Stack spacing={0.5}>
                  <BusinessName>
                    {business.name || business.businessName || 'E2E Networks Limited'}
                  </BusinessName>
                  <BusinessAddress>
                    {business.address || business.formattedAddress || '23 Maplewood Lane,IL 62704,USA'}
                  </BusinessAddress>
                </Stack>
              </TableCell>
              <TableCell>
                {(() => {
                  const vs = (business.verificationState || business.verification_status || '').toUpperCase();
                  let derived = business.status;
                  if (!derived) {
                    if (vs === 'VERIFIED') derived = 'verified';
                    else if (vs === 'PENDING_VERIFICATION' || vs === 'PENDING') derived = 'pending_verification';
                    else if (vs === 'SUSPENDED') derived = 'suspended';
                    else if (vs) derived = 'unverified';
                  }
                  return <StatusBadge status={(derived || 'unverified')} />;
                })()}
              </TableCell>
              <TableCell>
                {getOptimizationDisplay(business)}
              </TableCell>
              <TableCell>
                <ViewProfileButton onClick={() => handleViewProfile(business)}>
                  View Profile
                </ViewProfileButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default BusinessTable;