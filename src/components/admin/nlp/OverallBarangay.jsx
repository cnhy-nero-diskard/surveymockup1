import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import { sentimentColors } from '../../../config/sentimentConfig';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
const data = [
  { name: 'Danao', Positive: 60, Negative: 40 },
  { name: 'Tangnan', Positive: 70, Negative: 30 },
  { name: 'Tawala', Positive: 80, Negative: 20 },
];

const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
    font-family: ${fontFamily};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
`;

const ChartContainer = styled(Box)`
  flex: 2;
  height: 300px;
`;

const OverallSurveyTopic = () => {
  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MainContent>
        <Typography variant="h6" align="center" gutterBottom>
          TOP 3 RELEVANT BARANGAYS DATA
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <ChartContainer>
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
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, angle: -0 }}
                tickFormatter={(value) => truncateLabel(value, 10)}
                interval={0}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill={sentimentColors.positive} />
              <Bar dataKey="Negative" fill={sentimentColors.negative} />
            </BarChart>
          </ChartContainer>
        </Box>
      </MainContent>
    </Box>
  );
};

export default OverallSurveyTopic;