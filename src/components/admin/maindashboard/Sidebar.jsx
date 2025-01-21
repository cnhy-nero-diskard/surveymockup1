import React from "react";
import {
  Drawer,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link for routing

const SidebarDrawer = styled(Drawer)`
  width: ${({ drawerWidth }) => drawerWidth}px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: ${({ drawerWidth }) => drawerWidth}px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #d9f1ff, #ade7ff);
  }
`;

const Sidebar = ({ drawerWidth }) => {
  return (
    <SidebarDrawer variant="permanent" drawerWidth={drawerWidth}>
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
          {/* Add Link components for navigation */}
          <ListItem button component={Link} to="dashboard">
            <ListItemText primary="Main Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="overallmun">
            <ListItemText primary="Overall Sentiment" />
          </ListItem>
          <ListItem button component={Link} to="overallbarangay">
            <ListItemText primary="Overall Sentiment Barangay" />
          </ListItem>
          <ListItem button component={Link} to="overalltopic">
            <ListItemText primary="Overall Sentiment Topic" />
          </ListItem>
          <ListItem button component={Link} to="overallone">
            <ListItemText primary="Overall One Barangay" />
          </ListItem>
          <ListItem button component={Link} to="tmgraph">
            <ListItemText primary="Topic Modelling" />
          </ListItem>
          <ListItem>
            <Button fullWidth variant="outlined">
              Log Out
            </Button>
          </ListItem>
        </List>
      </Box>
    </SidebarDrawer>
  );
};

export default Sidebar;