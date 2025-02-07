import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import bg from './page1bg.jpg';
import logo from './logo.svg';
import BodyPartial from '../../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import { NextButtonU } from '../../../components/utils/styles1';
import useTranslations from '../../../components/utils/useTranslations';
import axios from 'axios';
import { useEffect } from 'react';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
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
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  animation: ${slideIn} 1s ease-in-out;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NextButton = styled.input`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Page1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('residence1', language);
  const navigate = useNavigate();
  const currentStepIndex = useCurrentStepIndex();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        console.log("GET SURVEYPROGRESS")
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, {withCredentials: true});
        setCurrentStep(response.data.currentStep);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, [navigate]);


  const handleNextClick = () => {
    
    goToNextStep(currentStepIndex, navigate);
  };

  return (
    <>
      <BodyPartial />
      <Wave />
      <Content>
        <Logo src={logo} alt="Department of Tourism Philippines logo" />
        <Title>TOURISM PRODUCT MARKET SURVEY</Title>
        <NextButtonU onClick={handleNextClick}>
          {translations.next}</NextButtonU>
      </Content>
    </>
  );
};

export default Page1;