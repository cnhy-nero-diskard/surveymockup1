import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
const RouteSelector = () => {


  const navigate = useNavigate();
  const { isAuthenticated, unauthorized, handleUnauthorized } = useAuth(); // Correct usage
  console.log('isAuthenticated', isAuthenticated);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Select Route</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => navigate('/admin')}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Admin Routes
        </button>
        <button
          onClick={() => navigate('/devpath1')}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          App Routes
        </button>
      </div>
    </div>
  );
};

export default RouteSelector;