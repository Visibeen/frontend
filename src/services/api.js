import { getSession } from '../utils/authUtils';
import { refreshIfPossible } from '../auth/backendRefresher';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://52.44.140.230:8089/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const session = getSession();
        const bearer = session?.token ? `Bearer ${session.token}` : undefined;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(bearer && { Authorization: bearer }),
                ...(options.headers || {}),
            },
        };

        try {
            let response = await fetch(url, config);

            let rawText = await response.text();
            let parsed;
            try {
                parsed = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
                parsed = null;
            }

            if (!response.ok) {
                // If unauthorized, attempt refresh once and retry
                if (response.status === 401) {
                    const refreshed = await refreshIfPossible(this.baseURL);
                    if (refreshed?.token) {
                        const retryHeaders = {
                            ...config.headers,
                            Authorization: `Bearer ${refreshed.token}`
                        };
                        response = await fetch(url, { ...config, headers: retryHeaders });
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
