import React, { useState } from 'react';
import axios from 'axios';
import { getSession, getAutoToken } from '../../utils/authUtils';
import GMBWebsiteService from '../../services/GMBWebsiteService';
import GMBService from '../../services/GMBService';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import PageHeader from '../Dashboard/components/PageHeader';

// Styled Components (same as before)
const FormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '40px',
  maxWidth: '540px',
  width: '100%',
  margin: '0 auto',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'
}));

const FormStack = styled(Stack)(({ theme }) => ({ gap: '24px' }));
const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  marginBottom: '8px'
}));
const RequiredLabel = styled(FieldLabel)(({ theme }) => ({ color: '#1a1717ff' }));
const OptionalLabel = styled(FieldLabel)(({ theme }) => ({ color: '#121927' }));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: '#0b0b0cff',
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
    borderColor: '#111111ff',
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
    color: '#0b0b0cff'
  }
}));

const TimePickerContainer = styled(Box)(({ theme }) => ({ position: 'relative' }));
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
      color: '#060607ff',
      '&::placeholder': {
        color: '#A0A0AA',
        opacity: 1
      }
    }
  }
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
    business_category: '',
    business_name: '',
    complaint_type: '',
    email: '',
    phone_number: '',
    date_and_time: '',
    message: '',
  });

  // Local UI state for ticket types
  const [ticketTypes] = useState(['Service', 'Billing', 'Technical', 'Other']);
  const [complaint_type, setTicketType] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchAccount = async () => {
    try {
      // If user selected a specific location, use it directly
      if (selectedLocation) {
        const locObj = locations.find(l => l.name === selectedLocation || l.title === selectedLocation || (l.name || l.title) === selectedLocation);
        if (locObj) {
          setFormData(prev => ({
            ...prev,
            business_name: locObj.title || locObj.name || prev.business_name,
            phone_number: (locObj.phoneNumbers && locObj.phoneNumbers.primaryPhone) || locObj.primaryPhone || prev.phone_number
          }));
        }
        // set name from primary account if available
        const accountObj = accounts && accounts.length ? accounts[0] : null;
        if (accountObj && accountObj.accountName) {
          setFormData(prev => ({ ...prev, name: accountObj.accountName }));
        }
        return;
      }

      // No specific location selected: fallback to primary account's first location
      const accountObj = accounts && accounts.length ? accounts[0] : null;
      if (accountObj && accountObj.accountName) {
        setFormData(prev => ({ ...prev, name: accountObj.accountName }));
      }

      const autoToken = getAutoToken();
      if (autoToken && accountObj?.name) {
        try {
        const locs = await GMBService.getLocations(autoToken, accountObj.name);
          const primaryLocation = Array.isArray(locs) && locs.length ? locs[0] : null;
          if (primaryLocation) {
            setFormData(prev => ({
              ...prev,
              business_name: primaryLocation.title || primaryLocation.name || prev.business_name,
              phone_number: (primaryLocation.phoneNumbers && primaryLocation.phoneNumbers.primaryPhone) || primaryLocation.primaryPhone || prev.phone_number
            }));
          }
        } catch (err) {
          console.debug('[ContactUs] error fetching primary location on switch', err);
        }
      } else {
        const session = getSession() || {};
        const sessPrimary = session?.gmbPrimaryLocation;
        if (sessPrimary) {
          setFormData(prev => ({
            ...prev,
            business_name: sessPrimary.title || sessPrimary.name || prev.business_name,
            phone_number: (sessPrimary.phoneNumbers && sessPrimary.phoneNumbers.primaryPhone) || sessPrimary.primaryPhone || prev.phone_number
          }));
        }
      }
    } catch (err) {
      console.error('[ContactUs] handleSwitchAccount error', err);
      alert('Unable to switch profile. See console for details.');
    }
  };

  // Autofill from session on mount (async IIFE with mounted guard)
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
  const session = getSession() || {};
          const autoToken = getAutoToken();

        // Support multiple session shapes for GMB data
        const gmbAccounts = session?.gmbAccounts || session?.gmbData?.accounts || [];
        const gmbPrimaryAccountName = session?.gmbPrimaryAccountName || (gmbAccounts[0] && gmbAccounts[0].accountName) || '';
        const gmbPrimaryLocation = session?.gmbPrimaryLocation || (session?.gmbData && session.gmbData.locations && session.gmbData.locations[0]) || null;

        if (!mounted) return;
        setAccounts(gmbAccounts || []);
        // Populate locations dropdown from session or by fetching via GMB API for the primary account
        try {
          const primaryAccount = gmbAccounts && gmbAccounts.length ? gmbAccounts[0] : null;
            if (primaryAccount && autoToken && primaryAccount.name) {
              const locs = await GMBService.getLocations(autoToken, primaryAccount.name);
            if (mounted) setLocations(Array.isArray(locs) ? locs : []);
          } else {
            // try session-stored primary location
            const sessPrimary = session?.gmbPrimaryLocation;
            if (sessPrimary) {
              if (mounted) setLocations([sessPrimary]);
            }
          }
        } catch (locErr) {
          console.debug('[ContactUs] failed to populate locations', locErr);
        }
        setFormData(prev => ({
          ...prev,
          name: prev.name || session?.user?.displayName || session?.user?.name || gmbPrimaryAccountName || '',
          business_name: prev.business_name || (gmbPrimaryLocation && (gmbPrimaryLocation.title || gmbPrimaryLocation.name)) || session?.business_name || session?.gmbPrimaryLocationTitle || '',
          phone_number: prev.phone_number || (gmbPrimaryLocation && (gmbPrimaryLocation.phoneNumbers?.primaryPhone || gmbPrimaryLocation.primaryPhone)) || session?.phone || session?.user?.phone || '',
          email: prev.email || session?.user?.email || session?.email || ''
        }));

        // If still missing, fetch primary location via GMB API using token
        const currentSession = getSession() || {};
        const needsBusiness = !currentSession?.business_name && !currentSession?.gmbPrimaryLocationTitle;
        const needsPhone = !currentSession?.phone && !currentSession?.user?.phone;

        if ((needsBusiness || needsPhone) && autoToken) {
          try {
            const primaryLocation = await GMBWebsiteService.getPrimaryLocation(autoToken);
            if (!mounted) return;
            if (primaryLocation) {
              setFormData(prev => ({
                ...prev,
                business_name: prev.business_name || primaryLocation.title || primaryLocation.name || prev.business_name,
                phone_number: prev.phone_number || primaryLocation.phoneNumbers?.primaryPhone || primaryLocation.primaryPhone || prev.phone_number
              }));
            }
          } catch (gErr) {
            console.debug('[ContactUs] GMB primaryLocation fetch failed', gErr);
          }
        }
      } catch (err) {
        console.debug('[ContactUs] autofill error', err);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        'http://52.44.140.230:8089/api/v1/customer/contact-us/create-contact',
        formData,
        {
          headers: {
            Authorization: `${token?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Updated')
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
    }
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
              {/* Account selector + switch button */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl sx={{ flex: 1 }}>
                  <StyledSelect
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">Business Profile</MenuItem>
                    {locations.map((loc, idx) => (
                      <MenuItem key={idx} value={loc.name || loc.title || idx}>{loc.title || loc.name || `Location ${idx + 1}`}</MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
                <Button variant="outlined" onClick={handleSwitchAccount}>Switch Profile</Button>
              </Box>
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
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                  placeholder="Enter business name"
                  variant="outlined"
                  required
                />
              </Box>
              <Box>
                <RequiredLabel>Complaint Type*</RequiredLabel>
                <FormControl fullWidth>
                  <StyledSelect
                    name="complaint_type"
                    value={complaint_type}
                    onChange={(e) => setTicketType(e.target.value)}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      <Typography sx={{ color: '#A0A0AA', fontSize: '14px' }}>Select issue type</Typography>
                    </MenuItem>
                    {ticketTypes.map((t, i) => <MenuItem key={i} value={t}>{t}</MenuItem>)}
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
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  variant="outlined"
                  required
                />
              </Box>

              {/* Preferred Date & Time */}
              <Box>
                <OptionalLabel>Preferred Time*</OptionalLabel>
                <TimePickerContainer>
                  <TimePickerField
                    fullWidth
                    name="date_and_time"
                    type="datetime-local"
                    value={formData.date_and_time}
                    onChange={handleInputChange}
                    required
                  />
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
              <SubmitButton type="submit" fullWidth variant="contained">
                Send Message
              </SubmitButton>
            </FormStack>
          </form>
        </FormContainer>
      </Container>
    </DashboardLayout>
  );
}
export default ContactUs;
