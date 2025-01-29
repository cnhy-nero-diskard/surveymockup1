import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgoverlay from "../../components/img/money.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../components/shared/apiUtils';
import { NextButtonU } from '../../components/shared/styles1';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-family: 'Arial', sans-serif;
`;

const Question = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
`;

const CurrencyInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  margin-bottom: 15px;
`;

const CurrencySelect = styled.select`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 220px;
  margin-bottom: 20px;
`;

const NextButton = styled(animated.button)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConversionResult = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

const PackagePaid = () => {
  const [responses, setResponses] = useState({ price: '', currency: 'USD' });
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PackagePaid', language);
  const navigate = useNavigate();

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.9)' },
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
    const surveyResponses = [
      { surveyquestion_ref: 'PRCAM', response_value: responses.price },
      { surveyquestion_ref: 'CURNC', response_value: responses.currency },
      { surveyquestion_ref: 'CONVR', response_value: convertedPrice }
    ];
    await submitSurveyResponses(surveyResponses);
    navigate('/');
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.3} blendMode="screen">
        <Container>
          <Question>{translations.packagePaidQuestion}</Question>
          <InputContainer>
            <InputLabel>{translations.packagePaidInputLabel}</InputLabel>
            <CurrencyInput
              type="number"
              name="price"
              placeholder={translations.packagePaidInputPlaceholder}
              value={responses.price}
              onChange={handleInputChange}
            />
            <CurrencySelect name="currency" value={responses.currency} onChange={handleInputChange}>
              {Object.keys(conversionRates).map(code => (
                <option key={code} value={code}>{translations[`packagePaidCurrency${code}`]}</option>
              ))}
            </CurrencySelect>
          </InputContainer>
          <ConversionResult>
            {responses.price && responses.currency && (
              <span>
                {translations.packagePaidConversionResult} {responses.price} {responses.currency} {translations.packagePaidConversionResultApprox} {convertedPrice} PHP.
              </span>
            )}
          </ConversionResult>
          <NextButtonU style={buttonAnimation} onClick={handleNextClick}>
            {translations.packagePaidNextButton}
          </NextButtonU>
        </Container>
      </GradientBackground>
    </>
  );
};

export default PackagePaid;
