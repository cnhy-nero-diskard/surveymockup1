import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Import Recharts components
import { Box, Typography, Toolbar } from "@mui/material";
import styled from "styled-components";

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  background-color: clear;
  min-height: 100vh;
`;

const PieChartContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

const ChartWrapper = styled(Box)`
  width: 300px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const LegendContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const LegendItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const ColorIndicator = styled(Box)`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 8px;
`;

const Footer = styled(Box)`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
`;

const OverallMun = () => {
  const pieData = [
    { name: "Positive (beach, nice)", value: 65, color: "#53C2F0" },
    { name: "Negative (beach, crowded)", value: 35, color: "#FFA5A5" },
  ];

  return (
    <MainContent>
      <Toolbar /> {/* Add this to account for the AppBar */}
      <PieChartContainer>
        <Typography variant="h6">PANGLAO OVERALL TOURIST SENTIMENT RESULTS</Typography>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <LegendContainer>
          {pieData.map((entry, index) => (
            <LegendItem key={index}>
              <ColorIndicator color={entry.color} />
              <Typography>{entry.name}</Typography>
            </LegendItem>
          ))}
        </LegendContainer>
      </PieChartContainer>
      <Footer>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          DECEMBER 8, 2025
        </Typography>
        <Typography variant="subtitle1">10:07 PM</Typography>
      </Footer>
    </MainContent>
  );
};

export default OverallMun;