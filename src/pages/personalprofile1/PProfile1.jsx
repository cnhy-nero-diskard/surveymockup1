import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../components/img/profile.png';
import useTranslations from '../../components/shared/useTranslations';

const FormContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 50vh;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  border: 2px solid rgb(50, 143, 241);
  border-radius: 14px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const PProfile1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PProfile1', language);

  const [nationality, setNationality] = useState(null);
  const [currency, setCurrency] = useState('PHP');
  const [income, setIncome] = useState('');
  const [sex, setSex] = useState(null);
  const [civilStatus, setCivilStatus] = useState(null);

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
    { value: 'US', label: translations.nationalityAmerican },
    { value: 'PH', label: translations.nationalityFilipino },
    { value: 'CN', label: translations.nationalityChinese },
    { value: 'IN', label: translations.nationalityIndian },
    { value: 'RU', label: translations.nationalityRussian },
    { value: 'KR', label: translations.nationalitySouthKorean },
    { value: 'FR', label: translations.nationalityFrench },
    { value: 'ES', label: translations.nationalitySpanish },
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

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const convertIncome = () => {
    if (!income || isNaN(income)) return translations.invalidIncome;
    const rate = conversionRates[currency];
    return (income * rate).toFixed(2);
  };

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="darken">
        <FormContainer
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Label htmlFor="age">{translations.ageLabel}</Label>
          <Input type="number" id="age" name="age" />

          <Label htmlFor="nationality">{translations.nationalityLabel}</Label>
          <Select
            options={nationalities}
            value={nationality}
            onChange={setNationality}
            placeholder={translations.nationalityPlaceholder}
            styles={customSelectStyles}
          />

          <Label htmlFor="sex">{translations.sexLabel}</Label>
          <Select
            options={sexOptions}
            value={sex}
            onChange={setSex}
            placeholder={translations.sexPlaceholder}
            styles={customSelectStyles}
          />

          <Label htmlFor="civilStatus">{translations.civilStatusLabel}</Label>
          <Select
            options={civilStatusOptions}
            value={civilStatus}
            onChange={setCivilStatus}
            placeholder={translations.civilStatusPlaceholder}
            styles={customSelectStyles}
          />

          <Label htmlFor="occupation">{translations.occupationLabel}</Label>
          <Input type="text" id="occupation" name="occupation" />

          <Label htmlFor="income">{translations.incomeLabel}</Label>
          <Input
            type="number"
            id="income"
            name="income"
            value={income}
            onChange={handleIncomeChange}
          />

          <Label htmlFor="currency">{translations.currencyLabel}</Label>
          <Select
            options={currencies}
            defaultValue={currencies.find((c) => c.value === 'PHP')}
            onChange={(option) => setCurrency(option.value)}
            styles={customSelectStyles}
          />

          <Label>{translations.convertedIncomeLabel} {convertIncome()}</Label>

          <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNextClick}>
            {translations.nextButton}
          </Button>
        </FormContainer>
      </GradientBackground>
    </>
  );
};

export default PProfile1;