/**
 * Error Reporting Service
 * Handles error logging and reporting functionality
 */

class ErrorReportingService {
    constructor() {
        this.enabled = false;
        this.errorQueue = [];
        this.maxQueueSize = 100;
    }

    /**
     * Enable error reporting
     */
    enable() {
        this.enabled = true;
        console.log('[ErrorReporting] Service enabled');
    }

    /**
     * Disable error reporting
     */
    disable() {
        this.enabled = false;
        console.log('[ErrorReporting] Service disabled');
    }

    /**
     * Log an error
     */
    logError(error, context = {}) {
        if (!this.enabled) return;

        const errorEntry = {
            timestamp: new Date().toISOString(),
            message: error.message || 'Unknown error',
            stack: error.stack,
            context,
            type: error.name || 'Error',
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
        };

        // Add to queue
        this.errorQueue.push(errorEntry);

        // Maintain queue size
        if (this.errorQueue.length > this.maxQueueSize) {
            this.errorQueue.shift();
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('[ErrorReporting]', errorEntry);
        }
    }

    /**
     * Get recent errors
     */
    getRecentErrors(limit = 10) {
        return this.errorQueue.slice(-limit);
    }

    /**
     * Clear error queue
     */
    clearErrors() {
        this.errorQueue = [];
    }

    /**
     * Get error statistics
     */
    getStats() {
        return {
            totalErrors: this.errorQueue.length,
            enabled: this.enabled,
            queueSize: this.errorQueue.length
        };
    }
}

export default new ErrorReportingService();
