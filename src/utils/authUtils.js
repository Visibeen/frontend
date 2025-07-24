
export const setSession = (user) => {
  if (!user || typeof user !== 'object') {
    console.warn('Invalid user passed to setSession:', user);
    return;
  }
  sessionStorage.setItem('user', JSON.stringify(user));
};


export const getSession = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem('user');
};