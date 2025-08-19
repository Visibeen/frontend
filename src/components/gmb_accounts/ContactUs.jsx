import React, { useState } from 'react';
import { 
  Box, 
  Stack, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import PageHeader from '../Dashboard/components/PageHeader';
import CalendarIcon from '../icons/CalendarIcon';
import SendArrowIcon from '../icons/SendArrowIcon';

// Styled Components

const FormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '40px',
  maxWidth: '540px',
  width: '100%',
  margin: '0 auto',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'
}));

const FormStack = styled(Stack)(({ theme }) => ({
  gap: '24px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  marginBottom: '8px'
}));

const RequiredLabel = styled(FieldLabel)(({ theme }) => ({
  color: '#EF232A'
}));

const OptionalLabel = styled(FieldLabel)(({ theme }) => ({
  color: '#121927'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: '#A0A0AA',
      borderWidth: '0.2px'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6',
      borderWidth: '1px'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#A0A0AA',
    borderWidth: '0.2px'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0B91D6'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0B91D6',
    borderWidth: '1px'
  },
  '& .MuiSelect-select': {
    color: '#A0A0AA'
  }
}));

const TimePickerContainer = styled(Box)(({ theme }) => ({
  position: 'relative'
}));

const TimePickerField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: '#A0A0AA',
      borderWidth: '0.2px'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6',
      borderWidth: '1px'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#A0A0AA',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
}));

const CalendarIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  zIndex: 1
}));

const MessageField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: '#A0A0AA',
      borderWidth: '0.2px'
    },
    '&:hover fieldset': {
      borderColor: '#0B91D6'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0B91D6',
      borderWidth: '1px'
    },
    '& textarea': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#121927',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'capitalize',
  borderRadius: '8px',
  padding: '12px 24px',
  minHeight: '48px',
  '&:hover': {
    backgroundColor: '#0277BD'
  }
}));

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessCategory: '',
    email: '',
    contactNumber: '',
    callTime: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Contact Us" 
        subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development." 
      />
      
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormStack>
              {/* Name Field */}
              <Box>
                <RequiredLabel>Name*</RequiredLabel>
                <StyledTextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  variant="outlined"
                  required
                />
              </Box>

              {/* Business Name Field */}
              <Box>
                <RequiredLabel>Business Name*</RequiredLabel>
                <StyledTextField
                  fullWidth
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  variant="outlined"
                  required
                />
              </Box>

              {/* Business Category Field */}
              <Box>
                <RequiredLabel>Business Category*</RequiredLabel>
                <FormControl fullWidth>
                  <StyledSelect
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      <Typography sx={{ color: '#A0A0AA', fontSize: '14px' }}>
                        Select category
                      </Typography>
                    </MenuItem>
                    <MenuItem value="restaurant">Restaurant</MenuItem>
                    <MenuItem value="retail">Retail</MenuItem>
                    <MenuItem value="services">Services</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Box>

              {/* Email Field */}
              <Box>
                <OptionalLabel>Email Id*</OptionalLabel>
                <StyledTextField
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email id"
                  variant="outlined"
                  required
                />
              </Box>

              {/* Contact Number Field */}
              <Box>
                <OptionalLabel>Contact Number*</OptionalLabel>
                <StyledTextField
                  fullWidth
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  variant="outlined"
                  required
                />
              </Box>

              {/* Call Time Field */}
              <Box>
                <OptionalLabel>Choose when to call*</OptionalLabel>
                <TimePickerContainer>
                  <TimePickerField
                    fullWidth
                    name="callTime"
                    value={formData.callTime}
                    onChange={handleInputChange}
                    placeholder="Select Time"
                    variant="outlined"
                    required
                  />
                  <CalendarIconContainer>
                    <CalendarIcon width={17} height={19} color="#A0A0AA" />
                  </CalendarIconContainer>
                </TimePickerContainer>
              </Box>

              {/* Message Field */}
              <Box>
                <OptionalLabel>Message*</OptionalLabel>
                <MessageField
                  fullWidth
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Box>

              {/* Submit Button */}
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
              >
                Send Message
              </SubmitButton>
            </FormStack>
          </form>
        </FormContainer>
      </Container>
    </DashboardLayout>
  );
};

export default ContactUs;