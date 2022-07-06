export const getStorage = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return token;
  }
};

export const setStorage = value => {
  localStorage.setItem('token', value);
};

export const clearStorage = () => {
  localStorage.clear('token');
};
