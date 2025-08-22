import oauthConfig from '../config/oauth';
import tokenManager from './TokenManager';

// This refresher expects a stored refresh_token for namespace 'google'.
// It will call Google's token endpoint to get a new access_token.
export async function googleRefresher(existingTokens) {
  const ns = 'google';
  const current = existingTokens || tokenManager.get(ns) || {};
  const refreshToken = current.refresh_token;
  if (!refreshToken) {
    // No way to refresh silently
    return current;
  }

  const params = new URLSearchParams({
    client_id: oauthConfig.google.clientId,
    client_secret: oauthConfig.google.clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch(oauthConfig.google.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!res.ok) {
    // If refresh fails, keep existing (may be expired) to let caller handle re-auth
    const errText = await res.text();
    console.warn('Google token refresh failed:', errText);
    return current;
  }

  const json = await res.json();
  // Preserve refresh_token if Google does not return it every time
  if (!json.refresh_token) json.refresh_token = refreshToken;
  return json;
}

export function registerGoogleRefresher() {
  tokenManager.registerRefresher('google', googleRefresher);
}
