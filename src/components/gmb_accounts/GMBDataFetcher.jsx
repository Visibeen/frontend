import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import GMBService from '../../services/GMBService';

const GMBDataFetcher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Display environment variables (client ID and project ID only, not secret)
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const projectId = process.env.REACT_APP_GMB_PROJECT_ID;

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get token using the GMBService
      const token = await GMBService.getGoogleToken();
      setAccessToken(token);
      
      // Fetch accounts
      const accountsData = await GMBService.getAccounts(token);
      setAccounts(accountsData);
      
      if (accountsData.length > 0) {
        setSelectedAccount(accountsData[0]);
      }
    } catch (err) {
      console.error('Error connecting to Google:', err);
      setError(err.message || 'Failed to connect to Google');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (account) => {
    if (!account || !accessToken) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Fetch locations for the selected account
      const locationsData = await GMBService.getLocations(accessToken, account.name);
      setLocations(locationsData);
      
      if (locationsData.length > 0) {
        setSelectedLocation(locationsData[0]);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err.message || 'Failed to fetch locations');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (account, location) => {
    if (!account || !location || !accessToken) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Fetch reviews for the selected location
      const reviewsData = await GMBService.getReviews(accessToken, account.name, location.name);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  // When selected account changes, fetch its locations
  useEffect(() => {
    if (selectedAccount) {
      fetchLocations(selectedAccount);
    }
  }, [selectedAccount]);

  // When selected location changes, fetch its reviews
  useEffect(() => {
    if (selectedAccount && selectedLocation) {
      fetchReviews(selectedAccount, selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Google My Business Data
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          Using Client ID: {clientId ? clientId.substring(0, 10) + '...' : 'Not set'}
        </Typography>
        <Typography variant="subtitle1">
          Project ID: {projectId || 'Not set'}
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleConnect}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Connect to Google & Fetch Data'}
      </Button>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {/* Accounts List */}
        <Paper sx={{ p: 2, flexBasis: '30%', minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            GMB Accounts ({accounts.length})
          </Typography>
          <List>
            {accounts.map((account) => (
              <ListItem 
                key={account.name} 
                button 
                selected={selectedAccount?.name === account.name}
                onClick={() => setSelectedAccount(account)}
              >
                <ListItemText 
                  primary={account.accountName || 'Unnamed Account'} 
                  secondary={account.name}
                />
              </ListItem>
            ))}
            {accounts.length === 0 && (
              <ListItem>
                <ListItemText primary="No accounts found" />
              </ListItem>
            )}
          </List>
        </Paper>

        {/* Locations List */}
        <Paper sx={{ p: 2, flexBasis: '30%', minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Locations ({locations.length})
          </Typography>
          <List>
            {locations.map((location) => (
              <ListItem 
                key={location.name} 
                button 
                selected={selectedLocation?.name === location.name}
                onClick={() => setSelectedLocation(location)}
              >
                <ListItemText 
                  primary={location.title || 'Unnamed Location'} 
                  secondary={location.address?.addressLines?.join(', ') || 'No address'}
                />
              </ListItem>
            ))}
            {locations.length === 0 && (
              <ListItem>
                <ListItemText primary="No locations found" />
              </ListItem>
            )}
          </List>
        </Paper>

        {/* Reviews List */}
        <Paper sx={{ p: 2, flexBasis: '30%', minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Reviews ({reviews.length})
          </Typography>
          <List>
            {reviews.map((review, index) => (
              <React.Fragment key={review.name || index}>
                <ListItem>
                  <ListItemText 
                    primary={`Rating: ${review.starRating || 'N/A'}`} 
                    secondary={review.comment || 'No comment'}
                  />
                </ListItem>
                {index < reviews.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {reviews.length === 0 && (
              <ListItem>
                <ListItemText primary="No reviews found" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default GMBDataFetcher;