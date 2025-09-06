import React from 'react';
import { Box, Typography, Button, TextField, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const NewsletterForm = styled(Box)(({ theme }) => ({
  border: '1px solid #eaeaea',
  borderRadius: '16px',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  maxWidth: '600px',
  margin: '0 auto',
  background: 'white'
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'none',
  minWidth: '120px',
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'scale(1.05)'
  }
}));

const NewsletterSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6} alignItems="center" textAlign="center">
        {/* Section Header */}
        <Stack spacing={2} alignItems="center">
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'text.primary',
              fontSize: '46px',
              fontWeight: 700
            }}
          >
            Subscribe our newsletter
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'primary.main',
              fontSize: '50px',
              fontWeight: 700,
              lineHeight: '60px'
            }}
          >
            to get new updates
          </Typography>
        </Stack>

        {/* Newsletter Form */}
        <NewsletterForm>
          <TextField
            placeholder="Enter your email"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'text.primary',
                fontSize: '16px',
                fontWeight: 400,
                pl: 2
              }
            }}
            sx={{ flex: 1 }}
          />
          <SubscribeButton>
            Get Started
          </SubscribeButton>
        </NewsletterForm>
      </Stack>
    </Container>
  );
};

export default NewsletterSection;