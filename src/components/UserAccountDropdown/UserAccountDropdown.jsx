import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Logout, Person } from '@mui/icons-material';
import { getSession, clearSession } from '../../utils/authUtils';
import tokenManager from '../../auth/TokenManager';
import AutoTokenManager from '../../utils/autoTokenUtils';

const DropdownContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}));

const UserButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  backgroundColor: '#ffffff',
  border: '2px solid #0B91D6',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(11, 145, 214, 0.2)'
  }
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: '28px',
  height: '28px',
  background: 'linear-gradient(135deg, #0B91D6 0%, #2563EB 100%)',
  boxShadow: '0 2px 8px rgba(11, 145, 214, 0.3)',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: '8px',
    minWidth: '200px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  }
}));

const MenuHeader = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e5e7eb'
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '4px'
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#6b7280'
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 20px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#374151',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f3f4f6',
    color: '#0B91D6'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: '#6b7280'
  },
  '&:hover .MuiSvgIcon-root': {
    color: '#0B91D6'
  }
}));

const LogoutMenuItem = styled(StyledMenuItem)(({ theme }) => ({
  color: '#dc2626',
  '&:hover': {
    backgroundColor: '#fef2f2',
    color: '#dc2626'
  },
  '& .MuiSvgIcon-root': {
    color: '#dc2626'
  },
  '&:hover .MuiSvgIcon-root': {
    color: '#dc2626'
  }
}));

const UserAccountDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Get user session info
    const session = getSession();
    if (session) {
      const displayName = getDisplayNameFromSession(session);
      const logoUrl = getLogoFromSession(session);
      setUserInfo({
        name: displayName,
        email: session.user?.email || session.email || 'user@example.com',
        initials: getInitials(displayName),
        logoUrl
      });
    }
  }, []);

  const getDisplayNameFromSession = (session) => {
    // Prefer account/business level names over generic user name
    const candidates = [
      session.accountName,
      session.businessName,
      session.account?.name,
      session.business?.name,
      session.organization?.name,
      session.companyName,
      session.user?.accountName,
      session.user?.businessName,
      session.user?.name,
      session.user?.displayName,
    ].filter(Boolean);
    return (candidates[0] || 'Account');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getLogoFromSession = (session) => {
    const candidates = [
      session.logoUrl,
      session.logo,
      session.photoURL,
      session.profileImage,
      session.imageUrl,
      session.business?.logoUrl,
      session.account?.logoUrl,
      session.organization?.logoUrl,
      session.user?.photoURL,
      session.user?.avatar,
      session.user?.imageUrl
    ].filter(Boolean);
    return candidates[0] || null;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleClose();
    navigate('/my-account');
  };

  // Settings removed from logout/menu section per request

  const handleLogout = async () => {
    handleClose();

    try {
      // Stop auto token management first
      AutoTokenManager.stopAutoRefresh();
      
      // Get the auth token for the API call
      const session = getSession();
      const token = session?.token || session?.access_token;

      // Call the logout API
      const response = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `${token}` })
        }
      });

      if (response.ok) {
        console.log('Successfully logged out from server');
      } else {
        console.warn('Logout API call failed, but continuing with local logout');
      }
    } catch (error) {
      console.error('Error calling logout API:', error);
      // Continue with local logout even if API fails
    }

    // Clear Google tokens from TokenManager (not handled by clearSession)
    try {
      tokenManager.remove('google');
      console.log('Google tokens cleared from TokenManager');
    } catch (clearError) {
      console.error('Error clearing Google tokens:', clearError);
    }

    // Clear all other tokens and session data (handled by enhanced clearSession)
    clearSession();
    
    // Redirect to login
    navigate('/login');
  };

  // Don't render if no user session
  if (!userInfo) {
    return null;
  }

  return (
    <DropdownContainer>
      <UserButton
        onClick={handleClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {userInfo.logoUrl ? (
          <UserAvatar src={userInfo.logoUrl} alt={userInfo.name} />
        ) : (
          <UserAvatar>
            <AccountCircle sx={{ color: '#ffffff' }} />
          </UserAvatar>
        )}
      </UserButton>

      <StyledMenu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuHeader>
          <UserName>{userInfo.accountName}</UserName>
          <UserEmail>{userInfo.email}</UserEmail>
        </MenuHeader>

        {/* <StyledMenuItem onClick={handleMyAccount}>
          <Person />
          My Account
        </StyledMenuItem> */}

        {/* Settings menu item removed */}

        <Divider sx={{ margin: '8px 0' }} />

        <LogoutMenuItem onClick={handleLogout}>
          <Logout />
          Logout
        </LogoutMenuItem>
      </StyledMenu>
    </DropdownContainer>
  );
};

export default UserAccountDropdown;
