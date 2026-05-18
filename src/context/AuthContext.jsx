import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Auth Context ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and provides auth state.
 * Persists user/token in localStorage for page refresh survival.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('smarthire_user');
    const savedToken = localStorage.getItem('smarthire_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login: save user and token to state + localStorage
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('smarthire_user', JSON.stringify(userData));
    localStorage.setItem('smarthire_token', authToken);
  };

  /**
   * Logout: clear state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smarthire_user');
    localStorage.removeItem('smarthire_token');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook for consuming auth context
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
