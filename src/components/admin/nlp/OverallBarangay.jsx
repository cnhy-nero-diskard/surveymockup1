import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';

const data = [
  {
    name: 'Danao',
    Positive: 60,
    Negative: 40,
  },
  {
    name: 'Tangnan',
    Positive: 70,
    Negative: 30,
  },
  {
    name: 'Tawala',
    Positive: 50,
    Negative: 50,
  },
];

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
`;

const ChartContainer = styled(Box)`
  flex: 2;
`;

const PercentageContainer = styled(Box)`
  flex: 1;
  background-color: #e3f2fd;
  padding: 16px;
  border-radius: 8px;
`;

export default function OverallBarangay() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer */}

      {/* Main Content */}
      <MainContent>
        {/* Header */}
        <AppBar position="static" color="default" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Main Key Points Indicators
            </Typography>
            <Button startIcon={<FilterListIcon />}>Filter</Button>
            <Button startIcon={<CalendarTodayIcon />}>Sept. 18 - Sept. 19</Button>
            <Typography variant="body2" sx={{ ml: 2 }}>
              DECEMBER 8, 2025 | 10:07 PM
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Bar Chart */}
          <ChartContainer>
            <Typography variant="h6" align="center" gutterBottom>
              Panglao Overall Survey Result per Barangay
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill="#8884d8" />
              <Bar dataKey="Negative" fill="#82ca9d" />
            </BarChart>
          </ChartContainer>

          {/* Percentage Breakdown */}
          <PercentageContainer>
            <Typography variant="h6" align="center">
              Percentage / Barangay
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Danao" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tangnan" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tawala" />
              </ListItem>
            </List>
          </PercentageContainer>
        </Box>
      </MainContent>
    </Box>
  );
}