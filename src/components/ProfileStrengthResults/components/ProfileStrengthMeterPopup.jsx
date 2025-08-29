import React, { useState, useEffect } from 'react';
import { Dialog, Box, Typography, Button, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Gauge } from '@mui/x-charts/Gauge';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

// Enhanced animations for circular gauge
const popupEntry = keyframes`
  0% { 
    transform: scale(0.8);
    opacity: 0;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;

const scoreCountUp = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
`;

const gaugeGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(11, 145, 214, 0.3));
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(11, 145, 214, 0.5));
  }
`;

const PopupDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    overflow: 'visible',
    position: 'relative',
    animation: `${popupEntry} 0.5s ease-out`,
    maxWidth: '600px',
    width: '95%',
    minHeight: '700px'
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)'
  }
}));

const PopupContainer = styled(Box)(({ theme }) => ({
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  position: 'relative',
  minHeight: '700px'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  color: '#666666',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: '#333333'
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '24px'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6',
  marginBottom: '8px'
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '17px'
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  marginBottom: '32px',
  flexWrap: 'wrap'
}));

const FormField = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '150px'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  marginBottom: '6px'
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const MeterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  padding: '40px 20px',
  position: 'relative'
}));

const CircularGaugeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${gaugeGlow} 3s ease-in-out infinite`
}));

const ScoreDisplay = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '20px'
}));

const ScoreValue = styled(Typography)(({ theme, animate }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 700,
  color: '#000000',
  animation: animate ? `${scoreCountUp} 1.5s ease-out 1s both` : 'none'
}));

const ScoreLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#A0A0AA',
  marginTop: '8px'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'capitalize',
  width: '200px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  alignSelf: 'center',
  marginTop: '32px',
  '&:hover': {
    backgroundColor: '#0980C2',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(11, 145, 214, 0.3)'
  }
}));

const ProfileStrengthMeterPopup = ({ open, onClose, score = 350, maxScore = 500 }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (open && score >= 0) {
      setShowAnimation(true);
      // Animate score counting up
      const duration = 2000;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [open, score]);

  // Get color based on score percentage
  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '#22C55E'; // Green
    if (percentage >= 60) return '#84CC16'; // Light Green
    if (percentage >= 40) return '#EAB308'; // Yellow
    if (percentage >= 20) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const scoreColor = getScoreColor(score, maxScore);

  return (
    <PopupDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      disableEscapeKeyDown
    >
      <PopupContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <HeaderSection>
          <Title>Profile Strength</Title>
          <Description>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </Description>
        </HeaderSection>

        <FormSection>
          <FormField>
            <FieldLabel>Select Account*</FieldLabel>
            <FieldValue>E2E Group Mohali , Punjab</FieldValue>
          </FormField>
          <FormField>
            <FieldLabel>Selected Keyword*</FieldLabel>
            <FieldValue>Wooden work, Exterior, Civil work</FieldValue>
          </FormField>
          <FormField sx={{ position: 'relative' }}>
            <FieldLabel>Location*</FieldLabel>
            <FieldValue>
              A-611, Bestech Business Tower,
              Sector 66, SAS Nagar, Punjab 160066
            </FieldValue>
            <IconButton 
              sx={{ 
                position: 'absolute', 
                top: '20px', 
                right: '0px',
                color: '#0B91D6',
                padding: '4px'
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </FormField>
        </FormSection>

        <MeterContainer>
          <CircularGaugeContainer>
            <Gauge
              width={320}
              height={320}
              value={displayScore}
              valueMin={0}
              valueMax={maxScore}
              startAngle={0}
              endAngle={360}
              innerRadius="60%"
              outerRadius="90%"
              cornerRadius="50%"
              sx={{
                '& .MuiGauge-valueText': {
                  fontSize: '32px',
                  fontWeight: 900,
                  fill: scoreColor,
                  fontFamily: 'Inter, sans-serif'
                },
                '& .MuiGauge-valueArc': {
                  fill: scoreColor,
                  filter: `drop-shadow(0 0 12px ${scoreColor}40)`,
                  transition: 'all 0.5s ease'
                },
                '& .MuiGauge-referenceArc': {
                  fill: '#E5E7EB',
                  stroke: '#E5E7EB',
                  strokeWidth: 2
                }
              }}
            />
          </CircularGaugeContainer>

          <ScoreDisplay>
            <ScoreLabel>Profile Strength Score</ScoreLabel>
            <ScoreValue animate={showAnimation}>
              <span style={{ color: scoreColor }}>{displayScore}</span> / {maxScore}
            </ScoreValue>
          </ScoreDisplay>
        </MeterContainer>

        <ActionButton onClick={onClose}>
          Upgrade To Unlock Features
        </ActionButton>
      </PopupContainer>
    </PopupDialog>
  );
};

export default ProfileStrengthMeterPopup;