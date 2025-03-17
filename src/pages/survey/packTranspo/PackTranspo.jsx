import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Select from 'react-select';
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
import { fetchCurrencies } from '../../../components/utils/currencyUtils';



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
    const fetchData = async () => {
      const currencyOptions = await fetchCurrencies();
      setCurrencies(currencyOptions);
    };
    fetchData();
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

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
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

          <Select
            options={currencies}
            value={currencies.find((option) => option.value === currency)}
            onChange={handleCurrencyChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: 240,
                fontSize: 16,
                padding: '6px 12px',
                color: 'white',
                background: 'rgb(0, 100, 182)',
                borderRadius: 8,
                border: '2px solid #ccc',
                transition: 'border-color 0.3s ease',
                '&:hover': {
                  borderColor: '#007bff',
                },
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: 16,
                backgroundColor: state.isSelected ? 'rgb(0, 50, 100)' : 'rgb(0, 100, 182)', // Background color for options
                color: 'white', // Text color for options
                '&:hover': {
                  backgroundColor: 'rgb(0, 150, 255)', // Background color on hover
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: 'rgb(0, 100, 182)', // Background color for the dropdown menu
                borderRadius: 8,
                border: '2px solid #ccc',
                zIndex: 9999, // Ensure the dropdown menu overlays everything
              }),
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 9999, // Ensure the dropdown menu overlays everything
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white', // Text color for the selected value
              }),
              input: (provided) => ({
                ...provided,
                color: 'white', // Text color for the input field
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#ccc', // Text color for the placeholder
              }),
            }}
            isSearchable
            placeholder= '...'
            menuPortalTarget={document.body} // Render the dropdown menu outside the parent container
            menuPosition="fixed" // Ensure the dropdown menu is positioned correctly
          />
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