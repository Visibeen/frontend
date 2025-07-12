import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setSession } from '../../utils/authUtils';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import logo from '../../assets/VisibeenLogo.png';

function Login() {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:8089/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                   phone_number: contact,
                    password,
                    account_type: 'phone',

                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            setSession(data.user);
            navigate('/dashboard');
        } catch (err) {
            setError('Server error');
        }
    };


    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            const res = await fetch('http://localhost:8089/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // optional if backend verifies Firebase token
      },
        body: JSON.stringify({
            email: result.user.email,
            account_type: 'google'
        })
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
    <div className="main-container">
        <div className="left-side">
            <img src={logo} alt="logo" />
            <h2>Think Unlimited</h2>
            <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
        </div>
        <div className="right-side">
            <h2>Welcome to Visibeen</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleGoogleLogin}>Continue with Google</button>
            <p style={{ textAlign: 'center' }}>or</p>                                                                                                                                                                               

            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Contact Number" required value={contact} onChange={(e) => setContact(e.target.value)} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <div style={{ textAlign: 'right' }}>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button type="submit">Login</button>
            </form>

            <p>Don't have an account? <Link to="/register">Register now</Link></p>
        </div>
    </div>
);
}

export default Login;