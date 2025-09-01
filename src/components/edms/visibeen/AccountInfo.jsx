import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import { getSession, getAutoToken, clearSession } from '../../../utils/authUtils';
import GMBService from '../../../services/GMBService';
import GMBWebsiteService from '../../../services/GMBWebsiteService';
import api from '../../../services/api';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './AccountInfo.css';

const AccountInfo = () => {
  const navigate = useNavigate();
  const { accountInfo, updateAccountInfo } = useAccount();
  const _session_now = getSession();
  const _gmbTitleSeed = _session_now?.gmbPrimaryLocationTitle || _session_now?.gmbPrimaryLocation?.title || _session_now?.gmbData?.locations?.[0]?.title || _session_now?.locations?.[0]?.title || _session_now?.gmbLocations?.[0]?.title || '';
  const _gmbAccountNameSeed = _session_now?.gmbPrimaryAccountName || _session_now?.gmbAccounts?.[0]?.accountName || _session_now?.user?.accountName || _session_now?.accountName || '';
  const [form, setForm] = useState({
    name: accountInfo.name || _gmbAccountNameSeed || '',
    business_name: accountInfo.business_name || _gmbTitleSeed || '',
    address: accountInfo.address || '',
    email: accountInfo.email || '',
    contact_number: accountInfo.contact_number || '',
    alternative_contact_number: accountInfo.alternative_contact_number || '',
    website: accountInfo.website || '',
  });

    const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  useEffect(() => {
    try {
      const session = getSession();
      const user = session?.user || session || {};
      const sessionValues = {
        // Prefer GMB account-level accountName for Full Name
        name: user?.gmbPrimaryAccountName || session?.gmbPrimaryAccountName || user?.accountName || session?.accountName || (session?.gmbAccounts?.[0]?.accountName) || '',
        business_name: user?.business_name || user?.company || session?.business_name || session?.gmbPrimaryLocationTitle || session?.gmbPrimaryLocation?.title || session?.gmbData?.locations?.[0]?.title || session?.locations?.[0]?.title || session?.gmbLocations?.[0]?.title || '',
        address: user.address || session?.address || '',
        email: user.email || session?.email || '',
        contact_number: user.contact_number || user.phone || session?.phone || session?.contact_number || '',
        alternative_contact_number: user.alternative_contact_number || user.alt_phone || session?.alternative_contact_number || '',
        website: user.website || session?.website || ''
      };

      setForm(prev => ({
        name: sessionValues.name || prev.name,
        business_name: sessionValues.business_name || prev.business_name,
        address: sessionValues.address || prev.address,
        email: sessionValues.email || prev.email,
        contact_number: sessionValues.contact_number || prev.contact_number,
        alternative_contact_number: sessionValues.alternative_contact_number || prev.alternative_contact_number,
        website: sessionValues.website || prev.website
      }));

            (async () => {
        try {
          const token = getAutoToken();
          if (!token) return;

          const accs = await GMBService.getAccounts(token);
          setAccounts(accs || []);

          if (accs && accs.length > 0) {
            const locs = await GMBService.getLocations(token, accs[0].name);
            setLocations(locs || []);
          }
        } catch (err) {
          console.debug('[AccountInfo] GMB account/location fetch error', err);
        }
      })();

      (async () => {
        try {
          const token = getAutoToken() || (typeof window !== 'undefined' && localStorage.getItem('googleAccessToken'));
          console.debug('[AccountInfo][debug] token for GMB fetch:', !!token ? (token.substring ? token.substring(0, 8) + '...' : 'token') : token);
          const needGMB = (!sessionValues.business_name || !sessionValues.address || !sessionValues.contact_number) && !!token;
          if (!needGMB) return;

          const primaryLocation = await GMBWebsiteService.getPrimaryLocation(token);
          console.debug('[AccountInfo][debug] primaryLocation fetched:', primaryLocation);
          if (!primaryLocation) return;

          const gmbAddress = primaryLocation?.storefrontAddress || primaryLocation?.address || {};
          const gmbPhone = primaryLocation?.phoneNumbers?.primaryPhone || primaryLocation?.primaryPhone || '';
          const gmbName = primaryLocation?.title || primaryLocation?.name || '';

          setForm(prev => ({
            name: user?.gmbPrimaryAccountName || user?.accountName || session?.gmbPrimaryAccountName || session?.accountName || prev.name,
            business_name: gmbName || prev.business_name,
            address: (typeof gmbAddress === 'string' ? gmbAddress : (gmbAddress.addressLines ? gmbAddress.addressLines.join(', ') : '')) || prev.address,
            email: user?.email || prev.email,
            contact_number: gmbPhone || prev.contact_number,
            alternative_contact_number: prev.alternative_contact_number,
            website: primaryLocation?.websiteUri || prev.website
          }));
        } catch (err) {
          console.debug('[AccountInfo] GMB autofill error', err);
        }
      })();
    } catch (err) {
      console.debug('[AccountInfo] autofill error', err);
    }
  }, [accountInfo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    updateAccountInfo(form);

    const session = getSession();
    const authToken = getAutoToken();

    console.log('[AccountInfo] Token Debug Info:', {
      hasSession: !!session,
      hasToken: !!authToken,
      sessionId: session?.id || session?.user?.id,
      sessionKeys: session ? Object.keys(session) : [],
      sessionUser: session?.user ? Object.keys(session.user) : [],
      tokenPreview: authToken ? `${authToken.substring(0, 10)}...` : 'No token'
    });

    // Check for authentication
    if (!session || !authToken) {
      console.error('[AccountInfo] Missing authentication data');
      alert('Authentication required. Please log in again.');
      clearSession();
      navigate('/login');
      return;
    }

    // Extract user ID with multiple fallback strategies
    const userId = session?.id || session?.user?.id || session?.userId || session?.user_id;

    if (!userId) {
      console.error('[AccountInfo] Unable to extract user ID from session:', session);
      alert('Invalid session data. Please log in again.');
      clearSession();
      navigate('/login');
      return;
    }

    const payload = {
      user_id: userId,
      name: form.name,
      business_name: form.business_name,
      address: form.address,
      email: form.email,
      contact_number: form.contact_number,
      alternative_contact_number: form.alternative_contact_number,
      website: form.website,
    };

    try {
      setLoading(true);
      console.log('[AccountInfo] Submitting EDMS account info...');
      console.log('[AccountInfo] Payload:', payload);

      // Use centralized API service with automatic token injection
      const response = await api.post('/customer/edms/create-edms', payload);

      console.log('[AccountInfo] API Response:', response);
      navigate('../upload-logo');

      console.log('[AccountInfo] API Response:', response);
      navigate('../upload-logo');
    } catch (error) {
      console.error('[AccountInfo] API Error:', error);

      if (error.status === 401) {
        // Handle authentication error
        console.log('[AccountInfo] Authentication failed, clearing session');
        clearSession();
        alert('Your session has expired. Please log in again.');
        navigate('/login');
      } else if (error.status === 400) {
        // Handle bad request with specific feedback
        const errorMessage = error.body?.message || error.body?.error || 'Invalid request data. Please check your information and try again.';
        console.error('[AccountInfo] Validation error:', errorMessage);
        alert(`Error: ${errorMessage}`);
      } else {
        console.error('[AccountInfo] Unexpected error:', error.message);
        alert('Something went wrong while submitting the form. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    console.log('Cancel button clicked');
    try {
      navigate('/');
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Account Information</h2>
            <h6>Fill in your account details or select a Google Business Profile to auto-fill the form.</h6>
        <div className="input-container" style={{ marginBottom: '20px' }}>
          <label>Business Profile</label>
          <select
            name="selectedLocation"
            value={selectedLocation}
            onChange={(e) => {
              const index = e.target.value;
              setSelectedLocation(index);
              if (index !== '') {
                const loc = locations[index];
                if (loc) {
                  const gmbAddress = loc?.storefrontAddress || loc?.address || {};
                  setForm(prev => ({
                    ...prev,
                    business_name: loc.title || loc.name || '',
                    address: (typeof gmbAddress === 'string' ? gmbAddress : (gmbAddress.addressLines ? gmbAddress.addressLines.join(', ') : '')) || '',
                    contact_number: (loc.phoneNumbers?.primaryPhone || loc.primaryPhone) || '',
                    website: loc.websiteUri || '',
                    name: accounts[0]?.accountName || prev.name
                  }));
                }
              }
            }}
            className="input-style-for-select"
          >
            <option value="">Select a Business Profile to auto-fill</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={idx}>{loc.title || loc.name}</option>
            ))}
          </select>
        </div>
      <form onSubmit={handleSaveAndNext}>
        <div className="form-fields-column">
          <div className="input-container">
            <label>Full Name <span className="required">*</span></label>
                        <input type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Business Name <span className="required">*</span></label>
            <input type="text" name="business_name" placeholder="Enter your business name" value={form.business_name} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Business Address <span className="required">*</span></label>
            <input type="text" name="address" placeholder="Enter your business address" value={form.address} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Email Address <span className="required">*</span></label>
            <input type="email" name="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Contact Number <span className="required"></span></label>
            <input type="tel" name="contact_number" placeholder="Enter your contact number" value={form.contact_number} onChange={handleChange} />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Alternative Contact Number <span className="required"></span></label>
            <input type="tel" name="alternative_contact_number" placeholder="Enter your alternative contact number" value={form.alternative_contact_number} onChange={handleChange} />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Website URL <span className="required"></span></label>
            <input type="url" name="website" placeholder="Enter your website URL (e.g., https://www.yourwebsite.com)" value={form.website} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn cancel"
              onClick={handleCancel}
              style={{ cursor: 'pointer', zIndex: 1000 }}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & Next'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;