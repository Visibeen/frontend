import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlumbingInstallationIcon from './icons/PlumbingInstallationIcon';
import PipeMaintenanceIcon from './icons/PipeMaintenanceIcon';
import PipeConsultationIcon from './icons/PipeConsultationIcon';
import GeneralPlumbingIcon from './icons/GeneralPlumbingIcon';
import FixingPipesIcon from './icons/FixingPipesIcon';
import DrainCleaningIcon from './icons/DrainCleaningIcon';

const SectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '60px 64px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px'
  }
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '20px',
  marginBottom: '60px'
}));

const SubTitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.40px',
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: theme.palette.primary.main
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '41px',
  height: '5px',
  backgroundColor: theme.palette.primary.main
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-0.80px',
  lineHeight: '48px',
  color: theme.palette.secondary.main,
  textAlign: 'center',
  maxWidth: '800px'
}));

const ServicesGrid = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const ServicesRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ServiceCard = styled(Stack)(({ theme, featured }) => ({
  gap: '30px',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '353px',
  padding: featured ? '40px' : '30px',
  backgroundColor: featured ? theme.palette.primary.main : 'transparent',
  borderRadius: featured ? '8px' : '0',
  color: featured ? '#ffffff' : theme.palette.secondary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: featured ? theme.palette.primary.dark : theme.palette.grey[50],
    transform: 'translateY(-5px)'
  }
}));

const ServiceTitle = styled(Typography)(({ theme, featured }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.48px',
  lineHeight: '30px',
  color: featured ? '#ffffff' : theme.palette.secondary.main
}));

const ServiceDescription = styled(Typography)(({ theme, featured }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  lineHeight: '18px',
  color: featured ? '#ffffff' : theme.palette.secondary.main
}));

const getServiceIcon = (iconType, featured) => {
  const iconColor = featured ? '#ffffff' : '#0B91D6';
  const iconSize = 40;
  
  switch (iconType) {
    case 'installation':
      return <PlumbingInstallationIcon width={iconSize} height={iconSize} color={iconColor} />;
    case 'maintenance':
      return <PipeMaintenanceIcon width={iconSize} height={iconSize} color={iconColor} />;
    case 'consultation':
      return <PipeConsultationIcon width={iconSize} height={iconSize} color={iconColor} />;
    case 'general':
      return <GeneralPlumbingIcon width={iconSize} height={iconSize} color={iconColor} />;
    case 'fixing':
      return <FixingPipesIcon width={iconSize} height={iconSize} color={iconColor} />;
    case 'drain':
      return <DrainCleaningIcon width={iconSize} height={iconSize} color={iconColor} />;
    default:
      return <PlumbingInstallationIcon width={iconSize} height={iconSize} color={iconColor} />;
  }
};

const ServicesSection = ({ services }) => {
  const { sectionLabel, title, serviceList } = services || {};

  // Split services into two rows of 3
  const firstRowServices = serviceList?.slice(0, 3) || [];
  const secondRowServices = serviceList?.slice(3, 6) || [];

  return (
    <SectionContainer>
      <HeaderContainer>
        <SubTitleContainer>
          <SubTitle>{sectionLabel || 'What We Do'}</SubTitle>
          <Divider />
        </SubTitleContainer>
        
        <MainTitle>
          {title || 'We Do The Best Plumbing Service & Maintenance'}
        </MainTitle>
      </HeaderContainer>

      <ServicesGrid>
        <ServicesRow>
          {firstRowServices.map((service) => (
            <ServiceCard key={service.id} featured={service.featured}>
              {getServiceIcon(service.iconType, service.featured)}
              <ServiceTitle featured={service.featured}>
                {service.title}
              </ServiceTitle>
              <ServiceDescription featured={service.featured}>
                {service.description}
              </ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesRow>

        <ServicesRow>
          {secondRowServices.map((service) => (
            <ServiceCard key={service.id} featured={service.featured}>
              {getServiceIcon(service.iconType, service.featured)}
              <ServiceTitle featured={service.featured}>
                {service.title}
              </ServiceTitle>
              <ServiceDescription featured={service.featured}>
                {service.description}
              </ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesRow>
      </ServicesGrid>
    </SectionContainer>
  );
};

export default ServicesSection;