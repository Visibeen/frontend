import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import ProfileStrengthForm from './ProfileStrengthForm';
import { GooglePlacesService } from '../../heatmap/lib/google-places';

const ProfileStrengthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultApiKey = process.env.REACT_APP_PLACES_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY || '';
  const places = new GooglePlacesService(defaultApiKey, true);
  
  const [formData, setFormData] = useState({
    selectedAccount: 'E2E Group Mohali , Punjab',
    selectedKeywords: 'Wooden work, Exterior, Civil work',
    location: 'A-611, Bestech Business Tower,\nSector 66, SAS Nagar, Punjab 160066',
    mapGrid: '25  pins 5*5',
    radiusValue: 2,
    radiusUnit: 'Km',
    center: null,
    schedule: {
      frequency: 'Weekly',
      day: 'Monday',
      time: '10 : 20',
      period: 'Am'
    }
  });

  // Update form data based on URL parameters from BusinessProfile
  useEffect(() => {
    const businessName = searchParams.get('businessName');
    const placeId = searchParams.get('placeId');
    const address = searchParams.get('address');
    
    if (businessName) {
      setFormData(prev => ({
        ...prev,
        selectedAccount: businessName
      }));
    }

    if (address) {
      setFormData(prev => ({
        ...prev,
        location: address
      }));
    }

    async function resolveCenter() {
      if (!placeId) return;
      try {
        const coords = await places.getCoordinatesByPlaceId(placeId);
        setFormData(prev => ({ ...prev, center: { lat: coords.lat, lng: coords.lng } }));
      } catch (e) {
        console.warn('Failed to resolve center by placeId', e);
      }
    }
    resolveCenter();
  }, [searchParams]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    console.log('Continue clicked with data:', formData);
    // Navigate to heatmap results page with the configuration
    const qs = new URLSearchParams();
    qs.set('businessName', formData.selectedAccount);
    const firstKeyword = String(formData.selectedKeywords || '').split(',')[0]?.trim() || '';
    qs.set('keyword', firstKeyword);
    // Extract grid dimension from label like "25 pins 5*5" -> 5
    const match = /([0-9]+)\*([0-9]+)/.exec(formData.mapGrid);
    const gridDim = match ? Number(match[1]) : 5;
    qs.set('gridSize', String(gridDim));
    const radiusKm = formData.radiusUnit === 'Miles' ? (Number(formData.radiusValue) * 1.60934) : Number(formData.radiusValue);
    qs.set('radius', String(radiusKm));
    if (formData.center) {
      qs.set('lat', String(formData.center.lat));
      qs.set('lng', String(formData.center.lng));
    }
    
    // Navigate to heatmap results (you can create this route later)
    navigate(`/heatmap-results?${qs.toString()}`);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Profile Strength</Typography>
        <Stack spacing={4}>
          <ProfileStrengthForm 
            formData={formData}
            onFormChange={handleFormChange}
            onContinue={handleContinue}
          />
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default ProfileStrengthPage;