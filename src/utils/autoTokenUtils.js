import { getSession, setSession } from './authUtils';
import ApiService from '../services/api';
import tokenManager from '../auth/TokenManager';
import { registerGoogleRefresher } from '../auth/googleRefresher';

class AutoTokenManager {
    constructor() {
        this.tokenCheckInterval = null;
        this.refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry
        this.checkIntervalMs = 60000; // Check every minute
        
        // Initialize Google refresher
        registerGoogleRefresher();
    }

    // Start automatic token monitoring for both backend and Google tokens
    startAutoRefresh(intervalMs = this.checkIntervalMs) {
        if (this.tokenCheckInterval) {
            clearInterval(this.tokenCheckInterval);
        }

        console.log('🔄 Starting automatic token refresh monitoring (Backend + Google)...');
        
        this.tokenCheckInterval = setInterval(() => {
            this.checkAndRefreshAllTokens();
        }, intervalMs);

        // Initial check and setup
        this.autoSetupGoogleToken();
        this.checkAndRefreshAllTokens();
    }

    // Stop automatic token monitoring
    stopAutoRefresh() {
        if (this.tokenCheckInterval) {
            clearInterval(this.tokenCheckInterval);
            this.tokenCheckInterval = null;
            console.log('⏹️ Stopped automatic token refresh monitoring');
        }
    }

    // Check and refresh both backend and Google tokens
    async checkAndRefreshAllTokens() {
        // Check backend token
        await this.checkAndRefreshBackendToken();
        
        // Check Google token
        await this.checkAndRefreshGoogleToken();
    }

    // Check if backend token needs refresh and refresh automatically
    async checkAndRefreshBackendToken() {
        const session = getSession();
        if (!session || !session.token) {
            return;
        }

        // Check if token is about to expire
        if (this.isTokenExpiringSoon(session)) {
            console.log('⏰ Backend token expiring soon, attempting auto-refresh...');
            try {
                await this.refreshBackendToken();
                console.log('✅ Backend token auto-refreshed successfully');
            } catch (error) {
                console.warn('❌ Backend auto token refresh failed:', error);
            }
        }
    }

    // Check and refresh Google token
    async checkAndRefreshGoogleToken() {
        const googleToken = tokenManager.get('google');
        if (!googleToken || !googleToken.access_token) {
            // Try to setup from legacy storage
            this.autoSetupGoogleToken();
            return;
        }

        // Check if Google token is about to expire
        if (this.isGoogleTokenExpiringSoon(googleToken)) {
            console.log('⏰ Google access token expiring soon, attempting auto-refresh...');
            try {
                const newToken = await tokenManager.getValidAccessToken('google');
                if (newToken) {
                    console.log('✅ Google access token auto-refreshed successfully');
                    
                    // Also update localStorage for backward compatibility
                    localStorage.setItem('googleAccessToken', newToken);
                    sessionStorage.setItem('googleAccessToken', newToken);
                }
            } catch (error) {
                console.warn('❌ Google token auto-refresh failed:', error);
            }
        }
    }

    // Check if backend token is expiring soon
    isTokenExpiringSoon(session) {
        if (!session.expires_at) {
            // If no expiry info, assume it's valid for now
            return false;
        }
        
        const expiryTime = new Date(session.expires_at).getTime();
        const currentTime = Date.now();
        
        return (expiryTime - currentTime) <= this.refreshThreshold;
    }

    // Check if Google token is expiring soon
    isGoogleTokenExpiringSoon(googleToken) {
        if (!googleToken.expires_at) {
            // If no expiry info, check if it's been more than 50 minutes (Google tokens typically last 1 hour)
            const defaultExpiryTime = 50 * 60 * 1000; // 50 minutes
            const tokenAge = Date.now() - (googleToken.created_at || Date.now());
            return tokenAge >= defaultExpiryTime;
        }
        
        const expiryTime = new Date(googleToken.expires_at).getTime();
        const currentTime = Date.now();
        
        return (expiryTime - currentTime) <= this.refreshThreshold;
    }

    // Refresh backend token using the existing refresher
    async refreshBackendToken() {
        const { refreshIfPossible } = await import('../auth/backendRefresher');
        return await refreshIfPossible(ApiService.baseURL);
    }

    // Refresh Google token using TokenManager
    async refreshGoogleToken() {
        return await tokenManager.getValidAccessToken('google');
    }

    // Auto-setup Google token from various sources
    autoSetupGoogleToken() {
        // Check if we have a Google token in various locations
        const sources = [
            () => tokenManager.get('google')?.access_token,
            () => localStorage.getItem('googleAccessToken'),
            () => sessionStorage.getItem('googleAccessToken'),
            () => {
                // Check URL params (for OAuth redirects)
                if (typeof window !== 'undefined') {
                    const urlParams = new URLSearchParams(window.location.search);
                    return urlParams.get('access_token') || urlParams.get('google_token');
                }
                return null;
            },
            () => {
                // Check environment variable (for development - should be removed in production)
                return process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
            }
        ];
        
        for (const getToken of sources) {
            try {
                const token = getToken();
                if (token && typeof token === 'string' && token.length > 10) {
                    console.log('🔍 Found Google token, setting up auto-management...');
                    tokenManager.set('google', { 
                        access_token: token, 
                        token_type: 'Bearer',
                        created_at: Date.now()
                    });
                    
                    // Sync to legacy storage
                    localStorage.setItem('googleAccessToken', token);
                    sessionStorage.setItem('googleAccessToken', token);
                    
                    return token;
                }
            } catch (error) {
                console.warn('Error checking token source:', error);
            }
        }
        
        return null;
    }

    // Get Google token from auto sources
    getAutoGoogleToken() {
        // Try TokenManager first
        const tokenManagerToken = tokenManager.get('google')?.access_token;
        if (tokenManagerToken) {
            return tokenManagerToken;
        }

        // Fallback to legacy storage
        const legacyToken = localStorage.getItem('googleAccessToken') || sessionStorage.getItem('googleAccessToken');
        if (legacyToken) {
            // Sync back to TokenManager
            tokenManager.set('google', { 
                access_token: legacyToken, 
                token_type: 'Bearer',
                created_at: Date.now()
            });
            return legacyToken;
        }

        return null;
    }

    // Get current auto token status for both backend and Google
    getTokenStatus() {
        const session = getSession();
        const googleToken = tokenManager.get('google');
        const hasBackendToken = !!session?.token;
        const hasBackendRefreshToken = !!session?.refresh_token;
        const hasGoogleToken = !!googleToken?.access_token;
        const hasGoogleRefreshToken = !!googleToken?.refresh_token;
        
        return {
            // Backend token status
            hasToken: hasBackendToken,
            hasRefreshToken: hasBackendRefreshToken,
            isExpiringSoon: session ? this.isTokenExpiringSoon(session) : false,
            tokenPreview: hasBackendToken ? `${session.token.substring(0, 10)}...` : 'No token',
            
            // Google token status
            hasGoogleToken,
            hasGoogleRefreshToken,
            isGoogleTokenExpiringSoon: googleToken ? this.isGoogleTokenExpiringSoon(googleToken) : false,
            googleTokenPreview: hasGoogleToken ? `${googleToken.access_token.substring(0, 10)}...` : 'No Google token',
            
            // Auto refresh status
            autoRefreshActive: !!this.tokenCheckInterval,
            
            // Session info
            session: session ? {
                hasUser: !!session.user,
                hasData: !!session.data,
                fields: Object.keys(session)
            } : null
        };
    }

    // Get detailed token information for debugging (both backend and Google)
    getDetailedTokenInfo() {
        const session = getSession();
        const googleToken = tokenManager.get('google');
        const autoToken = ApiService.prototype.getAutoToken.call(ApiService);
        const autoGoogleToken = this.getAutoGoogleToken();
        
        return {
            // Backend token info
            session: session,
            autoExtractedToken: autoToken ? `${autoToken.substring(0, 10)}...` : 'No token',
            tokenSources: {
                sessionToken: session?.token ? `${session.token.substring(0, 10)}...` : null,
                sessionAccessToken: session?.access_token ? `${session.access_token.substring(0, 10)}...` : null,
                userToken: session?.user?.token ? `${session.user.token.substring(0, 10)}...` : null,
                localStorage: (typeof window !== 'undefined' && localStorage.getItem('authToken')) 
                    ? `${localStorage.getItem('authToken').substring(0, 10)}...` : null
            },
            
            // Google token info
            googleToken: googleToken,
            autoExtractedGoogleToken: autoGoogleToken ? `${autoGoogleToken.substring(0, 10)}...` : 'No Google token',
            googleTokenSources: {
                tokenManager: googleToken?.access_token ? `${googleToken.access_token.substring(0, 10)}...` : null,
                localStorage: (typeof window !== 'undefined' && localStorage.getItem('googleAccessToken')) 
                    ? `${localStorage.getItem('googleAccessToken').substring(0, 10)}...` : null,
                sessionStorage: (typeof window !== 'undefined' && sessionStorage.getItem('googleAccessToken')) 
                    ? `${sessionStorage.getItem('googleAccessToken').substring(0, 10)}...` : null,
                environment: process.env.REACT_APP_GOOGLE_ACCESS_TOKEN 
                    ? `${process.env.REACT_APP_GOOGLE_ACCESS_TOKEN.substring(0, 10)}...` : null
            },
            
            status: this.getTokenStatus()
        };
    }

    // Manual token refresh trigger for both backend and Google tokens
    async manualRefresh() {
        console.log('🔄 Manual token refresh triggered for both backend and Google...');
        try {
            const results = {
                backend: null,
                google: null
            };
            
            // Refresh backend token
            try {
                results.backend = await this.refreshBackendToken();
                if (results.backend) {
                    console.log('✅ Manual backend token refresh successful');
                } else {
                    console.warn('⚠️ Manual backend token refresh returned no result');
                }
            } catch (error) {
                console.error('❌ Manual backend token refresh failed:', error);
            }
            
            // Refresh Google token
            try {
                results.google = await this.refreshGoogleToken();
                if (results.google) {
                    console.log('✅ Manual Google token refresh successful');
                    // Update legacy storage
                    localStorage.setItem('googleAccessToken', results.google);
                    sessionStorage.setItem('googleAccessToken', results.google);
                } else {
                    console.warn('⚠️ Manual Google token refresh returned no result');
                }
            } catch (error) {
                console.error('❌ Manual Google token refresh failed:', error);
            }
            
            return results;
        } catch (error) {
            console.error('❌ Manual token refresh failed:', error);
            throw error;
        }
    }

    // Set custom refresh threshold
    setRefreshThreshold(milliseconds) {
        this.refreshThreshold = milliseconds;
        console.log(`⚙️ Token refresh threshold set to ${milliseconds}ms`);
    }
}

export default new AutoTokenManager();