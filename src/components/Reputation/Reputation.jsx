import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Rating, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';

const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1600px',
  width: '100%',
  margin: '0 auto'
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: '32px',
  width: '100%'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#121927',
  marginBottom: '8px',
  fontFamily: 'Inter, sans-serif'
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const ReviewsGrid = styled(Stack)(({ theme }) => ({
  gap: '24px',
  width: '100%'
}));

const ReviewCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #f0f0f0',
  width: '100%'
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
  width: '100%'
}));

const ReviewerName = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#121927',
  fontFamily: 'Inter, sans-serif'
}));

const ReviewDate = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#6b7280',
  fontFamily: 'Inter, sans-serif'
}));

const ReviewText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#374151',
  lineHeight: 1.6,
  fontFamily: 'Inter, sans-serif'
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  width: '100%'
  }));

const Reputation = () => {
  const reviews = [
    {
      id: 1,
      reviewer: 'John Smith',
      rating: 5,
      date: '2 days ago',
      text: 'Excellent service and very professional staff. Highly recommended!',
      status: 'responded'
    },
    {
      id: 2,
      reviewer: 'Sarah Johnson',
      rating: 4,
      date: '1 week ago',
      text: 'Good experience overall. The location is convenient and the service was quick.',
      status: 'pending'
    },
    {
      id: 3,
      reviewer: 'Mike Davis',
      rating: 5,
      date: '2 weeks ago',
      text: 'Outstanding quality and customer service. Will definitely come back!',
      status: 'responded'
    },
    {
      id: 4,
      reviewer: 'Emily Wilson',
      rating: 3,
      date: '3 weeks ago',
      text: 'Average service. Could be improved in terms of waiting time.',
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'responded' ? 'success' : 'warning';
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Reputation Management</PageTitle>
          <PageSubtitle>
            Monitor and respond to customer reviews to maintain your business reputation
          </PageSubtitle>
        </PageHeader>

        <ReviewsGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <CardContent sx={{ padding: '24px', width: '100%' }}>
                <ReviewHeader>
                  <Box>
                    <ReviewerName>{review.reviewer}</ReviewerName>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <ReviewDate>{review.date}</ReviewDate>
                    </Box>
                  </Box>
                  <StatusChip 
                    label={review.status === 'responded' ? 'Responded' : 'Pending Response'}
                    color={getStatusColor(review.status)}
                    size="small"
                  />
                </ReviewHeader>
                <ReviewText>{review.text}</ReviewText>
              </CardContent>
            </ReviewCard>
          ))}
        </ReviewsGrid>
      </PageContainer>
    </DashboardLayout>
  );
};

export default Reputation;