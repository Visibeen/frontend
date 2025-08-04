// frontend/src/components/Login/ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png'; 

function ResetPassword() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('resetEmail'); // use 'resetEmail' if you're using email
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    const res = await fetch('http://localhost:8089/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, new_password: newPassword }),
    });

    const data = await res.json();
    if (data.success) {
      alert('Password reset successfully!');
      navigate('/');
    } else {
      alert(data.message || 'Password reset failed');
    }
  };

  return (
    <div className="main-container">
      <div className="left-side">
        <img src={logo} alt="logo" />
        <h2>Think Unlimited</h2>
        <p>Join over <b>62,000+</b> Digital marketing and <b>business</b> owners around the world</p>
      </div>
      <div className="right-side">
        <h2>Reset Password</h2>
        <p>Enter OTP and new password</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
}

export default ResetPassword;
