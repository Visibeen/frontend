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
  const [showTemplateGrid, setShowTemplateGrid] = useState(true);

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
    setShowTemplateGrid(false);
  };

  const handleUseTemplate = async (template) => {
    try {
      console.log('Using template with GMB data:', template);
      
      // Show loading state
      setSelectedTemplate({ ...template, loading: true });
      
      // Import the GMB Website Service
      const { default: GMBWebsiteService } = await import('../../services/GMBWebsiteService');
      
      // Create website with real GMB data
      const result = await GMBWebsiteService.createWebsiteWithGMBData(template.id);
      
      if (result.success) {
        console.log('Successfully created website with GMB data:', result);
        
        // Store the real template data for preview
        const updatedTemplate = {
          ...template,
          realData: result.templateData,
          gmbData: result.gmbData,
          loading: false
        };
        
        // Update preview with real data
        setPreviewTemplate(updatedTemplate);
        
        // Hide template grid and show preview
        setShowTemplateGrid(false);
        
        // Show success message
        alert('Website created successfully with your Google My Business data!');
      } else {
        console.warn('Failed to create website with GMB data:', result.error);
        
        // Fallback to mock data with warning
        alert(`Could not fetch your GMB data: ${result.error}\n\nShowing template with sample data instead.`);
        setPreviewTemplate(template);
        
        // Hide template grid and show preview
        setShowTemplateGrid(false);
      }
      
    } catch (error) {
      console.error('Error using template:', error);
      
      // Fallback to mock data
      alert(`Error creating website: ${error.message}\n\nShowing template with sample data instead.`);
      setPreviewTemplate(template);
      
      // Hide template grid and show preview
      setShowTemplateGrid(false);
    } finally {
      setSelectedTemplate(null);
    }
  };

  const handleViewLive = (template) => {
    setPreviewTemplate(null);
    // Open live demo in new tab
    window.open(`/live-demo/${template.id}`, '_blank');
  };

  const handleChangeTemplate = () => {
    setShowTemplateGrid(true);
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

        {showTemplateGrid ? (
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
        ) : null}
      </PageContainer>

      <TemplatePreview
        template={previewTemplate}
        onClose={() => {
          setPreviewTemplate(null);
          setShowTemplateGrid(true);
        }}
        onUseTemplate={handleUseTemplate}
        onViewLive={handleViewLive}
        onChangeTemplate={handleChangeTemplate}
        fullscreen={!showTemplateGrid}
      />
    </DashboardLayout>
  );
};

export default FreeWebsite;