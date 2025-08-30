import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopContactBar from './TopContactBar';
import NavigationHeader from './NavigationHeader';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import TechnologiesSection from './TechnologiesSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const TemplateContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#ffffff'
}));

const Template2 = ({ 
  templateData,
  isEditable = false,
  onTemplateUpdate
}) => {
  const {
    topContactInfo,
    businessInfo,
    navigation,
    aboutUs,
    services,
    testimonials,
    technologies,
    faq,
    contactInfo,
    footer
  } = templateData || {};

  return (
    <TemplateContainer>
      <TopContactBar topContactInfo={topContactInfo} />
      <NavigationHeader businessInfo={businessInfo} navigation={navigation} />
      <HeroSection businessInfo={businessInfo} />
      <AboutSection aboutUs={aboutUs} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <TechnologiesSection technologies={technologies} />
      <FAQSection faq={faq} />
      <ContactSection contactInfo={contactInfo} />
      <Footer footer={footer} />
    </TemplateContainer>
  );
};

export default Template2;