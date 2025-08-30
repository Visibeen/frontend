import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Checkbox, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import FilterPopup from './FilterPopup';
import SortPopup from './SortPopup';
import AIIcon from '../icons/AIIcon';
import MultipleReplyIcon from '../icons/MultipleReplyIcon';
import SortIcon from '../icons/SortIcon';
import FilterIcon from '../icons/FilterIcon';
import GMBService from '../../services/GMBService';

const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  minHeight: 'calc(100vh - 160px)', // Account for header and footer
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '80px' // ensure space so sticky button doesn't overlap footer
}));

const Header = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '26px'
}));

const HeaderLeft = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0b91d6'
}));

const RatingRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px'
}));

const RatingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: 600,
  color: '#121927'
}));

const ReviewCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#a0a0aa'
}));

const ExportButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  border: '0.6px solid #a0a0aa',
  borderRadius: '4px',
  color: '#121927',
  width: '140px',
  height: '44px',
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

const SelectAllRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '14px',
  width: '140px',
  height: '44px',
  marginBottom: '26px'
}));

const SelectAllText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#000000'
}));

const ActionButtonsContainer = styled(Stack)(({ theme }) => ({
  gap: '26px',
  marginBottom: '26px'
}));

const ActionRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '18px'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  border: '0.6px solid #a0a0aa',
  borderRadius: '8px',
  color: '#0b91d6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  width: '140px',
  height: '44px',
  textTransform: 'none',
  padding: '8px 16px',
  gap: '10px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.04)'
  }
}));

const AIButton = styled(ActionButton)(({ theme }) => ({
  '& .ai-icon': {
    backgroundColor: '#fbbc05'
  }
}));

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0b91d6',
  borderRadius: '8px',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  width: '140px',
  height: '44px',
  textTransform: 'none',
  padding: '8px 16px',
  gap: '10px',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const ReviewsContainer = styled(Box)(({ theme }) => ({
  border: '0.6px solid #f6f0f0',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#ffffff'
}));

const CreatePostButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '140px',
  height: '44px',
  textTransform: 'capitalize',
  borderRadius: '6px',
  padding: '10px 20px',
  alignSelf: 'center',
  marginRight: '24px',
  marginTop: '24px',
  '&:hover': {
    backgroundColor: '#45a049'
  }
}));

const ReviewsManagement = () => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [filters, setFilters] = useState({
    duration: 'All time',
    rating: '5',
    response: 'Positive'
  });
  const [sortBy, setSortBy] = useState('new');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  // Fetch real reviews using selected account/location from Reputation page (stored in localStorage)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError('');
        const account = JSON.parse(localStorage.getItem('selectedGMBAccount') || 'null');
        const location = JSON.parse(localStorage.getItem('selectedGMBLocation') || 'null');
        if (!account?.name || !location?.name) {
          setReviews([]);
          setLoading(false);
          return;
        }
        const apiReviews = await GMBService.getReviews(undefined, account.name, location.name);
        const apiArray = Array.isArray(apiReviews) ? apiReviews : (apiReviews?.reviews || []);
        // Map to ReviewCard shape
        const toNumeric = (star) => {
          if (typeof star === 'number') return star;
          const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
          return map[String(star || '').toUpperCase()] || 0;
        };
        const mapped = apiArray.map((r, idx) => ({
          id: r.name || idx,
          author: r.reviewer?.displayName || 'Anonymous',
          date: r.createTime ? new Date(r.createTime).toLocaleDateString() : 'Recent',
          createdAt: r.createTime ? new Date(r.createTime).getTime() : Date.now(),
          rating: toNumeric(r.starRating),
          platform: 'Google',
          text: r.comment || 'No comment provided',
          avatar: r.reviewer?.profilePhotoUrl || '/images/karen-avatar.jpg'
        }));
        setReviews(mapped);
      } catch (e) {
        console.error('Failed to load reviews:', e);
        setError('Failed to load reviews');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Reset to first page whenever reviews list updates
  useEffect(() => {
    setPage(0);
    setSelectedReviews([]);
  }, [reviews]);

  // Reset to first page when filters/sort change
  useEffect(() => {
    setPage(0);
    setSelectedReviews([]);
  }, [filters, sortBy]);

  // Reset selection when page changes
  useEffect(() => {
    setSelectAll(false);
    setSelectedReviews([]);
  }, [page]);

  // Apply filters
  const now = Date.now();
  const durationToMs = (label) => {
    switch (label) {
      case 'Last 7 days': return 7 * 24 * 60 * 60 * 1000;
      case 'Last 30 days': return 30 * 24 * 60 * 60 * 1000;
      case 'Last 90 days': return 90 * 24 * 60 * 60 * 1000;
      case 'Last year': return 365 * 24 * 60 * 60 * 1000;
      default: return null; // All time
    }
  };

  const ratingToSentiment = (rating) => {
    if (rating >= 4) return 'Positive';
    if (rating <= 2) return 'Negative';
    return 'Neutral';
  };

  const filtered = reviews.filter(r => {
    // duration filter
    const dur = durationToMs(filters.duration);
    if (dur) {
      const cutoff = now - dur;
      if ((r.createdAt || now) < cutoff) return false;
    }
    // rating filter (treat as minimum rating)
    const minRating = Number(filters.rating || '1');
    if ((Number(r.rating) || 0) < minRating) return false;
    // response/sentiment filter
    if (filters.response && filters.response !== 'All') {
      if (ratingToSentiment(Number(r.rating) || 0) !== filters.response) return false;
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'old':
        return (a.createdAt || 0) - (b.createdAt || 0);
      case 'high-rating':
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      case 'low-rating':
        return (Number(a.rating) || 0) - (Number(b.rating) || 0);
      case 'new':
      default:
        return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  const avgRating = sorted.length
    ? (sorted.reduce((s, r) => s + (Number(r.rating) || 0), 0) / sorted.length)
    : 0;

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const pageReviews = sorted.slice(startIndex, endIndex);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedReviews(pageReviews.map(r => r.id));
    } else {
      setSelectedReviews([]);
    }
  };

  const handleReviewSelect = (reviewId, checked) => {
    if (checked) {
      setSelectedReviews([...selectedReviews, reviewId]);
    } else {
      setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
      setSelectAll(false);
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
    setFilterOpen(true);
  };

  const handleSortClick = (event) => {
    setSortAnchor(event.currentTarget);
    setSortOpen(true);
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleAIReply = () => {
    navigate('/set-auto-reply');
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
    setFilterAnchor(null);
  };

  const handleSortClose = () => {
    setSortOpen(false);
    setSortAnchor(null);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    handleFilterClose();
  };

  const handleSortApply = (newSort) => {
    setSortBy(newSort);
    handleSortClose();
  };

  return (
    <ContentContainer>
      <Header>
        <HeaderLeft>
          <Title>My Reviews</Title>
          <RatingRow>
            <RatingText>{avgRating ? avgRating.toFixed(2) : '--'}</RatingText>
            <Box sx={{ width: '116px', height: '24px', ml: 1 }} />
            <ReviewCount sx={{ ml: 2 }}>{sorted.length} reviews</ReviewCount>
          </RatingRow>
        </HeaderLeft>
        
        <ExportButton>
          <Box sx={{ width: 17, height: 17, backgroundColor: '#121927' }} />
          Export to PDF
        </ExportButton>
      </Header>

      <SelectAllRow>
        <Checkbox
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
          sx={{
            border: '1px solid #a0a0aa',
            borderRadius: '2px',
            width: 24,
            height: 24,
            padding: 0
          }}
        />
        <SelectAllText>Select all ({pageReviews.length})</SelectAllText>
      </SelectAllRow>

      <ActionButtonsContainer>
        <ActionRow sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" gap="18px">
            <AIButton onClick={handleAIReply}>
              <AIIcon width={14} height={13} className="ai-icon" />
              Reply with AI
            </AIButton>
            <ActionButton>
              <MultipleReplyIcon width={14} height={12} color="#a0a0aa" />
              Multiple Reply
            </ActionButton>
          </Stack>
          <Stack direction="row" gap="18px">
            <ActionButton onClick={handleSortClick}>
              <SortIcon width={16} height={14} color="#a0a0aa" />
              Sort
            </ActionButton>
            <FilterButton onClick={handleFilterClick}>
              <FilterIcon width={16} height={14} color="#ffffff" />
              Filter
            </FilterButton>
          </Stack>
        </ActionRow>
      </ActionButtonsContainer>

      <ReviewsContainer>
        <Stack gap="26px">
          {pageReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              selected={selectedReviews.includes(review.id)}
              onSelect={(checked) => handleReviewSelect(review.id, checked)}
            />
          ))}
        </Stack>
      </ReviewsContainer>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none', backgroundColor: '#0b91d6', width: '140px', height: '44px', mr: 2 }}
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: 'none', backgroundColor: '#0b91d6', width: '140px', height: '44px',marginRight: '570px'}}
          onClick={() => setPage(p => p + 1)}
          disabled={endIndex >= sorted.length}
        >
          Next
        </Button>
      </Stack>

  
      <FilterPopup
        open={filterOpen}
        anchorEl={filterAnchor}
        onClose={handleFilterClose}
        filters={filters}
        onApply={handleFilterApply}
      />

      <SortPopup
        open={sortOpen}
        anchorEl={sortAnchor}
        onClose={handleSortClose}
        sortBy={sortBy}
        onApply={handleSortApply}
      />
    </ContentContainer>
  );
};

export default ReviewsManagement;