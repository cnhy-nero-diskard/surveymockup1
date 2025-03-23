import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import LocSpecificTopic from '../shared/partials/piecharttopics';

// Color palette for charts
const COLORS = ['red', 'yellow', 'rgb(19, 187, 13)', '#007AFF', '#8884D8'];

// Unique color palette for Responses Proportion chart
const RESPONSE_PROPORTION_COLORS = [
  '#FF5733', // Bright Orange
  '#33FF57', // Bright Green
  '#3357FF', // Bright Blue
  '#FF33A1', // Bright Pink
  '#A133FF', // Bright Purple
  '#33FFF5', // Bright Cyan
  '#FFC300', // Bright Yellow
  '#C70039', // Bright Red
  '#900C3F', // Dark Pink
  '#581845', // Dark Purple
];

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

const StyledBox = styled(Box)`
  background-color: green;
`;

/**
 * Styled Grid container with padding.
 */
const StyledGridContainer = styled(Grid)`
  padding: 24px;
  height: 100vh;
  overflow: visible;
  background-color: rgba(0,0,0,0);

  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

/**
 * Modal style
 */
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

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
  // State to hold the currently selected entity key
  const [selectedEntity, setSelectedEntity] = useState(entityKey);

  // State to control modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate the sum of all responses across all entities
  const totalResponsesAll = entities.reduce((acc, entity) => {
    return acc + (data[entity.key]?.totalResponses || 0);
  }, 0);

  useEffect(() => {
    console.log(`Entities = ${JSON.stringify(entities)}`);
  }, []);

  // Build a single data entry for the stacked bar,
  // where each property is named after an entity's 'name' and stores its % of total
  const stackedData = [
    entities.reduce(
      (acc, entity) => {
        const entityTotal = data[entity.key]?.totalResponses || 0;
        const percentage = totalResponsesAll > 0
          ? (entityTotal / totalResponsesAll) * 100
          : 0;
        acc[entity.name] = Math.round(percentage * 100) / 100; // Round to 2 decimal places
        return acc;
      },
      { name: '' }
    ),
  ];

  // Data for the currently selected entity
  const entityData = data[selectedEntity];

  // Handle modal open
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <StyledGridContainer container spacing={3}>
      {/* Autocomplete "Searchable" Dropdown */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Autocomplete
            sx={{ width: 300 }}
            options={entities}
            getOptionLabel={(option) => option.name}
            value={entities.find((entity) => entity.key === selectedEntity) || null}
            onChange={(event, newValue) => {
              if (newValue) {
                console.log(`Selected Entity: ${JSON.stringify(selectedEntity)}`);
                setSelectedEntity(newValue.key);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={entityLabel}
                variant="outlined"
              />
            )}
          />
        </Box>
      </Grid>

      {/* Total Survey Responses */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <StyledPaper
            elevation={3}
            sx={{
              background:
                'linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97));',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Survey Responses
            </Typography>
            <Typography variant="h4">{entityData.totalResponses}</Typography>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Full Horizontal Stacked Proportion Bar */}
      <Grid item xs={12} lg={12}>
        <Box display="flex" justifyContent="center">
          <StyledPaper
            elevation={3}
            onClick={handleModalOpen} // Open modal on click
            sx={{
              background:
                'linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97));',
              cursor: 'pointer', // Add pointer cursor to indicate clickability
            }}
          >
            <Typography variant="h6" gutterBottom>
              Responses Proportion
            </Typography>
            <BarChart
              layout="vertical"
              width={550}
              height={80}
              data={stackedData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(tick) => `${tick}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={false} // Hide Y-axis labels for simplicity
              />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              {entities.length <= 10 && <Legend />}
              {entities.map((entity, index) => (
                <Bar
                  key={entity.key}
                  dataKey={entity.name}
                  stackId="allEntities"
                  fill={RESPONSE_PROPORTION_COLORS[index % RESPONSE_PROPORTION_COLORS.length]}
                />
              ))}
            </BarChart>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Modal for Detailed Breakdown */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, overflow: 'auto' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detailed Breakdown of Responses
          </Typography>
          <TableContainer style={{
            overflowY: 'auto',  // Adds vertical scrollbar
            maxHeight: '500px' // Limits table height
          }}>
            <Table>
              <TableHead style={{
                position: 'sticky',  // Keeps header fixed while scrolling
                top: 0,
                backgroundColor: 'white' // Optional: header background color
              }}>
                <TableRow>
                  <TableCell>Entity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{
                display: 'block',  // Allows for table body scrolling
                overflowY: 'auto'
              }}>
                {entities.map((entity) => {
                  const entityTotal = data[entity.key]?.totalResponses || 0;
                  const percentage = totalResponsesAll > 0
                    ? ((entityTotal / totalResponsesAll) * 100).toFixed(2)
                    : 0;
                  return (
                    <TableRow key={entity.key}>
                      <TableCell>{entity.name}</TableCell>
                      <TableCell align="right">{entityTotal}</TableCell>
                      <TableCell align="right">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* General Sentiment Pie Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper
            elevation={3}
            sx={{
              background:
                'linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97));',
            }}
          >
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Replace Most Mentioned Terms Bar Chart with PieChartTopics */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper
            elevation={3}
            sx={{
              background:
                'linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97));',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sentiment by Topic
            </Typography>
            <Box width="100%" height={300}> {/* Set a fixed height for the chart container */}
              <LocSpecificTopic short_id={entities.find((entity) => entity.key === selectedEntity)?.short_id} />
            </Box>
          </StyledPaper>
        </Box>
      </Grid>

      {/* Language Distribution Bar Chart */}
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <StyledPaper
            elevation={3}
            sx={{
              background:
                'linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97));',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Language Distribution
            </Typography>
            <BarChart
              width={400}
              height={300}
              data={entityData.languageDistribution}
            >
              <XAxis dataKey="language" />
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