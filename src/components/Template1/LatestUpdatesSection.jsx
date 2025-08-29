import React, { useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import UpdateCard from './UpdateCard';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import RightArrowIcon from '../icons/RightArrowIcon';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  backgroundColor: '#ffffff',
  position: 'relative'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: 400,
  letterSpacing: '1px',
  lineHeight: '33px',
  textTransform: 'uppercase',
  color: '#333333'
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '1200px',
  margin: '0 auto',
  overflow: 'hidden'
}));

const CarouselContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  transition: 'transform 0.3s ease',
  justifyContent: 'center',
  alignItems: 'flex-start'
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '50px',
  height: '50px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const LeftButton = styled(NavigationButton)(({ theme }) => ({
  left: '20px'
}));

const RightButton = styled(NavigationButton)(({ theme }) => ({
  right: '20px'
}));

const LatestUpdatesSection = ({ latestUpdates = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : latestUpdates.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < latestUpdates.length - 1 ? prev + 1 : 0));
  };

  // Define widths for different update cards based on the design
  const getUpdateWidth = (index) => {
    switch (index) {
      case 0: return '220px';
      case 1: return '395px';
      case 2: return '395px';
      case 3: return '219px';
      default: return '220px';
    }
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Our Latest updates</SectionTitle>
      </SectionHeader>
      
      <CarouselContainer>
        <LeftButton onClick={handlePrevious}>
          <LeftArrowIcon width={50} height={50} />
        </LeftButton>
        
        <CarouselContent>
          {latestUpdates.map((update, index) => (
            <UpdateCard
              key={update.id}
              update={update}
              width={getUpdateWidth(index)}
            />
          ))}
        </CarouselContent>
        
        <RightButton onClick={handleNext}>
          <RightArrowIcon width={50} height={50} />
        </RightButton>
      </CarouselContainer>
    </SectionContainer>
  );
};

export default LatestUpdatesSection;