import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from './components';
import AppRoutes from './routers';

function App() {
  return (
    <Router>
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<LayoutDashboard pageTitle={route.title}>{route.element}</LayoutDashboard>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
