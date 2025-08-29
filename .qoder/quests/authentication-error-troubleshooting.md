# Authentication Error Troubleshooting Design Document

## Overview

This document analyzes a critical authentication error occurring in the Visibeen frontend application where API requests fail with "400 Bad Request" and "Authentication Failed" errors due to incorrect authorization header formatting.

### Error Context
- **Error Type**: HTTP 400 Bad Request with "Authentication Failed" message
- **Root Cause**: Incorrect authorization header format using `${token?.token}` instead of `Bearer ${token}`
- **Affected Components**: AccountInfo.jsx, AccountInfoForm.jsx, CROInfoForm.jsx, GSTInfoForm.jsx
- **Impact**: Complete API authentication failure preventing form submissions

## Architecture Analysis

### Current Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant AccountInfo as AccountInfo Component
    participant AuthUtils as authUtils.js
    participant ApiService as api.js
    participant Backend as Backend API
    
    User->>AccountInfo: Submit Form
    AccountInfo->>AuthUtils: getSession()
    AuthUtils-->>AccountInfo: session object
    AccountInfo->>AuthUtils: getAutoToken()
    AuthUtils-->>AccountInfo: token string
    AccountInfo->>ApiService: api.post('/customer/edms/create-edms', payload)
    ApiService->>ApiService: prepareHeaders()
    Note over ApiService: ISSUE: Uses 'Authorization': `${token?.token}`
    ApiService->>Backend: POST with malformed header
    Backend-->>ApiService: 400 Bad Request
    ApiService-->>AccountInfo: Authentication Failed Error
    AccountInfo->>User: Display Error Message
```

### Token Management System

```mermaid
flowchart TD
    Start([API Request]) --> GetToken["getAutoToken()"]
    GetToken --> CheckSession{"Session Exists?"}
    CheckSession -->|Yes| ExtractToken["Extract from multiple sources"]
    ExtractToken --> TokenSources["session.token<br/>session.access_token<br/>session.accessToken<br/>session.authToken<br/>session.bearer_token<br/>session.user?.token<br/>session.data?.token"]
    TokenSources --> FoundToken{"Token Found?"}
    CheckSession -->|No| FallbackStorage["localStorage fallback"]
    FallbackStorage --> CheckStorage["authToken or access_token"]
    CheckStorage --> FoundToken
    FoundToken -->|Yes| PrepareHeaders["prepareHeaders()"]
    FoundToken -->|No| NoAuth["No Authorization Header"]
    PrepareHeaders --> FormatError["❌ ISSUE: 'Authorization': `${token?.token}`"]
    FormatError --> BadRequest["400 Bad Request"]
    NoAuth --> UnauthorizedRequest["Request without auth"]
```

## Root Cause Analysis

### Primary Issue: Incorrect Authorization Header Format

**Current Implementation (Incorrect):**
```javascript
// In api.js line 62
if (token) {
    return {
        ...baseHeaders,
        'Authorization': `${token?.token}`,  // ❌ WRONG: Accessing .token property
        ...customHeaders
    };
}
```

**Expected Implementation:**
```javascript
if (token) {
    return {
        ...baseHeaders,
        'Authorization': `Bearer ${token}`,  // ✅ CORRECT: Bearer prefix with token string
        ...customHeaders
    };
}
```

### Secondary Issues

1. **Token Property Access**: The code assumes token is an object with a `.token` property, but `getAutoToken()` returns a string
2. **Missing Bearer Prefix**: Backend expects "Bearer [token]" format as per OAuth 2.0 standards
3. **Inconsistent Error Handling**: Mixed error response parsing between components

## Technical Specifications

### Authentication Header Standards

| Format | Usage | Example |
|--------|-------|---------|
| `Bearer ${token}` | ✅ OAuth 2.0 Standard | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `${token?.token}` | ❌ Current (Incorrect) | `undefined` (if token is string) |
| `${token}` | ⚠️ Missing Bearer | `eyJhbGciOiJIUzI1NiIs...` |

### Token Extraction Logic

The `getAutoToken()` function correctly returns a string token from multiple sources:

```mermaid
flowchart LR
    A[getAutoToken] --> B{Session exists?}
    B -->|Yes| C[Check token fields]
    C --> D[session.token]
    C --> E[session.access_token] 
    C --> F[session.accessToken]
    C --> G[session.authToken]
    C --> H[session.bearer_token]
    C --> I[session.user?.token]
    C --> J[session.data?.token]
    D --> K[Return first found]
    E --> K
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K
    B -->|No| L[localStorage fallback]
    L --> M[authToken or access_token]
    M --> K
    K --> N[String Token]
```

## Solution Architecture

### Fixed Header Preparation

```javascript
prepareHeaders(customHeaders = {}) {
    const token = this.getAutoToken();
    const baseHeaders = {
        'Content-Type': 'application/json',
    };

    if (token) {
        return {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`, // ✅ FIXED: Proper Bearer format
            ...customHeaders
        };
    }

    return {
        ...baseHeaders,
        ...customHeaders
    };
}
```

### Error Handling Enhancement

```mermaid
flowchart TD
    A[API Request] --> B{Response Status}
    B -->|200-299| C[Success Response]
    B -->|400| D[Bad Request Handler]
    B -->|401| E[Unauthorized Handler]
    B -->|Other| F[Generic Error Handler]
    
    D --> D1[Parse error message]
    D1 --> D2[Display specific feedback]
    
    E --> E1[Clear session]
    E1 --> E2[Redirect to login]
    
    F --> F1[Log error details]
    F1 --> F2[Display generic message]
```

## Implementation Requirements

### Critical Fix
1. **Update Authorization Header Format** in `api.js`
   - Change from `'Authorization': \`${token?.token}\`` 
   - To `'Authorization': \`Bearer ${token}\``

### Enhanced Error Handling
2. **Standardize Error Response Parsing**
   - Consistent error message extraction
   - Proper HTTP status code handling
   - User-friendly error messages

### Debugging Improvements  
3. **Enhanced Logging**
   - Token validation logging
   - Header inspection utilities
   - Request/response debugging

## Testing Strategy

### Unit Testing
```javascript
describe('ApiService Authentication', () => {
  test('should format authorization header correctly', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIs...';
    const headers = apiService.prepareHeaders();
    expect(headers.Authorization).toBe(`Bearer ${mockToken}`);
  });
  
  test('should handle missing token gracefully', () => {
    // Mock getAutoToken to return null
    const headers = apiService.prepareHeaders();
    expect(headers.Authorization).toBeUndefined();
  });
});
```

### Integration Testing
- Test actual API calls with valid tokens
- Verify error handling for expired tokens
- Test token refresh mechanism

## Error Prevention Measures

### Code Review Checklist
- [ ] Authorization header uses "Bearer" prefix
- [ ] Token is treated as string, not object
- [ ] Error handling covers all HTTP status codes
- [ ] Logging includes token validation steps

### Development Guidelines
1. **Always use Bearer prefix** for OAuth 2.0 compliance
2. **Validate token format** before API calls
3. **Implement comprehensive error handling** for all endpoints
4. **Use centralized authentication utilities** consistently

## Monitoring & Diagnostics

### Debug Information
```javascript
console.log('[API] Request Details:', {
  url,
  method: config.method || 'GET',
  hasAuthHeader: !!config.headers?.Authorization,
  authHeaderFormat: config.headers?.Authorization?.startsWith('Bearer '),
  tokenLength: token?.length || 0
});
```

### Performance Impact
- **Minimal overhead**: String concatenation vs object property access
- **Reduced error rates**: Proper authentication prevents unnecessary retries
- **Improved UX**: Faster error resolution and clearer feedback

## Security Considerations

### Token Handling
- Tokens are stored securely in session/localStorage
- No token exposure in console logs (only length/presence)
- Automatic token refresh on 401 errors

### Authentication Flow
- Session validation before API calls
- Fallback mechanisms for token retrieval
- Secure session cleanup on authentication failure