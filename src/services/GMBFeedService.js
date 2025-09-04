/**
 * GMB Feed Service for calculating GMB posts scoring
 * Fetches posts from the last 90 days and calculates feed activity score
 */

class GMBFeedService {
  constructor() {
    this.baseUrl = 'https://mybusiness.googleapis.com/v4';
    this.maxScore = 30;
    this.benchmarkPostCount = 8; // Benchmark: 8 posts per 90 days
  }

  /**
   * Fetch GMB posts from the last 90 days for a given location
   * @param {string} accountId - GMB Account ID
   * @param {string} locationId - GMB Location ID
   * @param {string} accessToken - OAuth 2.0 Access Token
   * @returns {Promise<Object>} Object containing posts count, posts, and date range
   */
  async fetchLast90DaysPosts(accountId, locationId, accessToken) {
    try {
      const url = `${this.baseUrl}/accounts/${accountId}/locations/${locationId}/localPosts`;
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      console.log(`[GMBFeed] Fetching posts from last 90 days (since ${ninetyDaysAgo.toISOString().split('T')[0]})...`);

      const allPostsLast90Days = [];
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
        const posts = data.localPosts || [];

        // Filter posts from last 90 days based on updateTime
        const recentPosts = posts.filter(post => {
          if (!post.updateTime) return false;
          
          // Parse updateTime (format: "2025-08-19T13:11:15.865931Z")
          const postDate = new Date(post.updateTime);
          return postDate >= ninetyDaysAgo;
        });

        allPostsLast90Days.push(...recentPosts);

        // Handle pagination using nextPageToken
        nextPageToken = data.nextPageToken;
        
        console.log(`[GMBFeed] Page fetched: ${posts.length} total posts, ${recentPosts.length} from last 90 days. Running total: ${allPostsLast90Days.length}`);

        // Stop if no more pages
        if (!nextPageToken) {
          break;
        }

      } while (nextPageToken);

      console.log(`[GMBFeed] Final count: ${allPostsLast90Days.length} posts from last 90 days`);

      // Log sample of recent posts for debugging
      if (allPostsLast90Days.length > 0) {
        console.log('[GMBFeed] Sample recent posts:');
        allPostsLast90Days.slice(0, 3).forEach(post => {
          console.log(`- ${post.summary?.substring(0, 50) || 'No summary'}... (${post.topicType || 'STANDARD'}) - ${post.updateTime}`);
        });
      }

      return {
        postsCount: allPostsLast90Days.length,
        posts: allPostsLast90Days,
        dateRange: {
          from: ninetyDaysAgo.toISOString(),
          to: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('[GMBFeed] Error fetching posts:', error);
      throw error;
    }
  }

  /**
   * Calculate GMB Feed score based on posts from last 90 days
   * Formula: MIN((Post_Count_Last_90_Days / Benchmark_Post_Count) * Max_Score, Max_Score)
   * @param {number} postsLast90Days - Number of posts in last 90 days
   * @param {number} benchmarkPostCount - Benchmark post count (default: 8)
   * @returns {Object} GMB Feed score data
   */
  calculateGMBFeedScore(postsLast90Days = 0, benchmarkPostCount = null) {
    const benchmark = benchmarkPostCount || this.benchmarkPostCount;
    const rawScore = (postsLast90Days / benchmark) * this.maxScore;
    const feedScore = Math.min(rawScore, this.maxScore);
    const percentage = Math.round((feedScore / this.maxScore) * 100);

    // Determine performance level
    let level = 'Poor';
    if (percentage >= 80) level = 'Excellent';
    else if (percentage >= 60) level = 'Good';
    else if (percentage >= 40) level = 'Average';

    console.log('[GMBFeedService] GMB Feed Score Calculation:');
    console.log(`[GMBFeedService] - Posts Last 90 Days: ${postsLast90Days}`);
    console.log(`[GMBFeedService] - Benchmark Post Count: ${benchmark}`);
    console.log(`[GMBFeedService] - Raw Score: (${postsLast90Days} / ${benchmark}) * ${this.maxScore} = ${rawScore}`);
    console.log(`[GMBFeedService] - Final GMB Feed Score: ${Math.round(feedScore * 10) / 10} (capped at ${this.maxScore})`);
    console.log(`[GMBFeedService] - Percentage: ${percentage}%`);
    console.log(`[GMBFeedService] - Performance Level: ${level}`);

    const result = {
      feedScore: Math.round(feedScore * 10) / 10, // Round to 1 decimal
      percentage,
      level,
      postsLast90Days,
      benchmarkPostCount: benchmark,
      recommendations: this.generateFeedRecommendations(postsLast90Days, benchmark, percentage)
    };

    console.log('[GMBFeedService] GMB Feed Score Result:', result);
    return result;
  }

  /**
   * Generate recommendations based on GMB feed performance
   */
  generateFeedRecommendations(newPosts, benchmark, percentage) {
    const recommendations = [];

    if (percentage >= 150) {
      recommendations.push('Outstanding GMB posting activity! You\'re posting 50% above benchmark.');
      recommendations.push('Continue your excellent content strategy and maintain posting consistency.');
    } else if (percentage >= 100) {
      recommendations.push('Good GMB posting frequency! You\'re meeting or exceeding the benchmark.');
      recommendations.push('Consider diversifying post types (offers, events, products, updates).');
    } else if (percentage >= 75) {
      recommendations.push(`You're at ${percentage}% of benchmark. Consider increasing posting frequency.`);
      recommendations.push('Aim for 2-3 posts per week to improve engagement and visibility.');
    } else if (percentage >= 50) {
      recommendations.push(`GMB posting activity is below average at ${percentage}% of benchmark.`);
      recommendations.push('Focus on regular posting schedule and engaging content creation.');
    } else {
      recommendations.push(`Critical: Only ${newPosts} posts in 90 days vs ${benchmark} benchmark.`);
      recommendations.push('Implement immediate GMB posting strategy with regular content calendar.');
    }

    return recommendations;
  }

  /**
   * Get feed data from existing profile data (if available)
   * This method can be used when GMB API access is not available
   */
  getFeedFromProfileData(profileData) {
    try {
      // Check if feed data is already available in profile
      const feedData = profileData?.feed || profileData?.gmbPosts;
      
      if (feedData && feedData.last90Days !== undefined) {
        console.log('[GMBFeed] Using existing feed data from profile:', feedData);
        return this.calculateGMBFeedScore(feedData.last90Days, feedData.benchmark);
      }

      // Fallback: estimate from total posts and creation date
      const totalPosts = profileData?.postsCount || profileData?.gmbPosts || 0;
      const createdDate = profileData?.createdDate || profileData?.createTime;
      
      if (createdDate && totalPosts > 0) {
        const daysSinceCreation = Math.max(1, Math.floor((Date.now() - new Date(createdDate)) / (1000 * 60 * 60 * 24)));
        const avgPostsPer90Days = (totalPosts / daysSinceCreation) * 90;
        const estimatedPosts = Math.max(0, Math.round(avgPostsPer90Days));
        
        console.log('[GMBFeed] Estimating feed activity from profile data:', {
          totalPosts,
          daysSinceCreation,
          estimatedLast90Days: estimatedPosts
        });
        
        return this.calculateGMBFeedScore(estimatedPosts);
      }

      console.log('[GMBFeed] No feed data available in profile');
      return null;

    } catch (error) {
      console.error('[GMBFeed] Error processing profile feed data:', error);
      return null;
    }
  }
}

// Export singleton instance
const gmbFeedService = new GMBFeedService();
export default gmbFeedService;
