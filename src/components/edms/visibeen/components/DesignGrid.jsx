import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import DesignCard from './DesignCard';

const GridContainer = styled(Grid)(({ theme }) => ({
  gap: '25px',
  justifyContent: 'center'
}));

const DesignGrid = ({ designs, onDesignSelect, accountInfo }) => {
  return (
    <GridContainer container spacing={3}>
      {designs.map((design, index) => (
        <Grid key={design.id || index} size={{ xs: 12, sm: 6, md: 4 }}>
          <DesignCard
            design={design}
            onClick={() => onDesignSelect(design)}
            accountInfo={accountInfo}
          />
        </Grid>
      ))}
    </GridContainer>
  );
};

export default DesignGrid;