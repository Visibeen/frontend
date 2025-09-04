# GMB Phone Number Checker - Standalone Version

A standalone HTML/CSS/JavaScript application that allows you to search for Google My Business profiles linked to phone numbers or business names using the Google Places API (New).

## Files Structure

```
standalone-version/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Features

- **Phone Number Search**: Find all GMB profiles linked to a specific phone number
- **Business Name Search**: Search for businesses by name and location
- **Modern UI**: Clean, responsive design with tabbed interface
- **Detailed Business Information**: View contact details, hours, features, and more
- **Multiple Search Formats**: Supports various phone number formats
- **Error Handling**: Clear error messages and API troubleshooting

## Setup Instructions

1. **Get Google Places API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select existing one
   - Enable "Places API (New)" 
   - Create an API key
   - For testing, use no restrictions (add restrictions for production)

2. **Run the Application**:
   - Open `index.html` in any modern web browser
   - Enter your Google Places API key
   - Start searching!

## Usage

### Phone Number Search
1. Select "By Phone Number" tab
2. Enter phone number in any format:
   - `+1 555-123-4567`
   - `(555) 123-4567`
   - `5551234567`
3. Click Search

### Business Name Search
1. Select "By Business Name" tab
2. Enter business name (include location for better results):
   - `Starbucks New York`
   - `Pizza Hut Chicago`
3. Click Search

## Features Included

- **Search Modes**: Phone number and business name search
- **Business Details**: Address, phone, website, ratings, hours
- **Business Features**: Takeout, delivery, accessibility options
- **Categories**: Business type classifications
- **Google Maps Integration**: Direct links to Google Maps
- **Responsive Design**: Works on desktop and mobile devices

## API Requirements

- Google Places API (New) must be enabled
- Valid API key with appropriate permissions
- Internet connection for API calls

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes

- API key is stored in browser memory only (not persistent)
- All API calls go directly to Google's servers
- No data is stored or transmitted to third parties
- For production use, implement proper API key restrictions

## Troubleshooting

### Common Errors

1. **"Invalid API key"**
   - Verify API key is correct
   - Check if Places API (New) is enabled
   - Ensure API key has no restrictions (for testing)

2. **"Permission denied"**
   - Enable Places API (New) in Google Cloud Console
   - Check API key permissions

3. **"No results found"**
   - Try different phone number formats
   - Include location in business name searches
   - Verify the business has a Google My Business profile

## Original React Version

This standalone version is converted from a React-based application. All functionality has been preserved while removing framework dependencies for easier deployment and usage.
