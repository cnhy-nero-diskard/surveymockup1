import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import AdminSessionDashboard from "../adminsessiondashboard/AdminLogins";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Dummy data (replace with backend data later)
const dummyData = {
  activeUsers: 120,
  totalUsers: [
    { id: 1, name: "John Doe", email: "john@example.com", country: "USA", language: "English" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", country: "Canada", language: "French" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", country: "UK", language: "English" },
  ],
  geographicDistribution: {
    USA: 50,
    Canada: 30,
    UK: 20,
    Germany: 10,
  },
  languagePreferences: {
    English: 70,
    French: 20,
    Spanish: 10,
  },
};

const UsersDashboard = () => {
  const [showAdminsTable, setShowAdminsTable] = useState(false);

  // Data for charts
  const geographicData = {
    labels: Object.keys(dummyData.geographicDistribution),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(dummyData.geographicDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const languageData = {
    labels: Object.keys(dummyData.languagePreferences),
    datasets: [
      {
        label: "Language Preferences",
        data: Object.values(dummyData.languagePreferences),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom>
        Users Dashboard
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Active Admins Section - Replaced with AdminSessionDashboard */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Admins
              </Typography>
              <AdminSessionDashboard /> {/* Integrated AdminSessionDashboard */}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Users Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Active Users: {dummyData.activeUsers} users taking surveys</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users Section */}
        <Grid item xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                TOTAL USERS
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Language</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.totalUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{user.language}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Geographic Distribution Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Geographic Distribution
              </Typography>
              <Box sx={{ height: "300px" }}>
                <Bar data={geographicData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Language Preferences Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Language Preferences
              </Typography>
              <Box sx={{ height: "300px" }}>
                <Pie data={languageData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsersDashboard;