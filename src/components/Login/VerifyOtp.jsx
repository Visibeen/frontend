import React, { useState, useEffect } from 'react';
import { useNavigate }  from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const navigate  = useNavigate();

  /* 1️⃣  Get the email saved in ForgotPassword.jsx*/
  const email = sessionStorage.getItem('resetEmail');
  console.log('✅ Email from sessionStorage:', email);
  
  // Ensure email is a string, not an object
  const emailString = typeof email === 'string' ? email : email?.email || '';

  /* 2️⃣  If the page was refreshed and email is gone,
         send the user back to start the flow again*/
  useEffect(() => {
    if (!emailString) {
      alert('Session expired. Please begin the reset process again.');
      navigate('/forgot-password');
    }
  }, [emailString, navigate]);


    // 3️⃣  Verify the OTP
  const handleVerify = async () => {
    if (!otp.trim()) {
      alert('Please enter the OTP.');
      return;
    }

    try {
      const res  = await fetch('http://localhost:8089/api/auth/verify-otp', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email: emailString, otp })
      });

      const data = await res.json();
      console.log('🔵 Verify‑OTP response:', data);

      if (data.success) {
        /* Success → go to Reset Password */
        navigate('/reset-password');
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('❌ Verify‑OTP error:', err);
      alert('Network error; please try again.');
    }
  };

  /* ────────────────────────────────────────────────────────── */

  return (
    <div className="main-container">
      <div className="left-side">
        <img src={logo} alt="logo" />
        <h2>Think Unlimited</h2>
        <p>
          Join over <b>62,000+</b> Digital marketing and <b>business</b>{' '}
          owners around the world
        </p>
      </div>

      <div className="right-side">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to <b>{email}</b></p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}

export default VerifyOtp;
