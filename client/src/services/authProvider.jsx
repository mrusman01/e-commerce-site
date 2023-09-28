import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem("token");
  const getRole = localStorage.getItem("roles");
  const [role, setRole] = useState(getRole);

  useEffect(() => {
    if (!authToken) {
      localStorage.clear();
    }
  });

  const contextValue = {
    authToken,
    setRole,
    role,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
