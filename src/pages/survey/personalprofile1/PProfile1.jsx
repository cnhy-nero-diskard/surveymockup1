import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/profile.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // Import axios submission function
import { NextButtonU } from '../../../components/utils/styles1';
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
const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px 12px;
  padding-right: 30px;
  border: 2.5px solid rgb(0, 123, 255);
  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.9rem;
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`;
const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(0, 102, 211)', // Darker background
    color: '#fff', // White text color
    borderRadius: '15px',
    marginBottom: '16px',
    width: '100%',
    border: '2px solid rgb(50, 143, 241)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff', // White text color
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#333', // Darker background for dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#333', // Highlight on focus
    color: '#fff', // White text color
  }),
};
const ResponsiveContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PProfile1 = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);


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
  ]);

  const conversionRates = {
    USD: 56,
    EUR: 60,
    JPY: 0.4,
    PHP: 1,
    CNY: 8,
    INR: 0.7,
    RUB: 0.75,
    KRW: 0.04,
    FRF: 60,
    ESP: 60,
  };

  const nationalities = [
    { value: 'US', label: "AMERICAN" },
    { value: 'PH', label: "FILIPINO" },
    { value: 'CN', label: "中国国籍 " },
    { value: 'JA', label: "国籍 " },
    { value: 'IN', label: "भारतीय नागरिकता" },
    { value: 'RU', label: "Гражданин России" },
    { value: 'KR', label: "대한민국 국민 " },
    { value: 'FR', label: "Français" },
    { value: 'ES', label: "Español" },
    { value: '  ', label: translations.nationalityOther },
  ];


  const currencies = Object.keys(conversionRates).map((key) => ({
    value: key,
    label: key,
  }));

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

  const convertIncome = () => {
    const income = inputs.find((input) => input.id === 'income').value;
    if (!income || isNaN(income)) return translations.invalidIncome;
    const rate = conversionRates[inputs.find((input) => input.id === 'currency').value];
    return (income * rate).toFixed(2);
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
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="darken" handleNextClick={handleNextClick} buttonAppear={isFormComplete}>
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
              value={nationalities.find(option => option.value === inputs.find(input => input.id === 'nationality').value)} // Find the selected option
              onChange={(option) => handleInputChange('nationality', option.value)} // Pass the selected value
              placeholder={translations.nationalityPlaceholder}
              styles={customSelectStyles}
            />
            <Label htmlFor="sex">{translations.sexLabel}</Label>
            <Select
              options={sexOptions}
              value={sexOptions.find(option => option.value === inputs.find(input => input.id === 'sex').value)} // Find the selected option
              onChange={(option) => handleInputChange('sex', option.value)} // Pass the selected value
              placeholder={translations.sexPlaceholder}
              styles={customSelectStyles}
            />
            <Label htmlFor="civilStatus">{translations.civilStatusLabel}</Label>
            <Select
              options={civilStatusOptions}
              value={civilStatusOptions.find(option => option.value === inputs.find(input => input.id === 'civilStatus').value)} // Find the selected option
              onChange={(option) => handleInputChange('civilStatus', option.value)} // Pass the selected value
              placeholder={translations.civilStatusPlaceholder}
              styles={customSelectStyles}
            />          <Label htmlFor="occupation">{translations.occupationLabel}</Label>
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
              value={currencies.find(option => option.value === inputs.find(input => input.id === 'currency').value)} // Find the selected option
              onChange={(option) => handleInputChange('currency', option.value)} // Pass the selected value
              styles={customSelectStyles}
            />          <Label>{translations.convertedIncomeLabel} {convertIncome()}</Label>

          </Container>
        </ResponsiveContainer>      </GradientBackground>
    </>
  );
};

export default PProfile1;
