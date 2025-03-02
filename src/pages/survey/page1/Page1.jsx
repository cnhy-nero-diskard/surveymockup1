import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import bg from './page1bg.jpg';
import logo from './logo.svg';
import BodyPartial from '../../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import { NextButtonU } from '../../../components/utils/styles1';
import useTranslations from '../../../components/utils/useTranslations';
import axios from 'axios';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { UnifiedContext } from '../../../routes/UnifiedContext';

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
`;

// Styled components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Wave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  animation: ${zoomIn} 2s ease-in-out, ${fadeIn} 1.5s ease-in-out;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  animation: ${slideIn} 0.8s ease-in-out 0.2s forwards;
  opacity: 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.8s ease-in-out 0.4s forwards;
  opacity: 0;
`;

const NextButton = styled.input`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  opacity: 0;
  animation: ${slideIn} 0.8s ease-in-out 0.6s forwards;

  &:hover {
    transform: scale(1.1);
  }
`;

const Page1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('residence1', language);
  const navigate = useNavigate();
  const { routes } = useContext(UnifiedContext);
  const [currentStep, setCurrentStep] = useState();
  const currentStepIndex = useCurrentStepIndex({ routes });
  const { activeBlocks, setActiveBlocks } = useContext(UnifiedContext);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        console.log("GET SURVEYPROGRESS");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        setCurrentStep(response.data.currentStep);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, [navigate]);

  const handleNextClick = () => {
    console.log("Current Step Index:", currentStepIndex);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  return (
    <>
      <BodyPartial />
      <Wave />
      <Content>
        <Logo src={logo} alt="Department of Tourism Philippines logo" />
        <Title>TOURISM PRODUCT MARKET SURVEY</Title>
        <NextButtonU onClick={handleNextClick}>
          {translations.next}
        </NextButtonU>
      </Content>
    </>
  );
};

export default Page1;
