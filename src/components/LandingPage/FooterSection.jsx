import React from 'react';
import { Box, Typography, Stack, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import YouTubeIcon from '../icons/YouTubeIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: 0
}));

const CopyrightSection = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2, 0),
  textAlign: 'center',
  borderTop: '1px solid rgba(0,0,0,0.1)'
}));

const SocialIconButton = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  background: 'rgba(11, 145, 214, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    '& svg': {
      color: 'white !important'
    }
  }
}));

const FooterSection = () => {
  const footerLinks = {
    explore: [
      'About',
      'Our Team', 
      'Features',
      'Blog',
      'How It Works'
    ],
    services: [
      'Speed Optimization',
      'Marketing Analysis',
      'SEO and Backlinks',
      'Content Marketing'
    ],
    links: [
      'Help',
      'Support',
      'Clients',
      'Contact'
    ]
  };

  return (
    <>
      <FooterContainer>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            {/* Main Footer Content */}
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={6}
              justifyContent="space-between"
            >
              {/* Company Info */}
              <Stack spacing={2} sx={{ flex: 1 }}>
                <img 
                  src="/images/visibeen-logo.png" 
                  alt="Visibeen" 
                  style={{ height: '40px', width: 'auto', alignSelf: 'flex-start' }}
                />
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '15px' }}>
                    888 999 0000
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '15px' }}>
                    needhelp@visibeen.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '15px', lineHeight: '26px' }}>
                    855 road, broklyn street<br />
                    new york 600
                  </Typography>
                </Stack>
              </Stack>

              {/* Footer Links */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={6}
                sx={{ flex: 2 }}
              >
                {/* Explore */}
                <Stack spacing={2} sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '18px'
                    }}
                  >
                    Explore
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.explore.map((link, index) => (
                      <Link
                        key={index}
                        href="#"
                        sx={{
                          color: 'text.primary',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '16px',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {link}
                      </Link>
                    ))}
                  </Stack>
                </Stack>

                {/* Services */}
                <Stack spacing={2} sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '18px'
                    }}
                  >
                    Services
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.services.map((link, index) => (
                      <Link
                        key={index}
                        href="#"
                        sx={{
                          color: 'text.primary',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '16px',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {link}
                      </Link>
                    ))}
                  </Stack>
                </Stack>

                {/* Links */}
                <Stack spacing={2} sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '18px'
                    }}
                  >
                    Links
                  </Typography>
                  <Stack spacing={1}>
                    {footerLinks.links.map((link, index) => (
                      <Link
                        key={index}
                        href="#"
                        sx={{
                          color: 'text.primary',
                          fontSize: '15px',
                          fontWeight: 400,
                          lineHeight: '16px',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {link}
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              {/* Social Media */}
              <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-end' }}>
                <Stack direction="row" spacing={2}>
                  <SocialIconButton>
                    <TwitterIcon width={19} height={16} color="#0b91d6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <FacebookIcon width={11} height={20} color="#0b91d6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <LinkedInIcon width={16} height={16} color="#0b91d6" />
                  </SocialIconButton>
                  <SocialIconButton>
                    <YouTubeIcon width={17} height={12} color="#0b91d6" />
                  </SocialIconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </FooterContainer>

      {/* Copyright Section */}
      <CopyrightSection>
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.primary',
              fontSize: '16px',
              fontWeight: 400
            }}
          >
            © copyright 2025 by{' '}
            <Box 
              component="span" 
              sx={{ 
                background: 'linear-gradient(90deg, #0b91d6 0%, #ef232a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 400
              }}
            >
              Visibeen
            </Box>
          </Typography>
        </Container>
      </CopyrightSection>
    </>
  );
};

export default FooterSection;