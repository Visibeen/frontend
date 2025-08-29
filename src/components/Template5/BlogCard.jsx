import React from 'react';
import { Card, CardMedia, CardContent, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '12.868712425231934px 12.868712425231934px 39.000038146972656px rgba(0, 0, 0, 0.10)',
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff'
}));

const BlogImage = styled(CardMedia)(({ theme }) => ({
  height: '279px',
  objectFit: 'cover'
}));

const BlogContent = styled(CardContent)(({ theme }) => ({
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: '#222838',
  marginBottom: '10px'
}));

const BlogDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#222838',
  flex: 1,
  marginBottom: '15px'
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'capitalize',
  color: '#222838',
  alignSelf: 'flex-start',
  padding: '4px 0',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline'
  }
}));

// Special styling for the middle card
const MiddleBlogCard = styled(StyledCard)(({ theme }) => ({
  transform: 'scale(1.1)',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    transform: 'none'
  }
}));

const MiddleBlogTitle = styled(BlogTitle)(({ theme }) => ({
  fontSize: '26px',
  lineHeight: '31.20px'
}));

const MiddleBlogDescription = styled(BlogDescription)(({ theme }) => ({
  fontSize: '23.40px',
  lineHeight: '28.60px'
}));

const MiddleLearnMoreButton = styled(LearnMoreButton)(({ theme }) => ({
  fontSize: '23.40px'
}));

const BlogCard = ({ blog, isMiddle = false }) => {
  const CardComponent = isMiddle ? MiddleBlogCard : StyledCard;
  const TitleComponent = isMiddle ? MiddleBlogTitle : BlogTitle;
  const DescriptionComponent = isMiddle ? MiddleBlogDescription : BlogDescription;
  const ButtonComponent = isMiddle ? MiddleLearnMoreButton : LearnMoreButton;

  return (
    <CardComponent>
      <BlogImage
        component="img"
        image={blog.image}
        alt={blog.title}
      />
      <BlogContent>
        <Stack spacing={1}>
          <TitleComponent>
            {blog.title}
          </TitleComponent>
          <DescriptionComponent>
            {blog.description}
          </DescriptionComponent>
          <ButtonComponent>
            {blog.ctaText}
          </ButtonComponent>
        </Stack>
      </BlogContent>
    </CardComponent>
  );
};

export default BlogCard;