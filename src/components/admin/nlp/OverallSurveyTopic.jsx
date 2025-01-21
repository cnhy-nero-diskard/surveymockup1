import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

const OverallSurveyTopic = () => {
  const drawerWidth = 240;

  const data = [
    { name: 'Accommodation', Positive: 60, Negative: 40 },
    { name: 'Activities', Positive: 70, Negative: 30 },
    { name: 'Services', Positive: 80, Negative: 20 },
    { name: 'Transportation', Positive: 90, Negative: 10 },
  ];

  return (
    <div style={{ display: 'flex' }}>
      {/* Drawer for Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#E0F7FF',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem>
            <Typography variant="h6" style={{ color: '#007ACC', marginLeft: 8 }}>
              TPMS ADMIN DASHBOARD
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" style={{ marginLeft: 8 }}>
              Department of Tourism
            </Typography>
          </ListItem>
          <ListItem>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input
              type="text"
              placeholder="Search"
              style={{ border: 'none', outline: 'none', marginLeft: 8 }}
            />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Graphs" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Panglao Overall Sentiments" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Panglao Overall / Barangay" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Barangay / Category" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Barangay" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '16px' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Main Key Points Indicators</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
              <Typography variant="body2">DECEMBER 8, 2025</Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          {/* Graph Section */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  BARANGAY OVERALL SURVEY RESULT PER SURVEY TOPIC
                </Typography>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Positive" fill="#7FC8FF" />
                      <Bar dataKey="Negative" fill="#FF99C8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Percentage/Category Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Percentage / Category</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>Accommodation</li>
                  <li>Activities/Events</li>
                  <li>Services</li>
                  <li>Transportation</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default OverallSurveyTopic;