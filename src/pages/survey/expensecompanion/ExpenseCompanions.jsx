import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgOverlay from "../../../components/img/peoples.png";
import { useNavigate } from "react-router-dom";
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { NextButtonU } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const QuestionContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 10px;
`;

const NextButton = styled(animated.button)`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExpenseCompanions = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const [inputs, setInputs] = useState([
    { key: 'EXPC', value: '' }, // Example key, you can add more fields as needed
  ]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('ExpenseCompanions', language);

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    config: { tension: 200, friction: 12 },
  });

  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleNext = async () => {
    const surveyResponses = inputs.map(input => ({
      surveyquestion_ref: input.key,
      response_value: input.value,
    }));

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
      
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    }
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.3} blendMode="screen">
        <QuestionContainer>
          <QuestionText>
            {translations.expenseCompanionsQuestionText}
          </QuestionText>
          {inputs.map((input, index) => (
            <InputContainer key={input.key}>
              <Input
                type="number"
                value={input.value}
                onChange={(e) => handleInputChange(index, e)}
                placeholder={translations.expenseCompanionsInputPlaceholder}
              />
            </InputContainer>
          ))}
          <NextButtonU style={buttonAnimation} onClick={handleNext}>
            {translations.expenseCompanionsNextButtonText}
          </NextButtonU>
        </QuestionContainer>
      </GradientBackground>
    </>
  );
};

export default ExpenseCompanions;