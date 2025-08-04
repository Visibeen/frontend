import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setSession } from '../../utils/authUtils';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import logo from '../../assets/VisibeenLogo.png';
import googleLogo from '../../assets/google-logo.svg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8089/api/v1/customer/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                   email: email,
                   password: password,
                   account_type: 'email',

                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            // Store user data in session
            setSession(data.data.user || data.data);
            
            // Check if we need to redirect to Google Connect
            if (data.data.needsGoogleAuth) {
                navigate('/connect-google');
            } else if (data.data.hasGMBAccess) {
                navigate('/dashboard');
            } else {
                navigate('/account-not-found');
            }
           
        } catch (err) {
            setError('Server error');
        }
    };


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            const res = await fetch('http://localhost:8089/api/v1/customer/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: result.user.email,
                    full_name: result.user.displayName,
                    account_type: 'google',
                }),
            });

    const data = await res.json();
    if (data.success) {
        setSession(data.user);
        navigate('/dashboard');
    } else {
        alert(data.message);
    }
} catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
        console.log("Google sign-in popup closed.");
    } else {
        alert(error.message);
    }
}
};
return (
    <div className="login-container">
        <div className="login-left">
            <img src={logo} alt="Visibeen Logo" />
            <h2>Think Unlimited</h2>
            <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
            <div className="services-test">Services test</div>
        </div>
        <div className="login-right">
            <div className="login-form-container">
                <h2>Welcome to Visibeen</h2>
                <p>Start managing your system faster and better!</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img src={googleLogo} alt="Google" width="20" />
                    Continue with Google
                </button>
                
                <p>or</p>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Enter email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Enter password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <div className="login-options-row">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </div>
                    
                    <button className="login-btn" type="submit">Login</button>
                </form>
                
                <div className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;