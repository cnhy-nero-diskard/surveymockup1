import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
  Slide,
  Grow,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data (same as before)
const dummyData = {
  apiUsageMetrics: {
    totalCalls: 150,
    callDistribution: { sentiment: 100, topicModeling: 50 },
    usageByLanguage: { en: 100, es: 50 },
    rateLimits: { used: 150, limit: 1000 },
    responseTimes: [200, 150, 300, 250], // in milliseconds
  },
  apiHistory: [
    { id: 1, timestamp: "2023-10-01T12:00:00Z", callsProcessed: 10, metrics: { sentiment: 8, topicModeling: 2 } },
    { id: 2, timestamp: "2023-10-01T13:00:00Z", callsProcessed: 15, metrics: { sentiment: 10, topicModeling: 5 } },
  ],
  models: {
    sentiment: [
      { name: "distilbert-base-multilingual-cased-sentiments-student", link: "https://huggingface.co/distilbert-base-multilingual-cased-sentiments-student" },
      { name: "Sentiment Model 2", link: "https://huggingface.co/sentiment-model-2" },
    ],
    topicModeling: [
      { name: "M3L-Contrast (Multilingual and Multimodal Topic Model)", link: "https://huggingface.co/m3l-contrast" },
      { name: "Topic Model 2", link: "https://huggingface.co/topic-model-2" },
    ],
  },
};

const AIToolsDashboard = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [apiToken, setApiToken] = useState("hf_xxxxxxxxxxxxxxxxxx");
  const [isEditingToken, setIsEditingToken] = useState(false);
  const [selectedSentimentModel, setSelectedSentimentModel] = useState(
    dummyData.models.sentiment[0].link
  );
  const [selectedTopicModel, setSelectedTopicModel] = useState(
    dummyData.models.topicModeling[0].link
  );
  const [openMetricsDialog, setOpenMetricsDialog] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate component loading delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Adjust the delay as needed
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate an API call with a delay
    setTimeout(() => {
      const detectedEntries = Math.floor(Math.random() * 100) + 1; // Random number of entries
      setScanResult(detectedEntries);
      setIsScanning(false);
    }, 2000); // 2-second delay to simulate scanning
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate an API call with a delay
    setTimeout(() => {
      setShowAnalysisResults(true);
      setIsAnalyzing(false);
    }, 3000); // 3-second delay to simulate analysis
  };

  const handleEditToken = () => {
    setIsEditingToken(true);
  };

  const handleSaveToken = () => {
    setIsEditingToken(false);
    // Simulate saving the token to the database
    console.log("Token saved:", apiToken);
  };

  const handleReloadToken = () => {
    // Simulate retrieving the token from the database
    setApiToken("hf_xxxxxxxxxxxxxxxxxx");
    console.log("Token reloaded");
  };

  const handleOpenMetricsDialog = (metrics) => {
    setSelectedMetrics(metrics);
    setOpenMetricsDialog(true);
  };

  const handleCloseMetricsDialog = () => {
    setOpenMetricsDialog(false);
  };

  const apiUsageData = {
    labels: ['Sentiment Analysis', 'Topic Modeling'],
    datasets: [
      {
        label: 'API Calls',
        data: [dummyData.apiUsageMetrics.callDistribution.sentiment, dummyData.apiUsageMetrics.callDistribution.topicModeling],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in={isLoaded} timeout={1000}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          AI Tools Dashboard
        </Typography>
      </Fade>

      <Grid container spacing={3}>
        {/* API Configuration Section */}
        <Grid item xs={12} md={6}>
          <Slide in={isLoaded} direction="up" timeout={1000}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                API Configuration
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                  API Token Manager
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="API Token"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    disabled={!isEditingToken}
                    sx={{ mb: 2 }}
                  />
                  {isEditingToken ? (
                    <Button variant="contained" color="primary" onClick={handleSaveToken} sx={{ textTransform: 'none' }}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" onClick={handleEditToken} sx={{ textTransform: 'none' }}>
                      Edit
                    </Button>
                  )}
                  <Button variant="outlined" color="secondary" onClick={handleReloadToken} sx={{ textTransform: 'none' }}>
                    Reload
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                  Model Selection
                </Typography>
                <Select
                  fullWidth
                  value={selectedSentimentModel}
                  onChange={(e) => setSelectedSentimentModel(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {dummyData.models.sentiment.map((model, index) => (
                    <MenuItem key={index} value={model.link}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  fullWidth
                  value={selectedTopicModel}
                  onChange={(e) => setSelectedTopicModel(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {dummyData.models.topicModeling.map((model, index) => (
                    <MenuItem key={index} value={model.link}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Paper>
          </Slide>
        </Grid>

        {/* Unanalyzed Entries Section */}
        <Grid item xs={12} md={6}>
          <Slide in={isLoaded} direction="up" timeout={1200}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                Unanalyzed Entries
              </Typography>
              {scanResult === null ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Scan for new survey responses not analyzed yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleScan}
                    disabled={isScanning}
                    sx={{ textTransform: 'none' }}
                  >
                    {isScanning ? <CircularProgress size={24} /> : 'Scan'}
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    {scanResult} entries were detected.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartAnalysis}
                    disabled={!scanResult || isAnalyzing}
                    sx={{ textTransform: 'none' }}
                  >
                    {isAnalyzing ? <CircularProgress size={24} /> : 'START AI ANALYSIS'}
                  </Button>
                </Box>
              )}
            </Paper>
          </Slide>
        </Grid>

        {/* Analysis Results Section */}
        {showAnalysisResults && (
          <Grid item xs={12}>
            <Grow in={showAnalysisResults} timeout={1500}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                  Analysis Results
                </Typography>
                {isAnalyzing ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        API Call Volume: {dummyData.apiUsageMetrics.totalCalls}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        API Rate Limits: {dummyData.apiUsageMetrics.rateLimits.used} / {dummyData.apiUsageMetrics.rateLimits.limit}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Average Response Time: {dummyData.apiUsageMetrics.responseTimes.reduce((a, b) => a + b, 0) / dummyData.apiUsageMetrics.responseTimes.length} ms
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Bar data={apiUsageData} />
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grow>
          </Grid>
        )}

        {/* API History Section */}
        <Grid item xs={12}>
          <Slide in={isLoaded} direction="up" timeout={1400}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                API History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Calls Processed</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.apiHistory.map((history) => (
                      <TableRow key={history.id}>
                        <TableCell>{new Date(history.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{history.callsProcessed}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenMetricsDialog(history.metrics)}
                          >
                            View Metrics
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Metrics Dialog */}
      <Dialog open={openMetricsDialog} onClose={handleCloseMetricsDialog}>
        <DialogTitle>API Call Metrics</DialogTitle>
        <DialogContent>
          {selectedMetrics && (
            <Box>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Sentiment Analysis: {selectedMetrics.sentiment}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Topic Modeling: {selectedMetrics.topicModeling}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                API Call Volume: {dummyData.apiUsageMetrics.totalCalls}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                API Rate Limits: {dummyData.apiUsageMetrics.rateLimits.used} / {dummyData.apiUsageMetrics.rateLimits.limit}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Average Response Time: {dummyData.apiUsageMetrics.responseTimes.reduce((a, b) => a + b, 0) / dummyData.apiUsageMetrics.responseTimes.length} ms
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMetricsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AIToolsDashboard;