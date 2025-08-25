import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Dialog, DialogTitle, DialogContent, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

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

const ReviewsOverview = () => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const reviewsData = [
    { rating: '5.0', count: '14k reviews' },
    { rating: '4.0', count: '4k reviews' },
    { rating: '3.0', count: '7k reviews' },
    { rating: '2.0', count: '11k reviews' },
    { rating: '1.0', count: '8k reviews' }
  ];
  const sampleReviews = [
    {
      author: 'John D.',
      rating: 5,
      text: 'Great service and quick response. Highly recommended!'
    },
    {
      author: 'Priya S.',
      rating: 4,
      text: 'Good overall experience. Could improve waiting time.'
    },
    {
      author: 'Aman K.',
      rating: 3,
      text: 'Average. Got the job done but not very personable.'
    }
  ];

  return (
    <OverviewContainer>
      <OverviewContent>
        <TopSection>
          <RatingSection>
            <RatingDisplay>
              <RatingNumber>4.80</RatingNumber>
              <StarRating src="/images/star-rating.svg" alt="4.8 star rating" />
            </RatingDisplay>
            <VerticalDivider />
          </RatingSection>
          
          <ReviewsChart src="/images/reviews-bar-chart.svg" alt="Reviews distribution chart" />
          
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
            <StatNumber>12</StatNumber>
            <StatLabel>Reviews In Last 7 Days</StatLabel>
          </StatCard>
          <StatDivider />
          <StatCard>
            <StatNumber>12</StatNumber>
            <StatLabel>Reviews In Last 30 Days</StatLabel>
          </StatCard>
        </BottomSection>
      </OverviewContent>
      
      <ReadReviewButton sx={{ marginTop: '24px' }} onClick={() => setReviewsOpen(true)}>
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
            {sampleReviews.map((r, idx) => (
              <Box key={idx}>
                <Stack gap={0.5}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#121927' }}>
                      {r.author}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#0B91D6' }}>
                      {r.rating}.0 ★
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#30302E' }}>
                    {r.text}
                  </Typography>
                </Stack>
                {idx < sampleReviews.length - 1 && <Divider sx={{ mt: 1.5 }} />}
              </Box>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </OverviewContainer>
  );
};

export default ReviewsOverview;