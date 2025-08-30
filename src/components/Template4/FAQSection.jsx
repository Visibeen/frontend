import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FAQItem from './FAQItem';

const FAQContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '40px 30px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '610px'
}));

const FAQImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '610px',
  objectFit: 'cover',
  borderRadius: '16px'
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  maxWidth: '610px',
  spacing: 2,
  paddingLeft: '40px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0
  }
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#efb817',
  marginBottom: '10px'
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#171717',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '44px'
  }
}));

const FAQList = styled(Stack)(({ theme }) => ({
  spacing: 0
}));

const FAQSection = ({ faq }) => {
  const [expandedItems, setExpandedItems] = useState(
    faq?.reduce((acc, item) => {
      acc[item.id] = item.isExpanded || false;
      return acc;
    }, {}) || {}
  );

  const handleToggle = (faqId) => {
    setExpandedItems(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  return (
    <FAQContainer 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 3, md: 4 }}
    >
      <ImageContainer>
        <FAQImage src="/images/real-estate-faq.jpg" alt="FAQ" />
      </ImageContainer>
      
      <ContentContainer spacing={2}>
        <SectionLabel>
          Questions
        </SectionLabel>
        <FAQTitle>
          Real Estate FAQs
        </FAQTitle>
        <FAQList spacing={0}>
          {faq?.map((faqItem) => (
            <FAQItem
              key={faqItem.id}
              faq={faqItem}
              isExpanded={expandedItems[faqItem.id]}
              onToggle={() => handleToggle(faqItem.id)}
            />
          ))}
        </FAQList>
      </ContentContainer>
    </FAQContainer>
  );
};

export default FAQSection;