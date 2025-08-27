import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Select, 
  MenuItem, 
  Button,
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import PageHeader from '../Dashboard/components/PageHeader';
import MetricCard from './components/MetricCard';
import TaskCompletionWidget from './components/TaskCompletionWidget';
import LocalPackWidget from './components/LocalPackWidget';
import PerformanceChart from './components/PerformanceChart';
import DataTable from './components/DataTable';
import DropdownIcon from './icons/DropdownIcon';
import ExportIcon from './icons/ExportIcon';
import theme from '../../theme';
import { mockQuery, mockRootProps } from './mockData';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0'
}));

const HeaderSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '32px'
}));

const HeaderControls = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px'
}));

const TimeRangeSelect = styled(FormControl)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.2px solid #A0A0AA',
  backgroundColor: theme.palette.background.paper,
  minWidth: '137px',
  '& .MuiOutlinedInput-root': {
    border: 'none',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiSelect-select': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#0B91D6',
    padding: '12px 16px'
  }
}));

const ExportButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '8px 16px',
  gap: '10px',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.20)'
  }
}));

const MetricsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '25px',
  marginBottom: '26px'
}));

const SecondaryMetricsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '19px',
  marginBottom: '26px'
}));

const WidgetsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '19px',
  marginBottom: '40px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '16px'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#0B91D6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  marginTop: '16px',
  marginBottom: '32px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#0A7BC4'
  }
}));

const PerformanceDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [selectedWorkType, setSelectedWorkType] = useState('Wooden work');
  const [selectedFrequency, setSelectedFrequency] = useState('Weekly');

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
    mockRootProps.onTimeRangeChange(event.target.value);
  };

  const handleExportToPDF = () => {
    mockRootProps.onExportToPDF();
  };

  const handleViewGridData = () => {
    mockRootProps.onViewGridData();
  };

  const handleGetTopKeywords = () => {
    mockRootProps.onGetTopKeywords();
  };

  const handleAddCampaign = () => {
    mockRootProps.onAddCampaign();
  };

  const keywordColumns = ['Search Term', 'Search Volume', 'Client Ranking', 'Competitor Ranking'];
  const photoColumns = ['Photo Type', 'Views', 'Compared to Competitor A', 'Compared to Competitor B'];
  const competitorColumns = ['Metric', 'Your Business', 'Compared to Competitor A', 'Compared to Competitor B', 'Compared to Competitor C'];

  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <PageContainer>
          <HeaderSection>
            <PageHeader 
              title="Performance"
              subtitle="Lorem ipsum is a dummy or placeholder text commonly used in graphic."
            />
            <HeaderControls>
              <TimeRangeSelect>
                <Select
                  value={selectedTimeRange}
                  onChange={handleTimeRangeChange}
                  IconComponent={() => <DropdownIcon width={7} height={4} color="#0B91D6" />}
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">6 Month</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </TimeRangeSelect>
              
              <ExportButton onClick={handleExportToPDF}>
                <ExportIcon width={17} height={17} color="#121927" />
                Export to PDF
              </ExportButton>
            </HeaderControls>
          </HeaderSection>

          {/* Main Performance Metrics */}
          <MetricsRow>
            <MetricCard
              title="Local Views"
              value={mockQuery.performanceMetrics.localViews}
              change={mockQuery.performanceMetrics.localViewsChange}
              backgroundColor="#34A853"
              valueColor="#FFFFFF"
            />
            <MetricCard
              title="Calls from GBP"
              value={mockQuery.performanceMetrics.callsFromGBP}
              change={mockQuery.performanceMetrics.callsFromGBPChange}
              backgroundColor="#34A853"
              valueColor="#FFFFFF"
            />
            <MetricCard
              title="Direction Requests"
              value={mockQuery.performanceMetrics.directionRequests}
              change={mockQuery.performanceMetrics.directionRequestsChange}
              backgroundColor="#EF232A"
              valueColor="#FFFFFF"
            />
            <MetricCard
              title="Website Clicks"
              value={mockQuery.performanceMetrics.websiteClicks}
              change={mockQuery.performanceMetrics.websiteClicksChange}
              backgroundColor="#34A853"
              valueColor="#FFFFFF"
            />
            <MetricCard
              title="New Reviews"
              value={mockQuery.performanceMetrics.newReviews}
              change={mockQuery.performanceMetrics.newReviewsChange}
              backgroundColor="#34A853"
              valueColor="#FFFFFF"
            />
          </MetricsRow>

          {/* Secondary Metrics */}
          <SecondaryMetricsRow>
            <Box sx={{ flex: 1 }}>
              <MetricCard
                title="Organic Clicks This Month"
                value={mockQuery.performanceMetrics.organicClicks}
                change={mockQuery.performanceMetrics.organicClicksChange}
                backgroundColor="rgba(52, 168, 83, 0.10)"
                valueColor="#34A853"
                isLarge={true}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <MetricCard
                title="Avg. Google Search Volume"
                value={mockQuery.performanceMetrics.avgSearchVolume}
                change={mockQuery.performanceMetrics.avgSearchVolumeChange}
                backgroundColor="rgba(239, 35, 42, 0.10)"
                valueColor="#EF232A"
                isLarge={true}
              />
            </Box>
          </SecondaryMetricsRow>

          {/* Widgets Row */}
          <WidgetsRow>
            <Box sx={{ flex: 1 }}>
              <SectionTitle>Local Pack Appearances</SectionTitle>
              <LocalPackWidget
                appearances={mockQuery.localPackData.appearances}
                totalPossible={mockQuery.localPackData.totalPossible}
                change={mockQuery.localPackData.change}
                description={mockQuery.localPackData.description}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SectionTitle>Task Assign vs Complete</SectionTitle>
              <TaskCompletionWidget
                percentage={mockQuery.taskCompletion.percentage}
                tasks={mockQuery.taskCompletion.tasks}
              />
            </Box>
          </WidgetsRow>

          {/* Performance Chart */}
          <Box sx={{ marginBottom: '40px' }}>
            <PerformanceChart
              data={mockQuery.chartData}
              onViewGridData={handleViewGridData}
              onAddCampaign={handleAddCampaign}
              selectedWorkType={selectedWorkType}
              selectedFrequency={selectedFrequency}
            />
          </Box>

          {/* Keywords Table */}
          <Box sx={{ marginBottom: '40px' }}>
            <SectionTitle>Top 5 Keywords</SectionTitle>
            <DataTable
              title="Top 5 Keywords"
              columns={keywordColumns}
              data={mockQuery.keywordsData}
              type="keywords"
            />
            <ActionButton onClick={handleGetTopKeywords}>
              Click to get Top 10 Keywords
            </ActionButton>
          </Box>

          {/* Photo Engagement Table */}
          <Box sx={{ marginBottom: '40px' }}>
            <SectionTitle>Google Photo Engagement Report</SectionTitle>
            <DataTable
              title="Google Photo Engagement Report"
              columns={photoColumns}
              data={mockQuery.photoEngagementData}
              type="photos"
            />
          </Box>

          {/* Competitor Summary Table */}
          <Box sx={{ marginBottom: '40px' }}>
            <SectionTitle>Competitor Summary Table</SectionTitle>
            <DataTable
              title="Competitor Summary Table"
              columns={competitorColumns}
              data={mockQuery.competitorData}
              type="competitor"
            />
          </Box>
        </PageContainer>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default PerformanceDashboard;