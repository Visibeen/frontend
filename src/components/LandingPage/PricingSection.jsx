import React from 'react';
import { Box, Typography, Button, Stack, Container, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const PricingContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(11, 145, 214, 0.03)',
  padding: theme.spacing(8, 0)
}));

const PricingCard = styled(Box)(({ theme, featured }) => ({
  background: 'white',
  borderRadius: '16px',
  padding: theme.spacing(3),
  position: 'relative',
  border: featured ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.1)',
  boxShadow: featured 
    ? '0px 8px 30px rgba(11, 145, 214, 0.2)' 
    : '0px 4px 20px rgba(0, 0, 0, 0.1)',
  transform: featured ? 'scale(1.05)' : 'scale(1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: featured ? 'scale(1.08)' : 'scale(1.03)',
    boxShadow: '0px 12px 40px rgba(11, 145, 214, 0.15)'
  }
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#000000',
  lineHeight: '16px'
}));

const FeatureList = styled(Box)(({ theme }) => ({
  '& ul': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '28px',
      color: theme.palette.text.primary,
      position: 'relative',
      paddingLeft: '16px',
      marginBottom: theme.spacing(0.5),
      '&::before': {
        content: '"•"',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        position: 'absolute',
        left: 0
      }
    }
  }
}));

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small/local businesses just getting started.',
      price: '₹4,999',
      period: '/ month',
      features: [
        'Keyword Research & On-Page SEO',
        'Google Business Profile Setup',
        'Local Directory Submissions',
        'Monthly SEO Report'
      ],
      featured: false
    },
    {
      name: 'Growth',
      description: 'Best for businesses ready to scale traffic & visibility.',
      price: '₹6,999',
      period: '/ month',
      features: [
        'Everything in Basic, plus:',
        'Competitor Keyword Analysis',
        'High-Quality Backlink Building',
        'Blog & Content Optimization',
        'Bi-Weekly Growth Reports'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      description: 'For brands that want to dominate search rankings.',
      price: '₹8,999',
      period: '/ month',
      features: [
        'Everything in Growth, plus:',
        'Multi-Location SEO Strategy',
        'Content Marketing Campaigns',
        'Dedicated SEO Manager'
      ],
      featured: false
    }
  ];

  return (
    <PricingContainer>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          {/* Section Header */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'text.primary'
              }}
            >
              Choose Our <Box component="span" sx={{ color: 'primary.main' }}>Plans</Box>
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontSize: '16px'
              }}
            >
              Simple, transparent, and result-driven pricing.
            </Typography>
          </Stack>

          {/* Pricing Cards */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            sx={{ width: '100%', justifyContent: 'center' }}
          >
            {plans.map((plan, index) => (
              <PricingCard key={index} featured={plan.featured} sx={{ flex: 1, maxWidth: '350px' }}>
                {plan.featured && (
                  <Chip
                    icon={<StarIcon sx={{ fontSize: '16px !important' }} />}
                    label="Most Popular"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'primary.main',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '14px',
                      '& .MuiChip-icon': {
                        color: 'white'
                      }
                    }}
                  />
                )}
                
                <Stack spacing={3}>
                  {/* Plan Header */}
                  <Stack spacing={1}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: 'text.primary',
                        fontWeight: 500,
                        fontSize: '18px'
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.primary',
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}
                    >
                      {plan.description}
                    </Typography>
                    <PriceText>
                      {plan.price} <Box component="span" sx={{ fontSize: '14px', fontWeight: 400 }}>{plan.period}</Box>
                    </PriceText>
                  </Stack>

                  {/* Features */}
                  <FeatureList>
                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </FeatureList>

                  {/* CTA Button */}
                  <Button
                    variant={plan.featured ? "contained" : "outlined"}
                    fullWidth
                    sx={{
                      borderRadius: '8px',
                      py: 1.5,
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'none',
                      ...(plan.featured ? {
                        background: 'primary.main',
                        '&:hover': {
                          background: 'primary.dark'
                        }
                      } : {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          background: 'rgba(11, 145, 214, 0.05)'
                        }
                      })
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </PricingCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </PricingContainer>
  );
};

export default PricingSection;