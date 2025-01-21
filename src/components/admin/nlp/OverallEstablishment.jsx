import React from 'react';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import { sentimentColors } from '../../../config/sentimentConfig';
const data = [
  { name: 'Amorita Resort', Positive: 60, Negative: 40 },
  { name: 'Eskaya Beach Resort', Positive: 70, Negative: 30 },
  { name: 'Hennan Resort', Positive: 65, Negative: 35 },
  { name: 'Alona Royal Palm', Positive: 75, Negative: 25 },
  { name: 'Ohana Panglao', Positive: 80, Negative: 20 },
  { name: 'Roman Emapire', Positive: 50, Negative: 50 },
];

const MainContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const MainContent = styled(Box)`
  flex-grow: 1;
  background-color: transparent;
  padding: 24px;
`;

const StatBox = styled(Box)`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: ${({ mt }) => (mt ? '16px' : '0')};
`;

const Circle = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ bgcolor }) => bgcolor};
  margin: 0 auto;
`;

const OverallOneBarangay = () => {
  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  return (
    <MainContainer>
      <MainContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>

            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                interval={0}
                tick={{
                  fontSize: 15,
                  angle: -45,
                  textAnchor: 'end',
                }}
                tickFormatter={(value) => truncateLabel(value, 5)}
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill={sentimentColors.positive} />
              <Bar dataKey="Negative" fill={sentimentColors.negative} />
            </BarChart>
          </Grid>
        </Grid>
      </MainContent>
    </MainContainer>
  );
};

export default OverallOneBarangay;