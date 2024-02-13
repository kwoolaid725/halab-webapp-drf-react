// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userData) => {
    // Logic to authenticate the user and set currentUser
    setCurrentUser(userData);
  };

  const logout = () => {
    // Logic to logout the user and set currentUser to null
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
