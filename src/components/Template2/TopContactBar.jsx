import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClockIcon from '../icons/ClockIcon';
import PhoneIcon from '../icons/PhoneIcon';
import LocationIcon from '../icons/LocationIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';

const TopBarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '21px 315px',
  borderBottom: '1px solid #f0f0f0'
}));

const TopBarContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const ContactInfo = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '40px',
  flexWrap: 'wrap'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '9px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '13px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  color: '#797c7f'
}));

const SocialIcons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
}));

const TopContactBar = ({ topContactInfo }) => {
  return (
    <TopBarContainer>
      <TopBarContent>
        <ContactInfo>
          <ContactItem>
            <ClockIcon width={16} height={16} color="#797c7f" />
            <ContactText>
              {topContactInfo?.hours || 'Mon - Fri 8:00 - 18:00 / Sunday 8:00 - 14:00'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <PhoneIcon width={16} height={16} color="#797c7f" />
            <ContactText>
              {topContactInfo?.phone || '1-800-458-56987'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <LocationIcon width={14} height={16} color="#797c7f" />
            <ContactText>
              {topContactInfo?.address || '47 Bakery Street, London, UK'}
            </ContactText>
          </ContactItem>
        </ContactInfo>
        
        <SocialIcons>
          <FacebookIcon width={8} height={15} color="#0d2b23" />
          <TwitterIcon width={19} height={13} color="#0d2b23" />
          <InstagramIcon width={15} height={15} color="#0d2b23" />
          <LinkedInIcon width={15} height={15} color="#0d2b23" />
        </SocialIcons>
      </TopBarContent>
    </TopBarContainer>
  );
};

export default TopContactBar;