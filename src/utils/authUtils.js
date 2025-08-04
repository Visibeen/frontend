
export const setSession = (user) => {
  if (!user || typeof user !== 'object') {
    console.warn('Invalid user passed to setSession:', user);
    return;
  }
  localStorage.setItem('user', JSON.stringify(user));
};


export const getSession = () => {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem('user');
};