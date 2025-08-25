import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import GrowthSection from './GrowthSection';
import InsightsSection from './InsightsSection';
import PerformanceSection from './PerformanceSection';
import BusinessSection from './BusinessSection';
import SEOSolutionSection from './SEOSolutionSection';
import RankingsSection from './RankingsSection';
import NewsletterSection from './NewsletterSection';
import HomepageFooter from './HomepageFooter';

const HomepageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#F8F8F8'
}));

const Homepage = () => {
  return (
    <HomepageContainer>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GrowthSection />
      <InsightsSection />
      <PerformanceSection />
      <BusinessSection />
      <SEOSolutionSection />
      <RankingsSection />
      <NewsletterSection />
      <HomepageFooter />
    </HomepageContainer>
  );
};

export default Homepage;