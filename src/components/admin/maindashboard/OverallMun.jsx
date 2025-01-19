import React from "react";
import { Pie } from "react-chartjs-2";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const OverallMun = () => {
  const pieData = {
    labels: ["Positive (beach, nice)", "Negative (beach, crowded)"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#53C2F0", "#FFA5A5"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #d9f1ff, #ade7ff)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <Typography variant="h6">TPMS ADMIN DASHBOARD</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2">Department of Tourism</Typography>
            </ListItem>
            <ListItem>
              <TextField placeholder="Search" fullWidth />
            </ListItem>
            <ListItem>
              <ListItemText primary="Graphs" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Panglao Overall Sentiments" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Panglao Overall / Barangay" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Barangay / Category" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Barangay" />
            </ListItem>
            <ListItem>
              <Button fullWidth variant="outlined">
                Log Out
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f3f9ff", minHeight: "100vh" }}
      >
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: drawerWidth, backgroundColor: "#5bbff2" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Main Key Points Indicators
            </Typography>
            <Button variant="outlined" color="inherit">
              Sort
            </Button>
            <Button variant="outlined" color="inherit" sx={{ mx: 2 }}>
              Filter
            </Button>
            <Typography>Sept. 18 - Sept. 19</Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />

        {/* Pie Chart */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 5 }}>
          <Typography variant="h6">PANGLAO OVERALL TOURIST SENTIMENT RESULTS</Typography>
          <Box sx={{ width: 300, height: 300 }}>
            <Pie data={pieData} options={pieOptions} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: "#53C2F0", borderRadius: "50%", mr: 1 }} />
              <Typography>Positive</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: "#FFA5A5", borderRadius: "50%", mr: 1 }} />
              <Typography>Negative</Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer Time Display */}
        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            DECEMBER 8, 2025
          </Typography>
          <Typography variant="subtitle1">10:07 PM</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OverallMun;
