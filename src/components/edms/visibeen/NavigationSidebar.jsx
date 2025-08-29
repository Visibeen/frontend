import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '../../icons/HomeIcon';
import AnalyticsIcon from '../../icons/AnalyticsIcon';
import StarIcon from '../../icons/StarIcon';
import EmailIcon from '../../icons/EmailIcon';
import WebsiteIcon from '../../icons/WebsiteIcon';
import WhatsAppIcon from '../../icons/WhatsAppIcon';
import BlogIcon from '../../icons/BlogIcon';
import SocialMediaIcon from '../../icons/SocialMediaIcon';
import GiftIcon from '../../icons/GiftIcon';
import UserIcon from '../../icons/UserIcon';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 325,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  padding: 0
}));

const NavItem = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '12px 20px',
  cursor: 'pointer',
  borderRadius: 4,
  margin: '0 20px',
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.light : theme.palette.grey[100]
  }
}));

const ComingSoonText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.error.main,
  fontWeight: 400,
  marginLeft: 'auto'
}));

const ActiveIndicator = styled(Box)(({ theme }) => ({
  width: 285,
  height: 2,
  backgroundColor: theme.palette.primary.main,
  margin: '0 20px'
}));

const NavigationSidebar = () => {
  const topNavItems = [
    { icon: HomeIcon, label: 'Overview', active: false },
    { icon: AnalyticsIcon, label: 'Performance', active: false, hasExternal: true },
    { icon: StarIcon, label: 'Reputation Management', active: false },
    { icon: EmailIcon, label: 'Get EDMs', active: true },
    { icon: WebsiteIcon, label: 'Free Website', active: false, hasExternal: true }
  ];

  const bottomNavItems = [
    { icon: WhatsAppIcon, label: 'Whats app', comingSoon: true },
    { icon: BlogIcon, label: 'Blogs', comingSoon: true },
    { icon: SocialMediaIcon, label: 'Social Media', comingSoon: true },
    { icon: GiftIcon, label: 'Refer & Earn', active: false },
    { icon: UserIcon, label: 'My Account', active: false }
  ];

  return (
    <SidebarContainer>
      <Stack spacing={1} sx={{ pt: 2 }}>
        {topNavItems.map((item, index) => (
          <Box key={index}>
            <NavItem active={item.active}>
              <item.icon width={17} height={17} color="#121927" />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: item.active ? 'primary.main' : 'text.primary',
                  fontWeight: 500 
                }}
              >
                {item.label}
              </Typography>
              {item.hasExternal && (
                <ExternalLinkIcon width={18} height={17} color="#121927" />
              )}
            </NavItem>
            {item.active && <ActiveIndicator />}
          </Box>
        ))}
      </Stack>

      <Stack spacing={1} sx={{ mt: 'auto', pb: 2 }}>
        {bottomNavItems.map((item, index) => (
          <NavItem key={index} active={item.active}>
            <item.icon width={17} height={17} color={item.comingSoon ? "#000000" : "#121927"} />
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500 
              }}
            >
              {item.label}
            </Typography>
            {item.comingSoon && (
              <ComingSoonText>(Coming soon)</ComingSoonText>
            )}
          </NavItem>
        ))}
      </Stack>
    </SidebarContainer>
  );
};

export default NavigationSidebar;