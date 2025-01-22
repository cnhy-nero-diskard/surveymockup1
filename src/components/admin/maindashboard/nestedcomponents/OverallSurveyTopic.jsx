import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sentimentColors } from '../../../../config/sentimentConfig';
import { MainContent, ChartContainer } from '../../shared/styledComponents';
import {  Grid } from '@mui/material';


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
                tick={{ fontSize: 12, angle: -0 }}
                tickFormatter={(value) => truncateLabel(value, 8)}
                interval={0}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
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

export default OverallSurveyTopic;