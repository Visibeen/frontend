import React from 'react';
import { Box, Typography, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExportPDFIcon from '../icons/ExportPDFIcon';
import EditPencilIcon from '../icons/EditPencilIcon';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '24px'
}));

const HeaderLeft = styled(Stack)(({ theme }) => ({
  gap: '6px'
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E'
}));

const ExportButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  border: '0.6px solid #A0A0AA',
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  color: '#121927',
  width: '160px',
  height: '40px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  textTransform: 'none',
  padding: '12px 16px',
  gap: '10px',
  '&:hover': {
    backgroundColor: 'rgba(160, 160, 170, 0.15)'
  }
}));

const KeywordSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '24px',
  marginTop: '16px'
}));

const KeywordItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
}));

const KeywordText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const DateContainer = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  border: '0.6px solid #F6F0F0',
  boxShadow: '0px 55px 22px rgba(0, 0, 0, 0.01), 0px 86px 24px rgba(0, 0, 0, 0.00)',
  padding: '12px 16px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#121927'
}));

const HeatmapResultsHeader = ({ keyword, date, onKeywordChange, resultsData }) => {
  const [isEditingKeyword, setIsEditingKeyword] = React.useState(false);
  const [keywordInput, setKeywordInput] = React.useState(keyword || '');

  const handleExportPDF = async () => {
    try {
      // Extract competitor data for analysis
      const businesses = resultsData?.mapData?.businesses || [];
      const stats = resultsData?.stats || {};
      const yourBusiness = businesses.find(b => b.isYou);
      const competitors = businesses.filter(b => !b.isYou).slice(0, 5);
      
      // Generate competitor analysis HTML
      const competitorAnalysisHTML = `
        <div class="section-title">Competitor Analysis</div>
        <div class="competitor-section">
          ${yourBusiness ? `
            <div class="your-business">
              <h3>Your Business Performance</h3>
              <div class="business-card your-card">
                <div class="business-name">${yourBusiness.name}</div>
                <div class="business-details">
                  <span class="rank">Rank: #${yourBusiness.rank || 'Not ranked'}</span>
                  <span class="rating">Rating: ${yourBusiness.rating ? yourBusiness.rating.toFixed(1) : 'N/A'} ⭐</span>
                  <span class="reviews">${yourBusiness.reviews || 0} reviews</span>
                </div>
                <div class="address">${yourBusiness.address || 'Address not available'}</div>
              </div>
            </div>
          ` : ''}
          
          ${competitors.length > 0 ? `
            <div class="competitors">
              <h3>Top Competitors</h3>
              ${competitors.map((competitor, index) => `
                <div class="business-card competitor-card">
                  <div class="competitor-rank">#${index + 1}</div>
                  <div class="business-info">
                    <div class="business-name">${competitor.name}</div>
                    <div class="business-details">
                      <span class="rank">Rank: #${competitor.rank || 'Not ranked'}</span>
                      <span class="rating">Rating: ${competitor.rating ? competitor.rating.toFixed(1) : 'N/A'} ⭐</span>
                      <span class="reviews">${competitor.reviews || 0} reviews</span>
                    </div>
                    <div class="address">${competitor.address || 'Address not available'}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<p>No competitor data available</p>'}
          
          <div class="competitive-insights">
            <h3>Competitive Insights</h3>
            <div class="insights-grid">
              <div class="insight-card">
                <div class="insight-title">Market Position</div>
                <div class="insight-value">${yourBusiness && yourBusiness.rank ? 
                  yourBusiness.rank <= 3 ? 'Strong' : 
                  yourBusiness.rank <= 7 ? 'Moderate' : 'Needs Improvement'
                : 'Not Ranked'}</div>
              </div>
              <div class="insight-card">
                <div class="insight-title">Total Competitors</div>
                <div class="insight-value">${competitors.length}</div>
              </div>
              <div class="insight-card">
                <div class="insight-title">Average Competitor Rating</div>
                <div class="insight-value">${competitors.length > 0 ? 
                  (competitors.reduce((sum, c) => sum + (c.rating || 0), 0) / competitors.length).toFixed(1)
                : 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Create PDF content as HTML
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Heatmap Results Report</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              padding: 40px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #0B91D6;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #0B91D6;
              font-size: 28px;
              margin-bottom: 10px;
            }
            .header p {
              font-size: 16px;
              margin: 5px 0;
            }
            .stats-section {
              margin: 30px 0;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 20px 0;
            }
            .stat-card {
              text-align: center;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              color: #0B91D6;
            }
            .stat-label {
              font-size: 14px;
              color: #666;
              margin-top: 5px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 600;
              margin: 30px 0 15px 0;
              color: #121927;
            }
            .map-info {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            .competitor-section {
              margin: 20px 0;
            }
            .your-business {
              margin-bottom: 30px;
            }
            .business-card {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              margin: 10px 0;
            }
            .your-card {
              background: #e8f4fd;
              border-color: #0B91D6;
            }
            .competitor-card {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .competitor-rank {
              font-size: 20px;
              font-weight: bold;
              color: #0B91D6;
              min-width: 40px;
            }
            .business-name {
              font-weight: 600;
              font-size: 16px;
              margin-bottom: 8px;
            }
            .business-details {
              display: flex;
              gap: 15px;
              margin-bottom: 5px;
            }
            .business-details span {
              font-size: 14px;
              color: #666;
            }
            .rank {
              font-weight: 600;
              color: #0B91D6;
            }
            .address {
              font-size: 12px;
              color: #888;
            }
            .competitive-insights {
              margin-top: 30px;
            }
            .insights-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin: 15px 0;
            }
            .insight-card {
              text-align: center;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 6px;
            }
            .insight-title {
              font-size: 12px;
              color: #666;
              margin-bottom: 5px;
            }
            .insight-value {
              font-size: 18px;
              font-weight: bold;
              color: #0B91D6;
            }
            @media print {
              body { padding: 20px; }
              .header { page-break-after: avoid; }
              .competitor-section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Heatmap Analysis Report</h1>
            <p><strong>Keyword:</strong> ${keyword || 'N/A'}</p>
            <p><strong>Generated:</strong> ${date || new Date().toLocaleDateString()}</p>
            <p><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div class="section-title">Executive Summary</div>
          <div class="map-info">
            <p>This report shows the local search ranking performance for the specified keyword across different geographic locations. The analysis provides insights into visibility patterns and competitive positioning.</p>
          </div>
          
          <div class="section-title">Performance Metrics</div>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${stats.good || 0}</div>
              <div class="stat-label">Good Rankings (1-3)</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.average || 0}</div>
              <div class="stat-label">Average Rankings (4-7)</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.poor || 0}</div>
              <div class="stat-label">Poor Rankings (8+)</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.averageRank ? stats.averageRank.toFixed(1) : 'N/A'}</div>
              <div class="stat-label">Average Rank</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.outOfTop20 || 0}</div>
              <div class="stat-label">Out of Top 20</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${keyword || 'N/A'}</div>
              <div class="stat-label">Target Keyword</div>
            </div>
          </div>
          
          ${competitorAnalysisHTML}
          
          <div class="section-title">Map Analysis</div>
          <div class="map-info">
            <p><strong>Note:</strong> The interactive map with ranking pins is available in the web application. This PDF report provides a summary of the analysis results.</p>
            <p><strong>Access the full interactive map at:</strong> ${window.location.href}</p>
          </div>
          
          <div class="footer">
            <p>Generated by Visibeen Heatmap Analysis Tool</p>
            <p>For the most up-to-date results, please visit the web application</p>
          </div>
        </body>
        </html>
      `;
      
      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `heatmap-results-${keyword || 'report'}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Also open print dialog for PDF conversion
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const handleEditKeyword = () => {
    setKeywordInput(keyword || '');
    setIsEditingKeyword(true);
  };

  const handleSaveKeyword = () => {
    if (keywordInput.trim() && onKeywordChange) {
      onKeywordChange(keywordInput.trim());
    }
    setIsEditingKeyword(false);
  };

  const handleCancelEdit = () => {
    setKeywordInput(keyword || '');
    setIsEditingKeyword(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveKeyword();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <Box>
      <HeaderContainer>
        <HeaderLeft>
          <MainTitle>Heat Map</MainTitle>
          <SubTitle>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </SubTitle>
        </HeaderLeft>
        
        <ExportButton onClick={handleExportPDF}>
          <ExportPDFIcon width={17} height={17} />
          Export to PDF
        </ExportButton>
      </HeaderContainer>

      <KeywordSection>
        <KeywordItem>
          {isEditingKeyword ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                size="small"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                sx={{ minWidth: 120 }}
              />
              <Button variant="contained" size="small" onClick={handleSaveKeyword}>Save</Button>
              <Button variant="text" size="small" onClick={handleCancelEdit}>Cancel</Button>
            </Stack>
          ) : (
            <>
              <KeywordText>{keyword}</KeywordText>
              <Box onClick={handleEditKeyword} sx={{ cursor: 'pointer' }}>
                <EditPencilIcon width={17} height={17} />
              </Box>
            </>
          )}
        </KeywordItem>
        
        <DateContainer>
          <DateText>{date}</DateText>
          <EditPencilIcon width={17} height={17} />
        </DateContainer>
      </KeywordSection>
    </Box>
  );
};

export default HeatmapResultsHeader;