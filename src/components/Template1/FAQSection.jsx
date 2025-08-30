import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FAQItem from './FAQItem';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 20px',
  backgroundColor: '#ffffff'
}));

const SectionHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '60px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
  fontWeight: 400,
  letterSpacing: '1px',
  lineHeight: '33px',
  textTransform: 'uppercase',
  color: '#333333'
}));

const FAQGrid = styled(Stack)(({ theme }) => ({
  gap: '30px',
  maxWidth: '1500px',
  margin: '0 auto'
}));

const FAQRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '20px'
  }
}));

const FAQColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '756px'
}));

const FAQSection = ({ faq = [] }) => {
  // Split FAQ items into two columns
  const leftColumnFAQs = faq.filter((_, index) => index % 2 === 0);
  const rightColumnFAQs = faq.filter((_, index) => index % 2 === 1);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
      </SectionHeader>
      
      <FAQGrid>
        <FAQRow>
          <FAQColumn>
            <Stack gap="30px">
              {leftColumnFAQs.map((faqItem) => (
                <FAQItem key={faqItem.id} faq={faqItem} />
              ))}
            </Stack>
          </FAQColumn>
          
          <FAQColumn>
            <Stack gap="30px">
              {rightColumnFAQs.map((faqItem) => (
                <FAQItem key={faqItem.id} faq={faqItem} />
              ))}
            </Stack>
          </FAQColumn>
        </FAQRow>
      </FAQGrid>
    </SectionContainer>
  );
};

export default FAQSection;