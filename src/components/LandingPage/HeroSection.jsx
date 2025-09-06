import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, TextField, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AiGenerateIcon from '../icons/AiGenerateIcon';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  borderRadius: '0px 0px 60px 60px',
  minHeight: 'calc(102vh + 500px)',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(302.03deg, rgba(11, 41, 214, 0.8) -8.3%,rgba(11, 41, 214, 0.8) 7.84%, rgba(239, 35, 42, 0.8) 92.71%, rgba(239, 35, 42, 0.8) 100%)`,
    zIndex: 1
  }
}));

const ImagesViewport = styled(Box)(({ theme }) => ({
  position: 'relative',
  bottom: '-35px',
  left: 0,
  right: 0,
  width: '100%',
  overflow: 'visible',
  zIndex: 3,
  minHeight: '400px',
  paddingTop: theme.spacing(4)
}));

const NavBar = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '254px',
  boxShadow: '0px 4px 9.7px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(1, 3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: theme.spacing(3, 0),
  zIndex: 2,
  position: 'relative'
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  minHeight: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)'
  }
}));

const CTAForm = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '50px',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  maxWidth: '500px',
  margin: '0 auto',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
}));

const ScanButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: 'white',
  borderRadius: '25px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.secondary.dark,
    transform: 'scale(1.05)'
  }
}));

const DashboardImage = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto 40px auto',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(100px) scale(0.8)',
  transition: 'opacity 1.2s ease-out, transform 1.2s ease-out, visibility 0s linear 1.2s',
  willChange: 'transform, opacity',
  zIndex: 1,
  '&.animate': {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0) scale(1)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out, visibility 0s'
  },
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block'
  }
}));

const HeroSection = () => {
  const navigate = useNavigate();
  const [visibleImages, setVisibleImages] = useState([]);
  const imageRefs = useRef([]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          } else {
            // Remove when out of view so it can re-animate when re-entering
            setVisibleImages((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      {
        root: null,
        threshold: 0.05,
        // Slight negative margin so they don't trigger too early, but still reliably fire
        rootMargin: '0px 0px -10% 0px'
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <HeroContainer>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: 3, pb: 8 }}>
        {/* Navigation */}
        <NavBar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/images/logo1.png" 
              alt="Visibeen" 
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>
          <Button 
            variant="text" 
            onClick={handleLoginClick}
            sx={{ 
              color: 'white', 
              fontWeight: 600,
              width: '100px',
              textTransform: 'none',
              background: 'linear-gradient(302.03deg, rgba(11, 41, 214, 0.8) -8.3%,rgba(11, 41, 214, 0.8) 7.84%, rgba(239, 35, 42, 0.8) 92.71%, rgba(239, 35, 42, 0.8) 100%)' 
            }}
          >
            Login
          </Button>
        </NavBar>

        {/* Hero Content */}
        <Stack spacing={6} alignItems="center" sx={{ mt: 8, mb: 6 }}>
          {/* Announcement Badge */}
          <Box
            sx={{
              background: 'rgba(11, 145, 214, 0.9)',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 500,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            Stop outsourcing your growth – Visibeen makes you the expert
          </Box>

          {/* Main Headline */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white',
                maxWidth: '1500px',
                mb: 2,
                textShadow: '0 4px 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              From Insights To Execution
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AiGenerateIcon width={54} height={49} color="#0b91d6" />
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white',
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.7)'
                }}
              >
                Makes It Simple
              </Typography>
            </Stack>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 500,
                mt: 3,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
              }}
            >
              Every Click Matters – Get More Calls, Visits & Sales
            </Typography>
          </Stack>

          {/* Feature Cards */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3} 
            sx={{ 
              width: '100%',
              maxWidth: '800px',
              mt: 4
            }}
          >
            <FeatureCard sx={{ flex: 1 }}>
              <img 
                src="/images/uu.svg" 
                alt="Feature 1"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </FeatureCard>
            
            <FeatureCard sx={{ flex: 1 }}>
              <img 
                src="/images/kk.svg" 
                alt="Feature 2"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </FeatureCard>
            
            <FeatureCard sx={{ flex: 1 }}>
              <img 
                src="/images/ll.svg" 
                alt="Feature 3"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </FeatureCard>
            
            <FeatureCard sx={{ flex: 1 }}>
              <img 
                src="/images/mm.svg" 
                alt="Feature 4"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </FeatureCard>
          </Stack>

          {/* Description */}
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              textAlign: 'center',
              maxWidth: '1200px',
              fontSize: '18px',
              lineHeight: '29px',
              mt: 4,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }}
          >
            Visibeen is India's first DIY Local SEO platform that shows your Google visibility score, benchmarks you against competitors, and gives you simple AI tasks to improve rankings and sales.
          </Typography>

          {/* CTA Section */}
          <Stack spacing={2} alignItems="center" sx={{ mt: 6 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white',
                fontWeight: 400,
                fontSize: '14px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
              }}
            >
              Get Your Free Visibeen Score
            </Typography>
            <CTAForm>
              <TextField
                placeholder="Search your business name"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: '#a0a0aa',
                    fontSize: '12px',
                    fontWeight: 300,
                    pl: 2
                  }
                }}
                sx={{ flex: 1 }}
              />
              <ScanButton>
                Scan Now
              </ScanButton>
            </CTAForm>
          </Stack>

        </Stack>
      </Container>
      
      {/* Dashboard Images Section - Positioned at hero section end */}
      <ImagesViewport>
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            sx={{ width: '100%' }}
          >
              {[
                { src: '/images/dashboard1.png', alt: 'Performance Dashboard' },
                { src: '/images/dashboard2.png', alt: 'Business Profile' },
                { src: '/images/dashboard3.png', alt: 'Heat Map Analytics' }
              ].map((image, index) => (
                <DashboardImage
                  key={index}
                  ref={(el) => (imageRefs.current[index] = el)}
                  data-index={index}
                  className={visibleImages.includes(index) ? 'animate' : ''}
                  sx={{ 
                    transitionDelay: `${index * 0.2}s`,
                    flex: 1,
                    maxWidth: { xs: '100%', md: '33.33%' }
                  }}
                >
                  <img src={image.src} alt={image.alt} />
                </DashboardImage>
              ))}
          </Stack>
        </Container>
      </ImagesViewport>
    </HeroContainer>
  );
};

export default HeroSection;