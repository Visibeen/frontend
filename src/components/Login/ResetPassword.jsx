import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import logo from '../../assets/VisibeenLogo.png';
import './ResetPassword.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !id) {
        setError('Invalid reset link.');
        setCheckingToken(false);
        return;
      }

      try {
        console.log('Verifying token:', token, 'for user ID:', id);
        const res = await fetch(`http://localhost:8089/api/v1/customer/auth/verify-reset-token?token=${token}&id=${id}`);
        const data = await res.json();
        console.log('Token verification response:', data);

        if (data.code === 200 && !data.error) {
          console.log('Token is valid, setting tokenValid to true');
          setTokenValid(true);
        } else {
          console.log('Token is invalid:', data.message);
          setError(data.message || 'Invalid or expired reset link.');
        }
      } catch (err) {
        console.error('Error verifying token:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [token, id]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Client-side validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8089/api/v1/customer/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          id,
          password,
          confirmPassword
        })
      });

      const data = await res.json();
      console.log('Password reset response:', data);

      if (data.code === 200 && !data.error) {
        toast.success('🎉 Password reset successfully! You can now login with your new password.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate('/'), 2000); // Navigate after showing success message
      } else {
        toast.error(data.message || 'Failed to reset password.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  console.log('Current state:', { checkingToken, tokenValid, error });

  if (checkingToken) {
    return (
      <div className="main-container">
        <div className="center-content">
          <div className="loading">Verifying reset link...</div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="main-container">
        <div className="left-side">
          <img src={logo} alt="logo" id='img' />
          <div className="left-content">
            <h2>Think Unlimited</h2>
             <p>Join over <b>62,000+ Digital marketing <span>and</span> business</b> owners around the world</p>
          </div>
          <div className="services-test">Services test</div>
        </div>

        <div className="right-side">
          <div className="form-container">
            <h2>Invalid Reset Link</h2>
            <div className="error-message">{error}</div>
            <p>The password reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="submit-btn">Request New Reset Link</Link>
            <p className="back-link">Remember your password? <Link to="/">Back to Login</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="left-side">
        <img src={logo} alt="logo" id='img' />
        <div className="left-content">
          <h2>Think Unlimited</h2>
          <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
        </div>
        <div className="services-test">Services test</div>
      </div>

      <div className="right-side">
        <div className="form-container">
          <h2>Reset Your Password</h2>
          <p className="form-subtitle">Enter your new password below</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="password">New Password*</label>
              <input 
                type="password" 
                id="password"
                placeholder="Enter new password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input 
                type="password" 
                id="confirmPassword"
                placeholder="Confirm new password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
                minLength="6"
              />
            </div>
            
            <button 
              className="submit-btn" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          
          <p className="back-link">Remember your password? <Link to="/">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
