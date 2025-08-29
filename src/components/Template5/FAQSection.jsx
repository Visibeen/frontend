import React, { useState } from 'react';
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const FAQContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '60px 30px',
  alignItems: 'flex-start',
  backgroundColor: '#fcf9f0',
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
  spacing: 3,
  paddingLeft: '40px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0
  }
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: '26px',
  textTransform: 'capitalize',
  color: '#222838'
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '64px',
  fontWeight: 500,
  letterSpacing: '-2.24px',
  lineHeight: '70.40px',
  color: '#222838',
  [theme.breakpoints.down('md')]: {
    fontSize: '45px',
    lineHeight: '48px'
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none',
  borderBottom: '1px solid #dadada',
  borderRadius: 0,
  backgroundColor: 'transparent',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 0
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '16px 0',
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto'
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0
    }
  }
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  letterSpacing: '0.15px',
  textTransform: 'uppercase',
  color: '#222838',
  flex: 1
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 0 20px 0'
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '29.70px',
  color: '#222838'
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
        <FAQImage src="/images/interior-faq.jpg" alt="FAQ" />
      </ImageContainer>
      
      <ContentContainer spacing={3}>
        <SectionLabel>
          FAQs
        </SectionLabel>
        <FAQTitle>
          Real Estate FAQs
        </FAQTitle>
        <Stack spacing={2}>
          {faq?.map((faqItem) => (
            <StyledAccordion 
              key={faqItem.id}
              expanded={expandedItems[faqItem.id]}
              onChange={() => handleToggle(faqItem.id)}
            >
              <StyledAccordionSummary>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                  <QuestionText>
                    {faqItem.question}
                  </QuestionText>
                  {expandedItems[faqItem.id] ? (
                    <ChevronDownIcon width={16} height={8} color="#171717" />
                  ) : (
                    <ChevronRightIcon width={16} height={8} color="#171717" />
                  )}
                </Stack>
              </StyledAccordionSummary>
              {faqItem.answer && (
                <StyledAccordionDetails>
                  <AnswerText>
                    {faqItem.answer}
                  </AnswerText>
                </StyledAccordionDetails>
              )}
            </StyledAccordion>
          ))}
        </Stack>
      </ContentContainer>
    </FAQContainer>
  );
};

export default FAQSection;