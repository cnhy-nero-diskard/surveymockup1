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
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import domtoimage from 'dom-to-image'; 
import { Refresh, Download, ArrowDropDown } from '@mui/icons-material';

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

/**
 * Component to handle the display and generation of QR codes for different touchpoints.
 */
const SurveyTouchpoints = () => {
  // State variables to manage the selected type, item, QR code value, establishments, loading state, and error messages
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Effect hook to fetch establishments when the selected type is 'establishments'
   */
  useEffect(() => {
    if (selectedType === 'establishments') {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_HOST}/api/admin/establishments`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          const establishmentsData = data.map((item) => ({
            key: item.id,
            value: item.est_name,
          }));
          setEstablishments(establishmentsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching establishments:', error);
          setError('Failed to fetch data. Please try again later.');
          setLoading(false);
        });
    }
  }, [selectedType]);

  /**
   * Handler for changing the selected type
   * @param {Object} event - The event object containing the selected value
   */
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedItem('');
    setQrValue('');
  };

  /**
   * Handler for changing the selected item
   * @param {Object} event - The event object containing the selected value
   */
  const handleItemChange = (event) => {
    const selectedKey = event.target.value;
    console.log(`ESTS --> ${JSON.stringify(establishments)}`);
    const selectedEstablishment = establishments.find((est) => est.key === selectedKey);
    setSelectedItem(selectedKey);
    setQrValue(`${process.env.REACT_APP_SELF_URL}/feedback?idx=${selectedEstablishment.value}`);
  };

  /**
   * Function to generate QR code SVG
   * @param {string} value - The value to encode in the QR code
   * @returns {JSX.Element} - The QR code SVG element
   */
  const generateQRCode = (value) => {
    return <QRCodeSVG value={value} size={256} includeMargin={true} level="H" />;
  };

  /**
   * Handler for downloading the QR code as a PNG image
   */
  const handleDownloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg'); // Get the SVG element by ID
    if (!svg) {
      console.error('SVG element not found');
      return;
    }
    domtoimage.toPng(svg) // Convert SVG to PNG
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${selectedItem}_QRCode.png`;
        link.href = dataUrl;
        link.click(); // Trigger download
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  /**
   * Handler for closing the error Snackbar
   */
  const handleCloseError = () => {
    setError('');
  };

  /**
   * Handler for retrying the data fetch operation
   */
  const handleRetry = () => {
    setError('');
    setSelectedType('');
    setSelectedItem('');
    setQrValue('');
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
                    <MenuItem value="establishments">Establishments</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="transportationPoints">Transportation Points</MenuItem>
                    <MenuItem value="barangays">Barangays</MenuItem>
                  </StyledSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <StyledSelect
                      value={selectedItem}
                      onChange={handleItemChange}
                      disabled={!selectedType}
                      displayEmpty
                      aria-label="Select Item"
                      IconComponent={ArrowDropDown}
                    >
                      <MenuItem value="" disabled>
                        {`Select ${selectedType}`}
                      </MenuItem>
                      {selectedType === 'establishments' &&
                        establishments.map((item, index) => (
                          <MenuItem key={index} value={item.key}>
                            {item.value}
                          </MenuItem>
                        ))}
                    </StyledSelect>
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