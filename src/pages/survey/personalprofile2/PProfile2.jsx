import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import DatePicker from 'react-datepicker';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/profile.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { NextButtonU } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import 'react-datepicker/dist/react-datepicker.css';

const FormContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  width: 300px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
`;

const NextButton = styled(animated.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PProfile2 = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const navigate = useNavigate();

  const [responses, setResponses] = useState([
    { ref: 'ARRDT', value: null, label: 'pprofile2ArrivalDateLabel' },
    { ref: 'DEPDT', value: null, label: 'pprofile2DepartureDateLabel' },
    { ref: 'ACCMP', value: new Date(), label: 'pprofile2AccomplishedDateLabel' },
  ]);

  const language = localStorage.getItem('selectedLanguage');
  const translations = useTranslations('PProfile2', language);

  // A simple fade-in/slide-down animation for the form
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  // A simple fade-in/scale-up animation for the Next button
  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 300, delay: 500 },
  });

  // Update the date in the state array whenever the user picks a date
  const handleInputChange = (index, date) => {
    setResponses((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value: date } : item))
    );
  };

  // On Next click, we submit the date values, then navigate
  const handleNextClick = async () => {
    const surveyResponses = responses.map(({ ref, value }) => ({
      surveyquestion_ref: ref,
      response_value: value ? value.toISOString().split('T')[0] : null,
    }));

    await submitSurveyResponses(surveyResponses);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  // Check if all fields have a valid date
  const areAllFieldsFilled = () => {
    return responses.every((item) => item.value !== null && item.value !== '');
  };

  useEffect(() => {
    // If you need to do something each time responses update, add it here
  }, [responses]);

  return (
    <>
      <BodyPartial />
      <GradientBackground
        overlayImage={imgoverlay}
        opacity={0.2}
        blendMode="darken"
        handleNextClick={handleNextClick}
        buttonAppear={areAllFieldsFilled()}
      >
        <FormContainer style={formAnimation}>
          <FormTitle>{translations.pprofile2FormTitle}</FormTitle>
          
          {responses.map((item, index) => (
            <FormField key={item.ref}>
              <Label>{translations[item.label]}</Label>
              <DatePicker
                // Bind the chosen date from state
                selected={item.value}
                // Update that date in state whenever the user picks a new one
                onChange={(date) => handleInputChange(index, date)}
                
                // If you want to disable the 'ACCMP' field
                disabled={item.ref === 'ACCMP'}

                // This is how the chosen date will appear in the text field
                dateFormat="MM/dd/yyyy"

                // You can remove or change this placeholder if it’s confusing
                placeholderText="mm/dd/yyyy"

                // This stops the date picker from popping in the 'wrong' place on small screens
                popperPlacement="bottom"
              />
            </FormField>
          ))}
        </FormContainer>
      </GradientBackground>
    </>
  );
};

export default PProfile2;
