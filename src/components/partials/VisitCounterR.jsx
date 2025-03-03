import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container } from '../utils/styles1';
import imgOverlay from "../../components/img/city.png";
import useTranslations from '../utils/useTranslations';
import { VISITFREQUENCYFORM } from '../utils/componentConstants';
import { submitSurveyResponses } from '../utils/sendInputUtils';
import { NextButtonU, fontColorU } from '../utils/styles1';

// Styled Components
const AnimatedContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${fontColorU};
  margin-bottom: 30px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ChoiceButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  background: ${({ selected }) => (selected ? '#6200ee' : '#f1f1f1')};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: ${({ selected }) =>
    selected ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ selected }) => (selected ? '#6200ee' : '#6200ee')};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const VisitCounterR = ({ title, surveyquestion_ref, handNext }) => {
  const [visitCount, setVisitCount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const handleChoice = (value) => {
    const numericalValue = value === "1x" ? 1 : value === "2x" ? 2 : 3;
    setVisitCount(numericalValue);
  };

  const handleNextClick = async () => {
    if (visitCount === null) {
      alert('Please select an option before proceeding.');
      return;
    }

    const surveyResponses = [
      {
        surveyquestion_ref: surveyquestion_ref,
        response_value: visitCount.toString(),
      },
    ];

    setIsSubmitting(true);
    try {
      await submitSurveyResponses(surveyResponses);
      console.log('Survey responses submitted successfully!');
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    } finally {
      setIsSubmitting(false);
    }
    handNext();
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 600, tension: 300, friction: 20 },
  });

  const buttonAnimation = useSpring({
    transform: visitCount ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 400, friction: 15 },
  });

  const translations = useTranslations(VISITFREQUENCYFORM, language);

  return (
    <>
      <BodyPartial />
      <GradientBackground imgOverlay={imgOverlay} handleNextClick={handleNextClick} buttonAppear={visitCount !== null}>
          <AnimatedContainer style={containerAnimation}>
            <Title>{title}</Title>
            <ButtonGroup>
              <ChoiceButton
                selected={visitCount === 1}
                onClick={() => handleChoice("1x")}
                aria-label="Once"
              >
                {translations.VisitFrequencyForm_Option1x || "1x"}
              </ChoiceButton>
              <ChoiceButton
                selected={visitCount === 2}
                onClick={() => handleChoice("2x")}
                aria-label="Twice"
              >
                {translations.VisitFrequencyForm_Option2x || "2x"}
              </ChoiceButton>
              <ChoiceButton
                selected={visitCount === 3}
                onClick={() => handleChoice("3x or more")}
                aria-label="Three times or more"
              >
                {translations.VisitFrequencyForm_Option3xOrMore || "3x or more"}
              </ChoiceButton>
            </ButtonGroup>

          </AnimatedContainer>
      </GradientBackground>
    </>
  );
};

export default VisitCounterR;
