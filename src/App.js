import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import Dashboard from './components/Dashboard';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout> } />
        <Route path="/profile/:id" element={<Layout><Profile/></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;