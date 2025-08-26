import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExternalLinkMapIcon from '../icons/ExternalLinkMapIcon';
import StarRatingMapIcon from '../icons/StarRatingMapIcon';
import DropdownArrowMapIcon from '../icons/DropdownArrowMapIcon';
import BusinessExternalIcon from '../icons/BusinessExternalIcon';
import StarRatingBusinessIcon from '../icons/StarRatingBusinessIcon';

const ListingsContainer = styled(Stack)(({ theme }) => ({
  gap: '16px',
  height: '100%'
}));

const YouCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#0B91D6',
  borderRadius: '8px',
  padding: '16px',
  color: '#ffffff'
}));

const YouHeader = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px'
}));

const YouLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#ffffff'
}));

const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#ffffff',
  marginBottom: '4px'
}));

const BusinessRank = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#ffffff',
  marginLeft: '8px'
}));

const BusinessAddress = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#ffffff',
  marginBottom: '8px'
}));

const ReviewsRow = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '8px'
}));

const ReviewsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#ffffff'
}));

const ReviewsRating = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#ffffff'
}));

const SortSection = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '131px',
  marginBottom: '16px'
}));

const SortText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#30302E'
}));

const BusinessCard = styled(Box)(({ theme }) => ({
  border: '0.6px solid #F6F0F0',
  borderRadius: '7px',
  padding: '12px',
  backgroundColor: '#ffffff'
}));

const BusinessHeader = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '178px',
  marginBottom: '2px'
}));

const BusinessNameRow = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '3px'
}));

const BusinessNameText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#121927'
}));

const BusinessRankText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#A0A0AA'
}));

const BusinessAddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#30302E',
  marginBottom: '5px'
}));

const BusinessReviewsRow = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '8px'
}));

const BusinessReviewsLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const BusinessReviewsRating = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#A0A0AA'
}));

const BusinessListings = ({ businesses, businessName }) => {
  const youBusiness = businesses.find(b => b.isYou);
  const otherBusinesses = businesses.filter(b => !b.isYou);

  return (
    <ListingsContainer>
      {/* YOU Card */}
      {youBusiness && (
        <YouCard>
          <YouHeader>
            <YouLabel>YOU</YouLabel>
            <ExternalLinkMapIcon width={18} height={18} />
          </YouHeader>
          
          <Stack direction="row" alignItems="center">
            <BusinessName>{youBusiness.name}</BusinessName>
            <BusinessRank>{youBusiness.rank}</BusinessRank>
          </Stack>
          
          <BusinessAddress>{youBusiness.address}</BusinessAddress>
          
          <ReviewsRow>
            <ReviewsLabel>Reviews :</ReviewsLabel>
            <StarRatingMapIcon width={88} height={20} />
            <ReviewsRating>{youBusiness.rating} ({youBusiness.reviews})</ReviewsRating>
          </ReviewsRow>
        </YouCard>
      )}

      {/* Sort Section */}
      <SortSection>
        <SortText>Sort by : Business name</SortText>
        <DropdownArrowMapIcon width={14} height={8} />
      </SortSection>

      {/* Other Businesses */}
      <Stack spacing={2}>
        {otherBusinesses.map((business, index) => (
          <BusinessCard key={index}>
            <BusinessHeader>
              <BusinessNameRow>
                <BusinessNameText>{business.name}</BusinessNameText>
                <BusinessRankText>{business.rank}</BusinessRankText>
              </BusinessNameRow>
              <BusinessExternalIcon width={18} height={18} />
            </BusinessHeader>
            
            <BusinessAddressText>{business.address}</BusinessAddressText>
            
            <BusinessReviewsRow>
              <BusinessReviewsLabel>Reviews :</BusinessReviewsLabel>
              <StarRatingBusinessIcon width={88} height={20} />
              <BusinessReviewsRating>{business.rating.toFixed(2)} ({business.reviews})</BusinessReviewsRating>
            </BusinessReviewsRow>
          </BusinessCard>
        ))}
      </Stack>
    </ListingsContainer>
  );
};

export default BusinessListings;