import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchMetrics } from './metricsServices';
import { parseMetrics } from './parseMetrics';
import Plot from 'react-plotly.js';

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: rgba(29, 7, 7, 0.4);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
`;

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  grid-column: 1 / -1;
  text-align: center;
`;

const Metrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadMetrics = async () => {
      const metricsText = await fetchMetrics();
      if (metricsText) {
        const parsedMetrics = parseMetrics(metricsText);
        setMetrics(parsedMetrics);

        // Update chart data
        const newChartData = { ...chartData };
        const timestamp = new Date().toLocaleTimeString();

        parsedMetrics.forEach((metric) => {
          if (!newChartData[metric.name]) {
            newChartData[metric.name] = {
              x: [],
              y: [],
            };
          }
          newChartData[metric.name].x.push(timestamp);
          newChartData[metric.name].y.push(metric.value);
        });

        setChartData(newChartData);
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Define the important metrics to display
  const importantMetrics = [
    'cpu_usage',
    'memory_usage',
    'request_latency',
    'disk_usage',
    'network_throughput',
    'error_rate',
  ];

  // Filter and prepare data for Plotly charts
  const plotlyTraces = importantMetrics
    .filter((metricName) => chartData[metricName]) // Ensure the metric exists in chartData
    .map((metricName) => ({
      x: chartData[metricName].x, // Timestamps
      y: chartData[metricName].y, // Values
      type: 'scatter',
      mode: 'lines+markers',
      name: metricName,
      line: { shape: 'spline' }, // Smooth lines
    }));

  return (
    <Container>
      <Title>Metrics Dashboard</Title>
      {importantMetrics.map((metricName, index) => (
        <ChartContainer key={index}>
          <h3>{metricName}</h3>
          <Plot
            data={[
              {
                x: chartData[metricName]?.x || [], // Timestamps
                y: chartData[metricName]?.y || [], // Values
                type: 'scatter',
                mode: 'lines+markers',
                name: metricName,
                line: { shape: 'spline' }, // Smooth lines
              },
            ]}
            layout={{
              title: metricName,
              xaxis: { title: 'Time' },
              yaxis: { title: 'Value' },
              showlegend: true,
              autosize: true,
              margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 },
            }}
            config={{ responsive: true }}
            style={{ width: '100%', height: '300px' }}
          />
        </ChartContainer>
      ))}
    </Container>
  );
};

export default Metrics;