import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, Divider, Stack } from '@mui/material';
import AutoTokenManager from '../utils/autoTokenUtils';
import { getSessionDebugInfo, isSessionValid } from '../utils/authUtils';
import ApiService from '../services/api';

const AutoTokenDebugger = ({ open = false }) => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const updateDebugInfo = () => {
    const sessionInfo = getSessionDebugInfo();
    const status = AutoTokenManager.getTokenStatus();
    const validation = isSessionValid();
    
    setDebugInfo(sessionInfo);
    setTokenStatus(status);
  };

  useEffect(() => {
    if (open) {
      updateDebugInfo();
      // Update every 5 seconds when open
      const interval = setInterval(updateDebugInfo, 5000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      await AutoTokenManager.manualRefresh();
      updateDebugInfo();
    } catch (error) {
      console.error('Manual refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStartAutoRefresh = () => {
    AutoTokenManager.startAutoRefresh();
    updateDebugInfo();
  };

  const handleStopAutoRefresh = () => {
    AutoTokenManager.stopAutoRefresh();
    updateDebugInfo();
  };

  const testApiCall = async () => {
    try {
      console.log('🧪 Testing API call with auto token...');
      const response = await ApiService.get('/customer/profile');
      console.log('✅ API call successful:', response);
    } catch (error) {
      console.error('❌ API call failed:', error);
    }
  };

  if (!open) return null;

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 20, 
        right: 20, 
        zIndex: 9999,
        maxWidth: 400,
        maxHeight: '80vh',
        overflow: 'auto'
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔧 Auto Token Debugger
          </Typography>
          
          <Stack spacing={2}>
            {/* Token Status */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Token Status
              </Typography>
              {tokenStatus && (
                <Stack spacing={1}>
                  <Chip 
                    label={tokenStatus.hasToken ? '✅ Has Token' : '❌ No Token'} 
                    color={tokenStatus.hasToken ? 'success' : 'error'}
                    size="small"
                  />
                  <Chip 
                    label={tokenStatus.hasRefreshToken ? '✅ Has Refresh Token' : '❌ No Refresh Token'} 
                    color={tokenStatus.hasRefreshToken ? 'success' : 'error'}
                    size="small"
                  />
                  <Chip 
                    label={tokenStatus.autoRefreshActive ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'} 
                    color={tokenStatus.autoRefreshActive ? 'primary' : 'default'}
                    size="small"
                  />
                  {tokenStatus.isExpiringSoon && (
                    <Chip 
                      label="⚠️ Token Expiring Soon" 
                      color="warning"
                      size="small"
                    />
                  )}
                  <Chip 
                    label={tokenStatus.hasGoogleToken ? '✅ Has Google Token' : '❌ No Google Token'} 
                    color={tokenStatus.hasGoogleToken ? 'success' : 'error'}
                    size="small"
                  />
                  <Chip 
                    label={tokenStatus.hasGoogleRefreshToken ? '✅ Has Google Refresh Token' : '❌ No Google Refresh Token'} 
                    color={tokenStatus.hasGoogleRefreshToken ? 'success' : 'error'}
                    size="small"
                  />
                  {tokenStatus.isGoogleTokenExpiringSoon && (
                    <Chip 
                      label="⚠️ Google Token Expiring Soon" 
                      color="warning"
                      size="small"
                    />
                  )}
                  <Typography variant="caption" color="textSecondary">
                    Google Token Preview: {tokenStatus.googleTokenPreview}
                  </Typography>
                </Stack>
              )}
            </Box>

            <Divider />

            {/* Session Debug Info */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Session Debug
              </Typography>
              {debugInfo && (
                <Box sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  <Typography variant="caption" display="block">
                    Auto Token: {debugInfo.autoToken}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Valid Session: {debugInfo.validation.isValid ? '✅' : '❌'}
                  </Typography>
                  <Typography variant="caption" display="block">
                    LocalStorage Token: {debugInfo.localStorage.authToken}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Google Token: {debugInfo.autoExtractedGoogleToken || 'No Google token'}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Google LocalStorage: {debugInfo.googleTokenSources?.localStorage || 'No Google token'}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider />

            {/* Controls */}
            <Stack spacing={1}>
              <Button 
                size="small" 
                onClick={updateDebugInfo}
                variant="outlined"
              >
                🔄 Refresh Info
              </Button>
              
              <Button 
                size="small" 
                onClick={handleManualRefresh}
                disabled={refreshing}
                variant="outlined"
                color="primary"
              >
                {refreshing ? '🔄 Refreshing...' : '🔄 Manual Token Refresh'}
              </Button>
              
              {tokenStatus?.autoRefreshActive ? (
                <Button 
                  size="small" 
                  onClick={handleStopAutoRefresh}
                  variant="outlined"
                  color="error"
                >
                  ⏹️ Stop Auto Refresh
                </Button>
              ) : (
                <Button 
                  size="small" 
                  onClick={handleStartAutoRefresh}
                  variant="outlined"
                  color="success"
                >
                  ▶️ Start Auto Refresh
                </Button>
              )}
              
              <Button 
                size="small" 
                onClick={testApiCall}
                variant="outlined"
                color="secondary"
              >
                🧪 Test API Call
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutoTokenDebugger;