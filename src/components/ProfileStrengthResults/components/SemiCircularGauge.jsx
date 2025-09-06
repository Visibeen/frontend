import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const ringPulse = keyframes`
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
  50% { transform: translateX(-50%) scale(1.08); opacity: 1; }
`;

const gaugeGlow = keyframes`
  from {
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.3);
  }
  to {
    box-shadow:
      0 15px 40px rgba(52, 152, 219, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.5);
  }
`;

const GaugeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
}));

const Gauge = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '300px',
  height: '150px',
  overflow: 'hidden',
}));

const GaugeBackground = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: `conic-gradient(
    from 180deg,
    #e74c3c 0deg,
    #e74c3c 36deg,
    #f39c12 36deg,
    #f39c12 72deg,
    #3498db 72deg,
    #3498db 108deg,
    #2980b9 108deg,
    #2980b9 144deg,
    #27ae60 144deg,
    #27ae60 180deg,
    transparent 180deg
  )`,
  position: 'absolute',
  top: 0,
  left: 0,
  animation: `${gaugeGlow} 3s ease-in-out infinite alternate`,
}));

const GaugeInner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '30px',
  left: '30px',
  width: '240px',
  height: '240px',
  background: '#ffffff',
  borderRadius: '50%',
  boxShadow: 'inset 0 5px 15px rgba(0, 0, 0, 0.08)',
}));

const Needle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'angle',
})(({ angle }) => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  width: '4px',
  height: '120px',
  background: 'linear-gradient(to top, #2c3e50, #34495e)',
  transformOrigin: 'bottom center',
  transform: `translateX(-50%) rotate(${angle}deg)`,
  borderRadius: '2px',
  zIndex: 10,
  transition: 'transform 1000ms ease-in-out',
  boxShadow: '0 0 10px rgba(44, 62, 80, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-8px',
    left: '50%',
    width: '12px',
    height: '12px',
    background: '#e74c3c',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 8px rgba(231, 76, 60, 0.7)'
  }
}));

const CenterHub = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-10px',
  left: '50%',
  width: '20px',
  height: '20px',
  background: '#2c3e50',
  borderRadius: '50%',
  transform: 'translateX(-50%)',
  zIndex: 20,
  border: '3px solid #ecf0f1',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
}));

const ScoreRing = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '30px',
  border: '3px solid #3498db',
  borderBottom: 'none',
  borderRadius: '60px 60px 0 0',
  background: 'rgba(52, 152, 219, 0.12)',
  animation: `${ringPulse} 2s ease-in-out infinite`,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#2c3e50',
  fontSize: '20px',
  fontWeight: 700,
  textAlign: 'center',
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 800,
  color: '#2c3e50',
  textAlign: 'center',
}));

const LabelText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#7f8c8d',
  marginTop: '4px',
  fontWeight: 500,
  textAlign: 'center',
}));

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Map score (0..max) to angle (-90..+90)
function scoreToAngle(score, maxScore) {
  const pct = clamp(maxScore ? score / maxScore : 0, 0, 1);
  return -90 + pct * 180;
}

const SemiCircularGauge = ({ score = 0, maxScore = 300, title = 'Performance Gauge', showLabels = true }) => {
  const [display, setDisplay] = useState(0);

  // Pre-calc angle for needle
  const angle = useMemo(() => scoreToAngle(score, maxScore), [score, maxScore]);

  // Count-up animation for number
  useEffect(() => {
    const duration = 900; // ms
    const start = performance.now();
    const from = display;
    const to = clamp(score, 0, maxScore);

    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = Math.round(from + (to - from) * eased);
      setDisplay(value);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, maxScore]);

  return (
    <GaugeContainer>
      {title ? <Title>{title}</Title> : null}
      <Gauge>
        <GaugeBackground />
        <GaugeInner />
        <ScoreRing />
        <Needle angle={angle} />
        <CenterHub />
      </Gauge>
      <Box>
        <ValueText>
          {display} / {maxScore}
        </ValueText>
        {showLabels && <LabelText>Current Score</LabelText>}
      </Box>
    </GaugeContainer>
  );
};

export default SemiCircularGauge;
