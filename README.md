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

Google Tokens
- Stored with `TokenManager` under namespace `google`.
- Auto-refreshed via `src/auth/googleRefresher.js` when available (needs refresh_token).
- `GMBService` methods can omit accessToken; tokens are attached automatically with retry-on-401.

Backend Token
- `src/services/api.js` auto-injects `Authorization` from session and retries once on 401 using `src/auth/backendRefresher.js`.
- `backendRefresher` calls `${REACT_APP_API_BASE_URL}${REACT_APP_REFRESH_ENDPOINT}` with body `{ refresh_token }` and updates the session on success.

## Usage

- Use `api.get/post/put/delete` from `src/services/api.js` for backend calls; no manual headers required.
- Use `GMBService` for Google calls, e.g., `GMBService.getAccounts()`; token is handled automatically.
