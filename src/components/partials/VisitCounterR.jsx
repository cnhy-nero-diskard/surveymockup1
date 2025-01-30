import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container } from '../utils/styles1';
import imgOverlay from "../../components/img/city.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../utils/useTranslations';
import { VISITFREQUENCYFORM } from '../utils/componentConstants';
import { submitSurveyResponses } from '../utils/sendInputUtils';
import { NextButtonU,fontColorU } from '../utils/styles1';

// Styled Components
const AnimatedContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-color: ${fontColorU};
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
`;

const ChoiceButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  background: ${({ selected }) => (selected ? '#6200e' : '#f1f1f1')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
        box-shadow: 0 0 2px 2px rgba(52, 3, 167, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background:rgb(96, 133, 255);
    color: white;
    transform: translateY(-2px);
  }
`;

 
const VisitCounterR = ({ title, surveyquestion_ref }) => {
  const [visitCount, setVisitCount] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const handleChoice = (value) => {
    const numericalValue = value === "1x" ? 1 : value === "2x" ? 2 : 3;
    setVisitCount(numericalValue);
  };

  const navigate = useNavigate();

  const handleNextClick = async () => {
    console.log(`Selected visit count (numerical): ${visitCount}`);

    const surveyResponses = [
      {
        surveyquestion_ref: surveyquestion_ref,
        response_value: visitCount.toString(),
      },
    ];

    try {
      await submitSurveyResponses(surveyResponses);
      console.log('Survey responses submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    }
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    transform: visitCount ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  const translations = useTranslations(VISITFREQUENCYFORM, language);

  return (
    <>
      <BodyPartial />
      <GradientBackground imgOverlay={imgOverlay}>
        <Container>
          <AnimatedContainer style={containerAnimation}>
            <Title>{title}</Title>
            <ButtonGroup>
              <ChoiceButton
                selected={visitCount === 1}
                onClick={() => handleChoice("1x")}
              >
                {translations.VisitFrequencyForm_Option1x || "1x"}
              </ChoiceButton>
              <ChoiceButton
                selected={visitCount === 2}
                onClick={() => handleChoice("2x")}
              >
                {translations.VisitFrequencyForm_Option2x || "2x"}
              </ChoiceButton>
              <ChoiceButton
                selected={visitCount === 3}
                onClick={() => handleChoice("3x or more")}
              >
                {translations.VisitFrequencyForm_Option3xOrMore || "3x or more"}
              </ChoiceButton>
            </ButtonGroup>
            <NextButtonU style={buttonAnimation} onClick={handleNextClick}>
              {translations.VisitFrequencyForm_NextButton || "NEXT"}
            </NextButtonU>
          </AnimatedContainer>
        </Container>
      </GradientBackground>
    </>
  );
};

export default VisitCounterR;