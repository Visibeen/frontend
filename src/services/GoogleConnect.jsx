import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { getSession } from '../utils/authUtils';
import logo from '../../assets/VisibeenLogo.png';
import logo1 from '../../assets/googleLogo.jpg';

function GoogleConnect() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = getSession();

    const handleGoogleConnect = async () => {
        try {
            setLoading(true);
            setError('');

            // Add required GMB scopes to the provider
            provider.addScope('https://www.googleapis.com/auth/business.manage');
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            
            // Request access token directly from Google
            provider.setCustomParameters({
                'access_type': 'offline',
                'prompt': 'consent'
            });

            const result = await auth.signInWithPopup(provider);
            
            // Get the OAuth access token (not Firebase ID token)
            const credential = result.credential;
            const googleAccessToken = credential.accessToken;
            
            console.log('Google OAuth token received:', !!googleAccessToken);

            // Verify GMB access by calling Google My Business API
            const gmbResponse = await fetch(`https://mybusinessaccountmanagement.googleapis.com/v1/accounts`, {
                headers: {
                    'Authorization': `Bearer ${googleAccessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const gmbData = await gmbResponse.json();
            console.log('GMB API Response:', gmbData);

            let hasGMBAccess = false;
            if (gmbResponse.ok && gmbData.accounts && gmbData.accounts.length > 0) {
                hasGMBAccess = true;
                console.log('User has GMB accounts:', gmbData.accounts.length);
            } else {
                console.log('No GMB accounts found or API error:', gmbData.error);
            }

            // Link Google account to current user with GMB verification
            const res = await fetch('http://localhost:8089/api/v1/customer/auth/link-google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify({
                    googleEmail: result.user.email,
                    googleAccessToken: googleAccessToken,
                    googleDisplayName: result.user.displayName,
                    hasGMBAccess: hasGMBAccess,
                    gmbAccounts: hasGMBAccess ? gmbData.accounts : []
                }),
            });

            const data = await res.json();
            console.log('Backend response:', data);

            if (res.ok) {
                // Navigate based on actual GMB access
                if (hasGMBAccess) {
                    console.log('User has GMB access, redirecting to dashboard');
                    navigate('/dashboard');
                } else {
                    console.log('User does not have GMB access, redirecting to account not found');
                    navigate('/account-not-found');
                }
            } else {
                setError(data.message || 'Failed to connect Google account');
            }
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Google sign-in popup closed.');
            } else {
                console.error('Google connect error:', error);
                setError(error.message || 'Failed to connect Google account');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        // If user skips, redirect to account not found since we can't verify GMB
        navigate('/account-not-found');
    };

    return (
        <div className="main-container">
            <div className="left-side">
                <img src={logo} alt="logo" id='img' />
                <div className="left-content">
                    <h2>Connect Your Google Account</h2>
                    <p>To verify your <b>Google My Business</b> access, please connect your Google account.</p>
                </div>
            </div>

            <div className="right-side">
                <div className="login-container">
                    <h2>Link Google Account</h2>
                    <p className="subtitle">Connect your Google account to check for Google My Business access</p>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button 
                        className="google-btn" 
                        onClick={handleGoogleConnect}
                        disabled={loading}
                    >
                        <span>
                            <img src={logo1} alt="GoogleLogo" id='googleLogo' />
                        </span>
                        {loading ? 'Connecting...' : 'Connect with Google'}
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <button 
                        type="button" 
                        className="skip-btn"
                        onClick={handleSkip}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            background: 'white',
                            color: '#6b7280',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Skip for Now
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '20px' }}>
                        Note: Without connecting your Google account, we cannot verify your Google My Business access.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default GoogleConnect;

