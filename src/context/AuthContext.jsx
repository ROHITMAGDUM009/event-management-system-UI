import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ─── Load from localStorage on app start ─────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const fullName = localStorage.getItem("fullName");

    if (token && role) {
      setUser({ token, role, email, fullName, isAuthenticated: true });
    }
  }, []);

  // ─── Login ────────────────────────────────────────────────
  const login = (token, role, email, fullName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email || "");
    localStorage.setItem("fullName", fullName || "");

    setUser({ token, role, email, fullName, isAuthenticated: true });
  };

  // ─── Logout ───────────────────────────────────────────────
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);