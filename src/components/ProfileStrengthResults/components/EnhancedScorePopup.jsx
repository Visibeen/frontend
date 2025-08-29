import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Typography, Box, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const needleSweep = keyframes`
  0% { transform: translateX(-50%) rotate(-90deg); }
  100% { transform: translateX(-50%) rotate(var(--target-angle)); }
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

const ringPulse = keyframes`
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateX(-50%) scale(1.1);
    opacity: 1;
  }
`;

const numberCount = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 24,
    padding: 0,
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: '#2c3e50',
    minWidth: 500,
    maxWidth: 600,
    animation: `${fadeIn} 0.5s ease-out`,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
}));

const ContentContainer = styled(Box)({
  padding: '40px 32px',
  textAlign: 'center',
  position: 'relative',
});

const Title = styled(Typography)({
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: '8px',
  color: '#2c3e50',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const Subtitle = styled(Typography)({
  fontSize: '16px',
  color: '#7f8c8d',
  marginBottom: '32px',
  fontWeight: 500,
});

// New semicircular gauge container
const GaugeContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '32px',
});

const Gauge = styled(Box)({
  position: 'relative',
  width: 300,
  height: 150,
  overflow: 'hidden',
});

const GaugeBackground = styled(Box)({
  width: 300,
  height: 300,
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
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.3)',
});

const GaugeInner = styled(Box)({
  position: 'absolute',
  top: 30,
  left: 30,
  width: 240,
  height: 240,
  background: '#ffffff',
  borderRadius: '50%',
  boxShadow: 'inset 0 5px 15px rgba(0, 0, 0, 0.1)',
});

const Needle = styled(Box)(({ targetAngle }) => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  width: 4,
  height: 120,
  background: 'linear-gradient(to top, #2c3e50, #34495e)',
  transformOrigin: 'bottom center',
  transform: 'translateX(-50%) rotate(-90deg)',
  borderRadius: 2,
  zIndex: 10,
  animation: `${needleSweep} 4s ease-in-out forwards`,
  boxShadow: '0 0 10px rgba(44, 62, 80, 0.5)',
  '--target-angle': `${targetAngle}deg`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -8,
    left: '50%',
    width: 12,
    height: 12,
    background: '#e74c3c',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 8px rgba(231, 76, 60, 0.8)',
  },
}));

const CenterHub = styled(Box)({
  position: 'absolute',
  bottom: -10,
  left: '50%',
  width: 20,
  height: 20,
  background: '#2c3e50',
  borderRadius: '50%',
  transform: 'translateX(-50%)',
  zIndex: 20,
  border: '3px solid #ecf0f1',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
});

const ScoreRing = styled(Box)({
  position: 'absolute',
  bottom: -20,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 60,
  height: 30,
  border: '3px solid #3498db',
  borderBottom: 'none',
  borderRadius: '60px 60px 0 0',
  background: 'rgba(52, 152, 219, 0.1)',
  animation: `${ringPulse} 2s ease-in-out infinite`,
});

const ValueDisplay = styled(Box)({
  textAlign: 'center',
  marginTop: '20px',
});

const ValueText = styled(Typography)(({ delay }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: '#2c3e50',
  animation: `${numberCount} 4s ease-in-out ${delay}s both`,
}));

const LabelText = styled(Typography)({
  fontSize: '16px',
  color: '#7f8c8d',
  marginTop: '5px',
  fontWeight: 500,
});

const MessageContainer = styled(Box)({
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 16,
  padding: '20px',
  marginBottom: '24px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
});

const MessageText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500,
  marginBottom: '8px',
  color: '#2c3e50',
});

const MessageEmoji = styled(Typography)({
  fontSize: '32px',
  marginBottom: '12px',
});

const CloseButton = styled(Button)({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: 12,
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  border: 'none',
  
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  },
  
  transition: 'all 0.3s ease',
});

const EnhancedScorePopup = ({ open, onClose, score, maxScore = 300 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Calculate percentage and target angle for needle
  const percentage = Math.min((score / maxScore) * 100, 100);
  const targetAngle = (percentage / 100) * 180 - 90; // -90 to 90 degrees for semicircle
  
  // Animate score counting
  useEffect(() => {
    if (open) {
      setAnimatedScore(0);
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedScore(prev => {
            if (prev >= score) {
              clearInterval(interval);
              return score;
            }
            return prev + Math.ceil((score - prev) / 10);
          });
        }, 100);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [open, score]);
  
  // Get message based on score
  const getScoreMessage = () => {
    if (percentage >= 90) return { emoji: '🎉', message: 'Outstanding! Your profile is exceptionally strong!' };
    if (percentage >= 75) return { emoji: '🌟', message: 'Excellent! Your profile performs very well!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Your profile has solid strength!' };
    if (percentage >= 40) return { emoji: '📈', message: 'Not bad! There\'s room for improvement!' };
    return { emoji: '🔧', message: 'Let\'s work on strengthening your profile!' };
  };
  
  const { emoji, message } = getScoreMessage();

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={{ padding: 0 }}>
        <ContentContainer>
          <Title>Performance Gauge</Title>
          <Subtitle>Your comprehensive profile score is ready!</Subtitle>
          
          <GaugeContainer>
            <Gauge>
              <GaugeBackground />
              <GaugeInner />
              <ScoreRing />
              <Needle targetAngle={targetAngle} />
              <CenterHub />
            </Gauge>
            <ValueDisplay>
              <ValueText delay={2}>
                {animatedScore} / {maxScore}
              </ValueText>
              <LabelText>Current Score</LabelText>
            </ValueDisplay>
          </GaugeContainer>
          
          <MessageContainer>
            <MessageEmoji>{emoji}</MessageEmoji>
            <MessageText>{message}</MessageText>
            <Typography variant="body2" sx={{ opacity: 0.8, color: '#7f8c8d' }}>
              Score: {percentage.toFixed(1)}% • {percentage >= 75 ? 'Strong' : percentage >= 50 ? 'Moderate' : 'Needs Improvement'}
            </Typography>
          </MessageContainer>
          
          <CloseButton onClick={onClose} variant="contained" fullWidth>
            View Detailed Results
          </CloseButton>
        </ContentContainer>
      </DialogContent>
    </StyledDialog>
  );
};

export default EnhancedScorePopup;
