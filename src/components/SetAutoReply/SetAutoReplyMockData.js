// Mock data for the Set Auto Reply page

export const mockRootProps = {
  replyMode: 'Manually',
  selectedSource: 'Google',
  selectedRatings: ['5 Stars', '4 Stars'],
  keywords: '',
  selectedTime: '',
  replyText: '',
  selectedLanguage: 'English',
  selectedTone: 'Formal',
  selectedLength: 'Short',
  selectedEmoji: 'Yes',
  formData: {
    source: 'Google',
    ratings: ['5 Stars', '4 Stars'],
    keywords: '',
    triggerTime: '',
    customReply: ''
  },
  sourceOptions: [
    { value: 'google', label: 'Google' },
    { value: 'yelp', label: 'Yelp' },
    { value: 'facebook', label: 'Facebook' }
  ],
  ratingOptions: [
    { value: '5', label: '5 Stars', selected: true },
    { value: '4', label: '4 Stars', selected: true },
    { value: '3', label: '3 Stars', selected: false },
    { value: '2', label: '2 Stars', selected: false },
    { value: '1', label: '1 Stars', selected: false }
  ],
  languageOptions: [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ],
  toneOptions: [
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' }
  ],
  lengthOptions: [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
  ],
  emojiOptions: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]
};