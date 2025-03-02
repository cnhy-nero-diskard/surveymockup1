import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Grid, Paper, Typography, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';

// Color palette for charts
const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#8884D8'];

// Styled Components
/**
 * Styled Paper component with custom padding, width, and alignment.
 */
const StyledPaper = styled(Paper)`
    padding: 16px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

/**
 * Styled FormControl component with a fixed width.
 */
const StyledFormControl = styled(FormControl)`
  width: 300px;
`;

/**
 * Styled Grid container with padding.
 */
const StyledGridContainer = styled(Grid)`
  padding: 24px;
`;

/**
 * DataDashboard component that displays various charts and data related to survey responses.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.data - An object containing survey data categorized by entities.
 * @param {Array} props.entities - An array of entity objects with keys and names.
 * @param {string} props.entityLabel - The label for the entity selector.
 * @param {string} props.entityKey - The default entity key to display data for.
 */
const DataDashboard = ({ data, entities, entityLabel, entityKey }) => {
  // State to hold the currently selected entity
  const [selectedEntity, setSelectedEntity] = useState(entityKey);
  // Data for the currently selected entity
  const entityData = data[selectedEntity];

  /**
   * Handler for changing the selected entity.
   * 
   * @param {Object} event - The event object from the select change.
   */
  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
  };

  return (
    <StyledGridContainer container spacing={3}>
      {/* Entity Selector */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <StyledFormControl>
            <InputLabel>{entityLabel}</InputLabel>
            <Select
              value={selectedEntity}
              onChange={handleEntityChange}
              label={entityLabel}
            >
              {entities.map((entity) => (
                <MenuItem key={entity.key} value={entity.key}>
                  {entity.name}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
      </Grid>

      {/* Total Survey Responses */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Total Survey Responses
            </Typography>
            <Typography variant="h4">{entityData.totalResponses}</Typography>
          </StyledPaper>
        </Box>
      </Grid>

      {/* General Sentiment Pie Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              General Sentiment
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={entityData.sentimentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {entityData.sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Most Mentioned Terms Bar Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Most Mentioned Terms
            </Typography>
            <BarChart width={400} height={300} data={entityData.mentionedTerms}>
              <XAxis 
                dataKey="term" 
                tickFormatter={(value) => value.length > 5 ? `${value.slice(0, 5)}...` : value} 
                angle={-45} 
                textAnchor="end" 
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Language Distribution Bar Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Language Distribution
            </Typography>
            <BarChart width={400} height={300} data={entityData.languageDistribution}>
              <XAxis dataKey="language" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Age Distribution Bar Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Age Distribution
            </Typography>
            <BarChart width={400} height={300} data={entityData.ageDistribution}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </StyledPaper>
        </Box>
      </Grid>
    </StyledGridContainer>
  );
};

export default DataDashboard;