import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import OverviewIcon from '../Dashboard/icons/OverviewIcon';
import PerformanceIcon from '../Dashboard/icons/PerformanceIcon';
import ReputationIcon from '../Dashboard/icons/ReputationIcon';
import EDMIcon from '../Dashboard/icons/EDMIcon';
import WebsiteIcon from '../Dashboard/icons/WebsiteIcon';
import WhatsAppIcon from '../Dashboard/icons/WhatsAppIcon';
import BlogIcon from '../Dashboard/icons/BlogIcon';
import SocialMediaIcon from '../Dashboard/icons/SocialMediaIcon';
import ReferEarnIcon from '../Dashboard/icons/ReferEarnIcon';
import MyAccountIcon from '../Dashboard/icons/MyAccountIcon';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '325px',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0',
  borderRight: '1px solid #f0f0f0'
}));

const NavSection = styled(Stack)(({ theme }) => ({
  gap: '12px',
  padding: '0 20px'
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 16px',
  borderRadius: '4px',
  textDecoration: 'none',
  color: '#121927',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  },
  '&.active': {
    backgroundColor: '#EFF6FF',
    '& .nav-icon': {
      color: '#0B91D6'
    },
    '& .nav-text': {
      color: '#0B91D6'
    }
  }
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: 'inherit'
}));

const ComingSoonBadge = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#EF232A',
  marginLeft: 'auto'
}));

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  backgroundColor: '#f0f0f0',
  margin: '20px 0'
}));

const DashboardSidebar = () => {
  const [myAccountOpen, setMyAccountOpen] = useState(false);

  const toggleMyAccount = (e) => {
    e.preventDefault(); // Prevent default NavLink behavior
    setMyAccountOpen(!myAccountOpen);
  };

  return (
    <SidebarContainer>
      <NavSection>
        <NavItem to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <OverviewIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Overview</NavText>
        </NavItem>
        
        <NavItem to="/performance" className={({ isActive }) => isActive ? 'active' : ''}>
          <PerformanceIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Performance</NavText>
        </NavItem>
        
        <NavItem to="/reputation" className={({ isActive }) => isActive ? 'active' : ''}>
          <ReputationIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Reputation Management</NavText>
        </NavItem>
        
        <NavItem to="/get-edms/account-info" className={({ isActive }) => isActive ? 'active' : ''}>
          <EDMIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Get EDMs</NavText>
        </NavItem>
        
        <NavItem to="/free-website" className={({ isActive }) => isActive ? 'active' : ''}>
          <WebsiteIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Free Website</NavText>
        </NavItem>
      </NavSection>

      <SectionDivider />

      <NavSection>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px' }}>
          <WhatsAppIcon className="nav-icon" width={16} height={16} color="#000000" />
          <NavText className="nav-text">Whats app</NavText>
          <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px' }}>
          <BlogIcon className="nav-icon" width={16} height={16} color="#121927" />
          <NavText className="nav-text">Blogs</NavText>
          <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px' }}>
          <SocialMediaIcon className="nav-icon" width={16} height={16} color="#121927" />
          <NavText className="nav-text">Social Media</NavText>
          <ComingSoonBadge>(Coming soon)</ComingSoonBadge>
        </Box>
        
        <NavItem to="/refer-earn" className={({ isActive }) => isActive ? 'active' : ''}>
          <ReferEarnIcon className="nav-icon" width={16} height={16} color="currentColor" />
          <NavText className="nav-text">Refer & Earn</NavText>
        </NavItem>
        
        <div onClick={toggleMyAccount} style={{ cursor: 'pointer' }}>
          <NavItem as="div" to="/my-account" className={({ isActive }) => isActive ? 'active' : ''}>
            <MyAccountIcon className="nav-icon" width={16} height={16} color="currentColor" />
            <NavText className="nav-text">My Account</NavText>
            <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              {myAccountOpen ? '\u25B2' : '\u25BC'} {/* Up or Down arrow */}
            </Box>
          </NavItem>
        </div>
        {myAccountOpen && (
          <Stack sx={{ pl: 4, gap: '8px' }}>
            <NavItem to="/my-account/account-information" className={({ isActive }) => isActive ? 'active' : ''}>
              <NavText className="nav-text">Account Information</NavText>
            </NavItem>
            <NavItem to="/my-account/gst-information" className={({ isActive }) => isActive ? 'active' : ''}>
              <NavText className="nav-text">GST Information</NavText>
            </NavItem>
            <NavItem to="/my-account/cro-information" className={({ isActive }) => isActive ? 'active' : ''}>
              <NavText className="nav-text">CRO Information</NavText>
            </NavItem>
          </Stack>
        )}
      </NavSection>
    </SidebarContainer>
  );
};

export default DashboardSidebar;