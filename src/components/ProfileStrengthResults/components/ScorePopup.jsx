import React, { useState, useEffect } from 'react';
import { Dialog, Box, Typography, Button, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const popIn = keyframes`
  0% { 
    transform: scale(0.3) rotate(-10deg);
    opacity: 0;
  }
  50% { 
    transform: scale(1.05) rotate(2deg);
    opacity: 0.8;
  }
  100% { 
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const scoreCountUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
`;

const sparkle = keyframes`
  0%, 100% { 
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% { 
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideUp = keyframes`
  0% { 
    transform: translateY(30px);
    opacity: 0;
  }
  100% { 
    transform: translateY(0);
    opacity: 1;
  }
`;

const PopupDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
    padding: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    overflow: 'visible',
    position: 'relative',
    animation: `${popIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
    maxWidth: '500px',
    width: '90%'
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(11, 145, 214, 0.8)',
    backdropFilter: 'blur(10px)'
  }
}));

const PopupContainer = styled(Box)(({ theme }) => ({
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  position: 'relative',
  color: '#ffffff'
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '16px',
  color: 'rgba(255, 255, 255, 0.8)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff'
  }
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: '64px',
  color: '#4CAF50',
  filter: 'drop-shadow(0 4px 12px rgba(76, 175, 80, 0.4))',
  animation: `${pulse} 2s ease-in-out infinite`
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '8px',
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  animation: `${slideUp} 0.8s ease-out 0.3s both`
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.9)',
  textAlign: 'center',
  lineHeight: 1.5,
  animation: `${slideUp} 0.8s ease-out 0.4s both`
}));

const ScoreContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '32px',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '20px',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${slideUp} 0.8s ease-out 0.5s both`
}));

const ScoreValue = styled(Typography)(({ theme, animate }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '48px',
  fontWeight: 900,
  color: '#ffffff',
  textAlign: 'center',
  textShadow: '0 4px 16px rgba(0,0,0,0.3)',
  animation: animate ? `${scoreCountUp} 1.2s ease-out 0.8s both` : 'none'
}));

const ScoreLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '1px'
}));

const ScoreRating = styled(Box)(({ theme, level }) => {
  const getColor = () => {
    if (level === 'excellent') return '#4CAF50';
    if (level === 'good') return '#2196F3';
    if (level === 'average') return '#FF9800';
    return '#F44336';
  };

  return {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: getColor(),
    borderRadius: '20px',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: `0 4px 16px ${getColor()}40`,
    animation: `${slideUp} 0.8s ease-out 0.9s both`
  };
});

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  padding: '12px 32px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  color: '#667eea',
  boxShadow: '0 8px 24px rgba(255,255,255,0.3)',
  animation: `${slideUp} 0.8s ease-out 1s both`,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 32px rgba(255,255,255,0.4)'
  }
}));

const SparkleEffect = styled(Box)(({ theme, delay = 0 }) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
  borderRadius: '50%',
  animation: `${sparkle} 1.5s ease-in-out ${delay}s infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '4px',
    height: '4px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

const ScorePopup = ({ open, onClose, score = 0, maxScore = 500 }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (open && score > 0) {
      setShowAnimation(true);
      // Animate score counting up
      const duration = 1500; // 1.5 seconds
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

  const getScoreLevel = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'average';
    return 'poor';
  };

  const getScoreText = (level) => {
    switch (level) {
      case 'excellent': return 'Excellent Profile!';
      case 'good': return 'Good Profile';
      case 'average': return 'Average Profile';
      default: return 'Needs Improvement';
    }
  };

  const scoreLevel = getScoreLevel(score, maxScore);
  const scoreText = getScoreText(scoreLevel);

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

        {/* Sparkle Effects */}
        <SparkleEffect style={{ top: '20px', right: '80px' }} delay={0.5} />
        <SparkleEffect style={{ top: '60px', left: '60px' }} delay={1} />
        <SparkleEffect style={{ bottom: '80px', right: '40px' }} delay={1.5} />
        <SparkleEffect style={{ bottom: '40px', left: '80px' }} delay={2} />

        <SuccessIcon />
        
        <Title>Analysis Complete!</Title>
        <Subtitle>
          Your profile strength has been analyzed using advanced AI algorithms
        </Subtitle>

        <ScoreContainer>
          <ScoreLabel>Your Profile Strength Score</ScoreLabel>
          <ScoreValue animate={showAnimation}>
            {displayScore} / {maxScore}
          </ScoreValue>
          <ScoreRating level={scoreLevel}>
            <TrendingUpIcon fontSize="small" />
            {scoreText}
          </ScoreRating>
        </ScoreContainer>

        <ActionButton onClick={onClose}>
          View Detailed Analysis
        </ActionButton>
      </PopupContainer>
    </PopupDialog>
  );
};

export default ScorePopup;