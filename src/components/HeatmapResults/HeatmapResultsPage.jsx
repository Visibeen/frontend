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
  const [currentKeyword, setCurrentKeyword] = useState('');

  // Extract parameters from URL
  const businessName = searchParams.get('businessName') || '';
  const urlKeyword = searchParams.get('keyword') || '';
  const keyword = currentKeyword || urlKeyword;
  const gridSize = parseInt(searchParams.get('gridSize')) || 5;
  const radius = parseFloat(searchParams.get('radius')) || 2;
  const lat = parseFloat(searchParams.get('lat'));
  const lng = parseFloat(searchParams.get('lng'));

  // Initialize current keyword from URL
  React.useEffect(() => {
    if (urlKeyword && !currentKeyword) {
      setCurrentKeyword(urlKeyword);
    }
  }, [urlKeyword, currentKeyword]);

  useEffect(() => {
    let active = true;
    async function fetchRanking() {
      try {
        setError(null);
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
        console.log('API Key available:', !!apiKey);
        console.log('Config:', { businessName, keyword, gridSize, radius, lat, lng });
        
        if (!apiKey) {
          throw new Error('Google Places API key not found. Please set VITE_GOOGLE_API_KEY in your .env file.');
        }
        
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
        
        console.log('RankingService data:', data);
        console.log('Results count:', data.results?.length);

        // Convert to UI shape
        const pins = data.results.map((r, idx) => ({
          id: idx,
          rank: r.targetBusinessRank ?? '20+',
          color: (r.targetBusinessRank == null) ? '#EF232A' : (r.targetBusinessRank <= 3 ? '#34A853' : r.targetBusinessRank <= 7 ? '#FBBC05' : '#EF232A'),
          position: { row: r.gridPoint.gridY || Math.floor(idx / gridSize), col: r.gridPoint.gridX || (idx % gridSize) },
        }));
        
        console.log('Generated pins:', pins);

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
            radius,
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
        
        // Fallback to mock data for demonstration
        const mockPins = [];
        const mockRanks = [14, 6, 18, 18, 18, 14, 6, '20+', 6, 6, 14, 14, '20+', 6, 6, 18, '20+', 6, 6, 6];
        
        for (let i = 0; i < gridSize * gridSize; i++) {
          const rank = mockRanks[i % mockRanks.length];
          mockPins.push({
            id: i,
            rank,
            color: rank === '20+' || rank > 7 ? '#EF232A' : rank <= 3 ? '#34A853' : '#FBBC05',
            position: { row: Math.floor(i / gridSize), col: i % gridSize }
          });
        }
        
        const fallbackData = {
          businessName: businessName || 'Demo Business',
          keyword: keyword || 'Demo Keyword',
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          stats: {
            good: mockPins.filter(p => p.rank !== '20+' && p.rank <= 3).length,
            poor: mockPins.filter(p => p.rank === '20+' || p.rank > 7).length,
            average: mockPins.filter(p => p.rank && p.rank > 3 && p.rank <= 7).length,
            averageRank: 8.5,
            shareOfVoice: 25,
            outOfTop20: mockPins.filter(p => p.rank === '20+').length
          },
          mapData: {
            center: { lat: lat || 30.7333, lng: lng || 76.7794 },
            pins: mockPins,
            businesses: [
              { name: businessName || 'Your Business', rank: 6, address: '123 Demo Street', rating: 4.2, reviews: 45, isYou: true },
              { name: 'Competitor A', rank: 3, address: '456 Main St', rating: 4.5, reviews: 120 },
              { name: 'Competitor B', rank: 8, address: '789 Oak Ave', rating: 3.8, reviews: 67 }
            ],
            radius
          },
          history: [{
            gridIcon: true,
            gridSize: `${gridSize}*${gridSize}`,
            keyword: keyword || 'Demo Keyword',
            radius: `${radius} km`,
            listing: businessName || 'Demo Business',
            averageRank: 8.5,
            date: new Date().toLocaleDateString()
          }]
        };
        
        if (active) {
          setResultsData(fallbackData);
          setError(`Using demo data - ${e.message}`);
        }
      }
    }
    fetchRanking();
    return () => { active = false; };
  }, [businessName, keyword, gridSize, radius, lat, lng]);

  const handleKeywordChange = (newKeyword) => {
    setCurrentKeyword(newKeyword);
    setResultsData(null); // Clear current data to show loading
    setError(null);
  };

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
      <Box sx={{ p: 3, backgroundColor: '#F8F8F8', minHeight: '100vh' }} data-testid="heatmap-results-content">
        <Stack spacing={4}>
          <HeatmapResultsHeader 
            keyword={resultsData.keyword}
            date={resultsData.date}
            onKeywordChange={handleKeywordChange}
            resultsData={resultsData}
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