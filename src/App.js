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
import ProtectedRoute from './components/ProtectedRoute';
import AccountNotFound from './components/gmb_accounts/AccountNotFound';
import GoogleConnect from './components/Services/GoogleConnect';
import ContactUs from './components/gmb_accounts/ContactUs';
import CreateAccount from './components/gmb_accounts/Create_Account/CreateAccount';
import CreatePostForm from './components/Create_Post/CreatePostForm';
import ReferEarn from './components/Refer&Earn';
import MyAccount from './components/MyAccount';
import FontStyleSelection from './components/Create_Post/FontStyleSelection';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';



// Adjust the path based on where ProfileView.jsx is saved

import './styles.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connect-google" element={<GoogleConnect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard/></Layout> </ProtectedRoute>} />
        <Route path="/profile/:locationId" element={<ProfilePage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/get-edms" element={<GetEDMs />} />
        <Route path="/upload-logo" element={<UploadLogo />} />
        <Route path="/account-not-found" element={<AccountNotFound />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/font-style" element={<FontStyleSelection />} />
        <Route path="/refer-earn" element={<ReferEarn />} />
        <Route path="/my-account" element={<MyAccount />}  />
      </Routes>
    </Router>
  );
}

export default App;