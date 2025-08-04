import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';
import './ForgotPassword.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const res = await fetch('http://localhost:8089/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (data.success) {
      // ✅ This line is MISSING or not working
      sessionStorage.setItem('resetEmail', email);
      console.log("✅ Email saved in sessionStorage:", email);

      alert('OTP sent to your email.');
      navigate('/verify-otp');
    } else {
      alert(data.message || "OTP not sent");
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

        <img src={logo} alt="logo" />
        <h2>Think Unlimited</h2>
        <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
        <div className="services-test">Services test</div>
      </div>

      <div className="right-side">
        <div className="login-container">
          <h2>Enter Phone Number</h2>
          <p class="form-subtitle">Get OTP on registered phone number to login your account</p>

          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <div className="form-group">
            <input type="text" placeholder="Enter Email address:" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="login-btn" onClick={handleSendOtp}>Send OTP</button>
          <div class="otp-info">
            We sent a 6-digit code to +91XXXXXX45
          </div>
          <p className="register-link">Remember password? <Link to="/">Login</Link></p>
        </div>
        <h2>Forgot Password</h2>
        <input type="text" placeholder="Enter Email" value={contact} onChange={(e) => setContact(e.target.value)} />
        <button onClick={handleSendOtp}>Send OTP</button>
        <p>Remember password? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default ForgotPassword;