import React from 'react';
import { Box, Typography, Stack, Button, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import FAQItem from './FAQItem';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const FAQContainer = styled(Box)(({ theme }) => ({
  padding: '80px 320px',
  backgroundColor: '#ffffff'
}));

const FAQContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',
  alignItems: 'flex-start'
}));

const LeftContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '19px',
  maxWidth: '600px'
}));

const SectionTag = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18.20px',
  textTransform: 'uppercase',
  color: '#565969',
  display: 'flex',
  alignItems: 'center',
  gap: '17px',
  '&::before': {
    content: '""',
    width: '17px',
    height: '14px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px'
  }
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '57.60px',
  textTransform: 'capitalize',
  color: '#140a09'
}));

const TitleHighlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main
}));

const FAQDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#565969'
}));

const ProgressContainer = styled(Stack)(({ theme }) => ({
  gap: '7px'
}));

const ProgressItem = styled(Stack)(({ theme }) => ({
  gap: '7px'
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#140a09'
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '10px',
  borderRadius: '5px',
  backgroundColor: '#e0e0e0',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px'
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: 'transparent',
  padding: '8px 16px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const RightContent = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '9px'
}));

const FAQSection = ({ faq }) => {
  return (
    <FAQContainer>
      <FAQContent>
        <LeftContent>
          <SectionTag>
            {faq?.sectionTag || 'Company\'s FAQ'}
          </SectionTag>
          
          <FAQTitle>
            {faq?.title || 'Frequently Asked Have Any'} <TitleHighlight>{faq?.subtitle || 'Question?'}</TitleHighlight>
          </FAQTitle>
          
          <FAQDescription>
            {faq?.description || 'We help businesses bring ideas to life in the digital world designing & implementing the technology tools that they need to win. We help business bring ideas to life in the digital wor'}
          </FAQDescription>
          
          <ProgressContainer>
            {faq?.progressBars?.map((progress, index) => (
              <ProgressItem key={index}>
                <ProgressLabel>
                  {progress.label}
                </ProgressLabel>
                <StyledLinearProgress 
                  variant="determinate" 
                  value={progress.percentage} 
                />
              </ProgressItem>
            ))}
          </ProgressContainer>
          
          <CTAButton>
            {faq?.ctaText || 'Get in touch'}
            <ArrowRightIcon width={12} height={12} color="#ffffff" />
          </CTAButton>
        </LeftContent>
        
        <RightContent>
          {faq?.questions?.map((question) => (
            <FAQItem key={question.id} faq={question} />
          ))}
        </RightContent>
      </FAQContent>
    </FAQContainer>
  );
};

export default FAQSection;