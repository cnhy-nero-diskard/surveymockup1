//UNUSED
import React from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const drawerWidth = 240;

const Dashboard = () => {
  const pieData = [
    { name: 'Positive', value: 60, color: '#00C49F' },
    { name: 'Negative', value: 40, color: '#FF8042' },
  ];

  const barData = [
    { name: 'Danao', positive: 40, negative: 20 },
    { name: 'Tangnan', positive: 30, negative: 25 },
    { name: 'Tawala', positive: 50, negative: 10 },
  ];

  const accommodationData = [
    { name: 'Amorita Resort', positive: 70, negative: 30 },
    { name: 'Eskaya Beach Resort', positive: 60, negative: 40 },
    { name: 'Henann Resort', positive: 80, negative: 20 },
    { name: 'Alona Royal Palm', positive: 65, negative: 35 },
    { name: 'Ohana Panglao', positive: 55, negative: 45 },
    { name: 'Roman Empire', positive: 50, negative: 50 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}

        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Graphs', 'Panglao Overall Sentiments', 'Panglao Overall / Barangay', 'Barangay / Category', 'Barangay'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Main Key Points Indicators
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button>Filter</Button>
            <Button>Sept. 18 - Sept. 19</Button>
            <Typography variant="body1" sx={{ ml: 2 }}>
              December 8, 2025 | 10:07 PM
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Pie Chart */}
          <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
            <Typography variant="h6" align="center">Panglao Overall Tourist Sentiment Results</Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </Box>

          {/* Barangay Survey Results */}
          <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
            <Typography variant="h6" align="center">Panglao Overall Survey Result per Barangay</Typography>
            <BarChart
              width={300}
              height={300}
              data={barData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#00C49F" />
              <Bar dataKey="negative" fill="#FF8042" />
            </BarChart>
          </Box>

          {/* Accommodation Results */}
          <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
            <Typography variant="h6" align="center">Tawala Accommodation Overall Survey Results</Typography>
            <BarChart
              width={300}
              height={300}
              data={accommodationData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" fill="#00C49F" />
              <Bar dataKey="negative" fill="#FF8042" />
            </BarChart>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
