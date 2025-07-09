import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/VisibeenLogo.png'; 

function ForgotPassword() {
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const res = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact })
    });

    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem('resetPhone', contact);
      navigate('/verify-otp');
    } else {
      alert(data.message || "OTP not sent");
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
        <h2>Forgot Password</h2>
        <input type="text" placeholder="Enter contact number" value={contact} onChange={(e) => setContact(e.target.value)} />
        <button onClick={handleSendOtp}>Send OTP</button>
        <p>Remember password? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default ForgotPassword;