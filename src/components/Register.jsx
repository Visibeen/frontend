import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { setSession } from '../utils/authUtils';
import logo from '../assets/VisibeenLogo.png';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    account_type: 'phone',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone_number: form.contact,
          password: form.password,
          account_type: form.account_type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setIsSubmitting(false);
        return;
      }

      navigate('/');
    } catch (err) {
      setError('Server error, please try again');
      setIsSubmitting(false);
    }
  };const handleGoogleRegister = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` (optional)
      },
      body: JSON.stringify({
        email: result.user.email,
        account_type: 'google'
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Google Signup Failed');
      return;
    }

    setSession(data.user);
    navigate('/dashboard');
  } catch (err) {
    alert('Google signup error');
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
        <button onClick={handleGoogleRegister}> Continue with Google</button>
        <p style={{ textAlign: 'center' }}>or</p>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email Id" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="text" placeholder="Contact Number" required onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p>Have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;