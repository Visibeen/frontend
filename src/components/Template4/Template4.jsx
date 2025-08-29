import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigationHeader from './NavigationHeader';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import BlogSection from './BlogSection';
import Footer from './Footer';

const TemplateContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#ffffff'
}));

const Template4 = ({ 
  templateData,
  isEditable = false,
  onTemplateUpdate
}) => {
  const {
    businessInfo,
    navigation,
    aboutUs,
    services,
    testimonials,
    faq,
    blogs,
    footer
  } = templateData || {};

  return (
    <TemplateContainer>
      <NavigationHeader businessInfo={businessInfo} navigation={navigation} />
      <HeroSection businessInfo={businessInfo} />
      <AboutSection aboutUs={aboutUs} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faq={faq} />
      <BlogSection blogs={blogs} />
      <Footer footer={footer} />
    </TemplateContainer>
  );
};

export default Template4;