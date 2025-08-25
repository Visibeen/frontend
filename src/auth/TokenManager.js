// Generic token manager with optional auto-refresh per namespace
// Note: In frontend apps, token storage is best-effort only.

import { save as storageSave, load as storageLoad, remove as storageRemove } from './TokenStorage';

const nowEpoch = () => Math.floor(Date.now() / 1000);

function normalize(tokenObj = {}) {
  const {
    access_token = tokenObj.accessToken || '',
    refresh_token = tokenObj.refreshToken || '',
    expires_in = tokenObj.expiresIn || 0,
    expires_at = tokenObj.expiresAt || 0,
    token_type = tokenObj.tokenType || 'Bearer',
    scope = tokenObj.scope || tokenObj.scopes || '',
    id_token = tokenObj.id_token,
  } = tokenObj;

  let final_expires_at = expires_at;
  if (!final_expires_at && expires_in) {
    final_expires_at = nowEpoch() + Number(expires_in);
  }

  return {
    access_token,
    refresh_token,
    token_type,
    scope,
    id_token,
    expires_at: final_expires_at || 0,
  };
}

class TokenManager {
  constructor() {
    this.refreshers = new Map();
  }

  registerRefresher(namespace, refresherFn) {
    this.refreshers.set(namespace, refresherFn);
  }

  clearRefresher(namespace) {
    this.refreshers.delete(namespace);
  }

  set(namespace, tokenObj) {
    const normalized = normalize(tokenObj);
    storageSave(namespace, normalized);
    return normalized;
  }

  get(namespace) {
    return storageLoad(namespace);
  }

  remove(namespace) {
    storageRemove(namespace);
  }

  isExpired(namespace, skewSeconds = 60) {
    const t = this.get(namespace);
    if (!t || !t.expires_at) return false; // if unknown, assume not expired
    return nowEpoch() >= (Number(t.expires_at) - skewSeconds);
  }

  async getValidAccessToken(namespace, refresherOverride) {
    let t = this.get(namespace);
    if (t && t.access_token && !this.isExpired(namespace)) {
      return t.access_token;
    }

    const refresher = refresherOverride || this.refreshers.get(namespace);
    if (typeof refresher === 'function') {
      const newTokens = await refresher(t);
      if (newTokens && newTokens.access_token) {
        t = this.set(namespace, newTokens);
        return t.access_token;
      }
    }
    // No refresher or failed: return whatever we have (may be empty)
    return t?.access_token || '';
  }
}

const tokenManager = new TokenManager();
export default tokenManager;
