import React from "react";
import { Outlet } from "react-router-dom"; // Outlet for nested routes
import styled from "styled-components";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";

const Container = styled(Box)`
  display: flex;
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  background-color: clear;
  min-height: 100vh;
`;

const DashboardOutlet = () => {
  const drawerWidth = 240;

  return (
    <Container>
      <Sidebar drawerWidth={drawerWidth} />
      <MainContent>
        <Toolbar /> {/* Empty Toolbar to push content below AppBar */}
        <Outlet /> {/* This will render the nested routes */}
      </MainContent>
    </Container>
  );
};

export default DashboardOutlet;