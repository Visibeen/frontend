import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import TemplatePreviewGrid from './components/TemplatePreviewGrid';
import GeneratedPostPreview from './components/GeneratedPostPreview';
import ActionButtons from './components/ActionButtons';
import SharingOptions from './components/SharingOptions';
import { mockRootProps } from './PostGenerationResultsMockData';

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Stack)(({ theme }) => ({
  gap: '16px',
  marginBottom: '40px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const PageDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '20px'
}));

const MainContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '24px'
}));

const PreviewAndSharingContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  alignItems: 'flex-start',
  justifyContent: 'center'
}));

const PostGenerationResults = ({ templatePreviews, generatedPost, sharingOptions }) => {
  const templates = templatePreviews || mockRootProps.templatePreviews;
  const postData = generatedPost || mockRootProps.generatedPost;
  const shareOptions = sharingOptions || mockRootProps.sharingOptions;
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templates.find(template => template.selected)?.id || templates[0]?.id
  );
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  
  // Get the selected template data to pass styling
  const selectedTemplate = templates.find(template => template.id === selectedTemplateId);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    console.log('Template selected:', templateId);
  };

  const handleDownload = () => {
    console.log('Downloading generated post...');
    // Implement download logic here
  };

  const handleShare = () => {
    console.log('Opening share options...');
    setShowSharingOptions(!showSharingOptions);
  };

  const handleSocialShare = (platform) => {
    console.log('Sharing to platform:', platform);
    // Implement platform-specific sharing logic here
  };

  return (
    <DashboardLayout>
      <ContentContainer>
        <PageHeader>
          <PageTitle>Create Post</PageTitle>
          <PageDescription>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </PageDescription>
        </PageHeader>

        <MainContent>
          <TemplatePreviewGrid
            templates={templates}
            selectedTemplateId={selectedTemplateId}
            onTemplateSelect={handleTemplateSelect}
          />

          <PreviewAndSharingContainer>
            <GeneratedPostPreview 
              generatedPost={postData} 
              selectedTemplate={selectedTemplate}
            />
          </PreviewAndSharingContainer>

          <ActionButtons
            onDownload={handleDownload}
            onShare={handleShare}
            showSharingOptions={showSharingOptions}
            sharingOptions={shareOptions}
            onSocialShare={handleSocialShare}
          />
        </MainContent>
      </ContentContainer>
    </DashboardLayout>
  );
};

export default PostGenerationResults;