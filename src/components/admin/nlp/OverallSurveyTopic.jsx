import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import { sentimentColors } from '../../../config/sentimentConfig';

const ChartContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const ChartWrapper = styled(Box)`
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
  background-color: transparent;
  display: flex;
  width: 50vh;
`;

const OverallSurveyTopic = () => {
  const data = [
    { name: 'Accommodation', Positive: 60, Negative: 40 },
    { name: 'Activities', Positive: 70, Negative: 30 },
    { name: 'Services', Positive: 80, Negative: 20 },
    { name: 'Transportation', Positive: 90, Negative: 10 },
  ];

  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: 'hidden', height: '100%' }}>
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <ChartContainer>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, angle: -45 }}
                    tickFormatter={(value) => truncateLabel(value, 5)}
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Positive" fill={sentimentColors.positive} />
                  <Bar dataKey="Negative" fill={sentimentColors.negative} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallSurveyTopic;