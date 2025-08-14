import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import LeftPanel from './LeftPanel';
import AuthRightPanelLayout from './AuthRightPanelLayout';
import ForgotPasswordForm from './ForgotPasswordForm';
import DecorativeBackgroundIcon from './DecorativeBackgroundIcon';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#F8F8F8',
  '@media (max-width: 768px)': {
    flexDirection: 'column'
  }
}));

const RightPanelWithBackground = styled(Box)(({ theme }) => ({
  width: '50%',
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(5),
  position: 'relative'
}));

const BackgroundDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 0,
  opacity: 0.07
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1
}));

function ForgotPassword() {
  return (
    <PageContainer>
      <LeftPanel />
      <RightPanelWithBackground>
        <BackgroundDecoration>
          <DecorativeBackgroundIcon width={225} height={168} color="#121927" />
        </BackgroundDecoration>
        <ContentWrapper>
          <AuthRightPanelLayout 
            heading="Forgot Password" 
            subtext="Restore your password with few easy step!"
          >
            <ForgotPasswordForm />
          </AuthRightPanelLayout>
        </ContentWrapper>
      </RightPanelWithBackground>
    </PageContainer>
  );
}

export default ForgotPassword;