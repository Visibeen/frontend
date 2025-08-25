import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessListings from './BusinessListings';
import HeatmapMapView from './HeatmapMapView';

const MapContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  border: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  overflow: 'hidden'
}));

const MapContent = styled(Stack)(({ theme }) => ({
  direction: 'row',
  height: '590px'
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  width: '378px',
  padding: '16px',
  borderRight: '0.6px solid #F6F0F0',
  backgroundColor: '#ffffff',
  overflow: 'auto'
}));

const MapPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  backgroundImage: 'url(/images/heatmap-results-background.svg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}));

const HeatmapMapSection = ({ mapData, businessName }) => {
  return (
    <MapContainer>
      <MapContent>
        <LeftPanel>
          <BusinessListings 
            businesses={mapData.businesses}
            businessName={businessName}
          />
        </LeftPanel>
        
        <MapPanel>
          <HeatmapMapView 
            pins={mapData.pins}
            center={mapData.center}
          />
        </MapPanel>
      </MapContent>
    </MapContainer>
  );
};

export default HeatmapMapSection;