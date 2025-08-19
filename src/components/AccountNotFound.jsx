import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/VisibeenLogo.png';
import IllustrationSection from './AccountNotFound/IllustrationSection';
import ContentSection from './AccountNotFound/ContentSection';
import ActionButtons from './AccountNotFound/ActionButtons';
import HelpLink from './AccountNotFound/HelpLink';

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#0B91D6',
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  padding: '0 30px'
}));

const HeaderLogo = styled('img')(({ theme }) => ({
  height: '40px',
  width: 'auto'
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px'
}));

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  padding: '40px',
  maxWidth: '569px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
}));

const AccountNotFound = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    console.log('Create Account clicked');
    // Navigate to account creation page
    navigate('/register');
  };

  const handleTakeHelpOfExpert = () => {
    console.log('Take Help Of Expert clicked');
    // Navigate to expert help or contact page
    navigate('/contact');
  };

  const handleUnableToTrace = () => {
    console.log('Unable to trace account clicked');
    // Handle unable to trace account action
  };

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderLogo src={logo} alt="Visibeen" />
      </HeaderSection>
      
      <ContentArea>
        <MainContent>
          <IllustrationSection />
          <ContentSection />
          <ActionButtons 
            onCreateAccount={handleCreateAccount}
            onTakeHelpOfExpert={handleTakeHelpOfExpert}
          />
          <HelpLink onClick={handleUnableToTrace} />
        </MainContent>
      </ContentArea>
    </PageContainer>
  );
};

export default AccountNotFound;