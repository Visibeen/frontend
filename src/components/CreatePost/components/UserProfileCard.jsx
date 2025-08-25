import React from 'react';
import { Stack, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarRating from './StarRating';

const ProfileContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px'
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

const UserProfileCard = ({ user }) => {
  return (
    <ProfileContainer>
      <UserAvatar src={user.avatar} alt={user.name} />
      <UserName>{user.name}</UserName>
      <StarRating rating={user.rating} />
    </ProfileContainer>
  );
};

export default UserProfileCard;