import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RouteSelector from './routes/RouteSelector';
import AdminRoutes from './AdminRoutes';
import WebpageRoutesDev from './WebpageRoutesDev';
import NotFound from './components/admin/fallback/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to show the RouteSelector */}
        <Route path="/" element={<RouteSelector />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* App Routes */}
        <Route path="/devpath1/*" element={<WebpageRoutesDev />} />

        {/* Fallback route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;