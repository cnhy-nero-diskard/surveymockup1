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
import { Input } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

/** --- Styled Components --- **/
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  // All the fields we collect.
  const [inputs, setInputs] = useState([
    { id: 'age', value: '', surveyquestion_ref: 'AGE01' },
    { id: 'nationality', value: null, surveyquestion_ref: 'NAT01' },
    { id: 'sex', value: null, surveyquestion_ref: 'SEX01' },
    { id: 'civilStatus', value: null, surveyquestion_ref: 'CIV01' },
    { id: 'occupation', value: '', surveyquestion_ref: 'OCC01' },
    { id: 'income', value: '', surveyquestion_ref: 'INC01' },
    { id: 'currency', value: 'PHP', surveyquestion_ref: 'CUR01' },   // We store the currency ISO code here, e.g. "USD"
    { id: 'convertedIncome', value: '', surveyquestion_ref: 'CONV01' },
  ]);

  // We’ll store the dropdown options for nationality/currency and the conversion rates.
  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  /**
   * Fetch nationality and currency info from the RESTCountries API
   * *Important:* We'll gather ISO currency codes from "Object.keys(country.currencies)" 
   * so that we can match them with "conversionRates" from the exchange-rate API.
   */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Build nationality options (sorted by demonym label).
        const nationalityOptions = data.map((country) => {
          const nationality = country.demonyms?.eng?.m || 'Unknown';
          return {
            value: nationality,
            label: nationality,
          };
        });
        nationalityOptions.sort((a, b) => a.label.localeCompare(b.label));
        setNationalities(nationalityOptions);

        // Build currency options using ISO codes (e.g. "USD", "PHP").
        // We'll use the code as "value" and add a label that includes both the code and symbol or name.
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

        // De-duplicate the array by code since multiple countries can share the same currency code.
        const uniqueCurrencies = Array.from(
          new Map(allCurrencies.map((curr) => [curr.code, curr])).values()
        );

        // Create dropdown options, sorted by code or name as you prefer
        const currencyOptions = uniqueCurrencies
          .map((curr) => ({
            value: curr.code, // This is critical, e.g., "USD"
            label: `${curr.code} – ${curr.name}${curr.symbol ? ' (' + curr.symbol + ')' : ''}`,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCurrencies(currencyOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  /**
   * Fetch exchange rates with the base set to PHP,
   * so that "rates.USD" means "1 PHP = X USD".
   */
  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/PHP');
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };
    fetchConversionRates();
  }, []);

  /**
   * Convert to PHP as soon as either "income" or "currency" changes
   */
  useEffect(() => {
    const incomeInput = inputs.find((input) => input.id === 'income');
    const currencyInput = inputs.find((input) => input.id === 'currency');

    const income = parseFloat(incomeInput.value || '0');
    const currencyCode = currencyInput.value; // ISO code, e.g. "USD"

    // If there's no input or it's invalid, or <=0, just set 0.00
    if (isNaN(income) || income <= 0) {
      handleInputChange('convertedIncome', '0.00');
      return;
    }

    // If the user is already in PHP, one "unit" is 1:1
    if (currencyCode === 'PHP') {
      handleInputChange('convertedIncome', income.toFixed(2));
      return;
    }

    // If we do have the conversion rate from the currency to *one* PHP, 
    // we want to compute how many PHP per 1 currency. 
    // Because "conversionRates" from 'api.exchangerate-api.com/v4/latest/PHP' 
    // typically means: 1 PHP = X currencyCode. 
    // So if 1 PHP = 0.018 USD, then 1 USD = 1 / 0.018 PHP = ~55.56 PHP 
    // But let's confirm the direction carefully:
    // 
    // According to "exchangerate-api" docs, if you request base=PHP:
    // data.rates.USD => how many USD in 1 PHP
    // 
    // So if data.rates.USD = 0.018, that means 1 PHP = 0.018 USD
    // Then 1 USD = 1 / 0.018 = 55.55 PHP
    //
    // If the user typed 100 income in USD, we want to find out how many PHP that is.
    // => 100 USD = 100 * (1 / data.rates.USD) PHP
    //
    // Summarily: 
    //   userIncomeInCurrency => userIncomeInPHP:
    //   userIncomeInCurrency * (1 / data.rates.USD)

    const rateAgainstPHP = conversionRates[currencyCode];

    if (!rateAgainstPHP) {
      // If for some reason we don't have the rate for that currency, fallback
      handleInputChange('convertedIncome', income.toFixed(2));
      return;
    }

    // Calculate how many PHP the given income is
    const convertedIncome = (income * (1 / rateAgainstPHP)).toFixed(2);
    handleInputChange('convertedIncome', convertedIncome);

  }, [
    inputs.find((input) => input.id === 'income').value,
    inputs.find((input) => input.id === 'currency').value,
    conversionRates,
  ]);

  /**
   * Helper for updating any input by ID
   */
  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  /**
   * Submission logic
   */
  const navigate = useNavigate();
  const isFormComplete = inputs.every((input) => input.value !== null && input.value !== '');

  const handleNextClick = () => {
    const surveyResponses = inputs.map((input) => ({
      surveyquestion_ref: input.surveyquestion_ref,
      response_value: input.value.toString(),
    }));

    submitSurveyResponses(surveyResponses);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  /**
   * Sex and civil status options
   */
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
            {/* Age */}
            <Label htmlFor="age">{translations.ageLabel}</Label>
            <Input
  type="number"
  id="age"
  name="age"
  value={inputs.find((input) => input.id === 'age').value}
  onChange={(e) => {
    const enteredAge = parseInt(e.target.value, 10);
    if (enteredAge > 100) {
      handleInputChange('age', '100');
    } else {
      handleInputChange('age', e.target.value);
    }
  }}
/>


            {/* Nationality */}
            <Label htmlFor="nationality">{translations.nationalityLabel}</Label>
            <Select
              options={nationalities}
              value={nationalities.find(
                (option) =>
                  option.value === inputs.find((input) => input.id === 'nationality').value
              )}
              onChange={(option) => handleInputChange('nationality', option.value)}
              placeholder={'.........'}
              styles={customSelectStyles}
              isSearchable
            />

            {/* Sex */}
            <Label htmlFor="sex">{translations.sexLabel}</Label>
            <Select
              options={sexOptions}
              value={sexOptions.find(
                (option) => option.value === inputs.find((input) => input.id === 'sex').value
              )}
              onChange={(option) => handleInputChange('sex', option.value)}
              placeholder={'.........'}
              styles={customSelectStyles}
            />

            {/* Civil Status */}
            <Label htmlFor="civilStatus">{translations.civilStatusLabel}</Label>
            <HorizontalChecklistContainer id="civilStatus">
              {civilStatusOptions.map((option) => (
                <ChecklistOption key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name="civilStatus"
                    value={option.value}
                    checked={
                      inputs.find((input) => input.id === 'civilStatus').value === option.value
                    }
                    onChange={() => handleInputChange('civilStatus', option.value)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </ChecklistOption>
              ))}
            </HorizontalChecklistContainer>

            {/* Occupation */}
            <Label htmlFor="occupation">{translations.occupationLabel}</Label>
            <Input
              type="text"
              id="occupation"
              name="occupation"
              value={inputs.find((input) => input.id === 'occupation').value}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            />

            {/* Income */}
            <Label htmlFor="income">{translations.incomeLabel}</Label>
            <Input
              type="number"
              id="income"
              name="income"
              value={inputs.find((input) => input.id === 'income').value}
              onChange={(e) => handleInputChange('income', e.target.value)}
            />

            {/* Currency Selection (Store currency code!) */}
            <Label htmlFor="currency">{translations.currencyLabel}</Label>
            <Select
              options={currencies}
              value={currencies.find(
                (option) =>
                  option.value === inputs.find((input) => input.id === 'currency').value
              )}
              onChange={(option) => handleInputChange('currency', option.value)}
              styles={customSelectStyles}
              isSearchable
            />

            {/* Converted Income (read-only display) */}
            <Label>
              {translations.convertedIncomeLabel}{' '}
              {inputs.find((input) => input.id === 'convertedIncome').value}
            </Label>
          </Container>
        </ResponsiveContainer>
      </GradientBackground>
    </>
  );
};

export default PProfile1;
