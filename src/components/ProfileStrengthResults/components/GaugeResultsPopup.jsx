import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SemiCircularGauge from './SemiCircularGauge';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  paddingTop: 8
});

const Subtitle = styled(Typography)({
  color: '#7f8c8d',
  fontSize: 14,
  textAlign: 'center'
});

const GaugeResultsPopup = ({ open, onClose, score = 0, maxScore = 300 }) => {
  const [displayedScore, setDisplayedScore] = useState(0);

  // On open, start gauge from 0 and animate to final score for a sweeping needle
  useEffect(() => {
    let t;
    if (open) {
      setDisplayedScore(0);
      t = setTimeout(() => setDisplayedScore(Math.max(0, Math.min(maxScore, score))), 250);
    }
    return () => clearTimeout(t);
  }, [open, score, maxScore]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Profile Strength</DialogTitle>
      <DialogContent>
        <Container>
          <SemiCircularGauge score={displayedScore} maxScore={maxScore} title="" />
          <Subtitle>The gauge needle animates to your score after analysis completes.</Subtitle>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GaugeResultsPopup;
