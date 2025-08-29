import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none',
  borderBottom: '1px solid #dadada',
  borderRadius: 0,
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
  color: '#171717',
  flex: 1
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 0 20px 0'
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Rethink Sans, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '29.70px',
  color: '#171717'
}));

const FAQItem = ({ faq, isExpanded, onToggle }) => {
  return (
    <StyledAccordion expanded={isExpanded} onChange={onToggle}>
      <StyledAccordionSummary>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <QuestionText>
            {faq.question}
          </QuestionText>
          {isExpanded ? (
            <ChevronDownIcon width={16} height={8} color="#171717" />
          ) : (
            <ChevronRightIcon width={16} height={8} color="#171717" />
          )}
        </Stack>
      </StyledAccordionSummary>
      {faq.answer && (
        <StyledAccordionDetails>
          <AnswerText>
            {faq.answer}
          </AnswerText>
        </StyledAccordionDetails>
      )}
    </StyledAccordion>
  );
};

export default FAQItem;