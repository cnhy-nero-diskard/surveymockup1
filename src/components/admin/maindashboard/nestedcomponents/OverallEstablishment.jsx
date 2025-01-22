import React from 'react';
import { Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { sentimentColors } from '../../../../config/sentimentConfig';
import { ChartContainer, MainContent } from '../../shared/styledComponents';
import { ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Amorita Resort', Positive: 60, Negative: 40 },
  { name: 'Eskaya Beach Resort', Positive: 70, Negative: 30 },
  { name: 'Hennan Resort', Positive: 65, Negative: 35 },
  { name: 'Alona Royal Palm', Positive: 75, Negative: 25 },
  { name: 'Ohana Panglao', Positive: 80, Negative: 20 },
  { name: 'Roman Emapire', Positive: 50, Negative: 50 },
];



const StatBox = styled(Box)`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: ${({ mt }) => (mt ? '16px' : '0')};
`;

const OverallOneBarangay = () => {
  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  return (
    <MainContent>
      <Grid container spacing={4}>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }} >

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
            <Legend />
            <Bar dataKey="Positive" fill={sentimentColors.positive} />
            <Bar dataKey="Negative" fill={sentimentColors.negative} />
          </BarChart>
        </ResponsiveContainer>
        </ChartContainer>
      </Grid>
    </MainContent>
  );
};

export default OverallOneBarangay;