import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '../icons/HomeIcon';
import PerformanceChartIcon from '../icons/PerformanceChartIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';
import ReputationManagementIcon from '../icons/ReputationManagementIcon';
import GetEDMsIcon from '../icons/GetEDMsIcon';
import FreeWebsiteIcon from '../icons/FreeWebsiteIcon';
import WhatsAppNavIcon from '../icons/WhatsAppNavIcon';
import BlogNavIcon from '../icons/BlogNavIcon';
import SocialMediaNavIcon from '../icons/SocialMediaNavIcon';
import ReferEarnNavIcon from '../icons/ReferEarnNavIcon';
import MyAccountNavIcon from '../icons/MyAccountNavIcon';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '325px',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0'
}));

const NavSection = styled(Stack)(({ theme }) => ({
  gap: '12px',
  padding: '0 20px'
}));

const NavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
}));

const ActiveNavItem = styled(NavItem)(({ theme }) => ({
  backgroundColor: '#EFF6FF',
  '& .nav-icon': {
    '& path, & circle, & rect': {
      fill: '#0B91D6'
    }
  },
  '& .nav-text': {
    color: '#0B91D6'
  }
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927'
}));

const ComingSoonText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#121927',
  marginLeft: 'auto'
}));

const ComingSoonBadge = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#EF232A'
}));

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '20px'
}));

const ProfileStrengthSidebar = () => {
  return (
    <SidebarContainer>
      <NavSection>
        <ActiveNavItem>
          <HomeIcon className="nav-icon" width={15} height={17} />
          <NavText className="nav-text">Overview</NavText>
        </ActiveNavItem>
        
        <NavItem>
          <PerformanceChartIcon width={15} height={17} />
          <NavText>Performance</NavText>
          <ExternalLinkIcon width={18} height={17} />
        </NavItem>
        
        <NavItem>
          <ReputationManagementIcon width={19} height={19} />
          <NavText>Reputation Management</NavText>
        </NavItem>
        
        <NavItem>
          <GetEDMsIcon width={20} height={20} />
          <NavText>Get EDMs</NavText>
        </NavItem>
        
        <NavItem>
          <FreeWebsiteIcon width={17} height={17} />
          <NavText>Free Website</NavText>
          <ExternalLinkIcon width={18} height={17} />
        </NavItem>
      </NavSection>

      <SectionDivider />

      <NavSection>
        <NavItem>
          <WhatsAppNavIcon width={17} height={17} />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
            <ComingSoonText>Whats app</ComingSoonText>
            <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
          </Stack>
        </NavItem>
        
        <NavItem>
          <BlogNavIcon width={17} height={18} />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
            <ComingSoonText>Blogs</ComingSoonText>
            <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
          </Stack>
        </NavItem>
        
        <NavItem>
          <SocialMediaNavIcon width={20} height={19} />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
            <ComingSoonText>Social Media</ComingSoonText>
            <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
          </Stack>
        </NavItem>
        
        <NavItem>
          <ReferEarnNavIcon width={14} height={18} />
          <NavText>Refer & Earn</NavText>
        </NavItem>
        
        <NavItem>
          <MyAccountNavIcon width={17} height={17} />
          <NavText>My Account</NavText>
        </NavItem>
      </NavSection>
    </SidebarContainer>
  );
};

export default ProfileStrengthSidebar;