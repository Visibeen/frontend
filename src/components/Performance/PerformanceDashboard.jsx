import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PerformanceHeader from './components/PerformanceHeader';
import MetricsGrid from './components/MetricsGrid';
import SecondaryMetrics from './components/SecondaryMetrics';
import ChartsSection from './components/ChartsSection';
import GeoRankChart from './components/GeoRankChart';
import KeywordsTable from './components/KeywordsTable';
import PhotoEngagementTable from './components/PhotoEngagementTable';
import CompetitorSummaryTable from './components/CompetitorSummaryTable';
import { mockQuery } from './performanceMockData';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '32px 24px',
  backgroundColor: '#F8F8F8',
  minHeight: '100vh'
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: '16px'
}));

const PerformanceDashboard = ({ 
  performanceData = null,
  loading = false,
  error = null,
  onExportToPDF,
  onTimeRangeChange,
  selectedTimeRange = '6 Month',
  currentProfile = null
}) => {
  const [dashboardData, setDashboardData] = useState(mockQuery);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (performanceData) {
      setDashboardData(performanceData);
    }
    setIsLoading(loading);
  }, [performanceData, loading]);

  const handleExportToPDF = () => {
    console.log('Exporting performance data to PDF...');
    onExportToPDF?.();
  };

  const handleTimeRangeChange = (timeRange) => {
    console.log('Time range changed to:', timeRange);
    onTimeRangeChange?.(timeRange);
  };

  const handleViewGridData = () => {
    console.log('Viewing grid data...');
  };

  const handleAddCampaign = () => {
    console.log('Adding new campaign...');
  };

  const handleExpandKeywords = () => {
    console.log('Expanding to top 10 keywords...');
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <CircularProgress size={40} />
          <Typography variant="body2" color="textSecondary">
            Loading performance data...
          </Typography>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Error Loading Performance Data</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PerformanceHeader
        onExportToPDF={handleExportToPDF}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
      />

      <MetricsGrid performanceMetrics={dashboardData.performanceMetrics} />
      
      <SecondaryMetrics performanceMetrics={dashboardData.performanceMetrics} />
      
      <ChartsSection 
        localPackData={dashboardData.localPackData}
        taskCompletion={dashboardData.taskCompletion}
      />
      
      <GeoRankChart 
        geoRankData={dashboardData.geoRankData}
        onViewGridData={handleViewGridData}
        onAddCampaign={handleAddCampaign}
      />
      
      <KeywordsTable 
        keywordsData={dashboardData.keywordsData}
        onExpandKeywords={handleExpandKeywords}
      />
      
      <PhotoEngagementTable 
        photoEngagementData={dashboardData.photoEngagementData}
      />
      
      
      <CompetitorSummaryTable 
        competitorSummary={dashboardData.competitorSummary}
      />
    </PageContainer>
  );
};

export default PerformanceDashboard;