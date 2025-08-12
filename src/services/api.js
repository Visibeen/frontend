const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://52.44.140.230:8089/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        };

        try {
            const response = await fetch(url, config);

            const rawText = await response.text();
            let parsed;
            try {
                parsed = rawText ? JSON.parse(rawText) : null;
            } catch (_) {
                parsed = null;
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
