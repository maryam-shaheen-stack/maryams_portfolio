import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { adminApi, AuthError } from "../lib/adminApi";

const AdminAuthContext = createContext(null);

const STORAGE_KEY = "admin_token";

function readStoredToken() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable (privacy mode, etc.) — treat as logged out
    return null;
  }
}

function writeStoredToken(token) {
  try {
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore — session just won't persist across refreshes
  }
}

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  // Starts true: on mount we always try to validate any stored token
  // before deciding whether the visitor is authenticated.
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = readStoredToken();
    if (!stored) {
      setChecking(false);
      return;
    }
    adminApi
      .me(stored)
      .then(({ admin }) => {
        setToken(stored);
        setAdmin(admin);
      })
      .catch(() => {
        // Stored token is expired/invalid — clear it silently, land
        // the visitor on the login page rather than an error screen.
        writeStoredToken(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await adminApi.login(email, password);
    writeStoredToken(result.token);
    setToken(result.token);
    setAdmin(result.admin);
    return result;
  }, []);

  const logout = useCallback(() => {
    writeStoredToken(null);
    setToken(null);
    setAdmin(null);
  }, []);

  const value = {
    token,
    admin,
    isAuthenticated: Boolean(token),
    checking,
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used inside an AdminAuthProvider");
  }
  return ctx;
}

export { AuthError };
