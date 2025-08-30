import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  border: '1px solid rgba(156, 196, 207, 0.25)',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.50)',
  overflow: 'hidden',
  width: '407px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff'
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '307px',
  objectFit: 'cover'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '27px'
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '28.60px',
  color: '#140a09'
}));

const BlogDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969'
}));

const BlogCard = ({ post }) => {
  return (
    <StyledCard>
      <CardImage
        src={post.image}
        alt={post.title}
      />
      <StyledCardContent>
        <BlogTitle>
          {post.title}
        </BlogTitle>
        
        <BlogDescription>
          {post.description}
        </BlogDescription>
      </StyledCardContent>
    </StyledCard>
  );
};

export default BlogCard;