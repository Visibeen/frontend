import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const ShowcaseContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  position: 'relative',
  overflow: 'hidden'
}));

const SolutionShowcaseSection = () => {
  return (
    <ShowcaseContainer>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={6} 
          alignItems="center"
        >
          {/* Illustration */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/images/seo-illustration.svg" 
              alt="SEO Solution" 
              style={{ 
                width: '100%', 
                maxWidth: '300px', 
                height: 'auto' 
              }}
            />
          </Box>

          {/* Content */}
          <Stack spacing={3} sx={{ flex: 1.5 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                fontWeight: 500,
                lineHeight: '40px'
              }}
            >
              All-in-One Local SEO Solution for Every Business, On Every Device.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'white',
                fontSize: '18px',
                lineHeight: '28px',
                fontStyle: 'italic',
                opacity: 0.95
              }}
            >
              "Designed to work for any local business, we have you covered. With mobile-first visibility and one easy dashboard to manage reviews, rankings, and listings, your business stays in control wherever your customers search."
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </ShowcaseContainer>
  );
};

export default SolutionShowcaseSection;