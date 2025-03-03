import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Select, MenuItem, Box, Link, CircularProgress, Snackbar, Button } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import { saveSvgAsPng } from 'save-svg-as-png';

// Styled Components
const StyledContainer = styled(Container)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 89, 255, 0.1);
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
  margin-bottom: 1.5rem;
  color: #3f51b5;
  font-weight: bold;
  text-align: center;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const QRCodeContainer = styled(Box)`
  display: inline-block;
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #1a237e;
  }
`;

const DownloadButton = styled(Button)`
  margin-top: 1rem;
  background-color: #3f51b5;
  color: #ffffff;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1a237e;
  }
`;

const SurveyTouchpoints = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedType === 'establishments') {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_HOST}/api/admin/establishments`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          setEstablishments(data.map((item) => item.est_name));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching establishments:', error);
          setError('Failed to fetch data. Please try again later.');
          setLoading(false);
        });
    }
  }, [selectedType]);

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
    return <QRCodeSVG value={value} size={256} includeMargin={true} level="H" />;
  };

  const handleDownloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    saveSvgAsPng(svg, `${selectedItem}_QRCode.png`, { scale: 2 });
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <StyledContainer maxWidth="lg">
      {/* Permanent QR Code */}
      <Container>
        <Grid container spacing={4} justifyContent="start">
          <Grid item xs={12} md={6}>
            <QRCodeContainer>
              <Title variant="h5" gutterBottom>
                TOURISM PRODUCT MARKET SURVEY
              </Title>
              {generateQRCode(`${process.env.REACT_APP_API_HOST}/tpms/`)}
              <Typography variant="body1" sx={{ mt: 2 }}>
                <StyledLink href={`${process.env.REACT_APP_SELF_URL}/survey/`} target="_blank" rel="noopener">
                  {`${process.env.REACT_APP_SELF_URL}/survey/`}
                </StyledLink>
              </Typography>
            </QRCodeContainer>
          </Grid>
        </Grid>
      </Container>

      {/* Dynamic QR Code Generator */}
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
                  aria-label="Select Type"
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
                  disabled={!selectedType || loading}
                  displayEmpty
                  aria-label="Select Item"
                >
                  <MenuItem value="" disabled>
                    {loading ? 'Loading...' : `Select ${selectedType}`}
                  </MenuItem>
                  {selectedType === 'establishments' &&
                    establishments.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </StyledSelect>
              </Grid>
            </Grid>
            {qrValue && (
              <>
                <Box id="qr-code-svg" sx={{ mt: 3 }}>
                  {generateQRCode(qrValue)}
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <StyledLink href={qrValue} target="_blank" rel="noopener">
                    {qrValue}
                  </StyledLink>
                </Typography>
                <DownloadButton onClick={handleDownloadQRCode}>
                  Download QR Code
                </DownloadButton>
              </>
            )}
          </QRCodeContainer>
        </Grid>
      </Grid>

      {/* Error Handling */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
    </StyledContainer>
  );
};

export default SurveyTouchpoints;
