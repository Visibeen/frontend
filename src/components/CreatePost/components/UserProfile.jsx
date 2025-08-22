import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  minWidth: '200px',
  flexShrink: 0
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: '88px',
  height: '88px',
  border: 'none'
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927',
  textAlign: 'center'
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const UserProfile = () => {
  return (
    <ProfileContainer>
      <UserAvatar 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        alt="Karen Abshire"
      />
      
      <UserName>
        Karen Abshire
      </UserName>
      
      <RatingContainer>
        <Rating 
          value={3.5} 
          precision={0.5}
          readOnly 
          size="small"
          sx={{
            '& .MuiRating-iconFilled': {
              color: '#FFD700'
            },
            '& .MuiRating-iconEmpty': {
              color: '#E0E0E0'
            }
          }}
        />
      </RatingContainer>
    </ProfileContainer>
  );
};

export default UserProfile;