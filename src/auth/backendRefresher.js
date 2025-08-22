// Backend token refresher using a configurable refresh endpoint
// Expects env REACT_APP_REFRESH_ENDPOINT (relative to API base) and user session to contain a refresh token.

import { getSession, setSession } from '../utils/authUtils';

const REFRESH_ENDPOINT = process.env.REACT_APP_REFRESH_ENDPOINT || '/auth/refresh';

export async function refreshIfPossible(apiBaseUrl) {
  const session = getSession();
  if (!session) return null;

  const refreshToken = session.refresh_token || session.refreshToken;
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${apiBaseUrl}${REFRESH_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      // refresh failed; do not modify session
      return null;
    }

    const data = await res.json();
    // Accept various shapes: { token, refresh_token, expires_at }
    const newToken = data.token || data.access_token || data.accessToken;
    if (newToken) {
      const updated = {
        ...session,
        token: newToken,
      };
      if (data.refresh_token || data.refreshToken) {
        updated.refresh_token = data.refresh_token || data.refreshToken;
      }
      if (data.expires_at || data.expiresAt) {
        updated.expires_at = data.expires_at || data.expiresAt;
      }
      setSession(updated);
      return updated;
    }
    return null;
  } catch (e) {
    console.warn('Backend refresh error', e);
    return null;
  }
}
