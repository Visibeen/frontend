import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const UpdateContainer = styled(Stack)(({ theme }) => ({
  gap: '5px',
  width: '100%'
}));

const UpdateImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '480px',
  objectFit: 'cover',
  borderRadius: '4px'
}));

const UpdateDate = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '1px',
  textTransform: 'capitalize',
  color: '#333333',
  marginBottom: '5px'
}));

const UpdateTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#333333',
  marginBottom: '5px'
}));

const UpdateDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Source Sans Pro, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#9ca6c1'
}));

const UpdateCard = ({ update, width = '220px' }) => {
  return (
    <UpdateContainer sx={{ width }}>
      <UpdateImage
        src={update.image}
        alt={update.title}
      />
      {update.date && (
        <UpdateDate>
          {update.date}
        </UpdateDate>
      )}
      <UpdateTitle>
        {update.title}
      </UpdateTitle>
      <UpdateDescription>
        {update.description}
      </UpdateDescription>
    </UpdateContainer>
  );
};

export default UpdateCard;