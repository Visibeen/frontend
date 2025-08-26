# frontend

## Environment Variables (.env)

Set these before running the app. React requires the REACT_APP_ prefix.

Backend API
- REACT_APP_API_BASE_URL=https://your-api-base/api/v1
- REACT_APP_REFRESH_ENDPOINT=/auth/refresh

Google OAuth
- REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
- REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
- REACT_APP_GMB_PROJECT_ID=your_google_project_id
- REACT_APP_GMB_API_KEY=your_google_api_key

Notes
- REACT_APP_REFRESH_ENDPOINT is relative to REACT_APP_API_BASE_URL and used by the frontend to auto-refresh the backend token on 401.
- For Google, refresh_token is typically obtained server-side. The frontend is wired to store it if your backend returns it during link.

## Token Management Overview

### 🚀 Enhanced Automatic Token Management (NEW)

The frontend now includes a unified automatic token management system for both backend and Google tokens:

**Auto Token Features:**
- ✅ **Automatic token injection** in all API calls (Backend + Google)
- ✅ **Automatic token refresh** on 401 errors (Backend + Google)
- ✅ **Multi-source token detection** (session, localStorage, URL params, environment)
- ✅ **Multiple header formats** (Authorization, x-access-token, token)
- ✅ **Continuous token monitoring** with expiry detection (Backend + Google)
- ✅ **Google token auto-setup** from multiple sources
- ✅ **Legacy storage compatibility** (localStorage/sessionStorage)
- ✅ **Environment token removal** - no more hardcoded tokens needed!

**Key Components:**
- `src/utils/autoTokenUtils.js` - Unified auto token monitoring for Backend + Google
- Enhanced `src/services/api.js` - Multi-source backend token injection
- Enhanced `src/services/GMBService.js` - Auto Google token management
- Enhanced `src/utils/authUtils.js` - Token normalization and extraction
- `src/components/AutoTokenDebugger.jsx` - Debug interface for both token types

**Google Token Auto-Detection Sources:**
1. 🔍 TokenManager storage (primary)
2. 🔍 localStorage.getItem('googleAccessToken')
3. 🔍 sessionStorage.getItem('googleAccessToken')
4. 🔍 URL parameters (access_token, google_token)
5. 🔍 Environment variables (development only - to be removed)

**Automatic Initialization:**
- Auto token monitoring starts when the app loads
- Google tokens are detected and managed automatically
- Enhanced login process starts unified token management
- Works seamlessly with existing backend without requiring changes

### Legacy Token Management

Google Tokens
- Stored with `TokenManager` under namespace `google`.
- Auto-refreshed via `src/auth/googleRefresher.js` when available (needs refresh_token).
- `GMBService` methods can omit accessToken; tokens are attached automatically with retry-on-401.

Backend Token
- `src/services/api.js` auto-injects `Authorization` from session and retries once on 401 using `src/auth/backendRefresher.js`.
- `backendRefresher` calls `${REACT_APP_API_BASE_URL}${REACT_APP_REFRESH_ENDPOINT}` with body `{ refresh_token }` and updates the session on success.

## Usage

### 🎯 Enhanced Auto Token Usage (NEW)

**Automatic Token Handling (No Code Changes Required!):**
```javascript
// All API calls now automatically include tokens - no manual headers needed!
import api from './services/api';
import GMBService from './services/GMBService';

// Backend API calls - auto token injection
const response = await api.get('/customer/profile');  // ✅ Auto backend token
const data = await api.post('/customer/update', userData);  // ✅ Auto refresh on 401

// Google My Business calls - auto Google token handling
const accounts = await GMBService.getAccounts();  // ✅ Auto Google token detection
const locations = await GMBService.getLocations(accountName);  // ✅ Auto refresh
```

**Enhanced Token Management:**
```javascript
import AutoTokenManager from './utils/autoTokenUtils';

// Get unified token status (Backend + Google)
const status = AutoTokenManager.getTokenStatus();
console.log('Backend token:', status.tokenPreview);
console.log('Google token:', status.googleTokenPreview);
console.log('Auto refresh active:', status.autoRefreshActive);

// Manual refresh both token types
const results = await AutoTokenManager.manualRefresh();
console.log('Backend refresh:', results.backend);
console.log('Google refresh:', results.google);

// Auto-setup Google token from available sources
const googleToken = AutoTokenManager.autoSetupGoogleToken();
if (googleToken) {
  console.log('Google token configured automatically!');
}
```

**Google Token Auto-Detection:**
```javascript
// System automatically detects tokens from:
// 1. TokenManager.get('google')
// 2. localStorage.getItem('googleAccessToken')
// 3. sessionStorage.getItem('googleAccessToken')
// 4. URL params: ?access_token=xyz or ?google_token=xyz
// 5. Environment: REACT_APP_GOOGLE_ACCESS_TOKEN (to be removed)

// No manual setup required - works automatically!
```

**Debug Token Issues:**
```javascript
// Enable debug mode (set REACT_APP_DEBUG_MODE=true)
// Shows debug button in Dashboard
// Provides real-time monitoring of both Backend and Google tokens
// Tests API calls with current tokens
// Shows token sources and status
```

### Legacy Usage

- Use `api.get/post/put/delete` from `src/services/api.js` for backend calls; no manual headers required.
- Use `GMBService` for Google calls, e.g., `GMBService.getAccounts()`; token is handled automatically.
