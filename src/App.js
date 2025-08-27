import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx';
import ForgotPassword from './components/Login/ForgotPassword.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import ProfilePage from './components/Dashboard/pages/Profile.jsx';
import BusinessProfile from './components/Dashboard/pages/BusinessProfile.jsx';
import ResetPassword from './components/Login/ResetPassword.jsx';
import EDMsFlow from './components/edms/EDMsFlow.jsx';
import AccountNotFound from './components/gmb_accounts/AccountNotFound.jsx';
import GoogleConnect from './components/Services/GoogleConnect.jsx';
import ContactUs from './components/gmb_accounts/ContactUs.jsx';
import CreateAccount from './components/gmb_accounts/Create_Account/CreateAccount.jsx';
import CreatePostPage from './components/CreatePost/CreatePostPage.jsx';
import Reputation from './components/Reputation/Reputation.jsx';
import ReferEarn from './components/Refer&Earn.jsx';
import MyAccount from './components/MyAccount.jsx';
import FontStyleSelection from './components/FontStyleSelection/FontStyleSelection.jsx';
import PostGenerationResults from './components/PostGenerationResults/PostGenerationResults.jsx';
import FreeWebsite from './components/FreeWebsite/FreeWebsite.jsx';
import GSTInfoForm from './GstAccounts/GSTInfoForm.jsx';
import CROInfoForm from './GstAccounts/CROInfoForm.jsx';
import AccountInfoForm from './GstAccounts/AccountInfoForm.jsx';
import DashboardLayout from './components/Layouts/DashboardLayout.jsx';
import GMBDataFetcher from './components/gmb_accounts/GMBDataFetcher.jsx';
import ProfileStrengthAnalysis from './components/ProfileStrengthAnalysis/ProfileStrengthAnalysis.jsx';
import ReviewsManagement from './components/ReviewsManagement/ReviewsManagement.jsx';
import SetAutoReply from './components/SetAutoReply/SetAutoReply.jsx';
import HeatmapResultsPage from './components/HeatmapResults/HeatmapResultsPage.jsx';
import ProfileStrengthPage from './components/ProfileStrength/ProfileStrengthPage.jsx';
import { getSession } from './utils/authUtils.js';
import AutoTokenManager from './utils/autoTokenUtils.js';
import 'leaflet/dist/leaflet.css';
import HeatmapPage from './components/Heatmap/HeatmapPage';
import HeatmapResultsPage from './components/HeatmapResults/HeatmapResultsPage';
import Holidays from './components/edms/Holidays';
import ReviewsManagement from './components/ReviewsManagement/ReviewsManagement';
import AutoTokenManager from './utils/autoTokenUtils';
import { getSession } from './utils/authUtils';




// Adjust the path based on where ProfileView.jsx is saved

import './styles.css';



function App() {
  useEffect(() => {
    // Initialize auto token management if user is logged in
    const session = getSession();
    if (session && session.token) {
      console.log('🚀 Initializing auto token management...');
      AutoTokenManager.startAutoRefresh();
    } else {
      // Even without backend session, try to setup Google token
      console.log('🔍 Checking for Google tokens...');
      AutoTokenManager.autoSetupGoogleToken();
    }
    
    // Cleanup on unmount
    return () => {
      AutoTokenManager.stopAutoRefresh();
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/connect-google" element={<GoogleConnect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:locationId" element={<ProfilePage />} />
        <Route path="/business-profile" element={<BusinessProfile />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/get-edms/*" element={<EDMsFlow />} />
        <Route path="/account-not-found" element={<AccountNotFound />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/reputation" element={<Reputation />} />
        <Route path="/font-style" element={<FontStyleSelection />} />
        <Route path="/refer-earn" element={<ReferEarn />} />
        <Route path="/my-account/*" element={<MyAccount />}  />
        <Route path="/my-account/account-information" element={<DashboardLayout><AccountInfoForm /></DashboardLayout>} />
        <Route path="/my-account/gst-information" element={<DashboardLayout><GSTInfoForm /></DashboardLayout>} />
        <Route path="/my-account/cro-information" element={<DashboardLayout><CROInfoForm /></DashboardLayout>} />
        <Route path="/gmb-data" element={<GMBDataFetcher />} />
        <Route path="/free-website" element={<FreeWebsite />} />
        <Route path="/profile-strength-analysis" element={<ProfileStrengthAnalysis />} />
        <Route path="/profile-strength" element={<ProfileStrengthPage />} />
        <Route path="/heatmap-results" element={<HeatmapResultsPage />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/reviews-management" element={
          <DashboardLayout>
            <ReviewsManagement />
          </DashboardLayout>
        } />
        <Route path="/post-generation-results" element={<PostGenerationResults />} />
        <Route path="/set-auto-reply" element={<SetAutoReply />} />
      </Routes>
    </Router>
  );
}

export default App;