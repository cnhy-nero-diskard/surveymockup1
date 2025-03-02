import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { Container, NextButtonU } from '../../../components/utils/styles1';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 60vh;
//   padding: 20px;
//   font-family: Arial, sans-serif;

//   @media (max-width: 768px) {
//     padding: 10px;
//   }
// `;

const QuestionContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const HelperText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1.2rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 10px;
`;


const TravelQuestion = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('TravelQuestion', language);

  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const inputAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 12 },
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    config: { tension: 200, friction: 12 },
  });

  const handleNextClick = async () => {
    if (!value || isNaN(value) || value <= 0) {
      setError(translations.travelQuestionErrorText);
      return;
    }

    setIsLoading(true);

    const surveyResponse = {
      surveyquestion_ref: 'TRVQ1',
      response_value: value,
    };

    try {
      await submitSurveyResponses([surveyResponse]);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Error submitting survey response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.1} handleNextClick={handleNextClick} blendMode="multiply">
        <Container>
          <QuestionContainer>
            <QuestionText>{translations.travelQuestionPersonCountText}</QuestionText>
            <HelperText>{translations.travelQuestionHelperText}</HelperText>
            <InputContainer>
              <animated.div style={inputAnimation}>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={translations.travelQuestionInputPlaceholder}
                  aria-label="Number of persons"
                />
              </animated.div>
              {error && <ErrorText>{error}</ErrorText>}
            </InputContainer>
          </QuestionContainer>
        </Container>
      </GradientBackground>
    </>
  );
};

export default TravelQuestion;
