import React from 'react';
import { Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FontStyleCard from './FontStyleCard';

const GridContainer = styled(Stack)(({ theme }) => ({
  gap: '29px',
  alignItems: 'center'
}));

const GridRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  justifyContent: 'center'
}));

const FontStyleGrid = ({ fontStyles, selectedStyleId, onStyleSelect }) => {
  // Split font styles into two rows of 3 each
  const firstRow = fontStyles.slice(0, 3);
  const secondRow = fontStyles.slice(3, 6);

  return (
    <GridContainer>
      <GridRow>
        {firstRow.map((fontStyle) => (
          <FontStyleCard
            key={fontStyle.id}
            fontStyle={fontStyle}
            selected={selectedStyleId === fontStyle.id}
            onClick={onStyleSelect}
          />
        ))}
      </GridRow>
      <GridRow>
        {secondRow.map((fontStyle) => (
          <FontStyleCard
            key={fontStyle.id}
            fontStyle={fontStyle}
            selected={selectedStyleId === fontStyle.id}
            onClick={onStyleSelect}
          />
        ))}
      </GridRow>
    </GridContainer>
  );
};

export default FontStyleGrid;