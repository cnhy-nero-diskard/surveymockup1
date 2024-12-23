import React from 'react';
import styled from 'styled-components';

// Styled-component for the background
const BackgroundWrapper = styled.div`
  position: relative; /* Needed for overlay positioning */
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #fff;
  border: none;
  min-width: 500px;
  border-radius: 25px;
  background: linear-gradient(135deg, #95b1ed, #3abde9); /* Gradient background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  overflow: hidden; /* Ensures no overflow issues */
`;

// Styled-component for optional image overlay
const OverlayImage = styled.img`
  position: absolute; /* Overlay on top of the background */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Makes the image cover the div */
  opacity: ${({ opacity }) => opacity}; /* Dynamic opacity */
  mix-blend-mode: ${({ blendMode }) => blendMode}; /* Dynamic blend mode */
  pointer-events: none; /* Allows clicks to pass through */
`;

// GradientBackground Component
const GradientBackground = ({ children, overlayImage, opacity = 0.3, blendMode = 'overlay' }) => {
  return (
    <BackgroundWrapper>
      {overlayImage && (
        <OverlayImage
          src={overlayImage}
          alt="Overlay"
          opacity={opacity}
          blendMode={blendMode}
        />
      )}
      {children}
    </BackgroundWrapper>
  );
};

export default GradientBackground;