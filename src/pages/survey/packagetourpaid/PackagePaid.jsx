import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/money.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { NextButtonU, QuestionText } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`;

const Question = styled(animated.h1)`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #555;
`;

const CurrencyInput = styled.input`
  font-size: 16px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 220px;
  text-align: center;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const CurrencySelect = styled.select`
  font-size: 16px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 240px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const NextButton = styled(animated.button)`
  margin-top: 30px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ConversionResult = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  background-color: #f0f8ff;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
`;



const PackagePaid = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const [responses, setResponses] = useState({ price: '', currency: 'USD' });
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PackagePaid', language);
  const navigate = useNavigate();

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.9)' },
    config: { tension: 200, friction: 10 },
  });

  const questionAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 200, friction: 10 },
  });

  const handleInputChange = (e) => {
    setResponses(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const conversionRates = {
    USD: 56, EUR: 60, JPY: 0.4, PHP: 1, CNY: 8,
    INR: 0.7, RUB: 0.75, KRW: 0.04, FRF: 60, ESP: 60
  };

  const convertedPrice = (parseFloat(responses.price) * conversionRates[responses.currency]).toFixed(2);

  const handleNextClick = async () => {
    setIsLoading(true);
    const surveyResponses = [
      { surveyquestion_ref: 'PRCAM', response_value: responses.price },
      { surveyquestion_ref: 'CURNC', response_value: responses.currency },
      { surveyquestion_ref: 'CONVR', response_value: convertedPrice }
    ];
    await submitSurveyResponses(surveyResponses);
    setIsLoading(false);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground 
        overlayImage={imgoverlay} 
        opacity={0.3} blendMode="screen" 
        buttonAppear={!!responses.price}
        handleNextClick={handleNextClick}
      >
        <Container>
          <QuestionText style={questionAnimation}>{translations.packagePaidQuestion}</QuestionText>
          <InputContainer>
            <InputLabel>{translations.packagePaidInputLabel}</InputLabel>
            <CurrencyInput
              type="number"
              name="price"
              placeholder="Enter amount"
              value={responses.price}
              onChange={handleInputChange}
              aria-label="Enter package price"
            />
            <CurrencySelect 
              name="currency" 
              value={responses.currency} 
              onChange={handleInputChange}
              aria-label="Select currency"
            >
              {Object.keys(conversionRates).map(code => (
                <option key={code} value={code}>{translations[`packagePaidCurrency${code}`]}</option>
              ))}
            </CurrencySelect>
          </InputContainer>
          {responses.price && responses.currency && (
            <ConversionResult>
              {translations.packagePaidConversionResult} {responses.price} {responses.currency} {translations.packagePaidConversionResultApprox} {convertedPrice} PHP.
            </ConversionResult>
          )}
        </Container>
      </GradientBackground>
    </>
  );
};

export default PackagePaid;
