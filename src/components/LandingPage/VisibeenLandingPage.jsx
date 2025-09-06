import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme';
import HeroSection from './HeroSection';
import WhyChooseSection from './WhyChooseSection';
import FeaturesSection from './FeaturesSection';
import KeyBenefitsSection from './KeyBenefitsSection';
import SolutionShowcaseSection from './SolutionShowcaseSection';
import PricingSection from './PricingSection';
import NewsletterSection from './NewsletterSection';
import FooterSection from './FooterSection';

const VisibeenLandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroSection />
      <WhyChooseSection />
      <FeaturesSection />
      <KeyBenefitsSection />
      <SolutionShowcaseSection />
      <PricingSection />
      <NewsletterSection />
      <FooterSection />
    </ThemeProvider>
  );
};

export default VisibeenLandingPage;