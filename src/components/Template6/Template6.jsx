import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigationHeader from './NavigationHeader';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import FeaturedProjectsSection from './FeaturedProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import Footer from './Footer';

const TemplateContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#F4F8FF'
}));

const Template6 = ({ 
  templateData,
  isEditable = false,
  onTemplateUpdate
}) => {
  const {
    businessInfo,
    navigation,
    serviceRequest,
    services,
    aboutUs,
    featuredProjects,
    testimonials,
    faq,
    contactInfo,
    footer
  } = templateData || {};

  return (
    <TemplateContainer>
      <NavigationHeader businessInfo={businessInfo} navigation={navigation} />
      <HeroSection businessInfo={businessInfo} serviceRequest={serviceRequest} />
      <ServicesSection services={services} />
      <AboutSection aboutUs={aboutUs} />
      <FeaturedProjectsSection featuredProjects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faq={faq} />
      <Footer contactInfo={contactInfo} footer={footer} />
    </TemplateContainer>
  );
};

export default Template6;