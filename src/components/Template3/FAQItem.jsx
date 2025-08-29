import React, { useState } from 'react';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';

const FAQContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
  marginBottom: '10px',
  backgroundColor: '#ffffff'
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
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#140a09',
  flex: 1
}));

const FAQAnswer = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969',
  padding: '0 20px 20px 20px'
}));

const ExpandIcon = styled(IconButton)(({ theme }) => ({
  width: '24px',
  height: '24px',
  padding: 0,
  backgroundColor: '#140a09',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#2c1a19'
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
        <ExpandIcon>
          {isExpanded ? (
            <MinusIcon width={13} height={7} color="#ffffff" />
          ) : (
            <PlusIcon width={13} height={7} color="#ffffff" />
          )}
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