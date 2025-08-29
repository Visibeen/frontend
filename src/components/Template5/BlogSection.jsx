import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import BlogCard from './BlogCard';

const BlogContainer = styled(Stack)(({ theme }) => ({
  padding: '60px 30px',
  spacing: 4,
  backgroundColor: '#fcf9f0'
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  textTransform: 'capitalize',
  color: '#222838',
  textAlign: 'center'
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '45px',
  fontWeight: 500,
  lineHeight: '48px',
  textTransform: 'capitalize',
  color: '#222838',
  textAlign: 'center',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
    lineHeight: '38px'
  }
}));

const BlogGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  alignItems: 'end',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '20px'
  }
}));

const BlogSection = ({ blogs }) => {
  return (
    <BlogContainer spacing={4}>
      <Box>
        <SectionLabel>
          our blogs
        </SectionLabel>
        <BlogTitle>
          Latest Blogs
        </BlogTitle>
      </Box>
      
      <BlogGrid>
        {blogs?.map((blog, index) => (
          <BlogCard 
            key={blog.id} 
            blog={blog} 
            isMiddle={index === 1}
          />
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogSection;