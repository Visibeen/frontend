import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import WelcomeSection from './WelcomeSection';
import DesignCard from './DesignCard';

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 0'
}));

const SelectDesignSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '40px',
  maxWidth: '900px',
  width: '100%'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '6px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927'
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  maxWidth: '600px'
}));

const DesignGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '25px',
  width: '100%',
  maxWidth: '900px'
}));

const designs = [
  {
    id: 1,
    image: '/images/design-grid-background.svg',
    label: 'Design 1'
  },
  {
    id: 2,
    image: '/images/design-grid-background.svg',
    label: 'Design 2'
  },
  {
    id: 3,
    image: '/images/design-grid-background.svg',
    label: 'Design 3'
  },
  {
    id: 4,
    image: '/images/design-4-template.png',
    label: 'Design 4'
  },
  {
    id: 5,
    image: '/images/design-5-template.png',
    label: 'Design 5'
  },
  {
    id: 6,
    image: '/images/design-6-template.png',
    label: 'Design 6'
  }
];

const SelectDesign = ({ userInfo }) => {
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleDesignSelect = (designId) => {
    setSelectedDesign(designId);
    // Navigate to next step or handle selection
    console.log('Selected design:', designId);
  };

  return (
    <DashboardLayout>
      <MainContent>
        <WelcomeSection userInfo={userInfo} />
        
        <SelectDesignSection>
          <SectionHeader>
            <SectionTitle>Select Design</SectionTitle>
            <SectionDescription>
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
            </SectionDescription>
          </SectionHeader>
          
          <DesignGrid>
            {designs.map((design) => (
              <DesignCard
                key={design.id}
                image={design.image}
                label={design.label}
                onClick={() => handleDesignSelect(design.id)}
              />
            ))}
          </DesignGrid>
        </SelectDesignSection>
      </MainContent>
    </DashboardLayout>
  );
};

export default SelectDesign;