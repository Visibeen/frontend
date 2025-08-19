import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import WelcomeHeader from './components/WelcomeHeader';
import FormField from './components/FormField';
import ActionButtons from './components/ActionButtons';

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1015px',
  margin: '0 auto'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '26px',
  fontWeight: 600,
  color: '#121927',
  marginTop: '24px',
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
  padding: '18px 18px 22px 18px'
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const GetEDMs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'John wick',
    businessName: 'Medical shop',
    address: 'Office Floor, Bestech, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066',
    email: 'xyz@gmail.com',
    contactNumber: '6858653555',
    altContactNumber: '6858653555',
    website: 'www.visibeen.com',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/save-client-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Save success:', data);
      navigate('/upload-logo');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel clicked');
  };

  const formFields = [
    { label: 'Name', name: 'name', placeholder: 'Enter name', required: true },
    { label: 'Business Name', name: 'businessName', placeholder: 'Enter business name', required: true },
    { label: 'Address', name: 'address', placeholder: 'Enter address', required: true },
    { label: 'Email Id', name: 'email', placeholder: 'Enter email id', required: true },
    { label: 'Contact Number', name: 'contactNumber', placeholder: 'Enter contact number', required: true },
    { label: 'Alternative Contact Number', name: 'altContactNumber', placeholder: 'Enter alternative contact number', required: true },
    { label: 'Website', name: 'website', placeholder: 'Enter website', required: true },
  ];

  return (
    <DashboardLayout>
      <ContentContainer>
        <WelcomeHeader />
        
        <SectionTitle>Account Information</SectionTitle>
        <SectionDescription>
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </SectionDescription>

        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              {formFields.map((field, idx) => (
                <FormField
                  key={idx}
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ))}

              <ActionButtons
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                submitText="Save & Next"
              />
            </FormContainer>
          </form>
        </FormCard>
      </ContentContainer>
    </DashboardLayout>
  );
};

export default GetEDMs;