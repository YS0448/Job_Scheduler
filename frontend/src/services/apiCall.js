import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7800",
  withCredentials: true
});

export const apiCall = async (method = 'GET', endpoint, payload = {}, extraConfig = {}) => {
  try {
    const headers = {};

    // Attach authToken if available
    // const authToken = localStorage.getItem('authToken');
    const authToken = localStorage.getItem('authToken') || '';
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (!(payload instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      method,
      url: endpoint,
      headers,
      ...extraConfig
    };

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
      config.data = payload;
    } else if (method.toUpperCase() === 'GET' && Object.keys(payload).length > 0) {
      config.params = payload;
    }

    const response = await api(config);
    return response;
  } catch (error) {
    console.error(`API Error [${method.toUpperCase()} ${endpoint}]:`, error);
    if(error.response?.data.message === "Unauthorized"){
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error.response?.data || error.message;
  }
};

// export default apiCall;