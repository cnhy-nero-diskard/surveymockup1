import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';
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

// Dummy data
const dummyData = {
  unanalyzedEntries: [
    { id: 1, text: "This product is amazing!", language: "en" },
    { id: 2, text: "No me gustó el producto.", language: "es" },
    // Add more entries as needed
  ],
  processedEntries: [
    { id: 1, text: "This product is amazing!", sentiment: "positive", topic: "product quality" },
    { id: 2, text: "No me gustó el producto.", sentiment: "negative", topic: "product quality" },
    // Add more entries as needed
  ],
  apiUsageMetrics: {
    totalCalls: 150,
    callDistribution: { sentiment: 100, topicModeling: 50 },
    usageByLanguage: { en: 100, es: 50 },
    rateLimits: { used: 150, limit: 1000 },
    responseTimes: [200, 150, 300, 250] // in milliseconds
  },
  apiHistory: [
    { id: 1, timestamp: "2023-10-01T12:00:00Z", callsProcessed: 10 },
    { id: 2, timestamp: "2023-10-01T13:00:00Z", callsProcessed: 15 },
    // Add more history entries as needed
  ]
};

const AIToolsDashboard = () => {
  const [unanalyzedEntries, setUnanalyzedEntries] = useState(dummyData.unanalyzedEntries);
  const [processedEntries, setProcessedEntries] = useState(dummyData.processedEntries);
  const [apiUsageMetrics, setApiUsageMetrics] = useState(dummyData.apiUsageMetrics);
  const [apiHistory, setApiHistory] = useState(dummyData.apiHistory);

  const handleManualScan = () => {
    // Placeholder for manual scan logic
    console.log("Manual scan initiated");
  };

  const handleBulkAnalysis = () => {
    // Placeholder for bulk analysis logic
    console.log("Bulk analysis initiated");
  };

  const apiUsageData = {
    labels: ['Sentiment Analysis', 'Topic Modeling'],
    datasets: [
      {
        label: 'API Calls',
        data: [apiUsageMetrics.callDistribution.sentiment, apiUsageMetrics.callDistribution.topicModeling],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>AI Tools Dashboard</Typography>

      <Grid container spacing={3}>
        {/* API Configuration Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">API Configuration</Typography>
            <Button variant="contained" color="primary" onClick={handleManualScan}>
              Manual Scan for Unanalyzed Entries
            </Button>
            <Button variant="contained" color="secondary" onClick={handleBulkAnalysis} style={{ marginLeft: '8px' }}>
              Bulk Analysis
            </Button>
          </Paper>
        </Grid>

        {/* Unanalyzed Entries Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Unanalyzed Entries</Typography>
            {unanalyzedEntries.map(entry => (
              <div key={entry.id}>
                <Typography>{entry.text} ({entry.language})</Typography>
              </div>
            ))}
          </Paper>
        </Grid>

        {/* Analysis Results Section */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Analysis Results</Typography>
            <Typography>Processed Entries: {processedEntries.length}</Typography>
            <Typography>API Call Volume: {apiUsageMetrics.totalCalls}</Typography>
            <Typography>API Rate Limits: {apiUsageMetrics.rateLimits.used} / {apiUsageMetrics.rateLimits.limit}</Typography>
            <Typography>Average Response Time: {apiUsageMetrics.responseTimes.reduce((a, b) => a + b, 0) / apiUsageMetrics.responseTimes.length} ms</Typography>
            <Bar data={apiUsageData} />
          </Paper>
        </Grid>

        {/* API History Section */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">API History</Typography>
            {apiHistory.map(history => (
              <div key={history.id}>
                <Typography>{history.timestamp}: {history.callsProcessed} calls processed</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIToolsDashboard;