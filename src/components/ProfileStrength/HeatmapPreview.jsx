import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '380px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #E5E7EB',
  position: 'relative'
}));

const MapImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const HeatmapPreview = () => {
  return (
    <MapContainer>
      <MapImage 
        src="/images/heatmap-preview.svg" 
        alt="Heatmap Preview with Red Pins"
      />
    </MapContainer>
  );
};

export default HeatmapPreview;