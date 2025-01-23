import React from 'react';
import DataDashboard from '../xdatadashboard/DataDashboard';
const barangaysData = {
  barangay1: {
    name: 'Barangay 1',
    totalResponses: 1000,
    sentimentData: [
      { name: 'Positive', value: 700 },
      { name: 'Negative', value: 300 },
    ],
    mentionedTerms: [
      { term: 'Service', count: 300 },
      { term: 'Quality', count: 250 },
      { term: 'Price', count: 200 },
      { term: 'Speed', count: 150 },
      { term: 'Cleanliness', count: 100 },
    ],
    languageDistribution: [
      { language: 'English', count: 800 },
      { language: 'Spanish', count: 150 },
      { language: 'French', count: 50 },
    ],
    ageDistribution: [
      { age: '18-24', count: 250 },
      { age: '25-34', count: 300 },
      { age: '35-44', count: 200 },
      { age: '45-54', count: 150 },
      { age: '55+', count: 100 },
    ],
  },
  barangay2: {
    name: 'Barangay 2',
    totalResponses: 800,
    sentimentData: [
      { name: 'Positive', value: 500 },
      { name: 'Negative', value: 300 },
    ],
    mentionedTerms: [
      { term: 'Service', count: 200 },
      { term: 'Quality', count: 150 },
      { term: 'Price', count: 100 },
      { term: 'Speed', count: 50 },
      { term: 'Cleanliness', count: 50 },
    ],
    languageDistribution: [
      { language: 'English', count: 600 },
      { language: 'Spanish', count: 100 },
      { language: 'French', count: 50 },
    ],
    ageDistribution: [
      { age: '18-24', count: 200 },
      { age: '25-34', count: 250 },
      { age: '35-44', count: 150 },
      { age: '45-54', count: 100 },
      { age: '55+', count: 100 },
    ],
  },
  // Add more barangays as needed
};

const barangays = [
  { key: 'barangay1', name: 'Barangay 1' },
  { key: 'barangay2', name: 'Barangay 2' },
  // Add more barangays as needed
];

const BarangaysDashboard = () => {
  return (
    <DataDashboard
      data={barangaysData}
      entities={barangays}
      entityLabel="Select Barangay"
      entityKey="barangay1"
    />
  );
};

export default BarangaysDashboard;