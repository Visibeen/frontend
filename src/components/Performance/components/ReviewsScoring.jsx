import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CompetitorDiscoveryService from '../../../services/CompetitorDiscoveryService';

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: '32px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const ScoreCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb'
}));

const ScoreDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '24px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  marginBottom: '16px'
}));

const ScoreNumber = styled(Typography)(({ theme, score }) => {
  let color = '#ef4444'; // Red for low scores
  if (score >= 70) color = '#22c55e'; // Green for high scores
  else if (score >= 40) color = '#f59e0b'; // Yellow for medium scores

  return {
    fontSize: '48px',
    fontWeight: 700,
    color,
    lineHeight: 1
  };
});

const MetricBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  textAlign: 'center'
}));

const CompetitorItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const ReviewsScoring = ({ 
  currentProfile, 
  userBusinessData = null,
  onScoreCalculated = null 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const [scoreData, setScoreData] = useState(null);
  const [discoveryComplete, setDiscoveryComplete] = useState(false);

  const runCompetitorDiscovery = async () => {
    if (!currentProfile) {
      setError('No business profile selected');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setDiscoveryComplete(false);

      console.log('[ReviewsScoring] Starting competitor discovery for:', currentProfile.name);

      // Extract location from current profile
      const location = currentProfile.locationData?.latlng || currentProfile.location;
      if (!location?.latitude || !location?.longitude) {
        throw new Error('Business location coordinates not available');
      }

      // Determine search keyword from business category
      const primaryCategory = currentProfile.locationData?.categories?.primaryCategory;
      const keyword = primaryCategory?.displayName || 
                    primaryCategory?.name || 
                    currentProfile.name?.split(' ')[0] || 
                    'business';

      console.log('[ReviewsScoring] Search parameters:', {
        location: `${location.latitude}, ${location.longitude}`,
        keyword,
        excludePlaceId: currentProfile.locationId
      });

      // Find competitors using the service
      const foundCompetitors = await CompetitorDiscoveryService.findCompetitors({
        latitude: location.latitude,
        longitude: location.longitude,
        keyword: keyword,
        radius: 10000, // 10km radius
        excludePlaceId: currentProfile.locationId
      });

      setCompetitors(foundCompetitors);

      // Log competitor data to console as requested
      CompetitorDiscoveryService.logCompetitorData(foundCompetitors, userBusinessData);

      // Calculate comprehensive scoring including velocity
      console.log('[ReviewsScoring] Calculating comprehensive score with velocity...');
      console.log('[ReviewsScoring] User business data:', userBusinessData);
      
      const scoring = CompetitorDiscoveryService.calculateComprehensiveScore(
        userBusinessData, 
        foundCompetitors,
        {
          reviewsLast30Days: userBusinessData?.velocity?.last30Days || userBusinessData?.reviewVelocity?.last30Days,
          benchmarkReviewCount: 5 // Default benchmark
        }
      );
      
      console.log('[ReviewsScoring] Comprehensive scoring result:', scoring);
      console.log('[ReviewsScoring] Velocity score details:', {
        velocityScore: scoring.velocityScore,
        velocityPercentage: scoring.velocityPercentage,
        velocityLevel: scoring.velocityLevel,
        reviewsLast30Days: scoring.reviewsLast30Days,
        benchmarkReviewCount: scoring.benchmarkReviewCount
      });

      setScoreData(scoring);
      setDiscoveryComplete(true);

      // Notify parent component of score calculation
      if (onScoreCalculated) {
        onScoreCalculated({
          reviewsScore: scoring.score,
          competitorsFound: foundCompetitors.length,
          analysis: scoring.analysis
        });
      }

      console.log('[ReviewsScoring] Discovery completed successfully:', {
        competitorsFound: foundCompetitors.length,
        score: scoring.score
      });

    } catch (err) {
      console.error('[ReviewsScoring] Error during competitor discovery:', err);
      setError(`Failed to discover competitors: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-run discovery when profile changes
  useEffect(() => {
    if (currentProfile && !discoveryComplete) {
      runCompetitorDiscovery();
    }
  }, [currentProfile?.locationId]);

  const renderScoreAnalysis = () => {
    if (!scoreData?.analysis) return null;

    const { analysis } = scoreData;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Your Performance
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MetricBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#0B91D6' }}>
                  {analysis.userRating || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your Rating
                </Typography>
              </MetricBox>
            </Grid>
            <Grid item xs={6}>
              <MetricBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#0B91D6' }}>
                  {analysis.userReviewsCount || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your Reviews
                </Typography>
              </MetricBox>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Competitor Averages
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MetricBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b7280' }}>
                  {analysis.avgCompetitorRating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg Rating
                </Typography>
              </MetricBox>
            </Grid>
            <Grid item xs={6}>
              <MetricBox>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b7280' }}>
                  {analysis.avgCompetitorReviews}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg Reviews
                </Typography>
              </MetricBox>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Score Breakdown
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Rating Score: {analysis.ratingScore}/100
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={analysis.ratingScore} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Reviews Count Score: {analysis.reviewsCountScore}/100
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={analysis.reviewsCountScore} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Velocity Score: {scoreData.velocityScore || 0}/12
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(scoreData.velocityScore || 0) * 100 / 12} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="textSecondary">
                  {scoreData.velocityLevel || 'N/A'} ({scoreData.velocityPercentage || 0}%)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Competitors Analyzed: {analysis.competitorsAnalyzed}
                </Typography>
                <Chip 
                  label={`${analysis.competitorsAnalyzed} businesses`} 
                  color="primary" 
                  variant="outlined" 
                />
              </Box>
            </Grid>
          </Grid>

          {/* Velocity Analysis Section */}
          {scoreData.velocityScore !== undefined && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Velocity Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MetricBox>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#0B91D6' }}>
                      {scoreData.reviewsLast30Days || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Reviews Last 30 Days
                    </Typography>
                  </MetricBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MetricBox>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#6b7280' }}>
                      {scoreData.benchmarkReviewCount || 5}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Benchmark (Target)
                    </Typography>
                  </MetricBox>
                </Grid>
              </Grid>
              
              {scoreData.velocityRecommendations && scoreData.velocityRecommendations.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    Velocity Recommendations
                  </Typography>
                  <List>
                    {scoreData.velocityRecommendations.map((recommendation, index) => (
                      <ListItem key={index} sx={{ pl: 0 }}>
                        <ListItemIcon>
                          <TrendingUpIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={recommendation} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
          )}
        </Grid>

        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recommendations
            </Typography>
            <List>
              {analysis.recommendations.map((recommendation, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    {recommendation.includes('below') ? 
                      <TrendingDownIcon color="warning" /> : 
                      <TrendingUpIcon color="success" />
                    }
                  </ListItemIcon>
                  <ListItemText primary={recommendation} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderTopCompetitors = () => {
    if (!competitors || competitors.length === 0) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Top 10 Nearby Competitors
        </Typography>
        <Card sx={{ p: 2 }}>
          {competitors.slice(0, 10).map((competitor, index) => (
            <CompetitorItem key={competitor.placeId}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {index + 1}. {competitor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {competitor.distance}km away • {competitor.address}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon sx={{ color: '#FBBC05', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {competitor.rating || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ({competitor.reviewsCount || 0} reviews)
                  </Typography>
                </Box>
              </Box>
            </CompetitorItem>
          ))}
        </Card>
      </Box>
    );
  };

  return (
    <SectionContainer>
      <SectionTitle>Comprehensive Competitive Analysis (Reviews + Velocity)</SectionTitle>
      
      <ScoreCard>
        <CardContent>
          {loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress size={40} sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Discovering Competitors...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Searching for up to 50 competitors using Places API
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2">{error}</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={runCompetitorDiscovery}
                sx={{ mt: 1 }}
              >
                Retry Discovery
              </Button>
            </Alert>
          )}

          {!loading && !error && scoreData && (
            <>
              <ScoreDisplay>
                <ScoreNumber score={scoreData.score}>
                  {scoreData.score}
                </ScoreNumber>
                <Typography variant="h6" color="textSecondary">
                  Comprehensive Competitive Score
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                  Reviews (70%) + Velocity (30%)
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Based on {competitors.length} competitors analyzed
                </Typography>
              </ScoreDisplay>

              {renderScoreAnalysis()}
              {renderTopCompetitors()}
            </>
          )}

          {!loading && !error && !scoreData && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Ready to analyze your competitive position
              </Typography>
              <Button 
                variant="contained" 
                onClick={runCompetitorDiscovery}
                disabled={!currentProfile}
              >
                Start Competitor Discovery
              </Button>
            </Box>
          )}
        </CardContent>
      </ScoreCard>
    </SectionContainer>
  );
};

export default ReviewsScoring;
