import { getSession, isTokenExpired, clearSession } from '../utils/authUtils';
import { refreshIfPossible } from '../auth/backendRefresher';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://52.44.140.230:8089/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.autoRefreshEnabled = true;
        this.maxRetries = 1;
    }

    setAutoRefresh(enabled) {
        this.autoRefreshEnabled = enabled;
    }

    getAutoToken() {
        const session = getSession();

        if (!session) {
            const fallbackToken = (typeof window !== 'undefined')
                ? localStorage.getItem('authToken') || localStorage.getItem('access_token')
                : null;
            console.log('[API] No session found, using fallback token:', !!fallbackToken);
            return fallbackToken;
        }

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

        if (!sessionToken && typeof window !== 'undefined') {
            const fallbackToken = localStorage.getItem('authToken') || localStorage.getItem('access_token');
            console.log('[API] No session token found, using fallback token:', !!fallbackToken);
            return fallbackToken;
        }

        console.log('[API] Using session token:', !!sessionToken);
        return sessionToken;
    }

    prepareHeaders(customHeaders = {}) {
        const token = this.getAutoToken();
        const baseHeaders = {
            'Content-Type': 'application/json',
        };

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
        const skipAuth = options.noAuth === true;

        let config = {
            ...options,
            headers: skipAuth
                ? { 'Content-Type': 'application/json', ...(options.headers || {}) }
                : this.prepareHeaders(options.headers)
        };

        console.log('[API] Request Details:', {
            url,
            method: config.method || 'GET',
            headers: config.headers,
            hasBody: !!config.body
        });

        try {
            // If session exists but token is expired, attempt refresh once proactively
            if (!skipAuth) {
                const session = getSession();
                if (session && isTokenExpired(session)) {
                    console.warn('[API] Access token appears expired (pre-flight). Attempting refresh...');
                    const refreshed = await refreshIfPossible(this.baseURL);
                    if (!refreshed?.token) {
                        console.error('[API] Session expired. Redirecting to login...');
                        if (typeof window !== 'undefined') {
                            try { clearSession(); } catch (_) {}
                            window.alert('Your session has expired. Please log in again.');
                            window.location.href = '/login';
                        }
                        return;
                    }
                    // Rebuild headers with new token
                    config.headers = this.prepareHeaders(options.headers);
                }
            }

            let response = await fetch(url, config);
            let rawText = await response.text();
            let parsed;

            try {
                parsed = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
                parsed = null;
            }

            if (!response.ok && response.status === 401 && this.autoRefreshEnabled && !skipAuth) {
                console.warn('[API] Token expired. Attempting refresh...');
                const refreshed = await refreshIfPossible(this.baseURL);
                if (refreshed?.token) {
                    console.info('[API] Token refresh successful. Retrying request...');
                    const retryHeaders = this.prepareHeaders(options.headers);
                    const retryConfig = { ...config, headers: retryHeaders };
                    response = await fetch(url, retryConfig);
                    rawText = await response.text();
                    try {
                        parsed = rawText ? JSON.parse(rawText) : null;
                    } catch (_) {
                        parsed = null;
                    }

                    if (response.ok) return parsed;
                }
                console.error('[API] Session expired. Redirecting to login...');
                if (typeof window !== 'undefined') {
                    try { clearSession(); } catch (_) {}
                    window.alert('Your session has expired. Please log in again.');
                    window.location.href = '/login'; 
                }
                return;
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
            console.error('[API] Request failed:', error);
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
