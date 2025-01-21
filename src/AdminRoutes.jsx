import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardOutlet from './components/admin/maindashboard/MDashboardOutlet';
import OverallMun from './components/admin/nlp/OverallMun';
import OverallBarangay from './components/admin/nlp/OverallBarangay';
import OverallSurveyTopic from './components/admin/nlp/OverallSurveyTopic';
import OverallOneBarangay from './components/admin/nlp/OverallEstablishment';
import TMGraph from './components/admin/nlp/TopicMod_scatter';
import Login from './components/admin/login/Login';
import Dashboard from './components/admin/maindashboard/Dashboard';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/admin/login" />;
// };

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
            <DashboardOutlet />
        }
      >
        <Route index element={<Dashboard />} /> {/* Default route */}
        <Route path = "dashboard" element={<Dashboard />} /> {/* Default route */}
        <Route path="overallmun" element={<OverallMun />} />
        <Route path="overallbarangay" element={<OverallBarangay />} />
        <Route path="overalltopic" element={<OverallSurveyTopic />} />
        <Route path="overallonebarangay" element={<OverallOneBarangay />} />
        <Route path="tmgraph" element={<TMGraph />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;