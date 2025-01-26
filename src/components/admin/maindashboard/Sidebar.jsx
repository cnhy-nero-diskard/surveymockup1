import React from "react";
import axios from "axios"; // Import Axios
import {
  Drawer,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  LocationCity as MunicipalityIcon,
  Map as BarangayIcon,
  BeachAccessOutlined as AttIcon,
  Business as EstablishmentIcon,
  Timeline as GraphIcon,
  ExitToApp as LogoutIcon,
  InsightsRounded as InsightsIcon,
  PollRounded as SurveyIcon,
  ApiRounded as AiToolsIcon,
  ComputerOutlined as CompIcon,
  VerifiedUserOutlined as UserIcon,
  QrCode2Outlined as SurveyTouchpointsIcon,  
} from "@mui/icons-material";

// Import Google Fonts (Poppins)
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold
import UsersDashboard from "../usersdashboard/UsersDashboard";

// Styled Components
const SidebarDrawer = styled(Drawer)`
  width: ${({ drawerWidth }) => drawerWidth}px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: ${({ drawerWidth }) => drawerWidth}px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #d9f1ff, #ade7ff);
    border-right: none;
    font-family: "Poppins", sans-serif;
  }
`;

const SidebarHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: linear-gradient(to bottom, #0077b6, #023e8a);
  color: white;
  font-family: "Poppins", sans-serif;
`;

const SearchField = styled(TextField)`
  margin: 16px;
  background-color: white;
  border-radius: 4px;
  width: calc(100% - 32px);

  & .MuiInputBase-input {
    font-family: "Poppins", sans-serif;
  }
`;

const CustomTypography = styled(Typography)`
  font-family: "Poppins", sans-serif;
`;

const Sidebar = ({ drawerWidth }) => {
  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
        headers: {
            'Content-type': 'application/json',
        },
    });
console.log(response.status); if (response.status === 200) {
        // Handle successful logout, e.g., redirect to login page
        window.location.href = '/login'; // Redirect to login page
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <SidebarDrawer variant="permanent" drawerWidth={drawerWidth}>
      <Toolbar />
      <SidebarHeader>
        <CustomTypography variant="h6" align="center" fontWeight="bold">
          MULTILINGUAL SURVEY SYSTEM ADMIN DASHBOARD
        </CustomTypography>
        <CustomTypography variant="subtitle2" align="center">
          PANGLAO TOURISM OFFICE
        </CustomTypography>
      </SidebarHeader>
      <SearchField placeholder="Search" fullWidth variant="outlined" />
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, to: "dashboard" },
            {
              text: "Municipality Data",
              icon: <MunicipalityIcon />,
              to: "overallmun",
            },
            {
              text: "Per Barangay Data",
              icon: <BarangayIcon />,
              to: "barangaydashboard",
            },
            {
              text: "Per Attraction Data",
              icon: <AttIcon />,
              to: "attractiondashboard",
            },
            {
              text: "Per Establishment Data",
              icon: <EstablishmentIcon />,
              to: "establishmentdashboard",
            },
            {
              text: "Survey Metrics",
              icon: <SurveyIcon />,
              to: "surveymetrics",
            },
            {
              text: "AI Tools",
              icon: <AiToolsIcon />,
              to: "aitoolsdashboard",
            },
            {
              text: "System Performance",
              icon: <CompIcon />,
              to: "systemperf",
            },
            {
              text: "Users Dashboard",
              icon: <UserIcon />,
              to: "usersdashboard",
            },
            {
              text: "Survey Touchpoints",
              icon: <SurveyTouchpointsIcon />,
              to: "surveytouchpoints",
            },
            {
              text: "LOGSTREAM",
              icon: <SurveyTouchpointsIcon />,
              to: "logstream",
            },
            { text: "Topic Modelling", icon: <GraphIcon />, to: "tmgraph" },
            { text: "Sentiment Analysis", icon: <InsightsIcon />, to: "sentimentgraphs" },
          ].map((item, index) => (
            <ListItem button component={Link} to={item.to} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontFamily: "Poppins, sans-serif" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          sx={{ fontFamily: "Poppins, sans-serif" }}
          onClick={handleLogout} // Add onClick event handler
        >
          Log Out
        </Button>
      </Box>
    </SidebarDrawer>
  );
};

export default Sidebar;