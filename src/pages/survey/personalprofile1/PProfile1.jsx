import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/profile.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { Input, NextButtonU } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 15px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: white;
  font-size: 0.9rem;
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(0, 102, 211)',
    color: '#fff',
    borderRadius: '15px',
    marginBottom: '16px',
    width: '100%',
    border: '2px solid rgb(50, 143, 241)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(0,0,0,0.5)',
    zIndex: 9999, 
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 200, 
    overflowY: 'auto', 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#333',
    color: '#fff',
  }),
};

const ResponsiveContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

/* Horizontal checklist container for civil status */
const HorizontalChecklistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 16px;
`;

const ChecklistOption = styled.div`
  display: flex;
  align-items: center;
  input[type='radio'] {
    margin-right: 0.5rem;
  }
`;

const PProfile1 = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PProfile1', language);

  const [inputs, setInputs] = useState([
    { id: 'age', value: '', surveyquestion_ref: 'AGE01' },
    { id: 'nationality', value: null, surveyquestion_ref: 'NAT01' },
    { id: 'sex', value: null, surveyquestion_ref: 'SEX01' },
    { id: 'civilStatus', value: null, surveyquestion_ref: 'CIV01' },
    { id: 'occupation', value: '', surveyquestion_ref: 'OCC01' },
    { id: 'income', value: '', surveyquestion_ref: 'INC01' },
    { id: 'currency', value: 'PHP', surveyquestion_ref: 'CUR01' },
    { id: 'convertedIncome', value: '', surveyquestion_ref: 'CONV01' }, // Added converted income field
  ]);

  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  // Fetch nationalities and currencies from REST Countries API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Fetch nationalities
        const nationalityOptions = data.map(country => {
          const nationality = country.demonyms?.eng?.m || "Unknown";
          return {
            value: country.cca2, 
            label: nationality,
          };
        });

        // Sort nationalities alphabetically
        nationalityOptions.sort((a, b) => a.label.localeCompare(b.label));
        setNationalities(nationalityOptions);

        // Fetch currencies
        const currencyOptions = data
          .flatMap(country => Object.values(country.currencies || {}))
          .filter((currency, index, self) => 
            self.findIndex(c => c.name === currency.name) === index
          )
          .map(currency => ({
            value: currency.name,
            label: `${currency.name} (${currency.symbol})`,
          }));

        // Sort currencies alphabetically
        currencyOptions.sort((a, b) => a.label.localeCompare(b.label));
        setCurrencies(currencyOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch conversion rates from an external API
  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/PHP'); // Base currency is PHP
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchConversionRates();
  }, []);

  // Convert income whenever income or currency changes
  useEffect(() => {
    const income = inputs.find((input) => input.id === 'income').value;
    const currency = inputs.find((input) => input.id === 'currency').value;

    if (!income || isNaN(income)) return;

    const rate = conversionRates[currency] || 1; // Default to 1 if rate is not found
    const convertedIncome = (income / rate).toFixed(2); // Convert to PHP

    // Update the converted income field
    handleInputChange('convertedIncome', convertedIncome);
  }, [inputs.find((input) => input.id === 'income').value, inputs.find((input) => input.id === 'currency').value, conversionRates]);

  const sexOptions = [
    { value: 'male', label: translations.sexMale },
    { value: 'female', label: translations.sexFemale },
    { value: 'na', label: translations.sexNA },
  ];

  const civilStatusOptions = [
    { value: 'single', label: translations.civilStatusSingle },
    { value: 'married', label: translations.civilStatusMarried },
    { value: 'widowed', label: translations.civilStatusWidowed },
    { value: 'separated', label: translations.civilStatusSeparated },
  ];

  const isFormComplete = inputs.every(input => input.value !== null && input.value !== '');

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, value } : input
      )
    );
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    const surveyResponses = inputs.map(input => ({
      surveyquestion_ref: input.surveyquestion_ref,
      response_value: input.value.toString()
    }));
    submitSurveyResponses(surveyResponses);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground 
        overlayImage={imgoverlay} 
        opacity={0.2} 
        blendMode="darken" 
        handleNextClick={handleNextClick} 
        buttonAppear={isFormComplete}
      >
        <ResponsiveContainer>
          <Container
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Label htmlFor="age">{translations.ageLabel}</Label>
            <Input
              type="number"
              id="age"
              name="age"
              value={inputs.find((input) => input.id === 'age').value}
              onChange={(e) => handleInputChange('age', e.target.value)}
            />

            <Label htmlFor="nationality">{translations.nationalityLabel}</Label>
            <Select
              options={nationalities}
              value={nationalities.find(option => option.value === inputs.find(input => input.id === 'nationality').value)}
              onChange={(option) => handleInputChange('nationality', option.value)}
              placeholder={translations.nationalityPlaceholder}
              styles={customSelectStyles}
              isSearchable
            />

            <Label htmlFor="sex">{translations.sexLabel}</Label>
            <Select
              options={sexOptions}
              value={sexOptions.find(option => option.value === inputs.find(input => input.id === 'sex').value)}
              onChange={(option) => handleInputChange('sex', option.value)}
              placeholder={translations.sexPlaceholder}
              styles={customSelectStyles}
            />

            {/* Civil Status presented as a horizontal checklist */}
            <Label htmlFor="civilStatus">{translations.civilStatusLabel}</Label>
            <HorizontalChecklistContainer id="civilStatus">
              {civilStatusOptions.map((option) => (
                <ChecklistOption key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name="civilStatus"
                    value={option.value}
                    checked={inputs.find((input) => input.id === 'civilStatus').value === option.value}
                    onChange={() => handleInputChange('civilStatus', option.value)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </ChecklistOption>
              ))}
            </HorizontalChecklistContainer>

            <Label htmlFor="occupation">{translations.occupationLabel}</Label>
            <Input
              type="text"
              id="occupation"
              name="occupation"
              value={inputs.find((input) => input.id === 'occupation').value}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            />

            <Label htmlFor="income">{translations.incomeLabel}</Label>
            <Input
              type="number"
              id="income"
              name="income"
              value={inputs.find((input) => input.id === 'income').value}
              onChange={(e) => handleInputChange('income', e.target.value)}
            />

            <Label htmlFor="currency">{translations.currencyLabel}</Label>
            <Select
              options={currencies}
              value={currencies.find(option => option.value === inputs.find(input => input.id === 'currency').value)}
              onChange={(option) => handleInputChange('currency', option.value)}
              styles={customSelectStyles}
            />

            <Label>
              {translations.convertedIncomeLabel} {inputs.find((input) => input.id === 'convertedIncome').value}
            </Label>
          </Container>
        </ResponsiveContainer>
      </GradientBackground>
    </>
  );
};

export default PProfile1;
