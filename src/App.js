import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios'; 
import RouteSelector from './routes/RouteSelector';
import AdminRoutes from './AdminRoutes';
import WebpageRoutesDev from './WebpageRoutesDev';
import NotFound from './components/admin/fallback/NotFound';


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
      <Routes>
        {/* Default route to show the RouteSelector */}
        <Route path="/" element={<RouteSelector />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* App Routes */}
        <Route path="/devpath1/*" element={<WebpageRoutesDev />} />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;