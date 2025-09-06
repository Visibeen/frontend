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

const PreviewOverlay = styled(Box)(({ theme, fullscreen }) => ({
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
  padding: fullscreen ? '0px' : '40px'
}));

const PreviewContainer = styled(Box)(({ theme, fullscreen }) => ({
  backgroundColor: '#ffffff',
  borderRadius: fullscreen ? '0px' : '12px',
  padding: '0px',
  width: fullscreen ? '100vw' : '95vw',
  height: fullscreen ? '100vh' : '95vh',
  overflow: 'auto',
  position: 'relative',
  boxShadow: fullscreen ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.1)'
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
  position: 'fixed',
  bottom: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  justifyContent: 'center',
  zIndex: 1001
}));

const ActionButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: color || '#4285F4',
  color: '#ffffff',
  borderRadius: '8px',
  padding: '8px 16px',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: color ? `${color}DD` : '#3367D6',
  }
}));



const TemplatePreview = ({ template, onClose, onUseTemplate, onViewLive, onChangeTemplate, fullscreen = false }) => {
  if (!template) return null;

  const renderTemplateContent = () => {
    // Use real GMB data if available, otherwise use mock data
    const templateData1 = template.realData || mockRootProps;
    const templateData2 = template.realData || template2MockData;
    const templateData3 = template.realData || template3MockData;
    const templateData4 = template.realData || template4MockData;
    const templateData5 = template.realData || template5MockData;
    const templateData6 = template.realData || template6MockData;

    // Show actual Template1 component for template ID 1
    if (template.id === 1) {
      return <Template1 templateData={templateData1} />;
    }
    
    // Show actual Template2 component for template ID 2
    if (template.id === 2) {
      return <Template2 templateData={templateData2} />;
    }
    
    // Show actual Template3 component for template ID 3
    if (template.id === 3) {
      return <Template3 templateData={templateData3} />;
    }
    
    // Show actual Template4 component for template ID 4
    if (template.id === 4) {
      return <Template4 templateData={templateData4} />;
    }
    
    // Show actual Template5 component for template ID 5
    if (template.id === 5) {
      return <Template5 templateData={templateData5} />;
    }
    
    // Show actual Template6 component for template ID 6
    if (template.id === 6) {
      return <Template6 templateData={templateData6} />;
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
    <PreviewOverlay onClick={onClose} fullscreen={fullscreen}>
      <PreviewContainer onClick={(e) => e.stopPropagation()} fullscreen={fullscreen}>
        <CloseButton aria-label="Close preview" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
        
        {renderTemplateContent()}
        
        <PreviewActions>
          <ActionButton 
            onClick={() => onUseTemplate(template)}
            color="#4CAF50"
          >
            Use Template
          </ActionButton>   
          {onChangeTemplate && (
            <ActionButton 
              onClick={onChangeTemplate}
              color="#FF9800"
            >
              Change Template
            </ActionButton>
          )}
        </PreviewActions>
      </PreviewContainer>
    </PreviewOverlay>
  );
};

export default TemplatePreview;