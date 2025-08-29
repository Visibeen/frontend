import React, { useState } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuoteIcon from './icons/QuoteIcon';

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
  gap: '15px',
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
  width: '33px',
  height: '4px',
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

const TestimonialContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '40px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '30px'
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

const CustomerImage = styled(Box)(({ theme }) => ({
  width: '331px',
  height: '444px',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: '250px',
    height: '300px'
  }
}));

const TestimonialContent = styled(Stack)(({ theme }) => ({
  gap: '16px',
  maxWidth: '577px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center'
  }
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  letterSpacing: '-0.36px',
  lineHeight: '28px',
  color: theme.palette.secondary.main
}));

const CustomerName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  letterSpacing: '-0.56px',
  lineHeight: '34px',
  color: theme.palette.primary.main
}));

const TestimonialsSection = ({ testimonials }) => {
  const { sectionLabel, title, testimonialList } = testimonials || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : (testimonialList?.length || 1) - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < (testimonialList?.length || 1) - 1 ? prev + 1 : 0));
  };

  const currentTestimonial = testimonialList?.[currentIndex] || testimonialList?.[0];

  return (
    <SectionContainer>
      <HeaderContainer>
        <SubTitleContainer>
          <SubTitle>{sectionLabel || 'Customer Review'}</SubTitle>
          <Divider />
        </SubTitleContainer>
        
        <MainTitle>
          {title || 'Our Partner & Customer Was Give The Best Review For Us'}
        </MainTitle>
      </HeaderContainer>

      <TestimonialContainer>
        <NavigationButton onClick={handlePrevious}>
          <ArrowBackIosIcon />
        </NavigationButton>

        <CustomerImage
          sx={{
            backgroundImage: `url(${currentTestimonial?.avatar || '/images/template6-customer.jpg'})`
          }}
        />

        <TestimonialContent>
          <QuoteIcon width={70} height={60} color="#0B91D6" />
          
          <Stack gap="16px">
            <TestimonialText>
              {currentTestimonial?.review || 'Lorem ipsum dolor sit amet consectetur. Eget non auctor laoreet mauris id proin tincidunt tristique nam. Amet luctus vel tincidunt vulputate et purus feugiat. Risus nunc semper ornare natoque egestas lectus ultricies leo vulputate. Mattis purus ultricies dolor eleifend neque tellus. Ut mattis sit gravida ornare duis eget. Amet volutpat interdum elementum magna euismod nullam et et tellus.'}
            </TestimonialText>
            
            <CustomerName>
              {currentTestimonial?.name || 'Alex - Home Owner'}
            </CustomerName>
          </Stack>
        </TestimonialContent>

        <NavigationButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </NavigationButton>
      </TestimonialContainer>
    </SectionContainer>
  );
};

export default TestimonialsSection;