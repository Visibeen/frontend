import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const phone = sessionStorage.getItem('resetPhone');

  const handleVerify = async () => {
    const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact: phone, otp })
    });

    const data = await res.json();
    if (data.success) {
      navigate('/dashboard');
    } else {
      alert(data.message || "Invalid OTP");
    }
  };

  return (
    <div className="main-container">
      <div className="left-side">
        <img src="/assets/VisibeenLogo.png" alt="logo" />
        <h2>Think Unlimited</h2>
        <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
      </div>
      <div className="right-side">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to <b>{phone}</b></p>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}

export default VerifyOtp;