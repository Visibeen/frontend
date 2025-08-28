import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextAreaContainer = styled(Box)(({ theme }) => ({
  marginBottom: '40px'
}));

const TextAreaLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#121927',
  marginBottom: '8px'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '540px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '0.2px solid #A0A0AA',
    backgroundColor: '#ffffff',
    height: '95px',
    alignItems: 'flex-start',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    },
    '&.Mui-focused': {
      border: '0.2px solid #A0A0AA',
      outline: 'none',
      boxShadow: 'none'
    }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#A0A0AA',
    padding: '16px 20px',
    outline: 'none',
    '&:focus': {
      outline: 'none',
      boxShadow: 'none'
    },
    '&::placeholder': {
      color: '#A0A0AA',
      opacity: 1
    }
  }
}));

const ReplyTextArea = ({ replyText, onReplyTextChange }) => {
  return (
    <TextAreaContainer>
      <TextAreaLabel>Write Review Reply</TextAreaLabel>
      <StyledTextField
        multiline
        rows={4}
        placeholder="Enter reply"
        value={replyText}
        onChange={(e) => onReplyTextChange(e.target.value)}
        variant="outlined"
      />
    </TextAreaContainer>
  );
};

export default ReplyTextArea;