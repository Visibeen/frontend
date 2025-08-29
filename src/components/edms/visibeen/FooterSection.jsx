import React, { useState } from 'react';
import { Box, Stack, Typography, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '../../icons/InstagramIcon';
import DribbbleIcon from '../../icons/DribbbleIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import YouTubeIcon from '../../icons/YouTubeIcon';
import SendIcon from '../../icons/SendIcon';
import { mockFooterLinks } from './selectDesignMockData';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(93.12deg, rgba(11,145,214,1) 0%, rgba(239,35,42,1) 100%)',
  padding: '64px 125px',
  display: 'flex',
  gap: 125,
  alignItems: 'flex-start'
}));

const CompanyInfoSection = styled(Stack)(({ theme }) => ({
  gap: 40,
  alignItems: 'flex-start'
}));

const CopyrightSection = styled(Stack)(({ theme }) => ({
  gap: 8
}));

const SocialLinksContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: 16
}));

const LinksSection = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: 30
}));

const LinkColumn = styled(Stack)(({ theme }) => ({
  gap: 24,
  minWidth: 160
}));

const LinkList = styled(Stack)(({ theme }) => ({
  gap: 12
}));

const EmailSubscriptionContainer = styled(Stack)(({ theme }) => ({
  gap: 24,
  minWidth: 160
}));

const EmailInputContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.text.disabled,
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',
    border: 'none',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiInputBase-input': {
    padding: '10px 50px 10px 11px',
    '&::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 1
    }
  }
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  padding: 4
}));

const FooterSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = () => {
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <FooterContainer>
      <CompanyInfoSection>
        <img 
          src="/images/visibeen-logo.png" 
          alt="VISIBEEN Logo" 
          width={143}
          height={48}
        />
        <CopyrightSection>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: 14,
              fontWeight: 400
            }}
          >
            Copyright © 2025 e2e digitech pvt ltd.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: 14,
              fontWeight: 400
            }}
          >
            All rights reserved
          </Typography>
        </CopyrightSection>
        <SocialLinksContainer direction="row">
          <IconButton sx={{ p: 0 }}>
            <InstagramIcon width={32} height={32} color="white" />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <DribbbleIcon width={32} height={32} color="white" />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <TwitterIcon width={32} height={32} color="white" />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <YouTubeIcon width={32} height={32} color="white" />
          </IconButton>
        </SocialLinksContainer>
      </CompanyInfoSection>

      <LinksSection direction="row">
        <LinkColumn>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              fontSize: 20,
              fontWeight: 600
            }}
          >
            Company
          </Typography>
          <LinkList>
            {mockFooterLinks.company.map((link, index) => (
              <Typography 
                key={index}
                variant="body2" 
                sx={{ 
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.label}
              </Typography>
            ))}
          </LinkList>
        </LinkColumn>

        <LinkColumn>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              fontSize: 20,
              fontWeight: 600
            }}
          >
            Support
          </Typography>
          <LinkList>
            {mockFooterLinks.support.map((link, index) => (
              <Typography 
                key={index}
                variant="body2" 
                sx={{ 
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 400,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.label}
              </Typography>
            ))}
          </LinkList>
        </LinkColumn>

        <EmailSubscriptionContainer>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              fontSize: 20,
              fontWeight: 600
            }}
          >
            Stay up to date
          </Typography>
          <EmailInputContainer>
            <StyledTextField
              fullWidth
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
            />
            <SendButton onClick={handleEmailSubmit}>
              <SendIcon width={17} height={17} color="#a0a0aa" />
            </SendButton>
          </EmailInputContainer>
        </EmailSubscriptionContainer>
      </LinksSection>
    </FooterContainer>
  );
};

export default FooterSection;