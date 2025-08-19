import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HelpLinkText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#EF232A',
  textDecoration: 'underline',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
}));

const HelpLink = ({ onClick }) => {
  return (
    <HelpLinkText onClick={onClick}>
      Unable to trace account ?
    </HelpLinkText>
  );
};

export default HelpLink;