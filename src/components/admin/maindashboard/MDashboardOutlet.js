import React from "react";
import { Outlet } from "react-router-dom"; // Outlet for nested routes
import styled from "styled-components";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import WarningMessage from "../../partials/WarningMessage";
const Container = styled(Box)`
  display: flex;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  background-color: clear;
  min-height: 100vh;
  margin-left: ${({ drawerWidth }) => `${drawerWidth}px`}; // Offset for the sidebar
`;

const DashboardOutlet = () => {
  const { isAuthenticated, unauthorized, handleUnauthorized, login } = useAuth(); // Correct usage

  const drawerWidth = 250;

  return (
    <>
      {/* {unauthorized && <WarningMessage message="Unauthorized Access! Please log in." />} */}

      <Container>
        <Sidebar drawerWidth={drawerWidth} />
        <MainContent >
          <Outlet /> {/* This will render the nested routes */}
        </MainContent>
      </Container>
    </>
  );
};

export default DashboardOutlet;