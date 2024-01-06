import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LayoutDashboard } from "./components";
import AppRoutes from "./routers";
import Login from "./components/auth/login";
import { ResetPwd } from "./components/auth/reset-password";
import "./style/App.css";
import { useAuth } from "./components/auth/AuthContext";

// function PrivateRoute({ children }) {
//   const { isLogin } = useAuth();
//   console.log('sdd',isLogin);
//   return isLogin ? <>{children}</> : <Navigate to="/login" />;
// }
function App() {
  console.log('log')
  return (
    <Router>
      <Routes>
        <Route path="/resetPwd" element={<ResetPwd />} />
        <Route path="/login" element={<Login />} />
        {
          AppRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<LayoutDashboard pageTitle={route.title}>{route.element}</LayoutDashboard>}
            />
          ))
        }
      </Routes>
    </Router>
  );
}

export default App;
