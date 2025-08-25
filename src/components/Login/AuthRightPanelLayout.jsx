import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const RightPanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(3.25),
  zIndex: 1,
  position: 'relative'
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  textAlign: 'center',
  marginBottom: theme.spacing(1.75)
}));

const Subtext = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927',
  textAlign: 'center'
}));

const AuthRightPanelLayout = ({ heading, subtext, children }) => {
  return (
    <RightPanelContainer>
      <ContentContainer>
        {(heading || subtext) && (
          <Stack spacing={1.75} alignItems="center">
            {heading ? <Heading>{heading}</Heading> : null}
            {subtext ? <Subtext>{subtext}</Subtext> : null}
          </Stack>
        )}
        {children}
      </ContentContainer>
    </RightPanelContainer>
  );
};

export default AuthRightPanelLayout;

