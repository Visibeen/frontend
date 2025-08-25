import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import HeatmapResultsHeader from './HeatmapResultsHeader';
import HeatmapStatsSection from './HeatmapStatsSection';
import HeatmapMapSection from './HeatmapMapSection';
import HeatmapHistorySection from './HeatmapHistorySection';
import { RankingService } from '../../heatmap/lib/ranking-service';

const HeatmapResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [resultsData, setResultsData] = useState(null);
  const [error, setError] = useState(null);

  // Extract parameters from URL
  const businessName = searchParams.get('businessName') || '';
  const keyword = searchParams.get('keyword') || '';
  const gridSize = parseInt(searchParams.get('gridSize')) || 5;
  const radius = parseFloat(searchParams.get('radius')) || 2;
  const lat = parseFloat(searchParams.get('lat'));
  const lng = parseFloat(searchParams.get('lng'));

  useEffect(() => {
    let active = true;
    async function fetchRanking() {
      try {
        setError(null);
        const apiKey = process.env.REACT_APP_PLACES_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY || '';
        const svc = new RankingService(apiKey, true);

        const config = {
          businessName,
          businessAddress: '',
          keyword,
          centerLocation: (typeof lat === 'number' && typeof lng === 'number') ? { lat, lng } : null,
          searchRadius: radius, // in km
          gridSize,
          googleApiKey: apiKey,
        };

        const { isValid, errors } = svc.validateConfig(config);
        if (!isValid) {
          throw new Error('Invalid configuration: ' + errors.join(', '));
        }

        const data = await svc.performRankingAnalysis(config);

        // Convert to UI shape
        const pins = data.results.map((r, idx) => ({
          id: idx,
          rank: r.targetBusinessRank ?? '20+',
          color: (r.targetBusinessRank == null) ? '#EF232A' : (r.targetBusinessRank <= 3 ? '#34A853' : r.targetBusinessRank <= 7 ? '#FBBC05' : '#EF232A'),
          position: { row: r.gridPoint.gridY, col: r.gridPoint.gridX },
        }));

        // Aggregate a business list from the center result (closest to middle index)
        const midIndex = Math.floor((gridSize * gridSize) / 2);
        const centerResult = data.results[midIndex] || data.results[0];
        const businesses = (centerResult?.businesses || []).slice(0, 10).map((b) => ({
          name: b.name,
          rank: b.originalRank || null,
          address: b.address || b.vicinity || '',
          rating: b.rating || null,
          reviews: b.userRatingsTotal || b.reviews || null,
          isYou: (b.name || '').toLowerCase().includes((businessName || '').toLowerCase()),
        }));

        const resultsPayload = {
          businessName: data.businessName,
          keyword: data.keyword,
          date: new Date(data.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          stats: {
            good: pins.filter(p => p.rank !== '20+' && p.rank <= 3).length,
            poor: pins.filter(p => p.rank === '20+' || p.rank > 7).length,
            average: pins.filter(p => p.rank && p.rank > 3 && p.rank <= 7).length,
            averageRank: data.averageRank || null,
            shareOfVoice: null,
            outOfTop20: pins.filter(p => p.rank === '20+').length,
          },
          mapData: {
            center: data.centerLocation,
            pins,
            businesses,
          },
          history: [
            {
              gridIcon: true,
              gridSize: `${gridSize}*${gridSize}`,
              keyword,
              radius: `${radius} km`,
              listing: data.businessName,
              averageRank: data.averageRank || null,
              date: new Date(data.timestamp).toLocaleDateString(),
            }
          ],
        };

        if (active) setResultsData(resultsPayload);
      } catch (e) {
        console.warn('Failed to fetch ranking:', e);
        if (active) setError(e.message || 'Failed to load results');
      }
    }
    fetchRanking();
    return () => { active = false; };
  }, [businessName, keyword, gridSize, radius, lat, lng]);

  if (error) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  if (!resultsData) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          Loading heatmap results...
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
        <Stack spacing={4}>
          <HeatmapResultsHeader 
            keyword={resultsData.keyword}
            date={resultsData.date}
          />
          
          <HeatmapStatsSection stats={resultsData.stats} />
          
          <HeatmapMapSection 
            mapData={resultsData.mapData}
            businessName={resultsData.businessName}
          />
          
          <HeatmapHistorySection history={resultsData.history} />
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default HeatmapResultsPage;