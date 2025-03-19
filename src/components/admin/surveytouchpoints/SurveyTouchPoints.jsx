import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  Link,
  CircularProgress,
  Snackbar,
  Button,
  Skeleton,
  Alert,
  IconButton,
  TextField,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { Refresh, Download, ArrowDropDown } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';

const StyledContainer = styled(Container)`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Title = styled(Typography)`
  margin-bottom: 1rem;
  color: #3f51b5;
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
`;

const Subtitle = styled(Typography)`
  margin-bottom: 2rem;
  color: #666;
  text-align: center;
  font-size: 1rem;
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
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  width: 80vw;
  max-width: 800px;
  box-sizing: border-box;
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
  background: linear-gradient(45deg, #3f51b5, #1a237e);
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #1a237e, #3f51b5);
  }
`;

const SurveyTouchpoints = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [touchpointData, setTouchpointData] = useState({
    muncity: [],
    barangay: [],
    transportation: [],
    attractions: [],
    establishments: [],
    point:[],
    island:[],
    activities:[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_HOST}/api/surveytouchpoints`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`DATA RECEIVED: ${JSON.stringify(data)}`);
        setTouchpointData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching touchpoints:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedItem('');
    setQrValue('');
  };

  const handleItemChange = (event, value) => {
    const selectedKey = value ? value.short_id : '';
    const category = selectedType.toLowerCase();
    const selectedTouchpoint = touchpointData[category].find(
      (item) => item.short_id === selectedKey
    );
    setSelectedItem(selectedKey);
    setQrValue(`${process.env.REACT_APP_SELF_URL}/feedback?idx=${selectedKey}`);
  };

  const generateQRCode = (value) => {
    return <QRCodeSVG value={value} size={256} includeMargin={true} level="H" />;
  };

  const handleDownloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) {
      console.error('SVG element not found');
      return;
    }
    domtoimage.toPng(svg)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${selectedItem}_QRCode.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleRetry = () => {
    setError('');
    setSelectedType('');
    setSelectedItem('');
    setQrValue('');
  };

  const getTouchpointItems = () => {
    if (!selectedType) return [];
    const category = selectedType.toLowerCase();
    return touchpointData[category] || [];
  };

  return (
    <>
      <StyledContainer maxWidth="lg">
        {/* Permanent QR Code Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <QRCodeContainer>
              <Title variant="h5" gutterBottom>
                TOURISM PRODUCT MARKET SURVEY
              </Title>
              <Subtitle variant="body1">
                Scan the QR code below to access the survey.
              </Subtitle>
              {generateQRCode(`${process.env.REACT_APP_SELF_URL}/tpms/`)}
              <Typography variant="body1" sx={{ mt: 2 }}>
                <StyledLink
                  href={`${process.env.REACT_APP_SELF_URL}/survey/`}
                  target="_blank"
                  rel="noopener"
                >
                  {`${process.env.REACT_APP_SELF_URL}/survey/`}
                </StyledLink>
              </Typography>
            </QRCodeContainer>
          </Grid>
        </Grid>

        {/* Dynamic QR Code Generator Section */}
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <QRCodeContainer>
              <Title variant="h6" gutterBottom>
                Generate QR Code for Touchpoints
              </Title>
              <Subtitle variant="body1">
                Select a type and item to generate a QR code.
              </Subtitle>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <StyledSelect
                    value={selectedType}
                    onChange={handleTypeChange}
                    displayEmpty
                    aria-label="Select Type"
                    IconComponent={ArrowDropDown}
                  >
                    <MenuItem value="" disabled>
                      Select Type
                    </MenuItem>
                    <MenuItem value="muncity">Municipality/City</MenuItem>
                    <MenuItem value="barangay">Barangay</MenuItem>
                    <MenuItem value="transportation">Transportation</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="Activities">Activities</MenuItem>
                    <MenuItem value="Establishments">Establishments</MenuItem>
                    <MenuItem value="point">Points</MenuItem>
                    <MenuItem value="island">Island</MenuItem>
                  </StyledSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <Autocomplete
                      options={getTouchpointItems()}
                      getOptionLabel={(option) => option.name}
                      onChange={handleItemChange}
                      disabled={!selectedType}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Select ${selectedType}`}
                          variant="outlined"
                        />
                      )}
                    />
                  )}
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
                  <DownloadButton
                    onClick={handleDownloadQRCode}
                    startIcon={<Download />}
                  >
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
        >
          <Alert
            severity="error"
            action={
              <IconButton size="small" color="inherit" onClick={handleRetry}>
                <Refresh fontSize="small" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Snackbar>
      </StyledContainer>
    </>
  );
};

export default SurveyTouchpoints;