import React from 'react';
import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import YouTubeIcon from '../icons/YouTubeIcon';

const FooterContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '60px 30px 40px',
  spacing: 4
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const BrandSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  maxWidth: '400px',
  spacing: 2
}));

const Logo = styled('img')(({ theme }) => ({
  height: '29px',
  width: '70px',
  objectFit: 'contain',
  marginBottom: '20px'
}));

const BrandDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '28px',
  color: '#171717',
  marginBottom: '20px'
}));

const SocialLinks = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 1.5
}));

const LinkSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  spacing: 1
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#171717',
  marginBottom: '20px'
}));

const LinkButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#171717',
  textTransform: 'none',
  justifyContent: 'flex-start',
  padding: '4px 0',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

const FooterBottom = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  [theme.breakpoints.down('sm')]: {
    direction: 'column',
    spacing: 2,
    alignItems: 'flex-start'
  }
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#171717'
}));

const BrandLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#102444',
  textDecoration: 'none',
  cursor: 'pointer'
}));

const PolicyLinks = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2
}));

const PolicyButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#171717',
  textTransform: 'none',
  padding: '4px 8px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

const Footer = ({ footer }) => {
  return (
    <FooterContainer spacing={4}>
      <FooterContent 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={{ xs: 3, md: 4 }}
      >
        <BrandSection spacing={2}>
          <Logo src={footer?.logo} alt="Logo" />
          <BrandDescription>
            {footer?.description}
          </BrandDescription>
          <SocialLinks direction="row" spacing={1.5}>
            <FacebookIcon width={17} height={17} color="#171717" />
            <TwitterIcon width={18} height={15} color="#171717" />
            <YouTubeIcon width={17} height={12} color="#171717" />
          </SocialLinks>
        </BrandSection>

        <LinkSection spacing={1}>
          <SectionTitle>
            {footer?.sections?.services?.title}
          </SectionTitle>
          <Stack spacing={0.5}>
            {footer?.sections?.services?.links?.map((link, index) => (
              <LinkButton key={index}>
                {link}
              </LinkButton>
            ))}
          </Stack>
        </LinkSection>

        <LinkSection spacing={1}>
          <SectionTitle>
            {footer?.sections?.company?.title}
          </SectionTitle>
          <Stack spacing={0.5}>
            {footer?.sections?.company?.links?.map((link, index) => (
              <LinkButton key={index}>
                {link}
              </LinkButton>
            ))}
          </Stack>
        </LinkSection>

        <LinkSection spacing={1}>
          <SectionTitle>
            {footer?.sections?.links?.title}
          </SectionTitle>
          <Stack spacing={0.5}>
            {footer?.sections?.links?.links?.map((link, index) => (
              <LinkButton key={index}>
                {link}
              </LinkButton>
            ))}
          </Stack>
        </LinkSection>
      </FooterContent>

      <Divider sx={{ borderColor: '#dadada' }} />

      <FooterBottom 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 0 }}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <CopyrightText>Powered by </CopyrightText>
          <BrandLink>{footer?.copyright?.brand}</BrandLink>
          <CopyrightText>.</CopyrightText>
        </Stack>

        <PolicyLinks direction="row" spacing={2}>
          {footer?.copyright?.links?.map((link, index) => (
            <PolicyButton key={index}>
              {link}
            </PolicyButton>
          ))}
        </PolicyLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;