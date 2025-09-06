import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const BenefitItem = styled(Box)(({ theme }) => ({
  background: 'rgba(11, 145, 214, 0.06)',
  borderRadius: '4px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  minHeight: '60px'
}));

const KeyBenefitsSection = () => {
  const benefits = [
    'Transparent & unique scoring system (like CIBIL Score of Local SEO)',
    'Save 90% agency cost – DIY with AI support',
    'Clear performance insights (no jargon, just numbers & actions)',
    'Help you to Scalable from single store → national franchise',
    'Trust & Control – No dependency on external SEO agencies',
    'Future-Proof with AI – Stay ahead in rankings with daily tasks'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6} alignItems="center">
        {/* Section Header */}
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'text.primary',
              maxWidth: '600px'
            }}
          >
            Key <Box component="span" sx={{ color: 'primary.main' }}>Benefits</Box>
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary',
              maxWidth: '800px',
              fontSize: '16px'
            }}
          >
            Comprehensive tools designed for business owners who want results without complexity.
          </Typography>
        </Stack>

        {/* Benefits Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)'
            },
            gap: 3,
            width: '100%',
            maxWidth: '1200px',
            mt: 4
          }}
        >
          {benefits.map((benefit, index) => (
            <BenefitItem key={index}>
              <CheckmarkIcon width={23} height={23} color="#0b91d6" />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.primary',
                  fontSize: '14px',
                  lineHeight: '20px',
                  flex: 1
                }}
              >
                {benefit}
              </Typography>
            </BenefitItem>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default KeyBenefitsSection;