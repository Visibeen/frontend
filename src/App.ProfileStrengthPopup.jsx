import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import theme from './theme';
import ProfileStrengthMeterPopup from './components/ProfileStrengthResults/components/ProfileStrengthMeterPopup';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const DemoContainer = ({ children, title, description }) => (
  <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: 3 }}>
    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: theme.palette.primary.main }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
      {description}
    </Typography>
    {children}
  </Paper>
);

const App = () => {
  const [meterPopupOpen, setMeterPopupOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(350);

  const demoScores = [
    { score: 450, label: 'Excellent Score (90%)', color: '#22C55E' },
    { score: 350, label: 'Good Score (70%)', color: '#84CC16' },
    { score: 250, label: 'Average Score (50%)', color: '#EAB308' },
    { score: 150, label: 'Poor Score (30%)', color: '#F97316' },
    { score: 50, label: 'Very Poor Score (10%)', color: '#EF4444' }
  ];

  const handleShowMeterPopup = (score) => {
    setCurrentScore(score);
    setMeterPopupOpen(true);
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          p: 4
        }}>
          <Stack spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
            
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h2" sx={{ 
                mb: 2, 
                background: 'linear-gradient(135deg, #0B91D6 0%, #22C55E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Profile Strength Circular Gauge
              </Typography>
              <Typography variant="h6" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
                An animated circular gauge popup that displays profile strength scores with dynamic colors and smooth animations.
              </Typography>
            </Box>

            {/* Demo Section - Circular Gauge Popup */}
            <DemoContainer
              title="Circular Animated Gauge Demo"
              description="Click any button below to see the new circular gauge with different score levels. Each score range has dynamic colors and smooth animations."
            >
              <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                {demoScores.map((demo, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    onClick={() => handleShowMeterPopup(demo.score)}
                    sx={{
                      minWidth: 200,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: demo.color,
                      color: '#ffffff',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: demo.color,
                        filter: 'brightness(0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    {demo.label}
                  </Button>
                ))}
              </Stack>
            </DemoContainer>

            {/* Features Section */}
            <DemoContainer
              title="Key Features"
              description="This circular gauge popup includes the following features:"
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🎯 Full Circular Gauge
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                    Complete 360-degree circular gauge with smooth animations and dynamic color changes based on score ranges
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🌈 Dynamic Color System
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                    Colors automatically change based on score: Red (0-20%), Orange (20-40%), Yellow (40-60%), Light Green (60-80%), Green (80-100%)
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    ✨ Smooth Animations
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                    Animated score counting, glowing effects, and smooth gauge transitions with MUI X Charts integration
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    📋 Form Integration
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                    Includes account selection, keyword display, and location fields with edit functionality
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🎨 Clean Design
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 2 }}>
                    Modern white background, proper spacing, Inter font typography, and responsive layout
                  </Typography>
                </Box>
              </Stack>
            </DemoContainer>

            {/* Implementation Notes */}
            <DemoContainer
              title="Implementation Notes"
              description="Technical details about the circular gauge implementation:"
            >
              <Stack spacing={2}>
                <Typography variant="body2">
                  • <strong>Gauge Type:</strong> Full circular (360°) gauge using MUI X Charts Gauge component
                </Typography>
                <Typography variant="body2">
                  • <strong>Color System:</strong> Dynamic colors based on score percentage with smooth transitions
                </Typography>
                <Typography variant="body2">
                  • <strong>Animations:</strong> Score counting animation, glow effects, and smooth gauge fills
                </Typography>
                <Typography variant="body2">
                  • <strong>Typography:</strong> Inter font family with proper weight variations and color coding
                </Typography>
                <Typography variant="body2">
                  • <strong>Layout:</strong> Responsive design with form fields, circular gauge, and action button
                </Typography>
              </Stack>
            </DemoContainer>

          </Stack>

          {/* Profile Strength Circular Gauge Popup */}
          <ProfileStrengthMeterPopup
            open={meterPopupOpen}
            onClose={() => setMeterPopupOpen(false)}
            score={currentScore}
            maxScore={500}
          />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;