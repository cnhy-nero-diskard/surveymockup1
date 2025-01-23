import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import RouteSelector from './routes/RouteSelector';
import AdminRoutes from './AdminRoutes';
import WebpageRoutesDev from './WebpageRoutesDev';
import NotFound from './components/admin/fallback/NotFound';
import { AuthProvider } from './components/context/AuthContext';
import Login from './components/admin/login/Login';
const App = () => {
  const initializeAnonymousUser = async () => {
    console.log('Initializing anonymous user...');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/init-anonymous-user`, {
        withCredentials: true, // Include cookies in the request
      });

      if (response.status === 200) {
        console.log('Anonymous user initialized successfully');
      } else {
        console.error('Failed to initialize anonymous user');
      }
    } catch (error) {
      console.error('Error initializing anonymous user:', error);
    }
  };

  useEffect(() => {
    initializeAnonymousUser();
  }, []);

  return (
    <Router>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <Routes>
          {/* Default route to show the RouteSelector */}
          <Route path="/" element={<RouteSelector />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />

          {/* App Routes */}
          <Route path="/devpath1/*" element={<WebpageRoutesDev />} />
          

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;