import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarRatingIcon from '../../icons/StarRatingIcon';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
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
        src="/images/user-avatar.jpg"
        alt="Karen Abshire"
      />
      
      <UserName>
        Karen Abshire
      </UserName>
      
      <RatingContainer>
        <StarRatingIcon width={500} height={24} color="#FFD700" />
      </RatingContainer>
    </ProfileContainer>
  );
};

export default UserProfile;