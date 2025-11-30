import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { me } from '@/services/authApi';
import { useLoader } from './LoaderContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [user, setUser] = useState(storedUser);  

  useEffect(() => {
    const fetchUser = async () => {
      showLoader();
      try {
        const currentUser = await me();
        setUser(currentUser?.role ? currentUser : null);
      } catch (error) {
        console.error("Auth fetch error:", error);
        setUser(null);
      } finally {
        hideLoader();
      }
    };

    const token = localStorage.getItem("authToken") || "";
    if (token) fetchUser();
    else hideLoader();
  }, []);

  const authContextValue = useMemo(() => ({
    user,
    setUser,
    role: user?.role || "guest",
    isAuthenticated: !!user,
  }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
