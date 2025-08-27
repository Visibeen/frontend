import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  // Add any global state or functions you need
  const updateUser = (userData) => {
    setUser(userData);
  };

  const updateSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  // Example of a context value that might be used across the app
  const value = {
    state: {
      user,
      loading,
      error,
      selectedLocation,
      locationData,
      businesses
    },
    actions: {
      updateUser,
      setSelectedLocation: updateSelectedLocation,
      setLocationData,
      setBusinesses
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Export the provider component
export { AppProvider };

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
