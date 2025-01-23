import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Select, MenuItem, Box } from '@mui/material';
import QRCode from 'qrcode.react';

// Dummy data structure
const dummyData = {
  establishments: ['Establishment 1', 'Establishment 2', 'Establishment 3'],
  attractions: ['Attraction 1', 'Attraction 2', 'Attraction 3'],
  transportationPoints: ['Transport Point 1', 'Transport Point 2', 'Transport Point 3'],
  barangays: ['Barangay 1', 'Barangay 2', 'Barangay 3']
};

const SurveyTouchpoints = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [qrValue, setQrValue] = useState('');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedItem('');
    setQrValue('');
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
    setQrValue(`${process.env.REACT_APP_API_HOST}/${selectedType}/${event.target.value}`);
  };

  const generateQRCode = () => {
    return <QRCode value={qrValue} size={256} />;
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        TOURISM PRODUCT MARKET SURVEY
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>Select Type</MenuItem>
            <MenuItem value="establishments">Establishments</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
            <MenuItem value="transportationPoints">Transportation Points</MenuItem>
            <MenuItem value="barangays">Barangays</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            value={selectedItem}
            onChange={handleItemChange}
            disabled={!selectedType}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>Select {selectedType}</MenuItem>
            {selectedType && dummyData[selectedType].map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        {qrValue && generateQRCode()}
      </Box>
    </Container>
  );
};

export default SurveyTouchpoints;