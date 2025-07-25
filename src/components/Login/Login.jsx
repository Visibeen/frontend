import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setSession } from '../../utils/authUtils';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import logo from '../../assets/VisibeenLogo.png';
import logo1 from '../../assets/googleLogo.jpg';


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
                    email,
                    password,
                    account_type: 'manual',

                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            setSession(data.data);            
            navigate('/dashboard');
           
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
                    // 'Authorization': `Bearer ${token}`, // optional
                },
                body: JSON.stringify({
                    email: result.user.email,
                }),
            });

            const data = await res.json();
            console.log("Google response:", data);

            if (res.ok) {
                setSession(data.user);
                navigate('/dashboard');
            } else {
                alert(data.message || 'Google Login Failed');
            }
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Google sign-in popup closed.');
            } else {
                alert(error.message);
            }
        }
    };

    return (


        <div className="main-container">
            <div className="left-side">
                <img src={logo} alt="logo" id='img' />
                <div className="left-content">
                    <h2>Think Unlimited</h2>
                    <p>Join over <b>62,000+ Digital marketing and business<br></br></b> owners around the world</p>
                </div>

                <div className="services-test">Services test</div>
            </div>

            <div className="right-side">
                <div className="login-container">
                    <h2>Welcome to Visibeen</h2>
                    <p className="subtitle">Start managing your system faster and better!</p>

                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <span> <img src={logo1} alt="GoogleLogo" id='googleLogo' /> </span>
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
                                placeholder="Enter contact number"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password<span className="required">*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" name="remember" />
                                Remember me
                            </label>
                            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    <p className="register-link">
                        Don't have an account? <a href="/register">Register now</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;