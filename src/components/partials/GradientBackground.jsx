import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useCurrentStepIndex } from '../utils/useCurrentIndex';
import { UnifiedContext } from '../../routes/UnifiedContext';
import { AnimatedContainer, NextButtonU } from '../utils/styles1';
import useTranslations from '../utils/useTranslations';
import { useLocation } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

// --- Spinner Animation ---
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// --- Styled Spinner ---
const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: ${spinAnimation} 1s linear infinite;
`;

// --- Overlay Container ---
const OverlayContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); // semi-transparent dark overlay
  z-index: 9999;
`;

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
  height: 25px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  overflow: hidden;
`;

const getColor = (progress) => {
  const r = Math.min(255, Math.floor(255 * (1 - progress / 100)));
  const g = Math.min(255, Math.floor(255 * (progress / 100)));
  return `rgba(${r}, ${g}, 0, 0.8)`;
};

const colorChangeAnimation = keyframes`
  0% {
    background-color: rgba(149, 177, 237, 0.8); // Light blue
  }
  33% {
    background-color: rgba(0, 153, 255, 0.8); // Cyan
  }
  66% {
    background-color: rgba(102, 51, 153, 0.8); // Purple
  }
  100% {
    background-color: rgba(149, 177, 237, 0.8); // Light blue
  }
`;

// Keyframes for pulsating animation
const pulseAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.02);
  }
  100% {
    transform: scaleX(1);
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(
    to right,
    ${({ progress }) => getColor(progress)},
    ${({ progress }) => getColor(progress)}
  );
  border-radius: 1px;
  width: ${({ progress }) => progress}%;
  transition: width 0.5s ease-out, background 0.5s ease-out;
  animation: ${pulseAnimation} 3s infinite ease-in-out,
             ${colorChangeAnimation} 5s infinite ease-in-out;
  will-change: transform, width, background-color;
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

/**
 * @typedef {object} GradientBackgroundProps
 * @property {React.ReactNode} children - The content to be rendered within the gradient background.
 * @property {string} [overlayImage] - URL of the overlay image.
 * @property {number} [opacity=0.3] - Opacity of the overlay image.
 * @property {string} [blendMode='overlay'] - Blend mode for the overlay image.
 * @property {function} handleNextClick - Function to handle the next button click.
 * @property {string} [nextmsg=""] - Text to display on the next button. If empty, a default translation is used.
 * @property {boolean} [buttonAppear=true] - Determines whether the next button is visible.
 * @property {boolean} [isLoading=false] - Determines whether to show an overlay spinner.
 */

/**
 * A component that provides a gradient background with an optional overlay image,
 * progress bar, and a next button. It also allows for an overlay spinner when loading.
 *
 * @param {GradientBackgroundProps} props - The props for the GradientBackground component.
 * @returns {JSX.Element} A React element representing the gradient background.
 */

const GradientBackground = ({
  children,
  overlayImage,
  opacity = 0.3,
  blendMode = 'overlay',
  handleNextClick,
  nextmsg = "",
  buttonAppear = true,
  isLoading = false // New prop to display overlay spinner
}) => {
  const { routes } = useContext(UnifiedContext);
  const [setCurrentStep] = useState();
  const location = useLocation();
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, isBlockActive, removeActiveBlocks } = useContext(UnifiedContext);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PackagePaid', language || 'en');

  const progress = (((currentStepIndex) / routes.length) * 100) + 6;
  const getParentPath = (path) => {
    const segments = path.split("/");
    return segments.slice(0, -1).join("/");
  };

  // Use useEffect to trigger animation updates
  useEffect(() => {
    if (isBlockActive("feedback") && (getParentPath(location.pathname) === "/survey") || location.pathname === "/survey") {
      console.log("GBACK feedback detected...removing surveytpms");
      removeActiveBlocks("feedback");
    } else if (isBlockActive("surveytpms") && (getParentPath(location.pathname) === "/feedback") || location.pathname === "/feedback") {
      removeActiveBlocks("surveytpms");
    }
    console.log(`GBACK -- ACTIVE BLOCKS -- ${JSON.stringify(activeBlocks)}`);
  }, []);

  const useNext = () => {
    if (location.pathname === "/survey" && !activeBlocks.includes("surveytpms")) {
      removeActiveBlocks(["feedback"]);
    } else if (location.pathname === "/feedback" && !activeBlocks.includes("feedback")) {
      removeActiveBlocks(["surveytpms"]);
    }
    handleNextClick();
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 180, friction: 14 },
  });

  return (
    <>
      <ProgressText />
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <AnimatedContainer style={containerAnimation}>
        <BackgroundWrapper>
          {true && (
            <OverlayImage
              src={overlayImage}
              alt="Overlay"
              opacity={opacity}
              blendMode={blendMode}
            />
          )}
          {children}

          {/* Overlay Spinner Section */}
          {isLoading && (
            <OverlayContainer>
              <Spinner />
            </OverlayContainer>
          )}
        </BackgroundWrapper>
      </AnimatedContainer>

      {buttonAppear && (
        <NextButtonU
          onClick={useNext}
          style={{ display: buttonAppear ? 'block' : 'none' }}
          disabled={isLoading} // optionally disable the button if loading
        >
          {nextmsg === "" ? translations.packagePaidNextButton : nextmsg}
        </NextButtonU>
      )}
    </>
  );
};

export default GradientBackground;
