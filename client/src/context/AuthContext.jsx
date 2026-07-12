import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider
 * Stub — authentication will be implemented in a later task.
 * Provides user state and auth actions to the component tree.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO: Implement login with JWT
  const login = async (credentials) => {
    setLoading(true);
    try {
      // await authService.login(credentials);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth hook — access auth context anywhere in the tree
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
