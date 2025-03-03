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
  Slide,
  Snackbar,
  Alert,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  colors,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AIToolsDashboard = () => {
  const isActive = true; // Replace with your actual logic to determine if active
  const createdAt = new Date(); // Replace with your actual "Created At" value
  const isRecentlyCreated = (new Date() - new Date(createdAt)) < 5 * 60 * 1000; // Less than 5 minutes ago

  // State for API Configuration
  const [hfTokens, setHfTokens] = useState([]);
  const [selectedHFToken, setSelectedHFToken] = useState("");

  // State for Sentiment Analysis
  const [sentimentText, setSentimentText] = useState("");
  const [isSentimentAnalyzing, setIsSentimentAnalyzing] = useState(false);
  const [sentimentResults, setSentimentResults] = useState(null);
  const [sentimentError, setSentimentError] = useState(null);

  // State for Topic Modeling
  const [topicText, setTopicText] = useState("");
  const [isTopicModeling, setIsTopicModeling] = useState(false);
  const [topicModelingResult, setTopicModelingResult] = useState(null);
  const [topicModelingError, setTopicModelingError] = useState(null);

  // State for Dialogs
  const [openMetricsDialog, setOpenMetricsDialog] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(null);

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // State for API Usage Data
  const [apiUsageData, setApiUsageData] = useState({
    labels: ['Sentiment Analysis', 'Topic Modeling'],
    datasets: [
      {
        label: 'API Calls',
        data: [0, 0], // Initialize with 0
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  });

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

  useEffect(() => {
    const fetchApiUsage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/usage`, { withCredentials: true });
        setApiUsageData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [response.data.sentiment, response.data.topicModeling],
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching API usage:', error);
      }
    };
    fetchApiUsage();
  }, []);

  const handleSentimentAnalysis = async () => {
    setIsSentimentAnalyzing(true);
    setSentimentError(null);
    setSnackbarMessage("Just a heads-up, the first response might take a little longer, around 20-30 seconds. This is only if it's the first time you're using it in about 15 minutes, as the AI endpoint needs to initialize");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    function keyExists(obj, key) {
      return obj.hasOwnProperty(key);
    }

    try {
      const selectedToken = hfTokens.find((token) => token.id === selectedHFToken);
      if (!selectedToken) {
        throw new Error('No token selected');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/analyzesentiment`,
        {
          text: sentimentText,
          tokenLabel: selectedToken.label,
        }, { withCredentials: true }
      );

      if (response.data && Array.isArray(response.data)) {
        setSentimentResults(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        console.log(response.data);
        if (response.data.hasOwnProperty("error")) {
          setSnackbarMessage("THE AI ENDPOINT IS CURRENTLY UNAVAILABLE. PLEASE TRY AGAIN LATER");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
        setSentimentResults(null);
      }

      setIsSentimentAnalyzing(false);
    } catch (error) {
      console.error('Error during sentiment analysis:', error);
      setSentimentError(error.message);


      setIsSentimentAnalyzing(false);
    }
  };
  const handleStoreSentimentResults = async () => {
    if (!sentimentResults) return;

    try {
      // Placeholder for API call to store sentiment results
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_HOST}/api/store-sentiment-results`,
      //   {
      //     results: sentimentResults,
      //   },
      //   { withCredentials: true }
      // );

      // if (response.data.success) {
      //   setSnackbarMessage("Sentiment analysis results stored successfully!");
      //   setSnackbarSeverity("success");
      //   setSnackbarOpen(true);
      // } else {
      //   setSnackbarMessage("Failed to store sentiment analysis results.");
      //   setSnackbarSeverity("error");
      //   setSnackbarOpen(true);
      // }

      // Temporary success message for placeholder
      setSnackbarMessage("Sentiment analysis results stored successfully! (Placeholder)");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error storing sentiment analysis results:', error);
      setSnackbarMessage("Error storing sentiment analysis results.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleTopicModeling = async () => {
    setIsTopicModeling(true);
    setTopicModelingError(null);
    setSnackbarMessage("Just a heads-up, the first response might take a little longer, around 20-30 seconds. This is only if it's the first time you're using it in about 15 minutes, as the AI endpoint needs to initialize");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    try {
      const selectedToken = hfTokens.find((token) => token.id === selectedHFToken);
      if (!selectedToken) {
        throw new Error('No token selected');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/analyzetopics`,
        {
          text: topicText,
          tokenLabel: selectedToken.label,
        }, { withCredentials: true }
      );

      setTopicModelingResult(response.data);

      if (response.data.hasOwnProperty("error")) {
        setSnackbarMessage("THE AI ENDPOINT IS CURRENTLY UNAVAILABLE. PLEASE TRY AGAIN LATER");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
      setIsTopicModeling(false);
    } catch (error) {
      console.error('Error during topic modeling (analyzetopics):', error);
      setTopicModelingError(error.message);
      setIsTopicModeling(false);
    }
  };

  const handleStoreTopicModelingResult = async () => {
    if (!topicModelingResult) return;

    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_HOST}/api/store-topic-modeling`,
      //   {
      //     result: topicModelingResult,
      //   },
      //   { withCredentials: true }
      // );

      // if (response.data.success) {
      //   setSnackbarMessage("Topic modeling results stored successfully!");
      //   setSnackbarSeverity("success");
      //   setSnackbarOpen(true);
      // } else {
      //   setSnackbarMessage("Failed to store topic modeling results.");
      //   setSnackbarSeverity("error");
      //   setSnackbarOpen(true);
      // }
      setSnackbarMessage("Topic Modeling Analysis results stored successfully! (Placeholder)");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Error storing topic modeling results:', error);
      setSnackbarMessage("Error storing topic modeling results.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


  const handleOpenMetricsDialog = (metrics) => {
    setSelectedMetrics(metrics);
    setOpenMetricsDialog(true);
  };

  const handleCloseMetricsDialog = () => {
    setOpenMetricsDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <Fade in timeout={1000}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          AI Tools Dashboard
        </Typography>
      </Fade>

      <Grid container spacing={3}>
        {/* API Configuration Section - Full Width */}
        <Grid item xs={12}>
          <Slide in direction="up" timeout={1000}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
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
                    aria-label="Select API Token"
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

        {/* Sentiment Analysis Section */}
        <Grid item xs={12} md={6}>
          <Slide in direction="up" timeout={1200}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                Sentiment Analysis
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  Enter text for sentiment analysis.
                </Typography>
                <TextField
                  value={sentimentText}
                  onChange={(e) => setSentimentText(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSentimentAnalysis}
                  disabled={isSentimentAnalyzing || !sentimentText || !selectedHFToken}
                  sx={{ textTransform: 'none' }}
                >
                  {isSentimentAnalyzing ? <CircularProgress size={24} /> : 'ANALYZE SENTIMENT'}
                </Button>
                {isSentimentAnalyzing && <CircularProgress sx={{ ml: 2 }} />}
              </Box>
              {sentimentResults && (
                <Box sx={{ mt: 2, maxHeight: '400px', overflowY: 'auto', pr: 2 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 2 }}>
                    Sentiment Analysis Results:
                  </Typography>

                  {/* Enhanced Results Display */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sentimentResults.map((result, index) => (
                      <Paper key={index} elevation={2} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
                            {result.text}
                          </Typography>
                          <Chip
                            label={result.sentiment.toUpperCase()}
                            color={
                              result.sentiment === 'positive' ? 'success' :
                                result.sentiment === 'negative' ? 'error' : 'warning'
                            }
                            size="small"
                          />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Confidence: <strong>{(result.confidence).toFixed(2)}%</strong>
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>

                  {/* Sentiment Count and Average Section */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 1 }}>
                      Sentiment Summary:
                    </Typography>
                    {(() => {
                      // Calculate sentiment counts
                      const sentimentCounts = sentimentResults.reduce(
                        (acc, result) => {
                          acc[result.sentiment] = (acc[result.sentiment] || 0) + 1;
                          return acc;
                        },
                        { positive: 0, neutral: 0, negative: 0 }
                      );

                      // Calculate average sentiment
                      const total = sentimentResults.length;
                      const positiveRatio = sentimentCounts.positive / total;
                      const negativeRatio = sentimentCounts.negative / total;
                      const neutralRatio = sentimentCounts.neutral / total;

                      let averageSentiment = "neutral";
                      if (positiveRatio > negativeRatio && positiveRatio > neutralRatio) {
                        averageSentiment = "positive";
                      } else if (negativeRatio > positiveRatio && negativeRatio > neutralRatio) {
                        averageSentiment = "negative";
                      }

                      return (
                        <>
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Chip
                              label={`POSITIVE (${sentimentCounts.positive})`}
                              color="success"
                              variant="outlined"
                            />
                            <Chip
                              label={`NEGATIVE (${sentimentCounts.negative})`}
                              color="error"
                              variant="outlined"
                            />
                            <Chip
                              label={`NEUTRAL (${sentimentCounts.neutral})`}
                              color="warning"
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Average Sentiment: <strong>{averageSentiment.toUpperCase()}</strong>
                          </Typography>
                        </>
                      );
                    })()}
                  </Box>

                  {/* Store Results to Database Button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStoreSentimentResults}
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Store Results to Database
                  </Button>
                </Box>
              )}
              {sentimentError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {sentimentError}
                </Alert>
              )}
            </Paper>
          </Slide>
        </Grid>

        {/* Topic Modeling Section */}
        <Grid item xs={12} md={6}>
          <Slide in direction="up" timeout={1400}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                Topic Modeling
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  Enter text for topic modeling.
                </Typography>
                <TextField
                  value={topicText}
                  onChange={(e) => setTopicText(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTopicModeling}
                  disabled={isTopicModeling || !topicText || !selectedHFToken}
                  sx={{ textTransform: 'none' }}
                >
                  {isTopicModeling ? <CircularProgress size={24} /> : 'ANALYZE TOPICS'}
                </Button>
                {isTopicModeling && <CircularProgress sx={{ ml: 2 }} />}
              </Box>
              {topicModelingResult && (
                <Box sx={{ mt: 2, maxHeight: '400px', overflowY: 'auto', pr: 2 }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Topic Modeling Results:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {topicModelingResult.map((topic, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '1.2rem' }}>
                          Topic {index + 1}: {topic.customLabel}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Probability: {(topic.probability * 100).toFixed(2)}%
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Top Words:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {topic.top_words.map((word, wordIndex) => (
                              <Chip key={wordIndex} label={word} variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Contributions:
                          </Typography>
                          <List>
                            {topic.contribution.map((contrib, contribIndex) => (
                              <ListItem key={contribIndex}>
                                <ListItemText
                                  primary={`${contrib[1]}: ${contrib[2]}`}
                                  secondary={`Topic ${contrib[0]}`}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStoreTopicModelingResult}
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Store Results to Database
                  </Button>
                </Box>
              )}
              {topicModelingError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {topicModelingError}
                </Alert>
              )}
            </Paper>
          </Slide>
        </Grid>
      </Grid>

      {/* Metrics Dialog */}
      <Dialog open={openMetricsDialog} onClose={handleCloseMetricsDialog}>
        <DialogTitle>API Call Metrics</DialogTitle>
        <DialogContent>
          {selectedMetrics && (
            <Bar
              data={{
                labels: ['Sentiment Analysis', 'Topic Modeling'],
                datasets: [
                  {
                    label: 'API Calls',
                    data: [selectedMetrics.sentiment, selectedMetrics.topicModeling],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMetricsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AIToolsDashboard;