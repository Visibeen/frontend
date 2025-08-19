import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';
import logo from '../../assets/VisibeenLogo.png';

const DashboardContainer = styled(Box)(({ theme }) => ({
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

const MainSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  minHeight: 'calc(100vh - 80px)'
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '32px 40px',
  backgroundColor: '#F8F8F8'
}));

const DashboardLayout = ({ children }) => {
  return (
    <DashboardContainer>
      <HeaderSection>
        <HeaderLogo src={logo} alt="Visibeen" />
      </HeaderSection>
      <MainSection>
        <DashboardSidebar />
        <ContentArea>
          {children}
        </ContentArea>
      </MainSection>
      <Footer />
    </DashboardContainer>
  );
};

export default DashboardLayout;