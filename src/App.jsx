
import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from './components';
import AppRoutes from './routers';
import Login from './components/auth/login';
import { ResetPwd } from './components/auth/reset-password';
import './style/App.css'
function App() {
  const isLogin=JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
      {/* Temporary */}
        {isLogin?
        AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<LayoutDashboard pageTitle={route.title}>{route.element}</LayoutDashboard>}
          />
        )):
        <><Route path={'/'} element={<Login/>}/>
        <Route path={'/resetPwd'} element={<ResetPwd/>}/>
        <Route path={'/signout'} element={<Login/>}/>
        <Route path={'/login'} element={<Login/>}/>
        </>
        }
      </Routes>
    </Router>
  )
}

export default App;

