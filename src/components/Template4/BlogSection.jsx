import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import BlogCard from './BlogCard';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const BlogContainer = styled(Stack)(({ theme }) => ({
  padding: '40px 30px',
  spacing: 3
}));

const BlogHeader = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px'
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#171717',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '18px',
  color: '#171717',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: 'rgba(23, 23, 23, 0.04)'
  }
}));

const BlogGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '20px',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
}));

const BlogSection = ({ blogs }) => {
  return (
    <BlogContainer spacing={3}>
      <BlogHeader 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 0 }}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
      >
        <BlogTitle>
          Blogs
        </BlogTitle>
        <ViewAllButton>
          View All
          <ChevronRightIcon width={7} height={11} color="#171717" />
        </ViewAllButton>
      </BlogHeader>
      
      <BlogGrid>
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogSection;