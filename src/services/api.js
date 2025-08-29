import { getSession } from '../utils/authUtils';
import { refreshIfPossible } from '../auth/backendRefresher';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://52.44.140.230:8089/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.autoRefreshEnabled = true;
        this.maxRetries = 1;
    }

    // Enable/disable automatic token refresh
    setAutoRefresh(enabled) {
        this.autoRefreshEnabled = enabled;
    }

    // Automatically extract token from multiple sources
    getAutoToken() {
        const session = getSession();
        
        if (!session) {
            // Fallback to localStorage
            const fallbackToken = (typeof window !== 'undefined') 
                ? localStorage.getItem('authToken') || localStorage.getItem('access_token')
                : null;
            console.log('[API] No session found, using fallback token:', !!fallbackToken);
            return fallbackToken;
        }
        
        // Try multiple token field names for flexibility
        const tokenSources = [
            session.token,
            session.access_token,
            session.accessToken,
            session.authToken,
            session.bearer_token,
            session.user?.token,
            session.data?.token
        ];
        
        const sessionToken = tokenSources.find(token => token);
        
        // Fallback to localStorage if no session token
        if (!sessionToken && typeof window !== 'undefined') {
            const fallbackToken = localStorage.getItem('authToken') || localStorage.getItem('access_token');
            console.log('[API] No session token found, using fallback token:', !!fallbackToken);
            return fallbackToken;
        }
        
        console.log('[API] Using session token:', !!sessionToken);
        return sessionToken;
    }

    // Automatically prepare headers with token
    prepareHeaders(customHeaders = {}) {
        const token = this.getAutoToken();
        const baseHeaders = {
            'Content-Type': 'application/json',
        };

        // Debug token extraction
      

        // Add token in multiple header formats for maximum compatibility
        if (token) {
            return {
                ...baseHeaders,
                'Authorization': `${token}`,
                ...customHeaders
            };
        }

        return {
            ...baseHeaders,
            ...customHeaders
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Skip auto token for explicitly unauthenticated requests
        const skipAuth = options.noAuth === true;
        
        const config = {
            ...options,
            headers: skipAuth 
                ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
                : this.prepareHeaders(options.headers)
        };

        // Debug logging
        console.log('[API] Request Details:', {
            url,
            method: config.method || 'GET',
            headers: config.headers,
            hasBody: !!config.body
        });

        try {
            let response = await fetch(url, config);
            let rawText = await response.text();
            let parsed;
            
            try {
                parsed = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
                parsed = null;
            }

            // Auto refresh on 401 if enabled and not already skipping auth
            if (!response.ok && response.status === 401 && this.autoRefreshEnabled && !skipAuth) {
                const refreshed = await refreshIfPossible(this.baseURL);
                if (refreshed?.token) {
                    // Retry with new token using full header preparation
                    const retryHeaders = this.prepareHeaders(options.headers);
                    const retryConfig = { ...config, headers: retryHeaders };
                    
                    response = await fetch(url, retryConfig);
                    rawText = await response.text();
                    
                    try {
                        parsed = rawText ? JSON.parse(rawText) : null;
                    } catch (_) {
                        parsed = null;
                    }
                    
                    if (response.ok) {
                        return parsed;
                    }
                }
            }

            if (!response.ok) {
                const message = parsed?.message || parsed?.error || rawText || `HTTP error! status: ${response.status}`;
                const err = new Error(message);
                err.status = response.status;
                err.body = parsed || rawText;
                throw err;
            }

            return parsed;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get(endpoint, headers = {}) {
        return this.request(endpoint, {
            method: 'GET',
            headers,
        });
    }

    async post(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data, headers = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint, headers = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            headers,
        });
    }
}

export default new ApiService();
