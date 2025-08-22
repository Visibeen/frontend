import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import UserProfileCard from './components/UserProfileCard';
import CreatePostForm from './components/CreatePostForm';
import { mockRootProps } from './CreatePostMockData';

const PageContainer = styled(Stack)(({ theme }) => ({
  gap: '40px',
  width: '100%'
}));

const PageHeader = styled(Stack)(({ theme }) => ({
  gap: '16px'
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

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start',
  maxWidth: '1015px',
  width: '100%'
}));

const CreatePostPage = ({ user, initialFormData }) => {
  const userData = user || mockRootProps.user;
  const formData = initialFormData || mockRootProps.formData;

  const handleCancel = () => {
    console.log('Cancel clicked');
    // Handle cancel action
  };

  const handleNext = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Create Post</PageTitle>
          <PageSubtitle>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </PageSubtitle>
        </PageHeader>

        <FormCard>
          <UserProfileCard user={userData} />
          <CreatePostForm
            initialData={formData}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        </FormCard>
      </PageContainer>
    </DashboardLayout>
  );
};

export default CreatePostPage;