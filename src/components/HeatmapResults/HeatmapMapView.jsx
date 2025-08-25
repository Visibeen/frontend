import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}));

const PinOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none'
}));

const Pin = styled(Box)(({ theme, color, top, left }) => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  transform: 'translate(-50%, -50%)',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  pointerEvents: 'auto',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translate(-50%, -50%) scale(1.1)',
    zIndex: 10
  }
}));

const PinText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14.37px',
  fontWeight: 500,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 1
}));

const HeatmapMapView = ({ pins, center }) => {
  // Define pin positions based on a 5x5 grid layout
  const getPinPosition = (row, col, gridSize = 5) => {
    // Map positions to approximate locations on the map background
    const startTop = 25; // Start from 25% from top
    const endTop = 75;   // End at 75% from top
    const startLeft = 25; // Start from 25% from left
    const endLeft = 75;   // End at 75% from left
    
    const top = startTop + (row / (gridSize - 1)) * (endTop - startTop);
    const left = startLeft + (col / (gridSize - 1)) * (endLeft - startLeft);
    
    return { top, left };
  };

  return (
    <MapContainer>
      <PinOverlay>
        {pins.map((pin) => {
          const { top, left } = getPinPosition(pin.position.row, pin.position.col);
          
          return (
            <Pin
              key={pin.id}
              color={pin.color}
              top={top}
              left={left}
              title={`Rank: ${pin.rank}`}
            >
              <PinText>{pin.rank}</PinText>
            </Pin>
          );
        })}
      </PinOverlay>
    </MapContainer>
  );
};

export default HeatmapMapView;