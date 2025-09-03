import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../Layouts/DashboardLayout';
import ReplyModeToggle from './components/ReplyModeToggle';
import SourceSelector from './components/SourceSelector';
import RatingFilters from './components/RatingFilters';
import AutomationSettings from './components/AutomationSettings';
import LanguageSelector from './components/LanguageSelector';
import ToneSelector from './components/ToneSelector';
import LengthSelector from './components/LengthSelector';
import EmojiSelector from './components/EmojiSelector';
import ReplyTextArea from './components/ReplyTextArea';
import FormActions from './components/FormActions';
import { mockRootProps } from './SetAutoReplyMockData';

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const PageHeader = styled(Stack)(({ theme }) => ({
  gap: '6px',
  marginBottom: '40px'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0B91D6'
}));

const PageDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#30302E',
  lineHeight: '20px'
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}));

const SetAutoReply = ({
  replyMode: initialReplyMode,
  selectedSource: initialSource,
  selectedRatings: initialRatings,
  keywords: initialKeywords,
  selectedTime: initialTime,
  replyText: initialReplyText,
  selectedLanguage: initialLanguage,
  selectedTone: initialTone,
  selectedLength: initialLength,
  selectedEmoji: initialEmoji,
  sourceOptions,
  ratingOptions,
  languageOptions,
  toneOptions,
  lengthOptions,
  emojiOptions
} = {}) => {
  const [replyMode, setReplyMode] = useState(initialReplyMode || mockRootProps?.replyMode || 'Reply with Ai');
  const [selectedSource, setSelectedSource] = useState(initialSource || mockRootProps?.selectedSource || 'All');
  const [selectedRatings, setSelectedRatings] = useState(
    Array.isArray(initialRatings) ? initialRatings : (Array.isArray(mockRootProps?.selectedRatings) ? mockRootProps.selectedRatings : [])
  );
  const [keywords, setKeywords] = useState(typeof initialKeywords === 'string' ? initialKeywords : (mockRootProps?.keywords || ''));
  const [selectedTime, setSelectedTime] = useState(initialTime || mockRootProps?.selectedTime || 'Any time');
  const [replyText, setReplyText] = useState(initialReplyText || mockRootProps?.replyText || '');
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage || mockRootProps?.selectedLanguage || 'English');
  const [selectedTone, setSelectedTone] = useState(initialTone || mockRootProps?.selectedTone || 'Professional');
  const [selectedLength, setSelectedLength] = useState(initialLength || mockRootProps?.selectedLength || 'Short');
  const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji || mockRootProps?.selectedEmoji || 'Few');

  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(rating)
        ? safePrev.filter(r => r !== rating)
        : [...safePrev, rating];
    });
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    // Reset form or navigate back
    setReplyMode(initialReplyMode || mockRootProps?.replyMode || 'Reply with Ai');
    setSelectedSource(initialSource || mockRootProps?.selectedSource || 'All');
    setSelectedRatings(Array.isArray(initialRatings) ? initialRatings : []);
    setKeywords(typeof initialKeywords === 'string' ? initialKeywords : '');
    setSelectedTime(initialTime || mockRootProps?.selectedTime || 'Any time');
    setReplyText(initialReplyText || '');
  };

  const handleSave = () => {
    const formData = {
      replyMode,
      selectedSource,
      selectedRatings,
      keywords,
      selectedTime,
      replyText
    };
    console.log('Save clicked', formData);
    // Handle form submission here
  };

  return (
    <DashboardLayout>
      <ContentContainer>
        <PageHeader>
          <PageTitle>Set Auto Reply</PageTitle>
          <PageDescription>
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
          </PageDescription>
        </PageHeader>

        <ReplyModeToggle
          selectedMode={replyMode}
          onModeChange={setReplyMode}
        />

        <FormContainer>
          <SourceSelector
            selectedSource={selectedSource}
            sourceOptions={sourceOptions || mockRootProps.sourceOptions}
            onSourceChange={setSelectedSource}
          />
          
          <RatingFilters
            selectedRatings={selectedRatings}
            ratingOptions={ratingOptions || mockRootProps.ratingOptions}
            onRatingToggle={handleRatingToggle}
            onKeywordsChange={setKeywords}
          />

          <AutomationSettings
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />

          {replyMode === 'Reply with Ai' && (
            <>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                languageOptions={languageOptions || mockRootProps.languageOptions}
                onLanguageChange={setSelectedLanguage}
              />

              <ToneSelector
                selectedTone={selectedTone}
                toneOptions={toneOptions || mockRootProps.toneOptions}
                onToneChange={setSelectedTone}
              />

              <LengthSelector
                selectedLength={selectedLength}
                lengthOptions={lengthOptions || mockRootProps.lengthOptions}
                onLengthChange={setSelectedLength}
              />

              <EmojiSelector
                selectedEmoji={selectedEmoji}
                emojiOptions={emojiOptions || mockRootProps.emojiOptions}
                onEmojiChange={setSelectedEmoji}
              />
            </>
          )}

          {replyMode === 'Manually' && (
            <ReplyTextArea
              replyText={replyText}
              onReplyTextChange={setReplyText}
            />
          )}

          <FormActions
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </FormContainer>
      </ContentContainer>
    </DashboardLayout>
  );
};

export default SetAutoReply;