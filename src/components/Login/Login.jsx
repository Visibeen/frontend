import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setSession, getSession } from '../../utils/authUtils';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import api from '../../services/api';
import logo from '../../assets/VisibeenLogo.png';
import googleLogo from '../../assets/google-logo.svg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Only auto-redirect if user has a valid session and explicitly wants to stay logged in
    // Remove auto-redirect to allow users to access login page even with existing session

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        console.log('Login attempt with:', { email, password: '***' });

        try {
            const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    account_type: 'manual',
                }),
            });

            const data = await res.json();
            console.log('Login response:', data);

            if (!res.ok) {
                setError(data.message || data.error || 'Login failed');
                return;
            }

            // Store user data in session - handle different response structures
            let userData = data.data || data;
            if (userData.user) {
                userData = userData.user;
            }
            
            console.log('Storing user data:', userData);
            setSession(userData);
            
            // Wait a moment for session to be set
            setTimeout(() => {
                // Check if we need to redirect to Google Connect
                if (data.data && data.data.needsGoogleAuth) {
                    console.log('Redirecting to Google Connect');
                    navigate('/connect-google');
                } else {
                    console.log('Redirecting to Dashboard');
                    navigate('/dashboard');
                }
            }, 100);
           
        } catch (err) {
            console.error('Login error:', err);
            setError('Server error. Please try again.');
        }
    };


    const handleGoogleLogin = async () => {
        try {
            // Ensure we request required scopes so Dashboard can call GBP APIs
            provider.addScope('openid');
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            provider.addScope('https://www.googleapis.com/auth/business.manage');
            provider.setCustomParameters({ prompt: 'consent', access_type: 'offline', include_granted_scopes: 'true' });

            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const googleAccessToken = credential?.accessToken || '';

            // Extract email/display name robustly from multiple sources
            const firebaseUser = result?.user || {};
            const derivedEmail = firebaseUser.email || result?._tokenResponse?.email || (firebaseUser.providerData && firebaseUser.providerData[0] && firebaseUser.providerData[0].email) || '';
            const derivedFullName = firebaseUser.displayName || result?._tokenResponse?.fullName || (firebaseUser.providerData && firebaseUser.providerData[0] && firebaseUser.providerData[0].displayName) || '';

            if (!googleAccessToken) {
                setError('Google access token was not returned. Please try again and accept permissions.');
                return;
            }

            let finalEmail = derivedEmail;
            let finalFullName = derivedFullName;

            // If email is still missing, fetch userinfo using OAuth access token
            if (!finalEmail) {
                try {
                    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers: { Authorization: `Bearer ${googleAccessToken}` }
                    });
                    const userInfo = await userInfoRes.json();
                    if (userInfo?.email) finalEmail = userInfo.email;
                    if (!finalFullName && userInfo?.name) finalFullName = userInfo.name;
                } catch (_) {}
            }

            // If still no email, synthesize a fallback to satisfy backend requirement
            if (!finalEmail) {
                const uid = firebaseUser?.uid || `anon_${Date.now()}`;
                finalEmail = `${uid}@google.local`;
            }

            // Persist token so Dashboard and other pages can use it
            try {
                sessionStorage.setItem('googleAccessToken', googleAccessToken);
                localStorage.setItem('googleAccessToken', googleAccessToken);
            } catch (_) {}

            let data;
            try {
                data = await api.post(
                    '/customer/auth/google-login',
                    {
                        email: finalEmail,
                        googleEmail: finalEmail,
                        full_name: finalFullName,
                        account_type: 'google',
                        googleAccessToken,
                        idToken: credential?.idToken || undefined,
                        access_token: googleAccessToken,
                        id_token: credential?.idToken || undefined,
                        firebase_uid: firebaseUser?.uid || undefined,
                        providerId: (firebaseUser?.providerData && firebaseUser.providerData[0]?.providerId) || 'google.com',
                        emailVerified: !!firebaseUser?.emailVerified,
                        email_was_missing: !derivedEmail
                    },
                    {
                        Authorization: `Bearer ${googleAccessToken}`
                    }
                );
            } catch (firstErr) {
                // Retry without email fields, some backends infer email from tokens only
                if (String(firstErr?.message || '').toLowerCase().includes('email is required')) {
                    data = await api.post(
                        '/customer/auth/google-login',
                        {
                            account_type: 'google',
                            googleAccessToken,
                            access_token: googleAccessToken,
                            idToken: credential?.idToken || undefined,
                            id_token: credential?.idToken || undefined,
                        },
                        {
                            Authorization: `Bearer ${googleAccessToken}`
                        }
                    );
                } else {
                    throw firstErr;
                }
            }

            console.log('Google response:', data);

            // Store user data in session
            setSession(data?.data || data?.user || data);
            
            // Navigate to dashboard - GMB access will be checked by ProtectedRoute
            navigate('/dashboard');
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Google sign-in popup closed.');
            } else {
                setError(error?.message || 'Google Login Failed');
            }
        }
    };

    return (


        <div className="main-container">
            <div className="left-side">
                <img src={logo} alt="logo" id='img' />
                <div className="left-content">
                    <h2>Think Unlimited</h2>
                    <p>Join over <b>62,000+ Digital marketing <span>and</span> business</b> owners around the world</p>
                </div>

                <div className="services-test">Services test</div>
            </div>

            <div className="right-side">
                <div className="login-container">
                    <h2>Welcome to Visibeen</h2>
                    <p className="subtitle">Start managing your system faster and better!</p>

                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <span> <img src={googleLogo} alt="GoogleLogo" id='googleLogo' /> </span>
                        Continue with Google
                    </button>



                    <div className="divider">
                        <span>or</span>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="contact">Email<span className="required">*</span></label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                placeholder="Enter email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </form>
                    
                    <button className="login-btn" type="submit">Login</button>
                </div>
                
                <div className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </div>
            </div>
        </div>
        
    );
}

export default Login;