import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, Toolbar } from "@mui/material";
import styled from "styled-components";
import { sentimentColors } from "../../../../config/sentimentConfig";
import { ChartContainer, MainContent, ChartContainer as PieChartContainer } from '../../shared/styledComponents';
import { ChartWrapper, LegendContainer, LegendItem, ColorIndicator } from "../../shared/charts/ChartWrapper";


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
      <PieChartContainer>
        <Typography variant="h6">OVERALL SENTIMENT (PANGLAO)</Typography>
        <ChartContainer>
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
        </ChartContainer>
      </PieChartContainer>
    </MainContent>
  );
};

export default OverallMun;