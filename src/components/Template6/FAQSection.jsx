import React, { useState } from 'react';
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const SectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '60px 64px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px'
  }
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '36px',
  marginBottom: '60px'
}));

const SubTitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.40px',
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: theme.palette.primary.main
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '33px',
  height: '4px',
  backgroundColor: theme.palette.primary.main
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-0.80px',
  lineHeight: '48px',
  color: theme.palette.secondary.main,
  textAlign: 'center'
}));

const FAQContainer = styled(Stack)(({ theme }) => ({
  gap: '16px',
  maxWidth: '756px',
  margin: '0 auto'
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '4px !important',
  boxShadow: 'none',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: '0'
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '20px 34px',
  minHeight: '68px',
  '& .MuiAccordionSummary-content': {
    margin: '0',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.secondary.main,
    '&.Mui-expanded': {
      transform: 'rotate(45deg)'
    }
  }
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: '-0.32px',
  color: theme.palette.secondary.main
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 34px 20px 34px',
  borderTop: `1px solid ${theme.palette.grey[200]}`
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  lineHeight: '18px',
  color: theme.palette.secondary.main
}));

const FAQSection = ({ faq }) => {
  const { sectionLabel, title, questions } = faq || {};
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <SectionContainer>
      <HeaderContainer>
        <SubTitleContainer>
          <SubTitle>{sectionLabel || "FAQ's"}</SubTitle>
          <Divider />
        </SubTitleContainer>
        
        <MainTitle>
          {title || 'Frequently Asked Questions'}
        </MainTitle>
      </HeaderContainer>

      <FAQContainer>
        {questions?.map((item) => (
          <StyledAccordion
            key={item.id}
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
          >
            <StyledAccordionSummary
              expandIcon={<AddIcon />}
              aria-controls={`panel${item.id}bh-content`}
              id={`panel${item.id}bh-header`}
            >
              <QuestionText>
                {item.question}
              </QuestionText>
            </StyledAccordionSummary>
            
            {item.answer && (
              <StyledAccordionDetails>
                <AnswerText>
                  {item.answer}
                </AnswerText>
              </StyledAccordionDetails>
            )}
          </StyledAccordion>
        ))}
      </FAQContainer>
    </SectionContainer>
  );
};

export default FAQSection;