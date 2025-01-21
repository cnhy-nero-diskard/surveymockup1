import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Amorita Resort', Positive: 60, Negative: 40 },
  { name: 'Eskaya Beach Resort', Positive: 70, Negative: 30 },
  { name: 'Hennan Resort', Positive: 65, Negative: 35 },
  { name: 'Alona Royal Palm', Positive: 75, Negative: 25 },
  { name: 'Ohana Panglao', Positive: 80, Negative: 20 },
  { name: 'Roman Emapire', Positive: 50, Negative: 50 },
];

const OverallOneBarangay = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#b3e5fc' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
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
              <ListItemText primary="Barangay Overall Result" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#e3f2fd', p: 3 }}
      >
        <AppBar position="static" sx={{ bgcolor: '#64b5f6', mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Main Key Points Indicators
            </Typography>
            <Button color="inherit">Sort</Button>
            <Button color="inherit">Filter</Button>
            <Typography variant="body1" sx={{ ml: 2 }}>
              Sept. 18 - Sept. 19
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">Positive</Typography>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: '#4fc3f7',
                  margin: '0 auto',
                }}
              />
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                boxShadow: 2,
                mt: 2,
              }}
            >
              <Typography variant="h6">Negative</Typography>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: '#f48fb1',
                  margin: '0 auto',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6" gutterBottom>
              Tawala Accommodation Overall Survey Results
            </Typography>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill="#4fc3f7" />
              <Bar dataKey="Negative" fill="#f48fb1" />
            </BarChart>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OverallOneBarangay;
