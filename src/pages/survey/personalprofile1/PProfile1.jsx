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
import {
  fetchCurrencies,
  fetchConversionRates,
  convertIncomeToPHP,
} from '../../../components/utils/currencyUtils';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../../../components/utils/storageUtils';

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
    marginbottom: '16px',
    minWidth: '300px',
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

  // Attempt to load any previously persisted language choice from local storage
  const storedLanguage = localStorage.getItem('selectedLanguage');
  const [language, setLanguage] = useState(storedLanguage);
  const translations = useTranslations('PProfile1', language);

  // Define our inputs state
  const [inputs, setInputs] = useState([
    { id: 'age', value: '', surveyquestion_ref: 'AGE01' },
    { id: 'nationality', value: null, surveyquestion_ref: 'NAT01' },
    { id: 'sex', value: null, surveyquestion_ref: 'SEX01' },
    { id: 'civilStatus', value: null, surveyquestion_ref: 'CIV01' },
    { id: 'occupation', value: '', surveyquestion_ref: 'OCC01' },
    { id: 'income', value: '', surveyquestion_ref: 'INC01' },
    { id: 'currency', value: 'PHP', surveyquestion_ref: 'CUR01' },
    { id: 'convertedIncome', value: '', surveyquestion_ref: 'CONV01' },
  ]);

  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [conversionRates, setConversionRates] = useState({});

  /**
   * On component mount, check local storage for any existing data.
   * If found, we use that data to initialize our inputs.
   */
  useEffect(() => {
    const savedData = loadFromLocalStorage('pProfile1Inputs');
    
    if (savedData) {
      setInputs(savedData);
      
    }
    setInputs(inputs.map(input => {
      if (input.surveyquestion_ref === 'CUR01') {
        return {
          ...input,
          value: loadFromLocalStorage('touristCurrency')
        };
      }
      return input;
    }));
  }, []);

  /**
   * Fetch relevant data (nationalities, currencies, conversion rates) on component mount.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch nationalities
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const nationalityOptions = data.map((country) => {
          const nationality = country.demonyms?.eng?.m || 'Unknown';
          return {
            value: nationality,
            label: nationality,
          };
        });
        nationalityOptions.sort((a, b) => a.label.localeCompare(b.label));
        setNationalities(nationalityOptions);
      } catch (error) {
        console.error('Error fetching nationalities:', error);
      }

      // Fetch currencies
      const currencyOptions = await fetchCurrencies();
      setCurrencies(currencyOptions);

      // Fetch conversion rates
      const rates = await fetchConversionRates();
      setConversionRates(rates);
    };

    fetchData();
  }, []);

  /**
   * Convert income to PHP whenever income or currency changes.
   */
  useEffect(() => {
    const incomeObj = inputs.find((input) => input.id === 'income');
    const currencyObj = inputs.find((input) => input.id === 'currency');
    const income = parseFloat(incomeObj.value || '0');
    const currencyCode = currencyObj.value;
    const converted = convertIncomeToPHP(income, currencyCode, conversionRates);
    handleInputChange('convertedIncome', converted);
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

  const navigate = useNavigate();
  const isFormComplete = inputs.every((input) => {
    // Exclude 'occupation' and 'income' from the mandatory fields
    if (input.id === 'occupation' || input.id === 'income') {
      return true;
    }
    return input.value !== null && input.value !== '';
  });

  /**
   * On Next click:
   * 1. Persist the inputs to local storage
   * 2. Submit the survey responses
   * 3. Navigate to the next step
   */
  const handleNextClick = () => {
    // Save to local storage first
    saveToLocalStorage('pProfile1Inputs', inputs);

    const surveyResponses = inputs.map((input) => ({
      surveyquestion_ref: input.surveyquestion_ref,
      response_value: input.value.toString(),
    }));
    submitSurveyResponses(surveyResponses);

    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  // Sex and civil status options
  const sexOptions = [
    { value: 'male', label: translations.sexMale },
    { value: 'female', label: translations.sexFemale },
    { value: 'lgbtqia', label: translations.sexLgbt },
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
        opacity={0.09}
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
              placeholder="........."
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
              placeholder="........."
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

            {/* Currency Selection */}
            <Label htmlFor="currency">{translations.currencyLabel}</Label>
            <Select
              options={currencies}
              value={currencies.find(
                (option) =>
                  option.value === inputs.find((input) => input.id === 'currency').value
              )}
              onChange={(option) => handleInputChange('currency', option.value)}
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
                  backgroundColor: state.isSelected
                    ? 'rgb(0, 50, 100)'
                    : 'rgb(0, 100, 182)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgb(0, 150, 255)',
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgb(0, 100, 182)',
                  borderRadius: 8,
                  border: '2px solid #ccc',
                  zIndex: 9999,
                }),
                menuPortal: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#ccc',
                }),
              }}
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="fixed"
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
