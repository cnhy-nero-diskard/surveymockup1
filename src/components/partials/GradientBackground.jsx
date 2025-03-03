import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useCurrentStepIndex } from '../utils/useCurrentIndex';
import { UnifiedContext } from '../../routes/UnifiedContext';
import { NextButtonU } from '../utils/styles1';
import useTranslations from '../utils/useTranslations';

// Styled-component for the background
const BackgroundWrapper = styled.div`
  position: relative;
  font-size: 1rem;
  color: white;
  border: none;
  padding: 5px;
  min-width: 30vw;
  max-width: 100vw;
  border-radius: 25px;
  background: linear-gradient(135deg, #95b1ed, #3abde9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  align-items: center;
  justify-content: center;
  max-height: 70vh;
  overflow-y: auto;
`;

// Styled-component for optional image overlay
const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ opacity }) => opacity};
  mix-blend-mode: ${({ blendMode }) => blendMode};
  pointer-events: none;
`;

// Styled-component for the progress bar container
const ProgressBarContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  overflow: hidden;
`;

const getColor = (progress) => {
  const r = Math.min(255, Math.floor(255 * (1 - progress / 100)));
  const g = Math.min(255, Math.floor(255 * (progress / 100)));
  return `rgba(${r}, ${g}, 0, 0.8)`;
};

// Update the ProgressBar styled-component
const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(
    to right,
    ${({ progress }) => getColor(progress)},
    ${({ progress }) => getColor(progress)}
  );
  border-radius: 5px;
  width: ${({ progress }) => progress}%;
  transition: width 0.5s ease-out, background 0.5s ease-out;
`;
// Styled-component for the progress text
const ProgressText = styled.p`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
`;

// GradientBackground Component
const GradientBackground = ({ children, overlayImage, opacity = 0.3, blendMode = 'overlay', handleNextClick, nextmsg = "", buttonAppear = true }) => {
  const { routes } = useContext(UnifiedContext);
  const [setCurrentStep] = useState();
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('residence1', language || 'en')

  const progress = ((currentStepIndex + 1) / routes.length) * 100;

  return (
    <>
      <ProgressText>
      </ProgressText>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
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
      {buttonAppear && (
        <NextButtonU
          onClick={handleNextClick}
          style={{ display: buttonAppear ? 'block' : 'none' }}
        >
          {nextmsg === "" ? translations.next : nextmsg}
        </NextButtonU>)}
    </>
  );
};

export default GradientBackground;