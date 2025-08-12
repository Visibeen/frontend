import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Layouts/Sidebar';
import Footer from '../Layouts/Footer';
import Layout from '../Layouts/Layout';

const Dashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();




  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Allow providing a token via query param for dev: /dashboard?token=...
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
          sessionStorage.setItem('googleAccessToken', tokenFromUrl);
        }

        const accessToken = sessionStorage.getItem('googleAccessToken') || localStorage.getItem('googleAccessToken');
        if (!accessToken) {
          throw new Error('Missing Google access token. Connect Google or open /dashboard?token=YOUR_TOKEN');
        }

        // 1) Get accounts from the correct endpoint
        const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const accountsJson = await accountsRes.json();
        if (!accountsRes.ok) {
          throw new Error(accountsJson?.error?.message || 'Failed to fetch accounts');
        }

        const accounts = accountsJson.accounts || [];
        if (accounts.length === 0) {
          setBusinesses([]);
          return;
        }

        // 2) Fetch locations for first account as an example
        const accountName = accounts[0].name; // e.g., accounts/123456789
        const locRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const locJson = await locRes.json();
        if (!locRes.ok) {
          throw new Error(locJson?.error?.message || 'Failed to fetch locations');
        }

        const locations = locJson.locations || [];
        // Normalize to existing table fields
        const normalized = locations.map((loc) => ({
          id: loc.name?.split('/').pop(),
          name: loc.title,
          address: loc.storefrontAddress?.addressLines?.join(', '),
          verificationStatus: loc.metadata?.verification?.status || 'Verified',
          optimizationScore: 'N/A',
          locationId: loc.name?.split('/').pop(),
        }));

        setBusinesses(normalized);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
    // we want to re-run if query string changes (token passed)
  }, [location.search]);

  const getStatusClass = (status) => {
    if (status === 'Verified') return 'verified';
    if (status === 'Unverified') return 'unverified';
    return 'suspended';
  };

  if (loading) {
    return (
      <Layout>
        <div className="dashboard">
          <div className="main-content">
            <div className="header-blue">Businesses</div>
            <div className="loading">Loading businesses...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="dashboard">
          <div className="main-content">
            <div className="header-blue">Businesses</div>
            <div className="error">
              <p>Error loading businesses: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        <div className="main-content">
          <div className="header-blue">Businesses</div>
          {businesses.length === 0 ? (
            <div className="no-businesses">
              <p>No businesses found. Create your first business profile.</p>
              <button onClick={() => navigate('/create-account')}>
                Create Business
              </button>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Status</th>
                  <th>Optimization Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((biz) => (
                  <tr key={biz.id || biz._id}>
                    <td>
                      <strong>{biz.name || biz.businessName}</strong><br />
                      <span>{biz.address || biz.formattedAddress}</span>
                    </td>
                    <td><span className={`status-badge ${getStatusClass(biz.status || biz.verificationStatus)}`}>{biz.status || biz.verificationStatus}</span></td>
                    <td>{biz.score || biz.optimizationScore || 'N/A'}</td>
                    <td>
                      <button onClick={() => navigate(`/profile/${biz.locationId || biz.id}`)}>
                        View profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;