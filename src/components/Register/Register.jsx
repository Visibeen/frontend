import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { setSession } from '../../utils/authUtils';
import googleLogo from '../../assets/google-logo.svg';
import logo from '../../assets/VisibeenLogo.png';
import logo1 from '../../assets/googleLogo.jpg';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.full_name || !form.email) {
      return 'Name and email are required.';
    }
    if (!isGoogleSignup) {
      if (!form.phone_number || !form.password) {
        return 'Phone number and password are required.';
      }
      if (form.password.length < 6) {
        return 'Password must be at least 6 characters.';
      }
    }
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone_number: isGoogleSignup ? undefined : form.phone_number,
      password: isGoogleSignup ? undefined : form.password,
      account_type: isGoogleSignup ? 'google' : 'manual',
    };

    console.log("Payload being sent:", payload);

    try {
      const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText };
      }

      if (!res.ok) {
        setError(data.message || 'Signup failed.');
        setIsSubmitting(false);
        return;
      }

      setSession(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error:', err);
      setError('Server error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsGoogleSignup(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch('http://52.44.140.230:8089/api/v1/customer/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: user.displayName || 'No Name',
          email: user.email,
          account_type: 'google',
        }),
      });

      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch {
        data = { message: resText };
      }

      if (res.ok) {
        setSession(data.user);
        navigate('/dashboard');
      } else {
        console.error("Google signup error response:", data);
        setError(data.message || 'Google Signup Failed');
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Google signup failed.');
    }
  };

  return (
    <div className="main-container">
      <div className="left-side">
        <img src={logo} alt="logo" id="img" />
        <div className="left-content">
          <h2>Think Unlimited</h2>
          <p>
            Join over <b>62,000+ Digital marketing <span>and</span> business</b> owners around the world
          </p>
        </div>
        <div className="services-test">Services test</div>
      </div>

      <div className="right-side">
        <div className="login-container">
          <h2>Welcome to Visibeen</h2>
          <p className="subtitle">Start managing your system faster and better!</p>
        <h2>Welcome to Visibeen</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
       <button className="google-btn" onClick={handleRegister}>
                    <img src={googleLogo} alt="Google" width="20" />
                    Continue with Google
                </button>
        <p style={{ textAlign: 'center' }}>or</p>

          <button className="google-btn" onClick={handleGoogleRegister}>
            <span><img src={logo1} alt="GoogleLogo" id="googleLogo" /></span>
            Continue with Google
          </button>

          <div className="divider"><span>or</span></div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Name<span className="required">*</span></label>
              <input
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Id<span className="required">*</span></label>
              <input
                type="email"
                placeholder="Email Id"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {!isGoogleSignup && (
              <>
                <div className="form-group">
                  <label htmlFor="contact">Contact Number<span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    required
                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password<span className="required">*</span></label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </>
            )}

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="register-link">Have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
