import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const iconSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const iconBounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: scale(1); }
  40% { transform: scale(1.1); }
  60% { transform: scale(1.05); }
`;

const progressFill = keyframes`
  0% { stroke-dashoffset: 314; }
  100% { stroke-dashoffset: var(--target-offset); }
`;

const stepProgress = keyframes`
  0% { width: 0%; }
  25% { width: 33%; }
  50% { width: 66%; }
  75% { width: 100%; }
  100% { width: 100%; }
`;

const stepComplete = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const stepActive = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const barProgress = keyframes`
  0% { width: 0%; }
  100% { width: var(--progress-width); }
`;

const dots = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: 'none',
    maxWidth: 'none',
    maxHeight: 'none',
    margin: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
    animation: `${fadeIn} 0.3s ease-out`,
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
}));

const PopupContainer = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '16px',
  padding: '40px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  animation: `${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  position: 'relative',
  margin: '0 auto',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  borderRadius: '50%',
  margin: '0 auto 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '36px',
  color: 'white',
  position: 'relative',
  animation: `${iconSpin} 3s linear infinite`,
  '&::before': {
    content: '"⚡"',
    animation: `${iconBounce} 2s ease-in-out infinite`,
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginBottom: '32px',
}));

const ProgressCircle = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: '0 auto 20px',
  position: 'relative',
}));

const ProgressSvg = styled('svg')(({ theme }) => ({
  transform: 'rotate(-90deg)',
  width: '100%',
  height: '100%',
}));

const ProgressBg = styled('circle')(({ theme }) => ({
  fill: 'none',
  stroke: '#e2e8f0',
  strokeWidth: '8',
}));

const ProgressBar = styled('circle')(({ theme, progress }) => ({
  fill: 'none',
  stroke: '#667eea',
  strokeWidth: '8',
  strokeLinecap: 'round',
  strokeDasharray: '314',
  strokeDashoffset: '314',
  animation: `${progressFill} 2s ease-in-out forwards`,
  '--target-offset': 314 - (progress / 100) * 314,
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '28px',
  fontWeight: '800',
  color: '#667eea',
}));

const LoadingBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4px',
  background: '#e2e8f0',
  borderRadius: '2px',
  overflow: 'hidden',
  marginBottom: '20px',
}));

const LoadingFill = styled(Box)(({ theme, progress }) => ({
  height: '100%',
  background: 'linear-gradient(90deg, #667eea, #764ba2)',
  borderRadius: '2px',
  animation: `${barProgress} 2s ease-in-out forwards`,
  '--progress-width': `${progress}%`,
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '32px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '12px',
    left: '12px',
    right: '12px',
    height: '2px',
    background: '#e2e8f0',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '12px',
    left: '12px',
    height: '2px',
    background: '#667eea',
    zIndex: 2,
    animation: `${stepProgress} 4s ease-in-out forwards`,
  },
}));

const Step = styled(Box)(({ theme, status }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: status === 'completed' ? '#48bb78' : status === 'active' ? '#667eea' : '#e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'white',
  position: 'relative',
  zIndex: 3,
  transition: 'all 0.3s ease',
  animation: status === 'completed' ? `${stepComplete} 0.5s ease-out` : 
             status === 'active' ? `${stepActive} 1s ease-in-out infinite` : 'none',
}));

const StepLabels = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '12px',
}));

const StepLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#718096',
  textAlign: 'center',
  flex: 1,
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#4a5568',
  marginBottom: '8px',
  '&::after': {
    content: '""',
    animation: `${dots} 1.5s steps(3) infinite`,
  },
}));

const AnalysisLoadingPopup = ({ open, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Analyzing profile data');
  const [eta, setEta] = useState(25);

  const steps = [
    { label: 'Profile', text: 'Analyzing profile data' },
    { label: 'Verification', text: 'Checking verification status' },
    { label: 'Content', text: 'Analyzing business information' },
    { label: 'Score', text: 'Calculating final score' }
  ];

  useEffect(() => {
    if (!open) return;

    let progressInterval;
    let stepInterval;
    let etaInterval;

    const startAnalysis = () => {
      // Progress animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => onComplete(), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      // Step progression
      stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            const nextStep = prev + 1;
            setLoadingText(steps[nextStep].text);
            return nextStep;
          }
          clearInterval(stepInterval);
          return prev;
        });
      }, 1200);

      // ETA countdown
      etaInterval = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 200);
    };

    const timer = setTimeout(startAnalysis, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(etaInterval);
    };
  }, [open, onComplete, steps]);

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  return (
    <StyledDialog open={open} disableEscapeKeyDown>
      <DialogContent sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 0,
        height: '100vh'
      }}>
        <PopupContainer>
          <IconContainer />
          
          <Typography variant="h4" sx={{ 
            fontSize: '24px',
            fontWeight: 700,
            color: '#2d3748',
            marginBottom: '12px'
          }}>
            Analyzing Your Profile Strength
          </Typography>
          
          <Typography variant="body1" sx={{
            fontSize: '16px',
            color: '#718096',
            marginBottom: '32px'
          }}>
            Please wait while we process your information
          </Typography>

          <ProgressContainer>
            <ProgressCircle>
              <ProgressSvg viewBox="0 0 100 100">
                <ProgressBg cx="50" cy="50" r="45" />
                <ProgressBar cx="50" cy="50" r="45" progress={progress} />
              </ProgressSvg>
              <ProgressText>{Math.round(progress)}%</ProgressText>
            </ProgressCircle>
            
            <Typography sx={{
              fontSize: '18px',
              color: '#4a5568',
              fontWeight: 600,
              marginBottom: '24px'
            }}>
              Processing Data
            </Typography>
          </ProgressContainer>

          <LoadingBar>
            <LoadingFill progress={progress} />
          </LoadingBar>

          <StepsContainer>
            {steps.map((step, index) => (
              <Step key={index} status={getStepStatus(index)}>
                {getStepStatus(index) === 'completed' ? '✓' : index + 1}
              </Step>
            ))}
          </StepsContainer>
          
          <StepLabels>
            {steps.map((step, index) => (
              <StepLabel key={index}>{step.label}</StepLabel>
            ))}
          </StepLabels>

          <LoadingText>{loadingText}</LoadingText>
          <Typography sx={{
            fontSize: '14px',
            color: '#a0aec0'
          }}>
            Estimated completion: {eta} seconds
          </Typography>
        </PopupContainer>
      </DialogContent>
    </StyledDialog>
  );
};

export default AnalysisLoadingPopup;
