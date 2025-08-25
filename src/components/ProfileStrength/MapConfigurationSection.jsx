import React, { useMemo, useState } from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapGridSelector from './MapGridSelector';
import RadiusSelector from './RadiusSelector';
import HeatmapPreviewMap from '../Heatmap/HeatmapPreviewMap';

const ConfigContainer = styled(Stack)(({ theme }) => ({
  gap: '24px',
  direction: 'column',
  alignItems: 'center'
}));

const ConfigRow = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '24px',
  alignItems: 'center'
}));

const ConfigColumn = styled(Stack)(({ theme }) => ({
  gap: '24px',
  flex: 1
}));

const MapConfigurationSection = ({ formData, onFormChange }) => {
  const selectedUnit = formData.radiusUnit || 'Km';

  const handleUnitChange = (unit) => {
    onFormChange('radiusUnit', unit);
  };

  const gridSizeNumber = useMemo(() => {
    if (!formData?.mapGrid) return 5;
    const m = /([0-9]+)\*([0-9]+)/.exec(formData.mapGrid);
    return m ? Number(m[1]) : 5;
  }, [formData?.mapGrid]);

  return (
    <ConfigContainer>
      <ConfigRow>
        <ConfigColumn>
          <MapGridSelector 
            value={formData.mapGrid}
            onChange={(value) => onFormChange('mapGrid', value)}
          />
          
          {formData?.center ? (
            <HeatmapPreviewMap 
              center={formData.center}
              gridSize={gridSizeNumber}
              radiusKm={formData.radiusValue || 1}
              height={380}
            />
          ) : (
            <Box sx={{ width: '100%', height: 380, borderRadius: 1, border: '1px solid #E5E7EB', bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
              Waiting for location...
            </Box>
          )}
          
          <RadiusSelector 
            value={formData.radiusValue}
            selectedUnit={selectedUnit}
            onValueChange={(value) => onFormChange('radiusValue', value)}
            onUnitChange={handleUnitChange}
          />
        </ConfigColumn>
      </ConfigRow>
    </ConfigContainer>
  );
};

export default MapConfigurationSection;