import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigationHeader from './NavigationHeader';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const TemplateContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#fcf9f0'
}));

const Template5 = ({ 
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
    blogs,
    faq,
    contactInfo,
    footer
  } = templateData || {};

  return (
    <TemplateContainer>
      <NavigationHeader businessInfo={businessInfo} navigation={navigation} />
      <HeroSection businessInfo={businessInfo} />
      <AboutSection aboutUs={aboutUs} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogs={blogs} />
      <FAQSection faq={faq} />
      <ContactSection contactInfo={contactInfo} footer={footer} />
      <Footer footer={footer} />
    </TemplateContainer>
  );
};

export default Template5;