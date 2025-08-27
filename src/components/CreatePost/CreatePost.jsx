import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import UserProfileDisplay from './components/UserProfileDisplay';
import TestimonialForm from './components/TestimonialForm';
import FormActions from './components/FormActions';

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1015px',
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

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px'
}));

const FormContent = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '540px',
  gap: '40px'
}));

const CreatePost = ({ userProfile, formData: initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  const handleCancel = () => {
    console.log('CreatePost: Cancel clicked');
    // Handle cancel logic here - save form data, etc.
  };

  const handleNext = () => {
    console.log('CreatePost: Next clicked', formData);
    // Handle next logic here - validate form, save data, etc.
    // Navigation will be handled by FormActions component
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

        <FormContainer>
          <UserProfileDisplay userProfile={userProfile} />
          
          <FormContent 
            component="form" 
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              console.log('Form submission prevented');
            }}
          >
            <TestimonialForm 
              formData={formData} 
              onFormChange={handleFormChange}
            />
            
            <FormActions 
              onCancel={handleCancel}
              onNext={handleNext}
            />
          </FormContent>
        </FormContainer>
      </ContentContainer>
    </DashboardLayout>
  );
};

export default CreatePost;