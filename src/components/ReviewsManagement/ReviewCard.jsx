import React, { useState } from 'react';
import { Box, Stack, Typography, Checkbox, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import StarRatingIcon from '../icons/StarRatingIcon';
import GoogleIcon from '../icons/GoogleIcon';
import ReplyIcon from '../icons/ReplyIcon';
import AIIcon from '../icons/AIIcon';
import SendIcon from '../icons/SendIcon';

const ReviewContainer = styled(Stack)(({ theme }) => ({
  gap: '34px'
}));

const ReviewContent = styled(Stack)(({ theme }) => ({
  gap: '20px'
}));

const ReviewHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '16px'
}));

const CheckboxContainer = styled(Box)(({ theme }) => ({
  marginTop: '8px'
}));

const Avatar = styled('img')(({ theme }) => ({
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  objectFit: 'cover'
}));

const UserInfo = styled(Stack)(({ theme }) => ({
  gap: '3px'
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#121927'
}));

const ReviewDate = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: '#0b91d6'
}));

const RatingRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
  marginTop: '16px'
}));

const RatingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927'
}));

const FromText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#121927',
  marginLeft: '3px'
}));

const ReviewText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#121927',
  marginLeft: '72px'
}));

const Divider = styled(Box)(({ theme }) => ({
  height: '1px',
  backgroundColor: '#f6f0f0',
  border: '1px solid #f6f0f0',
  marginLeft: '72px'
}));

const ActionsRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '311px'
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px'
}));

const ReplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0b91d6',
  borderRadius: '8px',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  width: '140px',
  height: '44px',
  textTransform: 'capitalize',
  padding: '8px 16px',
  gap: '8px',
  '&:hover': {
    backgroundColor: '#0980c2'
  }
}));

const AIReplyButton = styled(Button)(({ theme }) => ({
  border: '0.6px solid #a0a0aa',
  borderRadius: '8px',
  color: '#0b91d6',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'capitalize',
  padding: '8px 16px',
  gap: '8px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(11, 145, 214, 0.04)'
  }
}));

const CreatePostText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff'
}));

const ReplyInput = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(160, 160, 170, 0.10)',
  borderRadius: '8px',
  marginLeft: '72px',
  width: '1150px',
  opacity: 1,
  height: '50px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    outline: 'none',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: 'none' }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    color: '#a0a0aa',
    padding: '16px',
    textAlign: 'center',
    outline: 'none',
    '::placeholder': {
      color: '#a0a0aa',
      opacity: 1,
      textAlign: 'center'
    }
  },
  '& textarea': {
    // In case multiline is ever used again
    textAlign: 'center',
    outline: 'none',
    '::placeholder': {
      color: '#a0a0aa',
      opacity: 1,
      textAlign: 'center'
    }
  }
}));

const SendButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '30px',
  height: '30px',
  borderRadius: '34px',
  backgroundColor: '#0b91d6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));

const ReviewCard = ({ review, selected, onSelect, onAIReply }) => {
  const navigate = useNavigate();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleSendReply = () => {
    // Handle reply submission
    console.log('Sending reply:', replyText);
    setReplyText('');
    setShowReplyInput(false);
  };

  const handleAIReply = () => {
    if (onAIReply) {
      onAIReply();
    } else {
      navigate('/set-auto-reply');
    }
  };

  return (
    <ReviewContainer>
      <ReviewContent>
        <ReviewHeader>
          <CheckboxContainer>
            <Checkbox
              checked={selected}
              onChange={(e) => onSelect(e.target.checked)}
              sx={{
                border: '1px solid #a0a0aa',
                borderRadius: '2px',
                width: 24,
                height: 24,
                padding: 0
              }}
            />
          </CheckboxContainer>
          
          <Avatar src={review.avatar} alt={review.author} />
          
          <Stack sx={{ flex: 1 }}>
            <UserInfo>
              <UserName>{review.author}</UserName>
              <ReviewDate>{review.date}</ReviewDate>
            </UserInfo>
            
            <RatingRow>
              <StarRatingIcon width={116} height={24} />
              <RatingText>{review.rating.toFixed(2)}</RatingText>
              <FromText>from</FromText>
              <GoogleIcon width={69} height={21} />
            </RatingRow>
          </Stack>
        </ReviewHeader>
        
        <ReviewText>{review.text}</ReviewText>
      </ReviewContent>
      
      <Divider />
      
      <ActionsRow>
        <ActionButtons>
          <ReplyButton onClick={handleReplyClick}>
            <ReplyIcon width={10} height={12} color="#ffffff" />
            Reply
          </ReplyButton>
          
          <AIReplyButton onClick={handleAIReply}>
            <AIIcon width={13} height={13} color="#fbbc05" />
            Reply with AI
          </AIReplyButton>
          
          <Button 
            onClick={() => navigate('/create-post')}
            sx={{
              backgroundColor: '#4caf50',
              borderRadius: '8px',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              width: '140px',
              height: '44px',
              textTransform: 'capitalize',
              padding: '8px 16px',
              gap: '8px',
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            Create Post
          </Button>
        </ActionButtons>
      </ActionsRow>
      
      {showReplyInput && (
        <Box sx={{ position: 'relative' }}>
          <ReplyInput
            fullWidth
            placeholder="Write your text here....."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <SendButton onClick={handleSendReply}>
            <SendIcon width={17} height={17} color="#ffffff" />
          </SendButton>
        </Box>
      )}
    </ReviewContainer>
  );
};

export default ReviewCard;