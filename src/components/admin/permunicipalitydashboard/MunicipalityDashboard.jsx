import React from 'react';
import DataDashboard from '../xdatadashboard/DataDashboard';

const establishmentsData = {
  establishment1: {
    name: 'PANGLAO',
    totalResponses: 1200,
    sentimentData: [
      { name: 'Positive', value: 800 },
      { name: 'Negative', value: 400 },
    ],
    mentionedTerms: [
      { term: 'Service', count: 350 },
      { term: 'Quality', count: 300 },
      { term: 'Price', count: 250 },
      { term: 'Speed', count: 200 },
      { term: 'Cleanliness', count: 150 },
    ],
    languageDistribution: [
      { language: 'English', count: 900 },
      { language: 'Spanish', count: 200 },
      { language: 'French', count: 100 },
    ],
    ageDistribution: [
      { age: '18-24', count: 300 },
      { age: '25-34', count: 400 },
      { age: '35-44', count: 250 },
      { age: '45-54', count: 150 },
      { age: '55+', count: 100 },
    ],
  },
  establishment2: {
    name: 'Establishment B',
    totalResponses: 900,
    sentimentData: [
      { name: 'Positive', value: 600 },
      { name: 'Negative', value: 300 },
    ],
    mentionedTerms: [
      { term: 'Service', count: 200 },
      { term: 'Quality', count: 250 },
      { term: 'Price', count: 300 },
      { term: 'Speed', count: 150 },
      { term: 'Cleanliness', count: 100 },
    ],
    languageDistribution: [
      { language: 'English', count: 700 },
      { language: 'Spanish', count: 150 },
      { language: 'French', count: 50 },
    ],
    ageDistribution: [
      { age: '18-24', count: 200 },
      { age: '25-34', count: 300 },
      { age: '35-44', count: 200 },
      { age: '45-54', count: 100 },
      { age: '55+', count: 100 },
    ],
  },
  establishment3: {
    name: 'Establishment C',
    totalResponses: 1500,
    sentimentData: [
      { name: 'Positive', value: 1000 },
      { name: 'Negative', value: 500 },
    ],
    mentionedTerms: [
      { term: 'Service', count: 400 },
      { term: 'Quality', count: 350 },
      { term: 'Price', count: 300 },
      { term: 'Speed', count: 250 },
      { term: 'Cleanliness', count: 200 },
    ],
    languageDistribution: [
      { language: 'English', count: 1100 },
      { language: 'Spanish', count: 300 },
      { language: 'French', count: 100 },
    ],
    ageDistribution: [
      { age: '18-24', count: 400 },
      { age: '25-34', count: 500 },
      { age: '35-44', count: 300 },
      { age: '45-54', count: 200 },
      { age: '55+', count: 100 },
    ],
  },
};

const establishments = [
  { key: 'establishment1', name: 'PANGLAO' },
];

const MunicipalityDashboard = () => {
  return (
    <DataDashboard
      data={establishmentsData}
      entities={establishments}
      entityLabel="Select Municipality"
      entityKey="establishment1"
    />
  );
};

export default MunicipalityDashboard;