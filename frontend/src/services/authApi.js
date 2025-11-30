import {apiCall} from './apiCall';

export const me = async () => {
  try {
    const response = await apiCall('GET', '/auth/me');
    return response.data;

} catch (error) {
    console.error('Failed to fetch user:', error);
    if(error.status === 401 || error.status === 403) {
        localStorage.removeItem("authToken");        
        localStorage.removeItem("user");        
    }
    return null;
  }
};