import React from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Template1 from '../Template1/Template1';
import { mockRootProps } from '../Template1/Template1MockData';
import Template2 from '../Template2/Template2';
import { mockRootProps as template2MockData } from '../Template2/Template2MockData';
import Template3 from '../Template3/Template3';
import { mockRootProps as template3MockData } from '../Template3/Template3MockData';
import Template4 from '../Template4/Template4';
import { mockRootProps as template4MockData } from '../Template4/Template4MockData';
import Template5 from '../Template5/Template5';
import { mockRootProps as template5MockData } from '../Template5/Template5MockData';
import Template6 from '../Template6/Template6';
import { mockRootProps as template6MockData } from '../Template6/Template6MockData';

const PreviewOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // Remove dim/shadow effect
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '40px'
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '0px',
  width: '95vw',
  height: '95vh',
  overflow: 'auto',
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
}));

const PreviewHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px'
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: '#EF232A',
  color: '#ffffff',
  borderRadius: '8px',
  width: 36,
  height: 36,
  '&:hover': {
    backgroundColor: '#DC2626'
  }
}));

const PreviewImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  height: 'auto',
  borderRadius: '8px',
  // Remove borders/shadows for a clean look
  border: 'none'
}));

const PreviewActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '16px',
  marginTop: '24px',
  justifyContent: 'center'
}));



const TemplatePreview = ({ template, onClose, onUseTemplate, onViewLive }) => {
  if (!template) return null;

  const renderTemplateContent = () => {
    // Show actual Template1 component for template ID 1
    if (template.id === 1) {
      return <Template1 templateData={mockRootProps} />;
    }
    
    // Show actual Template2 component for template ID 2
    if (template.id === 2) {
      return <Template2 templateData={template2MockData} />;
    }
    
    // Show actual Template3 component for template ID 3
    if (template.id === 3) {
      return <Template3 templateData={template3MockData} />;
    }
    
    // Show actual Template4 component for template ID 4
    if (template.id === 4) {
      return <Template4 templateData={template4MockData} />;
    }
    
    // Show actual Template5 component for template ID 5
    if (template.id === 5) {
      return <Template5 templateData={template5MockData} />;
    }
    
    // Show actual Template6 component for template ID 6
    if (template.id === 6) {
      return <Template6 templateData={template6MockData} />;
    }
    
    // For other templates, show the image preview
    return (
      <PreviewImage 
        src={template.image} 
        alt={`Preview of ${template.name}`}
      />
    );
  };

  return (
    <PreviewOverlay onClick={onClose}>
      <PreviewContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton aria-label="Close preview" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
        
        {renderTemplateContent()}
        

      </PreviewContainer>
    </PreviewOverlay>
  );
};

export default TemplatePreview;