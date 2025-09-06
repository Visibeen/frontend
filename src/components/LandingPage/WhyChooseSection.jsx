import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import DynamicScoreIcon from '../icons/DynamicScoreIcon';
import PerformanceDashboardIcon from '../icons/PerformanceDashboardIcon';
import SmartGridIcon from '../icons/SmartGridIcon';
import ServiceRadiusIcon from '../icons/ServiceRadiusIcon';
import ProgressiveTaskIcon from '../icons/ProgressiveTaskIcon';
import AiRecommendationsIcon from '../icons/AiRecommendationsIcon';

const FeatureCard = styled(Box)(({ theme }) => ({
  background: 'rgba(11, 145, 214, 0.02)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  textAlign: 'center',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 30px rgba(11, 145, 214, 0.1)',
    background: 'linear-gradient(93.5deg, #0B91D6 1.32%, #EF232A 98.82%)',
    '& .feature-title': {
      color: 'white'
    },
    '& .feature-description': {
      color: 'white'
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '12px',
  background: 'rgba(11, 145, 214, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2)
}));

const WhyChooseSection = () => {
  const features = [
    {
      icon: <DynamicScoreIcon width={26} height={14} color="#0b91d6" />,
      title: 'Dynamic Visibeen Score',
      description: 'Real-time evolving score that reflects true local SEO strength'
    },
    {
      icon: <PerformanceDashboardIcon width={24} height={24} color="#0b91d6" />,
      title: 'Performance Dashboard',
      description: 'Track calls, directions, website clicks & growth trends daily'
    },
    {
      icon: <SmartGridIcon width={26} height={19} color="#0b91d6" />,
      title: 'Smart Grid Competition',
      description: 'Create your own competition cluster (choose 20 or 50 competitors within a distance)'
    },
    {
      icon: <ServiceRadiusIcon width={20} height={24} color="#0b91d6" />,
      title: 'Suggested Service Radius',
      description: 'Get recommendations for higher visibility in your target areas'
    },
    {
      icon: <ProgressiveTaskIcon width={26} height={23} color="#0b91d6" />,
      title: 'Progressive Task Ladder',
      description: 'Beat nearest competitor, step by step with clear actionable tasks'
    },
    {
      icon: <AiRecommendationsIcon width={23} height={23} color="#0b91d6" />,
      title: 'AI-Powered Recommendations',
      description: 'AI-powered recommendations to improve ranking instantly'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6} alignItems="center">
        {/* Section Header */}
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'primary.main',
              maxWidth: '600px'
            }}
          >
            Why Choose <Box component="span" sx={{ color: 'primary.main' }}>Visibeen?</Box>
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary',
              maxWidth: '800px',
              fontSize: '16px'
            }}
          >
            Simple, step-by-step interface with easy tasks anyone can do. If you can use WhatsApp, you can use Visibeen.
          </Typography>
        </Stack>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)'
            },
            gap: 4,
            width: '100%',
            mt: 6
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper>
                {feature.icon}
              </IconWrapper>
              <Typography 
                variant="h6" 
                className="feature-title"
                sx={{ 
                  color: 'primary.main',
                  mb: 2,
                  fontWeight: 600
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="caption" 
                className="feature-description"
                sx={{ 
                  color: 'text.primary',
                  lineHeight: '18px'
                }}
              >
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default WhyChooseSection;