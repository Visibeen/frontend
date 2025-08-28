import React from 'react';
import { Stack, Avatar, Typography, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px',
  marginBottom: '40px'
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '88px',
  height: '88px',
  border: 'none'
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#0B91D6',
  textAlign: 'center'
}));

const ProfileRating = styled(Rating)(({ theme }) => ({
  gap: '-1px',
  '& .MuiRating-iconFilled': {
    color: '#FBBC05'
  },
  '& .MuiRating-iconEmpty': {
    color: '#E0E0E0'
  }
}));

const UserProfileDisplay = ({ userProfile }) => {
  return (
    <ProfileContainer>
      <ProfileAvatar 
        src={userProfile.avatar} 
        alt={userProfile.name}
      />
      <ProfileName>
        {userProfile.name}
      </ProfileName>
      <ProfileRating 
        value={userProfile.rating} 
        readOnly 
        precision={0.5}
        size="small"
      />
    </ProfileContainer>
  );
};

export default UserProfileDisplay;