import React, { useState } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  width: '37px',
  height: '6px',
  backgroundColor: theme.palette.primary.main
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-0.80px',
  lineHeight: '48px',
  color: theme.palette.secondary.main,
  textAlign: 'center'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '-0.36px',
  lineHeight: '23px',
  color: theme.palette.secondary.main,
  textAlign: 'center',
  maxWidth: '800px'
}));

const CarouselContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '12px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '20px'
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  width: '50px',
  height: '50px',
  backgroundColor: 'rgba(11, 145, 214, 0.1)',
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff'
  }
}));

const ProjectInfo = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  gap: '2px',
  minWidth: '200px',
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center'
  }
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.48px',
  lineHeight: '30px',
  color: '#ffffff'
}));

const ProjectLine = styled(Box)(({ theme }) => ({
  width: '178px',
  height: '2px',
  backgroundColor: '#ffffff',
  margin: '8px 0'
}));

const ProjectCategory = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  color: '#ffffff'
}));

const ImagesContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '12px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ProjectImage = styled(Box)(({ theme }) => ({
  width: '335px',
  height: '456px',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '335px',
    height: '300px'
  }
}));

const FeaturedProjectsSection = ({ featuredProjects }) => {
  const { sectionLabel, title, description, projects } = featuredProjects || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : (projects?.length || 1) - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < (projects?.length || 1) - 1 ? prev + 1 : 0));
  };

  const currentProject = projects?.[currentIndex] || projects?.[0];
  const nextProject = projects?.[currentIndex + 1] || projects?.[0];

  return (
    <SectionContainer>
      <HeaderContainer>
        <SubTitleContainer>
          <SubTitle>{sectionLabel || 'Featured Projects'}</SubTitle>
          <Divider />
        </SubTitleContainer>
        
        <MainTitle>
          {title || 'Our Latest updates'}
        </MainTitle>
        
        <Description>
          {description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper placerat metus. Cras venenatis mi non purus dictum, non tincidunt ligula varius.'}
        </Description>
      </HeaderContainer>

      <CarouselContainer>
        <NavigationButton onClick={handlePrevious}>
          <ArrowBackIosIcon />
        </NavigationButton>

        <ProjectInfo>
          <ProjectTitle>
            {currentProject?.title || 'Water Line Repair'}
          </ProjectTitle>
          <ProjectLine />
          <ProjectCategory>
            {currentProject?.category || 'Plumbing'}
          </ProjectCategory>
        </ProjectInfo>

        <ImagesContainer>
          <ProjectImage
            sx={{
              backgroundImage: `url(${currentProject?.image || '/images/template6-project1.jpg'})`
            }}
          />
          {nextProject && (
            <ProjectImage
              sx={{
                backgroundImage: `url(${nextProject.image || '/images/template6-project2.jpg'})`
              }}
            />
          )}
        </ImagesContainer>

        <NavigationButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </NavigationButton>
      </CarouselContainer>
    </SectionContainer>
  );
};

export default FeaturedProjectsSection;