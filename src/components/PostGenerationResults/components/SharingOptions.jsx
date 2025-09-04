import React, { useState } from 'react';
import { Stack, Typography, ButtonBase, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '../icons/EmailIcon';
import FacebookIcon from '../icons/FacebookIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import InstagramIcon from '../icons/InstagramIcon';

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



const iconComponents = {
  email: EmailIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  copy_link: CopyLinkIcon
};

const SharingOptions = ({ sharingOptions, onSocialShare }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOptionClick = async (platform, label) => {
    console.log(`Sharing via ${platform}`);
    
    const postUrl = window.location.href;
    const postTitle = 'Check out my Visibeen post!';
    const postDescription = 'I created this post with Visibeen. Take a look!';
    
    if (platform === 'copy_link') {
      try {
        await navigator.clipboard.writeText(postUrl);
        setSnackbarMessage('Link copied to clipboard!');
        setSnackbarOpen(true);
      } catch (err) {
        console.error('Failed to copy link:', err);
        setSnackbarMessage('Failed to copy link');
        setSnackbarOpen(true);
      }
    } else if (platform === 'email') {
      // Email sharing
      const mailtoLink = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postDescription + '\n\n' + postUrl)}`;
      window.open(mailtoLink, '_blank');
      setSnackbarMessage(`Email client opened!`);
      setSnackbarOpen(true);
    } else if (platform === 'facebook') {
      // Facebook sharing
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      setSnackbarMessage(`Shared via Facebook!`);
      setSnackbarOpen(true);
    } else if (platform === 'whatsapp') {
      // WhatsApp sharing
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + '\n\n' + postUrl)}`;
      window.open(whatsappUrl, '_blank');
      setSnackbarMessage(`Shared via WhatsApp!`);
      setSnackbarOpen(true);
    } else if (platform === 'instagram') {
      // Instagram doesn't have a direct sharing API, so we'll show a message
      setSnackbarMessage(`To share on Instagram, please download the image first and upload it to your Instagram account.`);
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
          return (
            <SharingOption
              key={option.platform}
              onClick={() => handleOptionClick(option.platform, option.label)}
            >
              {IconComponent && (
                <IconComponent width={20} height={20} color="currentColor" />
              )}
              <OptionText>{option.label}</OptionText>
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