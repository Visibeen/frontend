import React from 'react';
import { Box, Stack, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramFooterIcon from '../icons/InstagramFooterIcon';
import DribbbleFooterIcon from '../icons/DribbbleFooterIcon';
import TwitterFooterIcon from '../icons/TwitterFooterIcon';
import YouTubeFooterIcon from '../icons/YouTubeFooterIcon';
import SendArrowFooterIcon from '../icons/SendArrowFooterIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(93.12deg, rgba(11,145,214,1) 0%, rgba(239,35,42,1) 100%)',
  padding: '40px 0',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif'
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 40px',
  gap: '125px'
}));

const FooterLeft = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'flex-start'
}));

const FooterLogo = styled('img')(({ theme }) => ({
  width: '143px',
  height: '48px'
}));

const CopyrightSection = styled(Stack)(({ theme }) => ({
  gap: '8px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff'
}));

const SocialIcons = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '16px'
}));

const FooterColumns = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '30px',
  alignItems: 'flex-start'
}));

const FooterColumn = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '160px'
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff'
}));

const ColumnLinks = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const ColumnLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));

const NewsletterContainer = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '255px'
}));

const NewsletterForm = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden'
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    height: '40px',
    paddingRight: '40px',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      color: '#A0A0AA',
      padding: '8px 12px'
    }
  }
}));

const SendButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));

const ProfileStrengthFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <FooterLogo src="/images/visibeen-logo-profile.png" alt="Visibeen" />
          <CopyrightSection>
            <CopyrightText>Copyright © 2025 e2e digitech pvt ltd.</CopyrightText>
            <CopyrightText>All rights reserved</CopyrightText>
          </CopyrightSection>
          <SocialIcons>
            <InstagramFooterIcon width={32} height={32} />
            <DribbbleFooterIcon width={32} height={32} />
            <TwitterFooterIcon width={32} height={32} />
            <YouTubeFooterIcon width={32} height={32} />
          </SocialIcons>
        </FooterLeft>

        <FooterColumns>
          <FooterColumn>
            <ColumnTitle>Company</ColumnTitle>
            <ColumnLinks>
              <ColumnLink>About us</ColumnLink>
              <ColumnLink>Blog</ColumnLink>
              <ColumnLink>Contact us</ColumnLink>
              <ColumnLink>Pricing</ColumnLink>
              <ColumnLink>Testimonials</ColumnLink>
            </ColumnLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Support</ColumnTitle>
            <ColumnLinks>
              <ColumnLink>Help center</ColumnLink>
              <ColumnLink>Terms of service</ColumnLink>
              <ColumnLink>Legal</ColumnLink>
              <ColumnLink>Privacy policy</ColumnLink>
              <ColumnLink>Status</ColumnLink>
            </ColumnLinks>
          </FooterColumn>

          <NewsletterContainer>
            <ColumnTitle>Stay up to date</ColumnTitle>
            <NewsletterForm>
              <NewsletterInput
                fullWidth
                placeholder="Your email address"
                variant="outlined"
              />
              <SendButton>
                <SendArrowFooterIcon width={17} height={17} />
              </SendButton>
            </NewsletterForm>
          </NewsletterContainer>
        </FooterColumns>
      </FooterContent>
    </FooterContainer>
  );
};

export default ProfileStrengthFooter;