
export const setSession = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getSession = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem('user');
};