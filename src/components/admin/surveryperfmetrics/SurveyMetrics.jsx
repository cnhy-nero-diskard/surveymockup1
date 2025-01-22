import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, useTheme, ThemeProvider, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { sentimentColors } from '../../../config/sentimentConfig';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import { dummyData } from './dummydata';

// Styled components
const StyledCardContent = styled(CardContent)`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 32px; // Rounded corners
  background: linear-gradient(135deg, rgba(68, 180, 255, 0.74), rgba(251, 197, 49, 0.67)); // Gradient background
  &:hover {
    transform: scale(1.05);
  }
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const StyledTypography = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: white; // White text for better contrast
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const StyledIcon = styled.div`
  font-size: 50px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ color }) => color};
`;

const SurveyMetrics = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openDistributionModal, setOpenDistributionModal] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDistributionOpen = () => setOpenDistributionModal(true);
    const handleDistributionClose = () => setOpenDistributionModal(false);

    // Function to get the current time in a readable format
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleString(); // Adjust the format as needed
    };

    // Function to get the current month
    const getCurrentMonth = () => {
        const now = new Date();
        return now.toLocaleString('default', { month: 'long' }).toLowerCase();
    };

    // Function to capitalize the first letter of the month
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Data for charts
    const completionRateData = [
        { name: 'Completed', value: dummyData.surveyCompletionRate },
        { name: 'Not Completed', value: 100 - dummyData.surveyCompletionRate },
    ];

    const satisfactionData = [
        { name: 'Satisfaction Score', value: dummyData.surveySatisfactionScore },
    ];

    const surveyDistributionData = Object.entries(dummyData.surveyDistribution).map(([key, value]) => ({
        name: key,
        value,
    }));

    const surveyResponsesByDeviceData = Object.entries(dummyData.surveyResponsesByDevice).map(([key, value]) => ({
        name: key,
        value,
    }));

    const surveyResponsesByRegionData = Object.entries(dummyData.surveyResponsesByRegion).map(([key, value]) => ({
        name: key,
        value,
    }));

    const surveyResponsesByAgeGroupData = Object.entries(dummyData.surveyResponsesByAgeGroup).map(([key, value]) => ({
        name: key,
        value,
    }));

    const surveyResponsesByMonthData = Object.entries(dummyData.surveyResponsesByMonth).map(([key, value]) => ({
        name: capitalizeFirstLetter(key), // Capitalize month names
        value,
    }));

    const colors = [sentimentColors.positive, sentimentColors.negative]; // Colors for charts

    // Unique colors for survey distribution pie chart
    const distributionColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

    return (
        <StyledThemeProvider theme={theme}>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    Survey Performance Metrics
                </Typography>
                <Grid container spacing={4}>
                    {/* Total Surveys Completed */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={CheckCircleIcon} color={theme.palette.success.main} />
                            <StyledTypography variant="h6">Total Surveys Completed</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.success.main }}>
                                {dummyData.totalSurveysCompleted}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                                As of {getCurrentTime()}
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Completion Rate */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Survey Completion Rate
                            </StyledTypography>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={completionRateData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label
                                    >
                                        {completionRateData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Average Time to Complete */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={AccessTimeIcon} color={theme.palette.warning.main} />
                            <StyledTypography variant="h6">Average Time to Complete</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.warning.main }}>
                                {dummyData.averageTimeToComplete}
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Drop-off Rate */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={CancelIcon} color={theme.palette.error.main} />
                            <StyledTypography variant="h6">Drop-off Rate</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                                {dummyData.dropOffRate}%
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Response Rate */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={InsertChartIcon} color={theme.palette.info.main} />
                            <StyledTypography variant="h6">Response Rate</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.info.main }}>
                                {dummyData.responseRate}%
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Distribution */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent onClick={handleDistributionOpen} style={{ cursor: 'pointer' }}>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Survey Distribution
                            </StyledTypography>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={surveyDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label
                                    >
                                        {surveyDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={distributionColors[index % distributionColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Responses by Device */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Responses by Device
                            </StyledTypography>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={surveyResponsesByDeviceData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Responses by Language */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Responses by Language
                            </StyledTypography>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={surveyResponsesByRegionData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Responses by Age Group */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Responses by Age Group
                            </StyledTypography>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={surveyResponsesByAgeGroupData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Responses by Month */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent onClick={handleOpen} style={{ cursor: 'pointer' }}>
                            <StyledIcon as={InsertChartIcon} color={theme.palette.info.main} />
                            <StyledTypography variant="h6">Responses by Month</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.info.main }}>
                                {capitalizeFirstLetter(getCurrentMonth())}: {dummyData.surveyResponsesByMonth[getCurrentMonth()]}
                            </Typography>
                        </StyledCardContent>
                    </Grid>
                </Grid>

                {/* Popup for Survey Responses by Month */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1000, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', gap: 4 }}>
                        {/* Graph Section */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Survey Responses by Month</Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={surveyResponsesByMonthData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Table Section */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Monthly Responses</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Month</TableCell>
                                            <TableCell align="right">Responses</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {surveyResponsesByMonthData.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Modal>

                {/* Popup for Survey Distribution */}
                <Modal open={openDistributionModal} onClose={handleDistributionClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1000, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', gap: 4 }}>
                        {/* Graph Section */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Survey Distribution</Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={surveyDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label
                                    >
                                        {surveyDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={distributionColors[index % distributionColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Table Section */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Survey Distribution Data</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Entrypoint</TableCell>
                                            <TableCell align="right">Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {surveyDistributionData.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </StyledThemeProvider>
    );
};

export default SurveyMetrics;