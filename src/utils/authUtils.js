
export const setSession = (user) => {
  if (!user || typeof user !== 'object') {
    console.warn('Invalid user passed to setSession:', user);
    return;
  }
  
  localStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('user', JSON.stringify(user));
  
  // Add this: Store token separately for backend compatibility
  if (user.token) {
    localStorage.setItem('authToken', user.token);
    sessionStorage.setItem('authToken', user.token);
  }
};


export const getSession = () => {
  try {
    // Check sessionStorage first, then localStorage
    let data = sessionStorage.getItem('user');
    if (!data) {
      data = localStorage.getItem('user');
      // If found in localStorage, sync to sessionStorage
      if (data) {
        sessionStorage.setItem('user', data);
      }
    }
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};
