
export const setSession = (user) => {
  if (!user || typeof user !== 'object') {
    console.warn('Invalid user passed to setSession:', user);
    return;
  }
  
  // Normalize token field to user.token if missing
  if (!user.token) {
    const candidate = user.access_token || user.accessToken || user.authToken || user.bearer_token || user?.user?.token;
    if (candidate) {
      user.token = candidate;
    }
  }

  localStorage.setItem('user', JSON.stringify(user));
  
  // Add this: Store token separately for backend compatibility
  if (user.token) {
    localStorage.setItem('authToken', user.token);
  }
};


export const getSession = () => {
  try {
    // Use only localStorage
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const clearSession = () => {
  // Clear user session data
  localStorage.removeItem('user');
  localStorage.removeItem('userData');
  // Clear cached GMB profiles to prevent stale data after account switch
  localStorage.removeItem('availableGMBProfiles');
  localStorage.removeItem('availableGMBProfilesOwner');
  // Clear EDMS cached data
  localStorage.removeItem('accountInfo');
  localStorage.removeItem('accountInfoOwner');
  localStorage.removeItem('uploadedLogo');
  localStorage.removeItem('isLogoUploaded');
  localStorage.removeItem('selectedFontStyle');
  localStorage.removeItem('visibeen.selectedFooterId');
  
  // Clear backend/database tokens
  localStorage.removeItem('authToken');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
  
  // Clear Google tokens
  localStorage.removeItem('googleAccessToken');
  localStorage.removeItem('google_token');
  localStorage.removeItem('googleRefreshToken');
  
  // Clear any other potential token storage
  localStorage.removeItem('bearer_token');
  localStorage.removeItem('id_token');
  
  // Clear URL parameters if possible
  if (typeof window !== 'undefined') {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('access_token');
      url.searchParams.delete('google_token');
      url.searchParams.delete('token');
      url.searchParams.delete('id_token');
      window.history.replaceState({}, document.title, url.pathname);
    } catch (e) {
      console.warn('Could not clear URL parameters:', e);
    }
  }
  
  console.log('Session and all tokens cleared successfully');
};

// Determine if the session's token is expired based on expires_at (unix seconds or ISO)
export function isTokenExpired(session, skewSeconds = 60) {
  if (!session) return false;
  const expiresAt = session.expires_at || session.expiresAt;
  if (!expiresAt) return false;
  let expiryEpoch;
  if (typeof expiresAt === 'number') {
    expiryEpoch = expiresAt;
  } else {
    const parsed = Date.parse(expiresAt);
    if (Number.isNaN(parsed)) return false;
    expiryEpoch = Math.floor(parsed / 1000);
  }
  const now = Math.floor(Date.now() / 1000);
  return now >= (expiryEpoch - skewSeconds);
}

// Auto token extraction with multiple fallbacks
export function getAutoToken() {
    const session = getSession();
    
    if (!session) {
        // Fallback to localStorage tokens
        return (typeof window !== 'undefined') 
            ? localStorage.getItem('authToken') || localStorage.getItem('access_token')
            : null;
    }
    
    // Try multiple token field names
    const tokenFields = [
        'token',
        'access_token',
        'accessToken', 
        'authToken',
        'bearer_token'
    ];
    
    // Direct session level
    for (const field of tokenFields) {
        if (session[field]) return session[field];
    }
    
    // Nested in user object
    if (session.user) {
        for (const field of tokenFields) {
            if (session.user[field]) return session.user[field];
        }
    }
    
    // Nested in data object
    if (session.data) {
        for (const field of tokenFields) {
            if (session.data[field]) return session.data[field];
        }
    }
    
    // Final fallback to localStorage
    return (typeof window !== 'undefined') 
        ? localStorage.getItem('authToken') || localStorage.getItem('access_token')
        : null;
}

// Auto setup session with token normalization
export function setAutoSession(authResponse) {
    if (!authResponse || typeof authResponse !== 'object') {
        console.warn('Invalid auth response passed to setAutoSession:', authResponse);
        return null;
    }
    
    let session = { ...authResponse };
    
    // Normalize token field names
    if (authResponse.access_token && !authResponse.token) {
        session.token = authResponse.access_token;
    }
    if (authResponse.accessToken && !authResponse.token) {
        session.token = authResponse.accessToken;
    }
    if (authResponse.authToken && !authResponse.token) {
        session.token = authResponse.authToken;
    }
    
    // Set expiry if not present but expires_in is available
    if (authResponse.expires_in && !authResponse.expires_at) {
        session.expires_at = new Date(Date.now() + (authResponse.expires_in * 1000)).toISOString();
    }
    
    // Normalize refresh token
    if (authResponse.refreshToken && !authResponse.refresh_token) {
        session.refresh_token = authResponse.refreshToken;
    }
    
    console.log('🔐 Setting auto session with normalized tokens');
    setSession(session);
    return session;
}

// Session validation utility
export function isSessionValid() {
    const session = getSession();
    const token = getAutoToken();
    
    return {
        hasSession: !!session,
        hasToken: !!token,
        hasRefreshToken: !!(session?.refresh_token || session?.refreshToken),
        isValid: !!(session && token)
    };
}

// Debug session information
export function getSessionDebugInfo() {
    const session = getSession();
    const autoToken = getAutoToken();
    const validation = isSessionValid();
    
    return {
        session,
        autoToken: autoToken ? `${autoToken.substring(0, 10)}...` : 'No token',
        validation,
        localStorage: {
            authToken: typeof window !== 'undefined' && localStorage.getItem('authToken') 
                ? `${localStorage.getItem('authToken').substring(0, 10)}...` : 'No token',
            accessToken: typeof window !== 'undefined' && localStorage.getItem('access_token') 
                ? `${localStorage.getItem('access_token').substring(0, 10)}...` : 'No token'
        }
    };
}
