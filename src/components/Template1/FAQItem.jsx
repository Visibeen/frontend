import React, { useState } from 'react';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlusIcon from '../icons/PlusIcon';

const FAQContainer = styled(Box)(({ theme }) => ({
  borderRadius: '4px',
  border: '1px solid #eeeeee',
  overflow: 'hidden'
}));

const FAQHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f9f9f9'
  }
}));

const FAQQuestion = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '-0.32px',
  color: '#333333',
  flex: 1
}));

const FAQAnswer = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  lineHeight: '20px',
  color: '#9ca6c1',
  padding: '0 20px 20px 20px'
}));

const ExpandIcon = styled(IconButton)(({ theme }) => ({
  width: '24px',
  height: '24px',
  padding: 0,
  transition: 'transform 0.3s ease',
  '&.expanded': {
    transform: 'rotate(45deg)'
  }
}));

const FAQItem = ({ faq, initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded || faq.isExpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <FAQContainer>
      <FAQHeader onClick={handleToggle}>
        <FAQQuestion>
          {faq.question}
        </FAQQuestion>
        <ExpandIcon className={isExpanded ? 'expanded' : ''}>
          <PlusIcon width={14} height={14} color="#333333" />
        </ExpandIcon>
      </FAQHeader>
      
      <Collapse in={isExpanded}>
        {faq.answer && (
          <FAQAnswer>
            {faq.answer}
          </FAQAnswer>
        )}
      </Collapse>
    </FAQContainer>
  );
};

export default FAQItem;