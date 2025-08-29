import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import TemplateGrid from './TemplateGrid';
import TemplatePreview from './TemplatePreview';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '40px'
}));

const PageHeader = styled(Stack)(({ theme }) => ({
  gap: '16px',
  marginLeft: '-550px',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const SectionContainer = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  gap: '6px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const FreeWebsite = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'Template 1 folder',
      image: '/images/template1.png',
      category: 'Real Estate'
    },
    {
      id: 2,
      name: 'Template 2',
      image: '/images/template2.png',
      category: 'Business Services'
    },
    {
      id: 3,
      name: 'Template 3',
      image: '/images/template3.png',
      category: 'Office Space'
    },
    {
      id: 4,
      name: 'Template 4',
      image: '/images/template4.png',
      category: 'Web Development'
    },
    {
      id: 5,
      name: 'Template 5',
      image: '/images/template5.png',
      category: 'Digital Marketing'
    },
    {
      id: 6,
      name: 'Template 6',
      image: '/images/template6.png',
      category: 'Car Repair'
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(selectedTemplate?.id === template.id ? null : template);
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template) => {
    // Handle template selection for website creation
    console.log('Using template:', template);
    // Navigate to website builder or show success message
  };

  const handleViewLive = (template) => {
    setPreviewTemplate(null);
    // Open live demo in new tab
    window.open(`/live-demo/${template.id}`, '_blank');
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Free Website</PageTitle>
          <PageSubtitle>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </PageSubtitle>
        </PageHeader>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Select Templates</SectionTitle>
            <SectionSubtitle>
              Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
            </SectionSubtitle>
          </SectionHeader>

          <TemplateGrid
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onPreview={handlePreview}
            onUseTemplate={handleUseTemplate}
          />
        </SectionContainer>
      </PageContainer>

      <TemplatePreview
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
        onViewLive={handleViewLive}
      />
    </DashboardLayout>
  );
};

export default FreeWebsite;