import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    CardContent,
    Grid,
    useTheme,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
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
    ResponsiveContainer
} from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { sentimentColors } from '../../../config/sentimentConfig';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import * as XLSX from 'xlsx';

// Styled components
const StyledCardContent = styled(CardContent)`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 32px; // Rounded corners
  background: linear-gradient(135deg, rgba(214, 214, 214, 0.74), rgba(242, 250, 255, 0.97)); // Gradient background
  &:hover {
    transform: scale(1.05);
  }
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const StyledTypography = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: black;
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

    // State to hold survey metrics fetched from server
    const [surveyMetrics, setSurveyMetrics] = useState(null);

    // State control for modals
    const [open, setOpen] = useState(false);
    const [openDistributionModal, setOpenDistributionModal] = useState(false);

    // Fetch data from server
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_HOST}/api/admin/getsurveymetrics`, { withCredentials: true })
            .then((response) => {
                setSurveyMetrics(response.data.data);
                console.log(`METRICS -- > ${JSON.stringify(response.data.data)}`);
            })
            .catch((error) => {
                console.error('Error fetching Survey Metrics:', error);
            });
    }, []);

    // Open & close modals
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDistributionOpen = () => setOpenDistributionModal(true);
    const handleDistributionClose = () => setOpenDistributionModal(false);

    // Function to get current time in a readable format
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleString();
    };

    // Function to get the current month
    const getCurrentMonth = () => {
        const now = new Date();
        return now.toLocaleString('default', { month: 'long' }).toLowerCase();
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Guard condition if data isn't loaded yet
    if (!surveyMetrics) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6">Loading Survey Metrics...</Typography>
            </Box>
        );
    }

    // Prepare data from the API response (assuming similar structure as dummyData)
    const completionRateData = [
        { name: 'Completed', value: surveyMetrics.surveyCompletionRate },
        { name: 'Not Completed', value: surveyMetrics.dropOffRate }
    ];

    const satisfactionData = [
        { name: 'Satisfaction Score', value: surveyMetrics.surveySatisfactionScore }
    ];

    const surveyDistributionData = Object.entries(surveyMetrics.surveyDistribution).map(([key, value]) => ({
        name: key,
        value
    }));

    const surveyResponsesByRegionData = Object.entries(surveyMetrics.surveyResponsesByRegion).map(([key, value]) => ({
        name: key,
        value
    }));

    const surveyResponsesByAgeGroupData = Object.entries(surveyMetrics.surveyResponsesByAgeGroup).map(([key, value]) => ({
        name: key,
        value
    }));

    const surveyResponsesByMonthData = Object.entries(surveyMetrics.surveyResponsesByMonth).map(([key, value]) => ({
        name: capitalizeFirstLetter(key),
        value
    }));

    const colors = [sentimentColors.positive, sentimentColors.negative];
    const distributionColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

    // Function to export fetched data to Excel
    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        // Convert all key-value pairs to an array for the "Metadata" sheet
        const metadata = Object.entries(surveyMetrics).map(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value)) {
                return [key, JSON.stringify(value)];
            }
            return [key, value];
        });
        metadata.unshift(['Key', 'Value']); // Add header row

        // Create metadata sheet
        const metadataSheet = XLSX.utils.aoa_to_sheet(metadata);
        metadataSheet['!cols'] = [{ width: 30 }, { width: 50 }];
        metadataSheet['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: 'D3D3D3' } } };
        metadataSheet['B1'].s = { font: { bold: true }, fill: { fgColor: { rgb: 'D3D3D3' } } };
        XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');

        // Helper function to create a styled sheet
        const createStyledSheet = (data, sheetName, headers) => {
            const sheet = XLSX.utils.json_to_sheet(data, { header: headers });
            sheet['!cols'] = headers.map(() => ({ width: 20 }));
            // Style headers
            headers.forEach((header, index) => {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
                sheet[cellAddress].s = {
                    font: { bold: true },
                    fill: { fgColor: { rgb: 'E0E0E0' } }
                };
            });
            return sheet;
        };

        // Create sheets for each data set
        const distributionSheet = createStyledSheet(surveyDistributionData, 'Survey Distribution', [
            'Entrypoint',
            'Responses'
        ]);
        XLSX.utils.book_append_sheet(workbook, distributionSheet, 'Survey Distribution');

        const regionSheet = createStyledSheet(surveyResponsesByRegionData, 'Responses by Region', [
            'Region',
            'Responses'
        ]);
        XLSX.utils.book_append_sheet(workbook, regionSheet, 'Responses by Region');

        const ageGroupSheet = createStyledSheet(surveyResponsesByAgeGroupData, 'Responses by Age Group', [
            'Age Group',
            'Responses'
        ]);
        XLSX.utils.book_append_sheet(workbook, ageGroupSheet, 'Responses by Age Group');

        const monthSheet = createStyledSheet(surveyResponsesByMonthData, 'Responses by Month', [
            'Month',
            'Responses'
        ]);
        XLSX.utils.book_append_sheet(workbook, monthSheet, 'Responses by Month');

        // Save the workbook
        XLSX.writeFile(workbook, 'SurveyMetrics.xlsx');
    };

    return (
        <StyledThemeProvider theme={theme}>
            <Box sx={{ padding: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                >
                    Survey Performance Metrics
                </Typography>

                <Button variant="contained" color="primary" onClick={exportToExcel} sx={{ mb: 4 }}>
                    Export to Excel
                </Button>

                <Grid container spacing={4}>
                    {/* Total Surveys Completed */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={CheckCircleIcon} color={theme.palette.success.main} />
                            <StyledTypography variant="h6">Total Surveys Completed</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.success.main }}>
                                {surveyMetrics.totalSurveysCompleted}
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
                                        label={({
                                            cx,
                                            cy,
                                            midAngle,
                                            innerRadius,
                                            outerRadius,
                                            percent,
                                            index,
                                        }) => {
                                            const RADIAN = Math.PI / 180;
                                            const radius = innerRadius + (outerRadius - innerRadius) * 1.5; // Move labels further out
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                            return (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    fill={colors[index % colors.length]}
                                                    textAnchor={x > cx ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                >
                                                    {`${(percent * 100).toFixed(0)}%`}
                                                </text>
                                            );
                                        }}
                                    >
                                        {completionRateData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index % colors.length]}
                                            />
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
                                {surveyMetrics.averageTimeToComplete}
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Drop-off Rate */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledIcon as={CancelIcon} color={theme.palette.error.main} />
                            <StyledTypography variant="h6">Drop-off Rate</StyledTypography>
                            <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                                {surveyMetrics.dropOffRate}%
                            </Typography>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Distribution */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent
                            onClick={handleDistributionOpen}
                            style={{ cursor: 'pointer' }}
                        >
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
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={distributionColors[index % distributionColors.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </StyledCardContent>
                    </Grid>

                    {/* Survey Responses by Nationality */}
                    <Grid item xs={12} md={6} lg={3}>
                        <StyledCardContent>
                            <StyledTypography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                                Responses by Nationality
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
                                {capitalizeFirstLetter(getCurrentMonth())}: {
                                    surveyMetrics.surveyResponsesByMonth[getCurrentMonth()]
                                }
                            </Typography>
                        </StyledCardContent>
                    </Grid>
                </Grid>

                {/* Popup for Survey Responses by Month */}
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 1000,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            gap: 4
                        }}
                    >
                        {/* Bar Chart */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Survey Responses by Month
                            </Typography>
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

                        {/* Table */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Monthly Responses
                            </Typography>
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
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 1000,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            gap: 4
                        }}
                    >
                        {/* Pie Chart */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Survey Distribution
                            </Typography>
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
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={distributionColors[index % distributionColors.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* Table */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Survey Distribution Data
                            </Typography>
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
