import React, { createContext, useContext, useState, useCallback } from 'react';

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

  const updateAccountInfo = (newInfo) => {
    setAccountInfo(newInfo);
    // Also save to localStorage for persistence
    localStorage.setItem('accountInfo', JSON.stringify(newInfo));
  };

  const loadAccountInfo = useCallback(() => {
    const saved = localStorage.getItem('accountInfo');
    if (saved) {
      setAccountInfo(JSON.parse(saved));
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