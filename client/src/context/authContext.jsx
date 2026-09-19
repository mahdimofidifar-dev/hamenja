import { createContext, useState, useContext, useEffect } from "react";

import api from "../apis/axios";

import { setAccessToken, clearAccessToken } from "../apis/token";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Restore Login
  // -------------------------

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.post("/users/refresh");

        setAccessToken(data.accessToken);

        const response = await api.get("/users/me");

        setUser(response.data.user);
      } catch (error) {
        console.error(
          "AUTH RESTORE ERROR:",
          error.response?.data || error.message,
        );

        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);
  // -------------------------
  // Login
  // -------------------------

  const login = (userData, accessToken) => {
    setAccessToken(accessToken);
    setUser(userData);
  };

  // -------------------------
  // Logout
  // -------------------------

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
