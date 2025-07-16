import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { setSession } from '../../utils/authUtils';
import logo from '../../assets/VisibeenLogo.png';
import logo1 from '../../assets/googleLogo.jpg';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    account_type: 'phone',
  });

  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8089/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone_number: form.contact,
          password: form.password,
          account_type: isGoogleSignup ? 'google' : 'phone',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setIsSubmitting(false);
        return;
      }

      setSession(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error:', err);
      setError('Server error, please try again');
      setIsSubmitting(false);
    }

  };
  const handleGoogleRegister = async () => {
    setIsGoogleSignup(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch('http://localhost:8089/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: user.displayName || 'No Name',
          email: user.email,
          phone_number: '', // optional
          password: 'dummy@123', // dummy for bcrypt
          account_type: 'google',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSession(data.user);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Google Signup Failed');
      }
    } catch (err) {
      alert('Google signup error');
      console.error('Google signup error:', err);
    }
  };


  return (
    //   <div className="main-container">
    //     <div className="left-side">
    //       <img src={logo} alt="logo" />
    //       <h2>Think Unlimited</h2>
    //       <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
    //     </div>
    //     <div className="right-side">
    //       <h2>Welcome to Visibeen</h2>
    //       {error && <p style={{ color: 'red' }}>{error}</p>}
    //       <button onClick={handleGoogleRegister}> Continue with Google</button>
    //       <p style={{ textAlign: 'center' }}>or</p>

    //       <form onSubmit={handleRegister}>
    //         <input type="text" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
    //         <input type="email" placeholder="Email Id" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
    //         {!isGoogleSignup}
    //         <>
    //           <input type="text" placeholder="Contact Number" required onChange={(e) => setForm({ ...form, contact: e.target.value })} />
    //           <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
    //         </>
    //         <button type="submit" disabled={isSubmitting}>
    //           {isSubmitting ? 'Registering...' : 'Register'}
    //         </button>
    //       </form>

    //       <p>Have an account? <Link to="/">Login</Link></p>
    //     </div>
    //   </div>
    <div className="main-container">
      <div className="left-side">
        <img src={logo} alt="logo" id='img' />

        <div className="left-content">
          <h2>Think Unlimited</h2>
          <p>Join over <b>62,000+ Digital marketing and business</b> owners around the world</p>
        </div>

        <div className="services-test">Services test</div>
      </div>

      <div className="right-side">
        <div className="login-container">
          <h2>Welcome to Visibeen</h2>
          <p className="subtitle">Start managing your system faster and better!</p>


          <button className="google-btn" onClick={handleGoogleRegister}>
            <span> <img src={logo1} alt="GoogleLogo" id='googleLogo' /> </span>
            Continue with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Name<span className="required">*</span></label>
               <input type="text" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Id<span className="required">*</span></label>
              <input type="email" placeholder="Email Id" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number<span className="required">*</span></label>
               <input type="text" placeholder="Contact Number" required onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password<span className="required">*</span></label>
               <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

          

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

         
          <p className='register-link'>Have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;