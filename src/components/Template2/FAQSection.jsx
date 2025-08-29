import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FAQItem from './FAQItem';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px',
  gap: '20px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '1.80px',
  textTransform: 'uppercase',
  color: '#f4762a'
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  }
}));

const FAQList = styled(Stack)(({ theme }) => ({
  maxWidth: '756px',
  margin: '0 auto',
  gap: '36px'
}));

const FAQSection = ({ faq = [] }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>FAQ</SectionTitle>
        <SectionHeading>Frequently Asked Questions</SectionHeading>
      </SectionHeader>
      
      <FAQList>
        {faq.map((faqItem) => (
          <FAQItem key={faqItem.id} faq={faqItem} />
        ))}
      </FAQList>
    </SectionContainer>
  );
};

export default FAQSection;