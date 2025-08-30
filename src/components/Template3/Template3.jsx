import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopContactBar from './TopContactBar';
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

const Template3 = ({ 
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
    faq,
    blog,
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
      <FAQSection faq={faq} />
      <BlogSection blog={blog} />
      <Footer contactInfo={contactInfo} footer={footer} />
    </TemplateContainer>
  );
};

export default Template3;