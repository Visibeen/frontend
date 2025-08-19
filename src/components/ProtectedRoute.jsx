import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { getSession } from '../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasGmbAccess, setHasGmbAccess] = useState(null);

  useEffect(() => {
    const checkGmbAccess = async () => {
      try {
        const user = getSession();

        if (!user) {
          console.log('No user session found in ProtectedRoute');
          setLoading(false);
          return;
        }

        console.log('User found in ProtectedRoute:', user);

        // Check if user already has GMB access information
        if (user.hasGmbAccess !== undefined) {
          setHasGmbAccess(user.hasGmbAccess);
          setLoading(false);
          return;
        }

        // If no GMB access info, try to check via API
        try {
          const response = await api.get('/customer/auth/check-gmb-access', {
            Authorization: `Bearer ${user.token || user.access_token || ''}`,
          });
          setHasGmbAccess(response.hasGmbAccess || false);
        } catch (apiError) {
          console.warn('GMB access check failed, assuming no access:', apiError);
          // If API check fails, assume no GMB access for now
          setHasGmbAccess(false);
        }
      } catch (err) {
        console.error('ProtectedRoute error:', err);
        setHasGmbAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkGmbAccess();
  }, []);

  if (loading) {
    // Show loading state while checking access
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Check if user is logged in
  const userString = sessionStorage.getItem('user');
  if (!userString) {
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (!user || typeof user !== 'object') {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    return <Navigate to="/" replace />;
  }

  // Check GMB access and redirect accordingly
  if (hasGmbAccess === true) {
    // User has GMB access, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  if (hasGmbAccess === false) {
    // User doesn't have GMB access, redirect to account not found
    return <Navigate to="/account-not-found" replace />;
  }

  // This should not happen as hasGmbAccess should be either true or false by this point
  return children;
};

export default ProtectedRoute;
