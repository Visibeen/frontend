import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from './Layouts/DashboardLayout';
import LogoUploadSection from './MyAccount/LogoUploadSection';
import FormFieldWithEdit from './MyAccount/FormFieldWithEdit';
import DatePickerField from './MyAccount/DatePickerField';
import DropdownField from './MyAccount/DropdownField';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1015px',
  margin: '0 auto'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '6px',
  fontFamily: 'Inter, sans-serif'
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302e',
  marginBottom: '40px',
  fontFamily: 'Inter, sans-serif'
}));

const FormCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '740px',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  padding: '24px'
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '0px'
}));

const DateRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  marginBottom: '24px'
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '32px'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#EF232A',
  border: 'none',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '12px 24px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(239, 35, 42, 0.04)'
  }
}));

const UpdateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  padding: '12px 25px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

export default function MyAccountPage() {
  const [formData, setFormData] = useState({
    businessName: 'Medical shop',
    industryType: 'Dental clinic',
    startDate: '02-01-2025',
    endDate: '02-01-2025',
    email: 'xyz@gmail.com',
    address: 'Office Floor, Bestech, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066',
    website: 'www.visibeen.com'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleUpdate = () => {
    console.log('Update clicked', formData);
  };

  const handleLogoClick = () => {
    console.log('Logo upload clicked');
  };

  const handleEdit = (field) => {
    console.log('Edit clicked for:', field);
  };

  const handleCalendarClick = (field) => {
    console.log('Calendar clicked for:', field);
  };

  const handleDropdownClick = (field) => {
    console.log('Dropdown clicked for:', field);
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <SectionTitle>Account Information</SectionTitle>
        <SectionDescription>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </SectionDescription>

        <LogoUploadSection onLogoClick={handleLogoClick} />

        <FormCard>
          <FormContainer>
            <FormFieldWithEdit
              label="Business Name*"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter business name"
              onEdit={() => handleEdit('businessName')}
            />

            <DropdownField
              label="Industry Type*"
              value={formData.industryType}
              onChange={(e) => handleInputChange('industryType', e.target.value)}
              placeholder="Select industry type"
              onEdit={() => handleEdit('industryType')}
              onClick={() => handleDropdownClick('industryType')}
            />

            <DateRow>
              <DatePickerField
                label="Start Date*"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                placeholder="Select start date"
                onCalendarClick={() => handleCalendarClick('startDate')}
              />
              <DatePickerField
                label="End Date*"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                placeholder="Select end date"
                onCalendarClick={() => handleCalendarClick('endDate')}
              />
            </DateRow>

            <FormFieldWithEdit
              label="Email Id*"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              onEdit={() => handleEdit('email')}
            />

            <FormFieldWithEdit
              label="Address *"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter address"
              multiline={true}
              rows={2}
              onEdit={() => handleEdit('address')}
            />

            <FormFieldWithEdit
              label="Website*"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="Enter website URL"
              onEdit={() => handleEdit('website')}
            />

            <ActionButtons>
              <CancelButton onClick={handleCancel}>
                Cancel
              </CancelButton>
              <UpdateButton onClick={handleUpdate}>
                Update
              </UpdateButton>
            </ActionButtons>
          </FormContainer>
        </FormCard>
      </PageContainer>
    </DashboardLayout>
  );
}
