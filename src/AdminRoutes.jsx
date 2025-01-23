import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardOutlet from './components/admin/maindashboard/MDashboardOutlet';
import OverallMun from './components/admin/maindashboard/nestedcomponents/OverallMun';
import OverallBarangay from './components/admin/maindashboard/nestedcomponents/OverallBarangay';
import OverallSurveyTopic from './components/admin/maindashboard/nestedcomponents/OverallSurveyTopic';
import OverallOneBarangay from './components/admin/maindashboard/nestedcomponents/OverallEstablishment';
import TMGraph from './components/admin/nlp/TopicMod_scatter';
import Login from './components/admin/login/Login';
import Dashboard from './components/admin/maindashboard/Dashboard';
import SentimentGraphs from './components/admin/nlp/SentimentGraphs';
import HeatmapChart from './components/admin/nlp/sentimentgraphs/sentiment_heatmap';
import SurveyMetrics from './components/admin/surveryperfmetrics/SurveyMetrics';
import AIToolsDashboard from './components/admin/aitoolsdashboard/AiToolsDashboard';
import Metrics from './components/temp/metricsprom';
import UsersDashboard from './components/admin/usersdashboard/UsersDashboard';
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
        <Route path = "dashboard" element={<Dashboard />} />
        <Route path="overallmun" element={<OverallMun />} />
        <Route path="overallbarangay" element={<OverallBarangay />} />
        <Route path="overalltopic" element={<OverallSurveyTopic />} />
        <Route path="overallonebarangay" element={<OverallOneBarangay />} />
        <Route path="tmgraph" element={<TMGraph />} />
        <Route path="sentimentgraphs" element={<HeatmapChart />} />
        <Route path="surveymetrics" element={<SurveyMetrics />} />
        <Route path="aitoolsdashboard" element={<AIToolsDashboard />} />
        <Route path="systemperf" element={<Metrics />} />
        <Route path="usersdashboard" element={<UsersDashboard />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;