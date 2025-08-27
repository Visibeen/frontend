import React from 'react';
import { Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SharingOptions from './SharingOptions';

const ButtonsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  justifyContent: 'center',
  marginBottom: '24px'
}));

const SharingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px'
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#EF232A',
  borderRadius: '8px',
  padding: '12px 32px',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#D32F2F'
  }
}));

const ShareButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#0B91D6',
  borderRadius: '8px',
  padding: '12px 32px',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const ActionButtons = ({ onDownload, onShare, showSharingOptions, sharingOptions, onSocialShare }) => {
  const handleDownload = () => {
    console.log('Download clicked');
    if (onDownload) {
      onDownload();
    }
  };

  const handleShare = () => {
    console.log('Share clicked');
    if (onShare) {
      onShare();
    }
  };

  return (
    <ButtonsContainer>
      <DownloadButton variant="contained" onClick={handleDownload}>
        Download
      </DownloadButton>
      <ShareButton variant="contained" onClick={handleShare}>
        Share
      </ShareButton>
      
      {showSharingOptions && (
        <SharingContainer>
          <SharingOptions
            sharingOptions={sharingOptions}
            onSocialShare={onSocialShare}
          />
        </SharingContainer>
      )}
    </ButtonsContainer>
  );
};

export default ActionButtons;