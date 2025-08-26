import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const DynamicMonthlyChart = ({ reputationData, selectedPeriod }) => {
  const data = reputationData || {
    yourBusiness: { rating: 4.2, reviewCount: 0 }
  };

  const baseRating = Number(data.yourBusiness.rating) || 4.2;
  const totalReviewCount = Number(data.yourBusiness.reviewCount) || 0;
  const months = selectedPeriod === '1 Month' ? 1 : selectedPeriod === '3 Month' ? 3 : selectedPeriod === '6 Month' ? 6 : selectedPeriod === '12 Month' ? 12 : 24;
  
  // Process real review data to generate analysis
  const generateMonthlyData = () => {
    const chartData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Get real reviews from reputationData - handle new GMBService format
    const reviews = Array.isArray(data.reviews) ? data.reviews : (data.reviews?.reviews || []);
    
    // Special handling for 1 Month - show daily data
    if (selectedPeriod === '1 Month') {
      return generateDailyData(reviews);
    }
    
    // If no reviews, return empty data for monthly view
    if (reviews.length === 0) {
      for (let i = 0; i < months; i++) {
        const monthIndex = (currentMonth - months + 1 + i + 12) % 12;
        chartData.push({
          month: monthNames[monthIndex],
          totalReviews: 0,
          starRatings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        });
      }
      return chartData;
    }
    
    // Process real reviews by month
    const reviewsByMonth = {};
    
    reviews.forEach(review => {
      let reviewDate;
      
      // Parse review date from different possible formats
      if (review.createTime) {
        reviewDate = new Date(review.createTime);
      } else if (review.updateTime) {
        reviewDate = new Date(review.updateTime);
      } else {
        // If no date, distribute randomly across the period
        const randomMonthsAgo = Math.floor(Math.random() * months);
        reviewDate = new Date();
        reviewDate.setMonth(reviewDate.getMonth() - randomMonthsAgo);
      }
      
      const monthKey = `${reviewDate.getFullYear()}-${reviewDate.getMonth()}`;
      
      if (!reviewsByMonth[monthKey]) {
        reviewsByMonth[monthKey] = [];
      }
      reviewsByMonth[monthKey].push(review);
    });
    
    // Generate data for each month in the selected period
    if (selectedPeriod === 'All Time') {
      // For "All Time", group all reviews by their actual months
      const allMonthKeys = Object.keys(reviewsByMonth).sort();
      const maxMonths = Math.min(allMonthKeys.length, 24); // Limit to 24 months for display
      
      allMonthKeys.slice(-maxMonths).forEach(monthKey => {
        const [year, monthIndex] = monthKey.split('-').map(Number);
        const monthReviews = reviewsByMonth[monthKey] || [];
        const starDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        monthReviews.forEach(review => {
          const starRating = convertStarRating(review.starRating);
          if (starRating >= 1 && starRating <= 5) {
            starDistribution[starRating]++;
          }
        });
        
        chartData.push({
          month: monthNames[monthIndex],
          totalReviews: monthReviews.length,
          starRatings: starDistribution
        });
      });
    } else {
      // For specific periods (3, 6, 12 months)
      for (let i = 0; i < months; i++) {
        const monthIndex = (currentMonth - months + 1 + i + 12) % 12;
        const year = new Date().getFullYear();
        const monthKey = `${year}-${monthIndex}`;
        
        const monthReviews = reviewsByMonth[monthKey] || [];
        const starDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        // Count actual star ratings from real reviews
        monthReviews.forEach(review => {
          const starRating = convertStarRating(review.starRating);
          if (starRating >= 1 && starRating <= 5) {
            starDistribution[starRating]++;
          }
        });
        
        chartData.push({
          month: monthNames[monthIndex],
          totalReviews: monthReviews.length,
          starRatings: starDistribution
        });
      }
    }
    
    return chartData;
  };

  // Generate daily data for 1 Month view
  const generateDailyData = (reviews) => {
    const dailyData = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Group reviews by day
    const reviewsByDay = {};
    
    reviews.forEach(review => {
      let reviewDate;
      
      // Parse review date
      if (review.createTime) {
        reviewDate = new Date(review.createTime);
      } else if (review.updateTime) {
        reviewDate = new Date(review.updateTime);
      } else {
        return; // Skip reviews without dates for daily view
      }
      
      // Only include reviews from current month
      if (reviewDate.getFullYear() === currentYear && reviewDate.getMonth() === currentMonth) {
        const dayKey = reviewDate.getDate();
        
        if (!reviewsByDay[dayKey]) {
          reviewsByDay[dayKey] = [];
        }
        reviewsByDay[dayKey].push(review);
      }
    });
    
    // Generate data for each day of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayReviews = reviewsByDay[day] || [];
      const starDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      
      // Count star ratings for this day
      dayReviews.forEach(review => {
        const starRating = convertStarRating(review.starRating);
        if (starRating >= 1 && starRating <= 5) {
          starDistribution[starRating]++;
        }
      });
      
      dailyData.push({
        month: day.toString(), // Use day number as label
        totalReviews: dayReviews.length,
        starRatings: starDistribution
      });
    }
    
    return dailyData;
  };

  // Convert Google's star rating enum to numeric value
  const convertStarRating = (starRating) => {
    if (typeof starRating === 'number') return starRating;
    const starMap = {
      'ONE': 1,
      'TWO': 2, 
      'THREE': 3,
      'FOUR': 4,
      'FIVE': 5
    };
    return starMap[starRating] || 0;
  };


  const chartData = generateMonthlyData();
  
  // Star rating colors matching the reference image
  const starColors = {
    5: '#0EA5E9', // Blue for 5 stars
    4: '#10B981', // Green for 4 stars  
    3: '#3B82F6', // Blue for 3 stars
    2: '#F59E0B', // Yellow/Orange for 2 stars
    1: '#EF4444'  // Red for 1 star
  };
  
  // Calculate bar positions and heights
  const chartWidth = 1015;
  const chartHeight = 589;
  const padding = { top: 59, right: 74.5, bottom: 131, left: 74.5 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  
  const dataPoints = chartData.length;
  const barSpacing = dataPoints > 0 ? (plotWidth / dataPoints) : 0;
  // Dynamic bar width: up to 34px, keep ~40% gap between bars, min 6px for visibility
  const barWidth = Math.min(34, Math.max(6, barSpacing * 0.6));
  
  // Find max review count for scaling
  const maxReviewCount = Math.max(...chartData.map(d => d.totalReviews));
  const yAxisMax = Math.ceil(maxReviewCount * 1.2); // Add 20% padding
  
  return (
    <Box sx={{ width: '100%', maxWidth: '1015px', height: '589px', position: 'relative' }}>
      <svg viewBox="0 0 1015 589" width="100%" height="100%" style={{ display: 'block' }}>
        {/* White background with border */}
        <rect 
          x="0.3" 
          y="0.3" 
          width="1014.4" 
          height="588.4" 
          rx="11.32" 
          fill="white" 
          stroke="#F6F0F0" 
          strokeWidth="0.6"
        />
        
        {/* Top horizontal line */}
        <path 
          d="M74.5,59h923.5" 
          stroke="#A0A0AA" 
          strokeOpacity="0.7" 
          strokeWidth="0.8" 
          strokeDasharray="9 9"
        />
        
        {/* Y-axis labels and horizontal grid lines */}
        {(() => {
          const maxReviewCount = Math.max(...chartData.map(p => p.totalReviews));
          const yAxisLabels = maxReviewCount > 0 ? [0, Math.round(maxReviewCount * 0.5), maxReviewCount] : [0, 250, 500];
          
          return yAxisLabels.map((count, index) => {
            const yPos = 59 + (plotHeight * (yAxisLabels.length - 1 - index) / (yAxisLabels.length - 1));
            return (
              <g key={count}>
                {/* Y-axis label */}
                <text 
                  x="43" 
                  y={yPos + 5} 
                  fill="#121927" 
                  fontSize="14" 
                  textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {count}
                </text>
                
                {/* Horizontal grid line */}
                <path 
                  d={`M77,${yPos}h923.5`} 
                  stroke="#A0A0AA" 
                  strokeOpacity="0.7" 
                  strokeWidth="0.8" 
                  strokeDasharray={count === 0 ? "none" : "9 9"}
                />
              </g>
            );
          });
        })()}
        
        {/* Stacked bars and month/day labels */}
        {chartData.map((point, index) => {
          const xPos = padding.left + (index * barSpacing) - (barWidth / 2);
          const maxReviewCount = Math.max(...chartData.map(p => p.totalReviews));
          const totalBarHeight = maxReviewCount > 0 ? (point.totalReviews / maxReviewCount) * plotHeight : (plotHeight * 0.1);
          
          // Calculate stacked segment heights
          let currentY = padding.top + plotHeight;
          const segments = [];
          
          // Create segments for each star rating (1-5)
          [1, 2, 3, 4, 5].forEach(star => {
            const count = point.starRatings[star] || 0;
            if (count > 0) {
              const segmentHeight = (count / point.totalReviews) * totalBarHeight;
              segments.push({
                star,
                height: segmentHeight,
                y: currentY - segmentHeight,
                count
              });
              currentY -= segmentHeight;
            }
          });
          
          return (
            <g key={index}>
              {/* Stacked bar segments */}
              {segments.map((segment, segIndex) => (
                <rect
                  key={`${index}-${segment.star}`}
                  x={xPos}
                  y={segment.y}
                  width={barWidth}
                  height={segment.height}
                  fill={starColors[segment.star]}
                  rx={segIndex === segments.length - 1 ? 17 : 0}
                  ry={segIndex === segments.length - 1 ? 17 : 0}
                >
                  {/* Tooltip on hover */}
                  <title>{`${segment.count} review${segment.count === 1 ? '' : 's'} • ${segment.star}-Star`}</title>
                </rect>
              ))}
              
              {/* Total count bubble above bar */}
              {point.totalReviews > 0 && (
                <g>
                  <rect
                    x={xPos + 17 - 10}
                    y={Math.max(currentY - 24, 20)}
                    width={20}
                    height={16}
                    rx={8}
                    ry={8}
                    fill="#E6F2FA"
                  />
                  <text
                    x={xPos + 17}
                    y={Math.max(currentY - 12, 32)}
                    fill="#121927"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    {point.totalReviews}
                  </text>
                </g>
              )}
              
              {/* X-axis label: for 1 Month show rotated 'day Month' like '1 June' */}
              {(() => {
                const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                const now = new Date();
                const label = (selectedPeriod === '1 Month')
                  ? `${index + 1} ${monthNames[now.getMonth()]}`
                  : point.month;
                const tx = xPos + 17;
                const ty = chartHeight - 100;
                return (
                  <text
                    x={tx}
                    y={ty}
                    fill="#121927"
                    fontSize={selectedPeriod === '1 Month' ? '10' : '14'}
                    textAnchor="end"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    transform={selectedPeriod === '1 Month' ? `rotate(-60 ${tx} ${ty})` : undefined}
                  >
                    {label}
                  </text>
                );
              })()}
            </g>
          );
        })}
        
        {/* Total Review Count Display */}
        <g>
          <text 
            x="74.5" 
            y="40" 
            fill="#121927" 
            fontSize="14" 
            fontWeight="600"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          >
            Total Reviews: {totalReviewCount}
          </text>
        </g>

        {/* Star rating legend */}
        <g>
          {[5, 4, 3, 2, 1].map((stars, index) => {
            const xPos = 345 + (index * 68);
            
            return (
              <g key={stars}>
                <rect 
                  x={xPos} 
                  y="547.5" 
                  width="8" 
                  height="8" 
                  fill={starColors[stars]}
                />
                <text 
                  x={xPos + 18} 
                  y="557" 
                  fill="#121927" 
                  fontSize="12" 
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {stars} Star
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </Box>
  );
};

export default DynamicMonthlyChart;
