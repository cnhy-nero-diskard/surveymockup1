// AiToolsDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Slide, // Added Slide import
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AIToolsDashboard = () => {
  const isActive = true; // Replace with your actual logic to determine if active
const createdAt = new Date(); // Replace with your actual "Created At" value
const isRecentlyCreated = (new Date() - new Date(createdAt)) < 5 * 60 * 1000; // Less than 5 minutes ago
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [selectedSentimentModel, setSelectedSentimentModel] = useState("");
  const [selectedTopicModel, setSelectedTopicModel] = useState("");
  const [openMetricsDialog, setOpenMetricsDialog] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [hfTokens, setHfTokens] = useState([]);
  const [selectedHFToken, setSelectedHFToken] = useState("");
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [topicModelingResult, setTopicModelingResult] = useState(null);
  const [apiToken, setApiToken] = useState(""); // Added apiToken state
  const [analysisResults, setAnalysisResults] = useState(null);

  useEffect(() => {
    const fetchHFTokens = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/hf-tokens`, { withCredentials: true });
        setHfTokens(response.data);
      } catch (error) {
        console.error('Error fetching HF tokens:', error);
      }
    };
    fetchHFTokens();
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const detectedEntries = Math.floor(Math.random() * 100) + 1;
      setScanResult(detectedEntries);
      setIsScanning(false);
    }, 2000);
  };

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    console.log('Starting analysis...');
    try {
      const selectedToken = hfTokens.find((token) => token.id === selectedHFToken);
      if (!selectedToken) {
        throw new Error('No token selected');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/analyzesentiment`,
        {
          text: 'I did love you, but no more', // Replace with actual text to analyze
          tokenLabel: selectedToken.label,
        }, { withCredentials: true }
      );

      // Handle the response from Hugging Face
      if (response.data && Array.isArray(response.data)) {
        const sentimentResults = response.data[0]; // Extract the sentiment results
        console.log('Sentiment Analysis Results:', sentimentResults);
        setShowAnalysisResults(true);
        setAnalysisResults(sentimentResults); // Store the results in state
      } else {
        console.error('Unexpected response format:', response.data);
      }

      setIsAnalyzing(false);
    } catch (error) {
      console.error('Error during analysis:', error);
      setIsAnalyzing(false);
    }
  };

  const handleStartTopicModeling = async () => {
    setIsAnalyzing(true);
    console.log('Starting topic modeling...');
    try {
      const selectedToken = hfTokens.find((token) => token.id === selectedHFToken);
      if (!selectedToken) {
        throw new Error('No token selected');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/analyzetopics`,
        {
          text: 'Sample text for topic modeling',
          tokenLabel: selectedToken.label,
        },
      );

      setTopicModelingResult(response.data);
      setIsAnalyzing(false);
      console.log('Topic modeling result:', response.data);
    } catch (error) {
      console.error('Error during topic modeling:', error);
      setIsAnalyzing(false);
    }
  };


  const handleReloadToken = () => {
    setApiToken("hf_xxxxxxxxxxxxxxxxxx"); // Example implementation
  };

  const handleOpenMetricsDialog = (metrics) => {
    setSelectedMetrics(metrics);
    setOpenMetricsDialog(true);
  };

  const handleCloseMetricsDialog = () => {
    setOpenMetricsDialog(false);
  };

  const handlePreview = () => {
    setOpenPreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  const apiUsageData = {
    labels: ['Sentiment Analysis', 'Topic Modeling'],
    datasets: [
      {
        label: 'API Calls',
        data: [100, 50],
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
                  <Select
                    fullWidth
                    value={selectedHFToken}
                    onChange={(e) => setSelectedHFToken(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    {hfTokens.map((token) => (
                      <MenuItem key={token.id} value={token.id}>
                        {token.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
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
                    onClick={handlePreview}
                    sx={{ textTransform: 'none', mr: 2 }}
                  >
                    PREVIEW
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartAnalysis}
                    disabled={!scanResult || isAnalyzing}
                    sx={{ textTransform: 'none' }}
                  >
                    {isAnalyzing ? <CircularProgress size={24} /> : 'START AI ANALYSIS'}
                  </Button>

                  {/* Example Output Display */}
                  {analysisResults && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Sentiment Analysis Results:
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {analysisResults.map((result, index) => (
                          <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
                            {result.label}: {result.score.toFixed(4)}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </Slide>
        </Grid>

        {/* Topic Modeling Section */}
        <Grid item xs={12} md={6}>
          <Slide in={isLoaded} direction="up" timeout={1400}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                Topic Modeling
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  Analyze topics from the detected entries.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartTopicModeling}
                  disabled={!scanResult || isAnalyzing}
                  sx={{ textTransform: 'none' }}
                >
                  {isAnalyzing ? <CircularProgress size={24} /> : 'START TOPIC MODELING'}
                </Button>
              </Box>
              {topicModelingResult && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Topic Modeling Results:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {JSON.stringify(topicModelingResult, null, 2)}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* // Preview Dialog */}
      <Dialog open={openPreviewDialog} onClose={handleClosePreviewDialog}>
        <DialogTitle>Preview Data</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Here is a preview of the dummy data:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Detected Entries</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Selected Model</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>API Token</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{scanResult}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedSentimentModel}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedHFToken}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'green' : 'red',
                      }}
                    ></div>
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                      backgroundColor: isRecentlyCreated ? 'rgba(82, 82, 214, 0.73)' : 'transparent',
                    }}
                  >
                    {createdAt}
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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