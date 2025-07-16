import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import VerifyOtp from './components/Login/VerifyOtp';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Dashboard/pages/Profile';
import Layout from './components/Layouts/Layout';
import ResetPassword from './components/Login/ResetPassword';
import GetEDMs from './components/Dashboard/pages/GetEDMs/GetEDMsForm';
import UploadLogo from './components/Dashboard/pages/GetEDMs/UploadLogo';

// Adjust the path based on where ProfileView.jsx is saved

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
        <Route path="/profile/:locationId" element={<ProfilePage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
       <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/get-edms" element={<GetEDMs />} />
        <Route path="/upload-logo" element={<UploadLogo />} />


      </Routes>
    </Router>
  );
}

export default App;