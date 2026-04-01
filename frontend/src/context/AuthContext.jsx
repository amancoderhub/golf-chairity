import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { apiClient, setAuthToken } from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("fairchance_token");
    if (token) {
      setAuthToken(token);
      authService
        .me()
        .then((response) => setUser(response.user))
        .catch(() => {
          localStorage.removeItem("fairchance_token");
          setAuthToken(null);
          delete apiClient.defaults.headers.common.Authorization;
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const persistAuth = (payload) => {
    localStorage.setItem("fairchance_token", payload.token);
    setAuthToken(payload.token);
    setUser(payload.user);
  };

  const login = async (values) => {
    const payload = await authService.login(values);
    persistAuth(payload);
    return payload;
  };

  const signup = async (values) => {
    const payload = await authService.signup(values);
    persistAuth(payload);
    return payload;
  };

  const logout = () => {
    localStorage.removeItem("fairchance_token");
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout, setUser }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
