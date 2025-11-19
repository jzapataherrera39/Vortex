import api from './api';

// NOTE: This service now interacts with the real backend.
// It also assumes you will store the user info and token in localStorage.
// You should adapt this to your state management solution (e.g., Zustand).

const login = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    if (data && data.token) {
      // Store user info and token
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('userToken', data.token);
      return { success: true, user: data };
    }
    return { success: false, message: 'Login failed' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Server Error' };
  }
};

const logout = () => {
  // Clear user info from storage
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userToken');
  console.log('User logged out.');
  // No need to return a promise, but you can if you want to keep the interface consistent
};

const authService = {
  login,
  logout,
};

export default authService;