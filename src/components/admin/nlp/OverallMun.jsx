import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, Toolbar } from "@mui/material";
import styled from "styled-components";
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import { sentimentColors } from '../../../config/sentimentConfig';

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const PieChartContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  padding: 16px;
  border-radius: 15px;
`;

const ChartWrapper = styled(Box)`
  width: 100%;
  height: 300px;
  border-radius: 16px;
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
    { name: "Positive (beach, nice)", value: 65, color: sentimentColors.positive },
    { name: "Negative (beach, crowded)", value: 35, color: sentimentColors.negative },
  ];

  return (
    <MainContent>
      <Toolbar />
      <PieChartContainer>
        <Typography variant="h6">OVERALL SENTIMENT (PANGLAO)</Typography>
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
    </MainContent>
  );
};

export default OverallMun;