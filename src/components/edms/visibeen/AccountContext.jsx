import React, { createContext, useContext, useState, useCallback } from 'react';
import { getSession } from '../../../utils/authUtils';

const AccountContext = createContext();

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState({
    name: '',
    businessName: '',
    address: '',
    email: '',
    contact: '',
    altContact: '',
    website: '',
  });
  
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [isLogoUploaded, setIsLogoUploaded] = useState(false);
  const [selectedFontStyle, setSelectedFontStyle] = useState('Modern'); // Default font style

  // Normalize incoming account info to the shape used across EDMS UI
  const normalizeAccountInfo = (src = {}) => ({
    name: src.name || src.full_name || '',
    businessName: src.businessName || src.business_name || src.company || '',
    address: src.address || src.business_address || '',
    email: src.email || '',
    contact: src.contact || src.contact_number || src.phone || src.phone_number || '',
    altContact: src.altContact || src.alternative_contact_number || src.alt_phone || '',
    website: src.website || src.website_url || ''
  });

  const updateAccountInfo = (newInfo) => {
    const normalized = normalizeAccountInfo(newInfo);
    setAccountInfo(normalized);
    // Determine current owner (email/id) for scoped persistence
    try {
      const session = getSession() || {};
      const owner = session?.user?.email || session?.email || session?.user?.id || session?.id || session?.accountName || 'anonymous';
      // Also save to localStorage for persistence (scoped)
      localStorage.setItem('accountInfo', JSON.stringify(normalized));
      localStorage.setItem('accountInfoOwner', String(owner));
    } catch (_) {
      // Fallback without owner scoping
      localStorage.setItem('accountInfo', JSON.stringify(normalized));
    }
  };

  const loadAccountInfo = useCallback(() => {
    const saved = localStorage.getItem('accountInfo');
    const savedOwner = localStorage.getItem('accountInfoOwner');
    // Verify owner matches current session to prevent cross-account leakage
    try {
      const session = getSession() || {};
      const currentOwner = session?.user?.email || session?.email || session?.user?.id || session?.id || session?.accountName || 'anonymous';
      const ownerMatches = savedOwner && String(savedOwner) === String(currentOwner);
      if (!ownerMatches) {
        // Clear stale cache if owner mismatches
        localStorage.removeItem('accountInfo');
        localStorage.removeItem('accountInfoOwner');
      } else if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAccountInfo(normalizeAccountInfo(parsed));
        } catch (_) {
          localStorage.removeItem('accountInfo');
        }
      }
    } catch (_) {
      // Fallback to load without owner verification
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAccountInfo(normalizeAccountInfo(parsed));
        } catch (_) {
          localStorage.removeItem('accountInfo');
        }
      }
    }
    
    // Load logo from localStorage
    const savedLogo = localStorage.getItem('uploadedLogo');
    if (savedLogo) {
      setUploadedLogo(savedLogo);
    }
    
    // Load upload status from localStorage
    const savedUploadStatus = localStorage.getItem('isLogoUploaded');
    if (savedUploadStatus) {
      setIsLogoUploaded(JSON.parse(savedUploadStatus));
    }

    // Load font style from localStorage
    const savedFontStyle = localStorage.getItem('selectedFontStyle');
    if (savedFontStyle) {
      setSelectedFontStyle(savedFontStyle);
    }
  }, []);

  const uploadLogo = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoDataUrl = e.target.result;
        setUploadedLogo(logoDataUrl);
        setIsLogoUploaded(true);
        localStorage.setItem('uploadedLogo', logoDataUrl);
        localStorage.setItem('isLogoUploaded', 'true');
        resolve(logoDataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const clearLogo = () => {
    setUploadedLogo(null);
    setIsLogoUploaded(false);
    localStorage.removeItem('uploadedLogo');
    localStorage.removeItem('isLogoUploaded');
  };

  const skipLogo = () => {
    setIsLogoUploaded(false);
    localStorage.setItem('isLogoUploaded', 'false');
  };

  const updateFontStyle = (fontStyle) => {
    setSelectedFontStyle(fontStyle);
    localStorage.setItem('selectedFontStyle', fontStyle);
  };

  const loadFontStyle = useCallback(() => {
    const savedFontStyle = localStorage.getItem('selectedFontStyle');
    if (savedFontStyle) {
      setSelectedFontStyle(savedFontStyle);
    }
  }, []);

  const value = {
    accountInfo,
    updateAccountInfo,
    loadAccountInfo,
    uploadedLogo,
    isLogoUploaded,
    uploadLogo,
    clearLogo,
    skipLogo,
    selectedFontStyle,
    updateFontStyle,
    loadFontStyle,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}; 