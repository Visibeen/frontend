import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, IconButton, Divider, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DynamicReviewsChart from './DynamicReviewsChart';

const OverviewContainer = styled(Box)(({ theme }) => ({
  border: '0.6px solid #F6F0F0',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#ffffff'
}));

const OverviewContent = styled(Stack)(({ theme }) => ({
  gap: '21px'
}));

const TopSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '32px',
  alignItems: 'flex-start'
}));

const RatingSection = styled(Stack)(({ theme }) => ({
  gap: '38px',
  flexDirection: 'row',
  alignItems: 'center'
}));

const RatingDisplay = styled(Stack)(({ theme }) => ({
  gap: '4px',
  alignItems: 'center'
}));

const RatingNumber = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#121927'
}));

const StarRating = styled('img')(({ theme }) => ({
  width: '116px',
  height: '24px'
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '154px',
  backgroundColor: '#A0A0AA',
  border: '1px solid #A0A0AA'
}));

const ReviewsChart = styled('img')(({ theme }) => ({
  width: '556px',
  height: '144px'
}));

const ReviewsList = styled(Stack)(({ theme }) => ({
  gap: '17px'
}));

const ReviewItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '-6px',
  alignItems: 'center'
}));

const ReviewRating = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#A0A0AA',
  minWidth: '21px'
}));

const ReviewCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  marginLeft: '16px',
  fontWeight: 400,
  color: '#121927'
}));

const BottomSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '44px',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StatCard = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '16px'
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '42px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#121927',
  textAlign: 'center'
}));

const StatDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '103px',
  backgroundColor: '#A0A0AA',
  border: '1px solid #A0A0AA'
}));

const ReadReviewButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '150px',
  height: '45px',
  marginLeft: '520px',
  textTransform: 'capitalize',
  padding: '8px 24px',
  borderRadius: '4px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#0980C2'
  }
}));

const ModalTitleRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px'
}));

const CloseBtn = styled(IconButton)(({ theme }) => ({
  borderRadius: 8,
  width: 32,
  height: 32,
}));

const ReviewsOverview = ({ reputationData }) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use real data if available, otherwise fallback to mock data
  const data = reputationData || {
    yourBusiness: { rating: 4.8, reviewCount: 44 },
    reviews: []
  };
  
  // Generate rating distribution based on real data
  const generateRatingDistribution = (avgRating, totalReviews, actualReviews = []) => {
    const safeRating = Number(avgRating) || 4.2;
    const safeTotal = Number(totalReviews) || 0;
    
    // If we have actual reviews, calculate real distribution
    if (actualReviews && actualReviews.length > 0) {
      const distribution = [];
      for (let i = 5; i >= 1; i--) {
        const count = actualReviews.filter(review => {
          const rating = typeof review.starRating === 'string' ? 
            ({ ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }[review.starRating] || 0) : 
            Number(review.starRating) || 0;
          return Math.round(rating) === i;
        }).length;
        
        distribution.push({
          rating: `${i}.0`,
          count: count > 1000 ? `${Math.floor(count/1000)}k reviews` : `${count} reviews`
        });
      }
      return distribution;
    }
    
    const distribution = [];
    for (let i = 5; i >= 1; i--) {
      let percentage;
      if (i === Math.floor(safeRating)) {
        percentage = 0.4; // 40% for the main rating
      } else if (Math.abs(i - safeRating) === 1) {
        percentage = 0.25; // 25% for adjacent ratings
      } else {
        percentage = Math.max(0.05, 0.1 / Math.max(1, Math.abs(i - safeRating))); // Decreasing for others
      }
      
      const count = Math.max(0, Math.floor(safeTotal * percentage));
      distribution.push({
        rating: `${i}.0`,
        count: count > 1000 ? `${Math.floor(count/1000)}k reviews` : `${count} reviews`
      });
    }
    return distribution;
  };
  
  // Handle new GMBService format - reviews might be in data.reviews.reviews
  const reviewsArray = Array.isArray(data.reviews) ? data.reviews : (data.reviews?.reviews || []);
  
  const reviewsData = generateRatingDistribution(data.yourBusiness.rating, data.yourBusiness.reviewCount, reviewsArray);
  
  // Compute average rating once for star + number
  const avgRatingValue = reviewsArray.length > 0 ?
    Number((reviewsArray.reduce((sum, review) => {
      const rating = typeof review.starRating === 'string' ? 
        ({ ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }[review.starRating] || 0) : 
        Number(review.starRating) || 0;
      return sum + rating;
    }, 0) / reviewsArray.length).toFixed(1)) :
    Number((Number(data.yourBusiness.rating) || 4.0).toFixed(1));

  // Use real reviews if available, otherwise use sample data
  const displayReviews = reviewsArray && reviewsArray.length > 0 
    ? reviewsArray.slice(0, 5).map(review => ({
        author: review.reviewer?.displayName || 'Anonymous',
        rating: review.starRating || 5,
        text: review.comment || 'No comment provided',
        date: review.createTime ? new Date(review.createTime).toLocaleDateString() : 'Recent'
      }))
    : [
        {
          author: 'John D.',
          rating: 5,
          text: 'Great service and quick response. Highly recommended!',
          date: 'Recent'
        },
        {
          author: 'Priya S.',
          rating: 4,
          text: 'Good overall experience. Could improve waiting time.',
          date: 'Recent'
        },
        {
          author: 'Aman K.',
          rating: 3,
          text: 'Average. Got the job done but not very personable.',
          date: 'Recent'
        }
      ];
  
  // Calculate recent review stats with safe number handling
  const calculateRecentReviews = (reviews, days) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return days === 7 ? 2 : 8; // Default values
    }
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return reviews.filter(r => {
        if (!r.createTime) return false;
        const reviewDate = new Date(r.createTime);
        return !isNaN(reviewDate.getTime()) && reviewDate >= cutoffDate;
      }).length;
    } catch (error) {
      console.warn('Error calculating recent reviews:', error);
      return days === 7 ? 2 : 8;
    }
  };
  
  const recentReviews7Days = calculateRecentReviews(data.reviews, 7);
  const recentReviews30Days = calculateRecentReviews(data.reviews, 30);

  return (
    <OverviewContainer>
      <OverviewContent>
        <TopSection>
          <RatingSection>
            <RatingDisplay>
              <RatingNumber>{avgRatingValue.toFixed(1)}</RatingNumber>
              <Rating 
                value={avgRatingValue}
                precision={0.1}
                readOnly
                sx={{
                  color: '#FFC107',
                  '& .MuiRating-iconEmpty': { color: '#E0E0E0' }
                }}
              />
            </RatingDisplay>
            <VerticalDivider />
          </RatingSection>
          
          <DynamicReviewsChart reputationData={reputationData} />
          
          <ReviewsList>
            {reviewsData.map((review, index) => (
              <ReviewItem key={index}>
                <ReviewRating>{review.rating}</ReviewRating>
                <ReviewCount>{review.count}</ReviewCount>
              </ReviewItem>
            ))}
          </ReviewsList>
        </TopSection>

        <BottomSection>
          <StatCard>
            <StatNumber>{recentReviews7Days}</StatNumber>
            <StatLabel>Reviews In Last 7 Days</StatLabel>
          </StatCard>
          <StatDivider />
          <StatCard>
            <StatNumber>{recentReviews30Days}</StatNumber>
            <StatLabel>Reviews In Last 30 Days</StatLabel>
          </StatCard>
        </BottomSection>
      </OverviewContent>
      
      <ReadReviewButton sx={{ marginTop: '24px' }} onClick={() => navigate('/reviews-management')}>
        Read Reviews
      </ReadReviewButton>

      <Dialog
        open={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="reviews-dialog-title"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle id="reviews-dialog-title" sx={{ p: 2 }}>
          <ModalTitleRow>
            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#121927' }}>
              Recent Reviews
            </Typography>
            <CloseBtn aria-label="Close" onClick={() => setReviewsOpen(false)}>
              <CloseIcon fontSize="small" />
            </CloseBtn>
          </ModalTitleRow>
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 2 }}>
          <Stack gap={2}>
            {displayReviews.map((r, idx) => (
              <Box key={idx}>
                <Stack gap={0.5}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#121927' }}>
                      {r.author}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#0B91D6' }}>
                        {r.rating}.0 ★
                      </Typography>
                      <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#666' }}>
                        {r.date}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#30302E' }}>
                    {r.text}
                  </Typography>
                </Stack>
                {idx < displayReviews.length - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </OverviewContainer>
  );
};

export default ReviewsOverview;