import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const drawerWidth = 240;

const data = [
  { x: 50, y: 70, category: 'Accommodation' },
  { x: 80, y: 100, category: 'Transportation' },
  { x: 120, y: 150, category: 'Services' },
  { x: 200, y: 80, category: 'Activity/Events' },
];

const TMGraph = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText primary="TPMS ADMIN DASHBOARD" secondary="Department of Tourism" />
            </ListItem>
            <ListItem>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
              >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
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
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <ScatterChart
          width={800}
          height={400}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X" />
          <YAxis type="number" dataKey="y" name="Y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Accommodation" data={data.filter((d) => d.category === 'Accommodation')} fill="#00C49F" />
          <Scatter name="Transportation" data={data.filter((d) => d.category === 'Transportation')} fill="#FF8042" />
          <Scatter name="Services" data={data.filter((d) => d.category === 'Services')} fill="#0088FE" />
          <Scatter name="Activity/Events" data={data.filter((d) => d.category === 'Activity/Events')} fill="#FFBB28" />
        </ScatterChart>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tawala</TableCell>
                <TableCell>10-13-2024</TableCell>
                <TableCell>10:30 PM</TableCell>
                <TableCell>Accommodation</TableCell>
                <TableCell>Heavy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tawala</TableCell>
                <TableCell>10-13-2024</TableCell>
                <TableCell>10:30 PM</TableCell>
                <TableCell>Transportation</TableCell>
                <TableCell>Heavy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tawala</TableCell>
                <TableCell>10-13-2024</TableCell>
                <TableCell>10:30 PM</TableCell>
                <TableCell>Activity/Events</TableCell>
                <TableCell>Moderate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tawala</TableCell>
                <TableCell>10-13-2024</TableCell>
                <TableCell>10:30 PM</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Light</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TMGraph;
