import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from "react-router-dom";
import imgOverlay from "../../../components/img/money.png";
import useTranslations from '../../../components/utils/useTranslations';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { NextButtonU, QuestionText } from '../../../components/utils/styles1';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  width: 60vw;
  font-family: 'Arial', sans-serif;
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

const ConversionResult = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

const PackTranspo = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const navigate = useNavigate();
  const [language] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const translations = useTranslations('PackTranspo', language);

  // User input states:
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');

  // Dynamic currency data:
  const [currencies, setCurrencies] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  // For real-time conversion:
  const [convertedPrice, setConvertedPrice] = useState('');

  // Spring animation for the button:
  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.9)' },
    config: { tension: 200, friction: 10 },
  });

  // Fetch all currencies from RESTCountries:
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Build an array of unique currency codes:
        const allCurrencies = [];
        data.forEach((country) => {
          if (country.currencies) {
            Object.entries(country.currencies).forEach(([code, info]) => {
              allCurrencies.push({
                code,
                name: info.name,
                symbol: info.symbol,
              });
            });
          }
        });

        // Remove duplicates:
        const uniqueCurrencies = Array.from(
          new Map(allCurrencies.map((curr) => [curr.code, curr])).values()
        );

        // Sort them for neatness:
        const sortedCurrencies = uniqueCurrencies.sort((a, b) =>
          a.code.localeCompare(b.code)
        );

        // Convert to <option> format:
        const currencyOptions = sortedCurrencies.map((curr) => ({
          code: curr.code,
          label: `${curr.code} – ${curr.name}${
            curr.symbol ? ' (' + curr.symbol + ')' : ''
          }`,
        }));

        setCurrencies(currencyOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch exchange rates from the ExchangeRate API (base = PHP):
  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/PHP');
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchConversionRates();
  }, []);

  // Recalculate converted price whenever "price" or "currency" changes:
  useEffect(() => {
    if (!price || !currency || !conversionRates[currency]) {
      setConvertedPrice('');
      return;
    }

    const userInput = parseFloat(price);
    if (isNaN(userInput) || userInput <= 0) {
      setConvertedPrice('');
      return;
    }

    // If we have "1 PHP = X currency", then "1 currency = 1/X PHP"
    // userInput in currency => in PHP is userInput * (1 / conversionRates[currency]).
    const rateAgainstPHP = conversionRates[currency];
    const newConverted = (userInput * (1 / rateAgainstPHP)).toFixed(2);
    setConvertedPrice(newConverted);
  }, [price, currency, conversionRates]);

  // Handle user actions:
  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  // Submit data, including converted price:
  const handleNextClick = async () => {
    // Prepare the survey responses:
    const surveyResponses = [
      {
        surveyquestion_ref: 'NPCURNC',
        response_value: price, // The price value in original currency
      },
      {
        surveyquestion_ref: 'NPRCAM',
        response_value: currency, // The selected currency code
      },
      {
        surveyquestion_ref: 'NPCONVR',
        response_value: convertedPrice, // The price in PHP
      }
    ];

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Error submitting survey responses:', error);
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground
        overlayImage={imgOverlay}
        opacity={0.2}
        blendMode="screen"
        handleNextClick={handleNextClick}
        buttonAppear={price && currency}
      >
        <QuestionText>{translations.packTranspoQuestion}</QuestionText>
        <InputContainer>
          <InputLabel>{translations.packTranspoInputLabel}</InputLabel>
          <CurrencyInput
            type="number"
            placeholder={translations.packTranspoInputPlaceholder}
            value={price}
            onChange={handleInputChange}
          />

          <CurrencySelect value={currency} onChange={handleCurrencyChange}>
            <option value="" disabled>
              {translations.packTranspoCurrencySelect}
            </option>
            {currencies.map((curr) => (
              <option value={curr.code} key={curr.code}>
                {curr.label}
              </option>
            ))}
          </CurrencySelect>
        </InputContainer>

        <ConversionResult>
          {convertedPrice && (
            <span>
              {price} {currency} {translations.packTranspoConversionResult} {convertedPrice} PHP.
            </span>
          )}
        </ConversionResult>
      </GradientBackground>
    </>
  );
};

export default PackTranspo;
