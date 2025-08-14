import React from 'react';
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0',
  height: '100%'
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '12px',
  fontFamily: 'Inter, sans-serif'
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6b7280',
  lineHeight: 1.6,
  marginBottom: '20px',
  fontFamily: 'Inter, sans-serif'
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

const FeaturesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  marginBottom: '40px'
}));

const CTASection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '40px',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e2e8f0'
}));

const CTATitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '12px',
  fontFamily: 'Inter, sans-serif'
}));

const CTADescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6b7280',
  marginBottom: '24px',
  fontFamily: 'Inter, sans-serif'
}));

const FreeWebsite = () => {
  const features = [
    {
      title: 'Professional Templates',
      description: 'Choose from a variety of professionally designed templates that are perfect for your business type and industry.'
    },
    {
      title: 'Mobile Responsive',
      description: 'Your website will look great on all devices - desktop, tablet, and mobile phones with automatic responsive design.'
    },
    {
      title: 'SEO Optimized',
      description: 'Built-in SEO features help your website rank better in search engines and attract more customers.'
    },
    {
      title: 'Easy to Update',
      description: 'Simple drag-and-drop editor allows you to update content, images, and information without any technical skills.'
    },
    {
      title: 'Custom Domain',
      description: 'Get a professional custom domain name that matches your business name and builds trust with customers.'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your website performance with detailed analytics including visitor stats, popular pages, and more.'
    }
  ];

  const handleCreateWebsite = () => {
    console.log('Create website clicked');
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Free Website</PageTitle>
          <PageSubtitle>
            Create a professional website for your business in minutes - completely free
          </PageSubtitle>
        </PageHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <CardContent sx={{ padding: '24px' }}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </CardContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <CTASection>
          <CTATitle>Ready to Create Your Website?</CTATitle>
          <CTADescription>
            Join thousands of businesses who have already created their professional website with our free platform.
          </CTADescription>
          <CreateButton onClick={handleCreateWebsite}>
            Create My Website Now
          </CreateButton>
        </CTASection>
      </PageContainer>
    </DashboardLayout>
  );
};

export default FreeWebsite;