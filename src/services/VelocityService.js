/**
 * Velocity Service for calculating review velocity scores
 * Fetches reviews from the last 30 days and calculates velocity metrics
 */

class VelocityService {
  constructor() {
    this.baseUrl = 'https://mybusiness.googleapis.com/v4';
    this.maxScore = 12;
    this.benchmarkReviewCount = 20; // Updated benchmark to 20
  }

  /**
   * Fetch reviews from the last 30 days for a given location
   * @param {string} accountId - GMB Account ID
   * @param {string} locationId - GMB Location ID
   * @param {string} accessToken - OAuth 2.0 Access Token
   * @returns {Promise<Object>} Object containing reviews count, reviews, and date range
   */
  async fetchLast30DaysReviews(accountId, locationId, accessToken) {
    try {
      const url = `${this.baseUrl}/accounts/${accountId}/locations/${locationId}/reviews`;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);

      console.log(`[Velocity] Fetching reviews from last 30 days (since ${cutoffDate.toISOString().split('T')[0]})...`);

      const allReviewsLast30Days = [];
      let nextPageToken = null;

      do {
        const params = new URLSearchParams();
        if (nextPageToken) {
          params.append('pageToken', nextPageToken);
        }

        const requestUrl = `${url}${params.toString() ? '?' + params.toString() : ''}`;
        
        const response = await fetch(requestUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const reviews = data.reviews || [];

        // Filter reviews from last 30 days based on createTime
        const recentReviews = reviews.filter(review => {
          if (!review.createTime) return false;
          
          // Parse createTime (format: "2025-08-12T09:15:00Z")
          const reviewDate = new Date(review.createTime);
          return reviewDate >= cutoffDate;
        });

        allReviewsLast30Days.push(...recentReviews);

        // Handle pagination using nextPageToken
        nextPageToken = data.nextPageToken;
        
        console.log(`[Velocity] Page fetched: ${reviews.length} total reviews, ${recentReviews.length} from last 30 days. Running total: ${allReviewsLast30Days.length}`);

        // Stop if no more pages
        if (!nextPageToken) {
          break;
        }

      } while (nextPageToken);

      console.log(`[Velocity] Final count: ${allReviewsLast30Days.length} reviews from last 30 days`);

      // Log sample of recent reviews for debugging
      if (allReviewsLast30Days.length > 0) {
        console.log('[Velocity] Sample recent reviews:');
        allReviewsLast30Days.slice(0, 3).forEach(review => {
          console.log(`- ${review.reviewer?.displayName || 'Anonymous'}: ${review.starRating} stars - "${review.comment?.substring(0, 50) || 'No comment'}..."`);
        });
      }

      return {
        reviewsCount: allReviewsLast30Days.length,
        reviews: allReviewsLast30Days,
        dateRange: {
          from: cutoffDate.toISOString(),
          to: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('[Velocity] Error fetching reviews:', error);
      throw error;
    }
  }

  /**
   * Calculate velocity score based on reviews from last 30 days
   * Formula: MIN((New_Reviews_Last_30_Days / Benchmark_Review_Count) * Max_Score, Max_Score)
   * @param {number} reviewsLast30Days - Number of reviews in last 30 days
   * @param {number} benchmarkReviewCount - Benchmark review count (default: 5)
   * @returns {Object} Velocity score data
   */
  calculateVelocityScore(reviewsLast30Days = 0, benchmarkReviewCount = null) {
    const benchmark = benchmarkReviewCount || this.benchmarkReviewCount;
    const rawScore = (reviewsLast30Days / benchmark) * this.maxScore;
    const velocityScore = Math.min(rawScore, this.maxScore);
    const percentage = Math.round((velocityScore / this.maxScore) * 100);

    // Determine performance level
    let level = 'Poor';
    if (percentage >= 80) level = 'Excellent';
    else if (percentage >= 60) level = 'Good';
    else if (percentage >= 40) level = 'Average';

    console.log('[VelocityService] Velocity Score Calculation:');
    console.log(`[VelocityService] - Reviews Last 30 Days: ${reviewsLast30Days}`);
    console.log(`[VelocityService] - Benchmark Review Count: ${benchmark}`);
    console.log(`[VelocityService] - Raw Score: (${reviewsLast30Days} / ${benchmark}) * ${this.maxScore} = ${rawScore}`);
    console.log(`[VelocityService] - Final Velocity Score: ${Math.round(velocityScore * 10) / 10} (capped at ${this.maxScore})`);
    console.log(`[VelocityService] - Percentage: ${percentage}%`);
    console.log(`[VelocityService] - Performance Level: ${level}`);

    const result = {
      velocityScore: Math.round(velocityScore * 10) / 10, // Round to 1 decimal
      percentage,
      level,
      reviewsLast30Days,
      benchmarkReviewCount: benchmark,
      recommendations: this.generateVelocityRecommendations(reviewsLast30Days, benchmark, percentage)
    };

    console.log('[VelocityService] Velocity Score Result:', result);
    return result;
  }


  /**
   * Generate recommendations based on velocity performance
   */
  generateVelocityRecommendations(newReviews, benchmark, percentage) {
    const recommendations = [];

    if (percentage >= 150) {
      recommendations.push('Outstanding review velocity! You\'re generating reviews 50% above benchmark.');
      recommendations.push('Continue your excellent customer engagement strategies.');
    } else if (percentage >= 100) {
      recommendations.push('Good review velocity! You\'re meeting or exceeding the benchmark.');
      recommendations.push('Consider strategies to maintain this momentum.');
    } else if (percentage >= 75) {
      recommendations.push(`You're at ${percentage}% of benchmark. Consider increasing customer review requests.`);
      recommendations.push('Implement post-service follow-up emails or SMS to encourage reviews.');
    } else if (percentage >= 50) {
      recommendations.push(`Review velocity is below average at ${percentage}% of benchmark.`);
      recommendations.push('Focus on improving customer satisfaction and actively requesting reviews.');
    } else {
      recommendations.push(`Critical: Only ${newReviews} reviews in 30 days vs ${benchmark} benchmark.`);
      recommendations.push('Implement immediate review generation strategies and customer engagement programs.');
    }

    return recommendations;
  }

  /**
   * Get velocity data from existing profile data (if available)
   * This method can be used when GMB API access is not available
   */
  getVelocityFromProfileData(profileData) {
    try {
      // Check if velocity data is already available in profile
      const velocityData = profileData?.velocity || profileData?.reviewVelocity;
      
      if (velocityData && velocityData.last30Days !== undefined) {
        console.log('[Velocity] Using existing velocity data from profile:', velocityData);
        return this.calculateVelocityScore(velocityData.last30Days, velocityData.benchmark);
      }

      // Fallback: estimate from total reviews and creation date
      const totalReviews = profileData?.reviewsCount || profileData?.userRatingCount || 0;
      const createdDate = profileData?.createdDate || profileData?.createTime;
      
      if (createdDate && totalReviews > 0) {
        const daysSinceCreation = Math.max(1, Math.floor((Date.now() - new Date(createdDate)) / (1000 * 60 * 60 * 24)));
        const avgReviewsPerMonth = (totalReviews / daysSinceCreation) * 30;
        const estimatedLast30Days = Math.round(avgReviewsPerMonth);
        
        console.log('[Velocity] Estimated velocity from profile data:', {
          totalReviews,
          daysSinceCreation,
          estimatedLast30Days
        });
        
        return this.calculateVelocityScore(estimatedLast30Days);
      }

      // No velocity data available
      console.warn('[Velocity] No velocity data available in profile');
      return null;

    } catch (error) {
      console.error('[Velocity] Error getting velocity from profile data:', error);
      return null;
    }
  }
}

export default new VelocityService();
