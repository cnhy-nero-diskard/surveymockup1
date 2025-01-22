// src/styles/styledComponents.js
import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight } from '../../../config/fontConfig';
import { Box, Typography } from '@mui/material';

export const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  height: 100%;
  width: 100
  display: flex;
  flex-direction: column;
`;

export const ChartContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  align-items: center;

`;