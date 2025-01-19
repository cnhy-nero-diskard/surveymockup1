import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Grid, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

const OverallSurveyTopic = () => {
  const drawerWidth = 240;

  const data = {
    labels: ['Accommodation', 'Activities', 'Services', 'Transportation'],
    datasets: [
      {
        label: 'Positive',
        data: [60, 70, 80, 90],
        backgroundColor: '#7FC8FF',
      },
      {
        label: 'Negative',
        data: [40, 30, 20, 10],
        backgroundColor: '#FF99C8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

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
                  <Bar data={data} options={options} />
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
