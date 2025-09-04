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
  Stack,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  boxShadow: 'none',
  overflow: 'hidden',
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
    border: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: '0.6px solid #F6F0F0',
  },
  '& .MuiTableCell-body': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    padding: '20px 24px',
    border: 'none',
  },
}));

const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#30302E',
  marginBottom: '4px',
}));

const BusinessAddress = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#30302E',
}));

const OptimizationScore = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#30302E',
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
    textDecoration: 'underline',
  },
}));

const CheckNowButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '6px 2px',
  width: '100px',
  height: '30px',
  borderRadius: '6px',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  '&:hover': {
    backgroundColor: '#0a7db7',
  },
}));

const StatusBadge = styled(Box)(({ status }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'capitalize',
  backgroundColor:
    status === 'verified'
      ? '#E6F4EA'
      : status === 'pending_verification'
      ? '#FFF4E5'
      : status === 'suspended'
      ? '#FDECEA'
      : status === 'unverified'
      ? '#FBE9E9'
      : '#F0F0F0',
  color:
    status === 'verified'
      ? '#1E4620'
      : status === 'pending_verification'
      ? '#8A6D3B'
      : status === 'suspended'
      ? '#A94442'
      : status === 'unverified'
      ? '#D32F2F'
      : '#444',
}));
const BusinessTable = ({ businesses = [] }) => {
  const navigate = useNavigate();
  const handleViewProfile = (business) => {
    const locationId = business.locationId || business.id || '112694470912208112675';
    navigate(`/business-profile?id=${locationId}`);
  };
  const handleCheckNow = (business) => {
    navigate('/profile-strength-analysis', { state: { businesses, selected: business } });
  };
  const getOptimizationDisplay = (business) => {
    return (
      <CheckNowButton onClick={() => handleCheckNow(business)}>
        Check Now
      </CheckNowButton>
    );
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
                  const boolVerified =
                    business.verified === true ||
                    business?.locationState?.isVerified === true ||
                    business?.metadata?.verified === true;
                  if (!derived) {
                    if (boolVerified || vs === 'VERIFIED') derived = 'verified';
                    else if (
                      vs === 'PENDING_VERIFICATION' ||
                      vs === 'PENDING' ||
                      vs === 'VERIFICATION_PENDING' ||
                      vs === 'NEEDS_VERIFICATION'
                    )
                      derived = 'pending_verification';
                    else if (vs === 'SUSPENDED') derived = 'suspended';
                    else if (vs) derived = 'unverified';
                  }
                  const finalStatus = derived || (boolVerified ? 'verified' : 'unverified');
                  return <StatusBadge status={finalStatus}>{finalStatus}</StatusBadge>;
                })()}
              </TableCell>
              <TableCell>{getOptimizationDisplay(business)}</TableCell>
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