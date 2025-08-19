import React from 'react';
import { Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '../icons/VerifiedIcon';

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  borderRadius: '4px',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
    color: '#000000'
  },
  '& .MuiChip-icon': {
    marginLeft: '4px',
    marginRight: '0px',
    width: '16px',
    height: '16px'
  },
  ...(status === 'verified' && {
    backgroundColor: '#E3F2FD',
    '& .MuiChip-icon': {
      color: '#0B91D6'
    }
  }),
  ...(status === 'unverified' && {
    backgroundColor: '#F5F5F5',
    '& .MuiChip-icon': {
      color: '#A0A0AA'
    }
  }),
  ...(status === 'suspended' && {
    backgroundColor: '#FFEBEE',
    '& .MuiChip-icon': {
      color: '#EF232A'
    }
<<<<<<< HEAD
=======
  }),
  ...(status === 'pending_verification' && {
    backgroundColor: '#FFF3E0',
    '& .MuiChip-icon': {
      color: '#FF9800'
    }
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
  })
}));

const StatusBadge = ({ status }) => {
  const getStatusProps = () => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return {
          label: 'Verified',
          icon: <VerifiedIcon width={16} height={16} />,
          status: 'verified'
        };
      case 'unverified':
        return {
          label: 'Unverified',
          icon: <VerifiedIcon width={16} height={16} />,
          status: 'unverified'
        };
      case 'suspended':
        return {
          label: 'Suspended',
          icon: <VerifiedIcon width={16} height={16} />,
          status: 'suspended'
        };
<<<<<<< HEAD
=======
      case 'pending_verification':
      case 'pending':
        return {
          label: 'Pending Verification',
          icon: <VerifiedIcon width={16} height={16} />,
          status: 'pending_verification'
        };
>>>>>>> e4aa61a6fda85690c9f178617e8c4926c007dfe5
      default:
        return {
          label: status || 'Unknown',
          icon: <VerifiedIcon width={16} height={16} />,
          status: 'unverified'
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <StyledChip
      icon={statusProps.icon}
      label={statusProps.label}
      status={statusProps.status}
      variant="filled"
    />
  );
};

export default StatusBadge;