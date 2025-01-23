import React, { useState } from 'react';
import { Container, Typography, Grid, Select, MenuItem, Box, Link } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';

// Dummy data structure
const dummyData = {
  establishments: ['Establishment 1', 'Establishment 2', 'Establishment 3'],
  attractions: ['Attraction 1', 'Attraction 2', 'Attraction 3'],
  transportationPoints: ['Transport Point 1', 'Transport Point 2', 'Transport Point 3'],
  barangays: ['Barangay 1', 'Barangay 2', 'Barangay 3'],
};

// Styled Components
const StyledContainer = styled(Container)`
    height: 100%;
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0, 89, 255, 0.31);
    padding: 2rem;

    & > .MuiGrid-container {
        width: 100%;
    }

    & > .MuiGrid-container > .MuiGrid-item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Title = styled(Typography)`
  margin-bottom: 1rem;
  color: #3f51b5;
  font-weight: bold;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QRCodeContainer = styled(Box)`
        display: inline-block;
    height: 100%;
    text-align: center;
    padding: 1.5rem;
    background-color:rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

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

  const generateQRCode = (value) => {
    return <QRCodeSVG value={value} size={256} />;
  };

  return (
    <StyledContainer maxWidth="lg">
      {/* Grid for Permanent QR Code */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <QRCodeContainer>
            <Title variant="h5" gutterBottom>
              TOURISM PRODUCT MARKET SURVEY
            </Title>
            {generateQRCode(`${process.env.REACT_APP_API_HOST}/tpms/`)}
            <Typography variant="body1" sx={{ mt: 2 }}>
              <StyledLink href={`${process.env.REACT_APP_API_HOST}/tpms/`} target="_blank" rel="noopener">
                {`${process.env.REACT_APP_API_HOST}/tpms/`}
              </StyledLink>
            </Typography>
          </QRCodeContainer>
        </Grid>
      </Grid>

      {/* Grid for Dynamic QR Code Generator */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <QRCodeContainer>
            <Title variant="h6" gutterBottom>
              Generate QR Code for Touchpoints
            </Title>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledSelect
                  value={selectedType}
                  onChange={handleTypeChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="establishments">Establishments</MenuItem>
                  <MenuItem value="attractions">Attractions</MenuItem>
                  <MenuItem value="transportationPoints">Transportation Points</MenuItem>
                  <MenuItem value="barangays">Barangays</MenuItem>
                </StyledSelect>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledSelect
                  value={selectedItem}
                  onChange={handleItemChange}
                  disabled={!selectedType}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select {selectedType}
                  </MenuItem>
                  {selectedType &&
                    dummyData[selectedType].map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </StyledSelect>
              </Grid>
            </Grid>
            {qrValue && (
              <>
                {generateQRCode(qrValue)}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <StyledLink href={qrValue} target="_blank" rel="noopener">
                    {qrValue}
                  </StyledLink>
                </Typography>
              </>
            )}
          </QRCodeContainer>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SurveyTouchpoints;