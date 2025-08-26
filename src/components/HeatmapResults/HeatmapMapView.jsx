import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { generateGridPoints } from '../../heatmap/lib/geolocation';

const MapWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}));

// Create ranking pin icons
const createRankingIcon = (rank, color) => {
  const size = 30;
  return L.divIcon({
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${color};border:2px solid #ffffff;
        box-shadow:0 2px 4px rgba(0,0,0,0.2);
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:12px;font-weight:600;
        color:#ffffff;cursor:pointer;
      ">${rank}</div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const HeatmapMapView = ({ pins, center, radius = 2 }) => {
  const gridSize = Math.sqrt(pins.length);
  const hasValidCenter = center && typeof center.lat === 'number' && typeof center.lng === 'number';
  const mapCenter = hasValidCenter ? center : { lat: 28.6139, lng: 77.2090 };
  
  console.log('HeatmapMapView - pins:', pins.length, 'gridSize:', gridSize, 'center:', center);
  
  // Generate grid points for the map
  const gridPoints = useMemo(() => {
    if (!hasValidCenter || !gridSize) return [];
    return generateGridPoints(center, radius, gridSize);
  }, [center, radius, gridSize, hasValidCenter]);
  
  // Match pins with grid points
  const mapMarkers = useMemo(() => {
    return pins.map((pin, index) => {
      const gridPoint = gridPoints[index];
      if (!gridPoint) return null;
      
      return {
        id: pin.id,
        position: [gridPoint.lat, gridPoint.lng],
        rank: pin.rank,
        color: pin.color,
        icon: createRankingIcon(pin.rank, pin.color)
      };
    }).filter(Boolean);
  }, [pins, gridPoints]);

  if (!pins || pins.length === 0) {
    return (
      <MapWrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography>No ranking data available</Typography>
        </Box>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <MapContainer 
        center={[mapCenter.lat, mapCenter.lng]} 
        zoom={12} 
        style={{ width: '100%', height: '100%', borderRadius: 0 }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapMarkers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={marker.position} 
            icon={marker.icon}
            title={`Rank: ${marker.rank}`}
          />
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default HeatmapMapView;