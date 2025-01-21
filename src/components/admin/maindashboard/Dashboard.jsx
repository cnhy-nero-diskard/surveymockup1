import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';
import OverallMun from '../nlp/OverallMun';
import OverallBarangay from '../nlp/OverallBarangay';
import OverallSurveyTopic from '../nlp/OverallSurveyTopic';
import OverallEstablishment from '../nlp/OverallEstablishment'; // Assuming you have this component
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';

// Global styles to disable scrolling
const GlobalStyle = createGlobalStyle`
  body, html {
    overflow: hidden;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

// Styled components
const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  background-color: transparent;
  min-height: 100vh;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const CardContainer = styled(Box)`
  background: linear-gradient(
    135deg,
    rgba(13, 239, 255, 0.6),
    rgba(162, 190, 228, 0.29)
  );
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 47vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; // Prevent content from overflowing
`;

const ContentBox = styled(Box)`
  flex-grow: 1;
  overflow: hidden; // Ensure content doesn't overflow
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  useEffect(() => {
    // Ensure the global styles are applied when the component mounts
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainContent>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardContainer>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: fontFamily,
                  fontSize: fontSize+5,
                  fontWeight: fontWeight,
                }}
              >
                Overall Municipality
              </Typography>
              <ContentBox>
                <OverallMun /> {/* Insert the OverallMun component */}
              </ContentBox>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardContainer>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: fontFamily,
                  fontSize: fontSize+5,
                  fontWeight: fontWeight,
                }}
              >
                Barangay Data
              </Typography>
              <ContentBox>
                <OverallBarangay /> {/* Insert the OverallBarangay component */}
              </ContentBox>
            </CardContainer>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardContainer>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: fontFamily,
                  fontSize: fontSize+5,
                  fontWeight: fontWeight,
                }}
              >
                Overall Topic
              </Typography>
              <ContentBox>
                <OverallSurveyTopic /> {/* Insert the OverallSurveyTopic component */}
              </ContentBox>
            </CardContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardContainer>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: fontFamily,
                  fontSize: fontSize+5,
                  fontWeight: fontWeight,
                }}
              >
                Overall Establishment
              </Typography>
              <ContentBox>
                <OverallEstablishment /> {/* Insert the OverallEstablishment component */}
              </ContentBox>
            </CardContainer>
          </Grid>
        </Grid>
      </MainContent>
    </>
  );
};

export default Dashboard;