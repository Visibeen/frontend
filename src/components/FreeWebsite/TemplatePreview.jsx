import React from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

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
  padding: '24px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  position: 'relative',
  // Ensure there is no box shadow
  boxShadow: 'none'
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

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  minWidth: '120px'
}));

const UseTemplateButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const ViewLiveButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#EF232A',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#DC2626'
  }
}));

const TemplatePreview = ({ template, onClose, onUseTemplate, onViewLive }) => {
  if (!template) return null;

  return (
    <PreviewOverlay onClick={onClose}>
      <PreviewContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton aria-label="Close preview" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
        <PreviewHeader>
          <PreviewTitle>Preview: {template.name}</PreviewTitle>
        </PreviewHeader>
        
        <PreviewImage 
          src={template.image} 
          alt={`Preview of ${template.name}`}
        />
        
        <PreviewActions>
          <UseTemplateButton onClick={() => onUseTemplate(template)}>
            Use This Template
          </UseTemplateButton>
          <ViewLiveButton onClick={() => onViewLive(template)}>
            View Live Demo
          </ViewLiveButton>
        </PreviewActions>
      </PreviewContainer>
    </PreviewOverlay>
  );
};

export default TemplatePreview;