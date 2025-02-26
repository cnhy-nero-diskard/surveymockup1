import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

const FormContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const navigate = useNavigate();
  const [responses, setResponses] = useState([
    { ref: 'ARRDT', value: null, label: 'pprofile2ArrivalDateLabel' },
    { ref: 'DEPDT', value: null, label: 'pprofile2DepartureDateLabel' },
    { ref: 'ACCMP', value: new Date(), label: 'pprofile2AccomplishedDateLabel' },
  ]);

  const language = localStorage.getItem('selectedLanguage');
  const translations = useTranslations('PProfile2', language);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 300, delay: 500 },
  });

  const handleInputChange = (index, date) => {
    setResponses((prev) => prev.map((item, i) => (i === index ? { ...item, value: date } : item)));
  };

  const handleNextClick = async () => {
    const surveyResponses = responses.map(({ ref, value }) => ({
      surveyquestion_ref: ref,
      response_value: value ? value.toISOString().split('T')[0] : null,
    }));

    await submitSurveyResponses(surveyResponses);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  return (
    <><BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="darken">
        <FormContainer style={formAnimation}>
          <FormTitle>{translations.pprofile2FormTitle}</FormTitle>
          {responses.map((item, index) => (
            <FormField key={item.ref}>
              <Label>{translations[item.label]}</Label>
              <DatePicker
                selected={item.value}
                onChange={(date) => handleInputChange(index, date)}
                dateFormat="MM/dd/yyyy"
                disabled={item.ref === 'ACCMP'}
              />
            </FormField>
          ))}
          <NextButtonU style={buttonAnimation} onClick={handleNextClick}>{translations.pprofile2NextButton}</NextButtonU>
        </FormContainer>
      </GradientBackground>
    </>);
};

export default PProfile2;
