import React, { useState } from 'react';
import { Stack, Typography, ButtonBase, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '../icons/EmailIcon';
import FacebookIcon from '../icons/FacebookIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import InstagramIcon from '../icons/InstagramIcon';
import GoogleIcon from '../icons/GoogleIcon';
import CopyLinkIcon from '../icons/CopyLinkIcon';

const SharingContainer = styled(Stack)(({ theme }) => ({
  gap: '12px',
  alignItems: 'flex-start',
  maxWidth: '250px'
}));

const SharingOption = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10.67px',
  padding: '8px 12px',
  borderRadius: '8px',
  width: '100%',
  justifyContent: 'flex-start',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.04)'
  }
}));

const OptionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  color: '#121927',
  textAlign: 'left'
}));

const ComingSoonText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'left'
}));

const iconComponents = {
  email: EmailIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  google_profile: GoogleIcon,
  copy_link: CopyLinkIcon
};

const SharingOptions = ({ sharingOptions, onSocialShare }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOptionClick = async (platform, label) => {
    console.log(`Sharing via ${platform}`);
    
    if (platform === 'copy_link') {
      try {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        setSnackbarMessage('Link copied to clipboard!');
        setSnackbarOpen(true);
      } catch (err) {
        console.error('Failed to copy link:', err);
        setSnackbarMessage('Failed to copy link');
        setSnackbarOpen(true);
      }
    } else if (platform === 'google_profile') {
      setSnackbarMessage('Google Profile sharing coming soon!');
      setSnackbarOpen(true);
    } else {
      // Handle other social sharing platforms
      if (onSocialShare) {
        onSocialShare(platform);
      }
      setSnackbarMessage(`Shared via ${label}!`);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <SharingContainer>
        {sharingOptions.map((option) => {
          const IconComponent = iconComponents[option.platform];
          const isComingSoon = option.platform === 'google_profile';
          
          return (
            <SharingOption
              key={option.platform}
              onClick={() => handleOptionClick(option.platform, option.label)}
            >
              {IconComponent && (
                <IconComponent width={20} height={20} color="currentColor" />
              )}
              {isComingSoon ? (
                <ComingSoonText>{option.label}</ComingSoonText>
              ) : (
                <OptionText>{option.label}</OptionText>
              )}
            </SharingOption>
          );
        })}
      </SharingContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SharingOptions;