import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [data, setData] = useState(null);

  function login(userData) {
    setData(userData);
  }

  function logout() {
    setData(null);
  }
  // Значение, доступное в контексте
  const value = {
    data,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
