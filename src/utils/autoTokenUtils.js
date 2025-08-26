import { getSession, setSession } from './authUtils';
import ApiService from '../services/api';

class AutoTokenManager {
    constructor() {
        this.tokenCheckInterval = null;
        this.refreshThreshold = 5 * 60 * 1000; // 5 minutes before expiry
        this.checkIntervalMs = 60000; // Check every minute
    }

    // Start automatic token monitoring
    startAutoRefresh(intervalMs = this.checkIntervalMs) {
        if (this.tokenCheckInterval) {
            clearInterval(this.tokenCheckInterval);
        }

        console.log('🔄 Starting automatic token refresh monitoring...');
        
        this.tokenCheckInterval = setInterval(() => {
            this.checkAndRefreshToken();
        }, intervalMs);

        // Initial check
        this.checkAndRefreshToken();
    }

    // Stop automatic token monitoring
    stopAutoRefresh() {
        if (this.tokenCheckInterval) {
            clearInterval(this.tokenCheckInterval);
            this.tokenCheckInterval = null;
            console.log('⏹️ Stopped automatic token refresh monitoring');
        }
    }

    // Check if token needs refresh and refresh automatically
    async checkAndRefreshToken() {
        const session = getSession();
        if (!session || !session.token) {
            console.log('🔍 No session or token found during auto-check');
            return;
        }

        // Check if token is about to expire
        if (this.isTokenExpiringSoon(session)) {
            console.log('⏰ Token expiring soon, attempting auto-refresh...');
            try {
                await this.refreshToken();
                console.log('✅ Token auto-refreshed successfully');
            } catch (error) {
                console.warn('❌ Auto token refresh failed:', error);
            }
        }
    }

    // Check if token is expiring soon
    isTokenExpiringSoon(session) {
        if (!session.expires_at) {
            // If no expiry info, assume it's valid for now
            return false;
        }
        
        const expiryTime = new Date(session.expires_at).getTime();
        const currentTime = Date.now();
        
        return (expiryTime - currentTime) <= this.refreshThreshold;
    }

    // Refresh token using the existing refresher
    async refreshToken() {
        const { refreshIfPossible } = await import('../auth/backendRefresher');
        return await refreshIfPossible(ApiService.baseURL);
    }

    // Get current auto token status
    getTokenStatus() {
        const session = getSession();
        const hasToken = !!session?.token;
        const hasRefreshToken = !!session?.refresh_token;
        
        return {
            hasToken,
            hasRefreshToken,
            isExpiringSoon: session ? this.isTokenExpiringSoon(session) : false,
            autoRefreshActive: !!this.tokenCheckInterval,
            tokenPreview: hasToken ? `${session.token.substring(0, 10)}...` : 'No token',
            session: session ? {
                hasUser: !!session.user,
                hasData: !!session.data,
                fields: Object.keys(session)
            } : null
        };
    }

    // Get detailed token information for debugging
    getDetailedTokenInfo() {
        const session = getSession();
        const autoToken = ApiService.prototype.getAutoToken.call(ApiService);
        
        return {
            session: session,
            autoExtractedToken: autoToken ? `${autoToken.substring(0, 10)}...` : 'No token',
            tokenSources: {
                sessionToken: session?.token ? `${session.token.substring(0, 10)}...` : null,
                sessionAccessToken: session?.access_token ? `${session.access_token.substring(0, 10)}...` : null,
                userToken: session?.user?.token ? `${session.user.token.substring(0, 10)}...` : null,
                localStorage: (typeof window !== 'undefined' && localStorage.getItem('authToken')) 
                    ? `${localStorage.getItem('authToken').substring(0, 10)}...` : null
            },
            status: this.getTokenStatus()
        };
    }

    // Manual token refresh trigger
    async manualRefresh() {
        console.log('🔄 Manual token refresh triggered...');
        try {
            const result = await this.refreshToken();
            if (result) {
                console.log('✅ Manual token refresh successful');
                return result;
            } else {
                console.warn('⚠️ Manual token refresh returned no result');
                return null;
            }
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