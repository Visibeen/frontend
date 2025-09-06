import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'text.primary',
            fontWeight: 700,
            lineHeight: '50px'
          }}
        >
          Our <Box component="span" sx={{ color: 'primary.main' }}>Features</Box>
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.primary',
            maxWidth: '800px',
            fontSize: '12px'
          }}
        >
          Comprehensive tools designed for business owners who want results without complexity.
        </Typography>
      </Stack>
      
      {/* Placeholder for additional feature content */}
      <Box sx={{ height: '200px', mt: 4 }} />
    </Container>
  );
};

export default FeaturesSection;