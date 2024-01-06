import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const storedUser = localStorage.getItem('user');
  useEffect(() => {
    if (storedUser) {
      setIsLogin(true);
    }
  }, [storedUser,isLogin]);

  console.log(isLogin, 'context')
  return (
    <>
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
          {children}
        </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);