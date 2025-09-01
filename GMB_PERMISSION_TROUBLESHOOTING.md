# Google My Business API Permission Troubleshooting Guide

## Error: "Caller does not have required permission to use project"

This error occurs when the Google Cloud project lacks proper permissions for the Google My Business API.

### Quick Fix Solutions (Try in Order)

#### Solution 1: Remove Project ID from Environment Variables ⭐ (Recommended)
The simplest solution is to not use the project billing header if you don't need it:

1. **Comment out or remove the project ID**:
   ```bash
   # REACT_APP_GMB_PROJECT_ID=myapi-430807  # Comment this line
   ```

2. **The application will automatically work without the project header**
   - Our updated GMBService now gracefully handles missing project IDs
   - Google APIs will work with just the OAuth token in most cases

#### Solution 2: Use Personal Google Account
Make sure you're using your personal Google account that has GMB access:

1. **Clear existing authentication**:
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

2. **Sign in with the correct Google account**:
   - Use the Google account that owns/manages the business
   - Avoid using service accounts or shared accounts
   - Ensure the account has Google My Business profiles

#### Solution 3: Google Cloud Project Configuration (Advanced)
If you need to keep the project ID for billing purposes:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: `myapi-430807`
3. **Enable APIs**:
   - Go to "APIs & Services" > "Library"
   - Enable these APIs:
     - Google My Business API
     - Google My Business Account Management API
     - Google My Business Business Information API
     - Google My Business Business Profile Performance API

4. **Configure IAM permissions**:
   - Go to "IAM & Admin" > "IAM"
   - Find your user account
   - Add role: `Service Usage Consumer` (`roles/serviceusage.serviceUsageConsumer`)

### Environment Variable Configuration

Create or update your `.env` file in the project root:

```bash
# Required for authentication
REACT_APP_GOOGLE_CLIENT_ID=your_oauth_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_oauth_client_secret

# Optional - only include if you have proper project permissions
# REACT_APP_GMB_PROJECT_ID=your_project_id
REACT_APP_GMB_API_KEY=your_api_key

# Debug mode to help troubleshoot
REACT_APP_DEBUG_MODE=true
```

### Testing Your Configuration

1. **Clear browser storage**:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```

2. **Test authentication**:
   - Go to Dashboard page
   - Click "Connect to Google"
   - Check browser console for any errors

3. **Debug with the built-in debugger**:
   - Set `REACT_APP_DEBUG_MODE=true`
   - Use the debug button in Dashboard
   - Check token status and API calls

### Common Error Messages and Solutions

| Error Message | Solution |
|---------------|----------|
| "Caller does not have required permission to use project" | Remove project ID or configure project permissions |
| "No GMB accounts found" | Use correct Google account with business profiles |
| "Authentication failed" | Clear storage and re-authenticate |
| "Permission denied" | Check account permissions for the business |

### API Scopes Required

Ensure your OAuth configuration includes these scopes:
```javascript
[
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/businessprofileperformance',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]
```

### For Developers

The `GMBService` has been updated to:
- ✅ Automatically handle missing project IDs
- ✅ Retry API calls without project headers on permission errors
- ✅ Provide detailed error messages for debugging
- ✅ Fall back gracefully when project permissions are insufficient

### Support

If you continue to experience issues:
1. Enable debug mode (`REACT_APP_DEBUG_MODE=true`)
2. Check the browser console for detailed error messages
3. Verify your Google account has access to Google My Business
4. Ensure you're using the correct OAuth credentials

---

*Last updated: 2025-01-30*