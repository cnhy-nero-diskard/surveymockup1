import React from "react";
import { Outlet } from "react-router-dom"; // Outlet for nested routes
import styled from "styled-components";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import WarningMessage from "../../partials/WarningMessage";

export const drawerWidth = 250; // Exportable global variable

const Container = styled(Box)`
  display: flex;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  background-color: rgba(0,0,0,0);
  min-height: 100vh;
`;

const DashboardOutlet = () => {
  const { isAuthenticated, unauthorized, handleUnauthorized, login } = useAuth(); // Correct usage

  return (
    <>
      {/* {unauthorized && <WarningMessage message="Unauthorized Access! Please log in." />} */}

      <Container>
        <Sidebar drawerWidth={drawerWidth} />
        <MainContent drawerWidth={drawerWidth}>
          <Outlet /> {/* This will render the nested routes */}
        </MainContent>
      </Container>
    </>
  );
};

export default DashboardOutlet;