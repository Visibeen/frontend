import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DotIcon from '../icons/DotIcon';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '410px'
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '306px',
  objectFit: 'cover'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '11.9px'
}));

const TechTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '0.80px',
  textTransform: 'uppercase',
  color: '#0d2b23'
}));

const TechDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '28px',
  fontWeight: 700,
  letterSpacing: '-0.24px',
  lineHeight: '33.60px',
  color: '#0d2b23'
}));

const MetaInfo = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10.5px',
  marginTop: '10px'
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#a5a6aa'
}));

const CommentsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4.19px'
}));

const TechnologyCard = ({ technology }) => {
  return (
    <StyledCard>
      <CardImage
        src={technology.image}
        alt={technology.title}
      />
      <StyledCardContent>
        <TechTitle>
          {technology.title}
        </TechTitle>
        <TechDescription>
          {technology.description}
        </TechDescription>
        <MetaInfo>
          <MetaText>
            {technology.date}
          </MetaText>
          <DotIcon width={3} height={3} color="#a5a6aa" />
          <CommentsContainer>
            <MetaText>
              {technology.comments}
            </MetaText>
            <MetaText>
              Comments
            </MetaText>
          </CommentsContainer>
        </MetaInfo>
      </StyledCardContent>
    </StyledCard>
  );
};

export default TechnologyCard;