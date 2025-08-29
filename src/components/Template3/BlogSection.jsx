import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import BlogCard from './BlogCard';

const BlogContainer = styled(Box)(({ theme }) => ({
  padding: '80px 320px',
  backgroundColor: '#ffffff'
}));

const BlogContent = styled(Stack)(({ theme }) => ({
  gap: '60px'
}));

const BlogHeader = styled(Stack)(({ theme }) => ({
  gap: '20px'
}));

const SectionTag = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18.20px',
  textTransform: 'uppercase',
  color: '#565969',
  display: 'flex',
  alignItems: 'center',
  gap: '17px',
  '&::before': {
    content: '""',
    width: '17px',
    height: '14px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px'
  }
}));

const BlogTitle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0px'
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  textTransform: 'capitalize',
  color: '#140a09'
}));

const TitleHighlight = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  textTransform: 'capitalize',
  color: theme.palette.primary.main
}));

const BlogGrid = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap'
}));

const BlogSection = ({ blog }) => {
  return (
    <BlogContainer>
      <BlogContent>
        <BlogHeader>
          <SectionTag>
            {blog?.sectionTag || 'Latest Blogs'}
          </SectionTag>
          
          <BlogTitle>
            <TitleText>
              {blog?.title || 'Latest Blogs &'} 
            </TitleText>
            <TitleHighlight>
              {blog?.titleHighlight || 'News'}
            </TitleHighlight>
          </BlogTitle>
        </BlogHeader>
        
        <BlogGrid>
          {blog?.posts?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </BlogGrid>
      </BlogContent>
    </BlogContainer>
  );
};

export default BlogSection;