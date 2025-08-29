import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import LatestUpdatesSection from './LatestUpdatesSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import Footer from './Footer';

const TemplateContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#ffffff'
}));

const Template1 = ({ 
  templateData,
  isEditable = false,
  onTemplateUpdate
}) => {
  const {
    businessInfo,
    services,
    aboutUs,
    latestUpdates,
    testimonials,
    faq,
    contactInfo,
    socialMedia,
    footerLinks,
    newsletter
  } = templateData || {};

  return (
    <TemplateContainer>
      <HeroSection businessInfo={businessInfo} />
      <ServicesSection services={services} />
      <AboutSection aboutUs={aboutUs} />
      <LatestUpdatesSection latestUpdates={latestUpdates} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faq={faq} />
      <Footer 
        contactInfo={contactInfo}
        socialMedia={socialMedia}
        footerLinks={footerLinks}
        newsletter={newsletter}
      />
    </TemplateContainer>
  );
};

export default Template1;