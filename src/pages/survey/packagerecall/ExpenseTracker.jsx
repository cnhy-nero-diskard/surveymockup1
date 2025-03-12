import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';  // <-- Import react-select
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { NormOption, QuestionText } from '../../../components/utils/styles1';

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const ExpenseLabel = styled.span`
  font-size: 18px;
  color: #555;
`;

const ExpenseInput = styled.input`
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100px;
  text-align: right;
`;

const Summary = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #eaeaea;
  border-radius: 4px;
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const SummaryValue = styled.span`
  font-size: 18px;
  color: #555;
`;

const ForgetButton = styled(animated.button)`
  margin-top: 10px;
  padding: 10px;
`;

/**
 * Custom styles for react-select to darken the dropdown background
 * and ensure white text is visible.
 */
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(2, 119, 165)', 
    borderColor: '#aaa', 
    color: '#fff',
    borderRadius:'15px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#222', // Dark background for dropdown
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#555'
      : state.isFocused
      ? '#444'
      : '#222',
    color: '#fff',
    cursor: 'pointer',
  }),
};

const ExpenseTracker = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks } = useContext(UnifiedContext);

  const [expenses, setExpenses] = useState([
    { label: 'Accommodation', value: '' },
    { label: 'Food and Beverage', value: '' },
    { label: 'Shopping', value: '' },
    { label: 'Local Transport', value: '' },
    { label: 'Tourism Activities Entertainment', value: '' },
    { label: 'Miscellaneous', value: '' },
  ]);

  const [conversionRates, setConversionRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const [currencyOptions, setCurrencyOptions] = useState([]);  

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (parseFloat(expense.value) || 0),
    0
  );

  // Use the fetched conversion rate for the selected currency; default to 1 if undefined
  const convertedTotal = totalExpenses * (conversionRates[selectedCurrency] || 1);

  const hasAtLeastOneExpense = expenses.some(expense => expense.value.trim() !== '');

  useEffect(() => {
    // Example endpoint: https://api.exchangerate-api.com/v4/latest/USD
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setConversionRates(data.rates);

        // Convert currency codes into react-select options
        const optionsArr = Object.keys(data.rates).map((currencyCode) => ({
          value: currencyCode,
          label: currencyCode
        }));
        setCurrencyOptions(optionsArr);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
  }, []);

  const handleChange = (e, index) => {
    const newExpenses = [...expenses];
    newExpenses[index].value = e.target.value;
    setExpenses(newExpenses);
  };

  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleNextClick = async () => {
    if (!hasAtLeastOneExpense) {
      // Display message if needed
      return;
    }

    const surveyResponses = expenses.map((expense, index) => ({
      surveyquestion_ref: `EXP${index + 1}`,
      response_value: expense.value || '0'
    }));

    surveyResponses.push({
      surveyquestion_ref: 'EXPCURR',
      response_value: selectedCurrency
    });

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error("Error submitting survey responses:", error);
    }
  };

  const buttonAnimation = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    config: { tension: 200, friction: 10 }
  });

  const handleForgetButtonClick = () => {
    appendActiveBlocks(['perclist']);
    setShouldNavigate(true);
  };

  useEffect(() => {
    if (shouldNavigate) {
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
      setShouldNavigate(false);
    }
  }, [activeBlocks, shouldNavigate, currentStepIndex, navigate, routes]);

  /**
   * This function updates the selected currency based on the react-select value.
   * react-select will handle keyboard searching and filtering by default when isSearchable={true}.
   */
  const handleCurrencySelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption.value);
    }
  };

  const translations = useTranslations('ExpenseTracker', language);

  return (
    <>
      <BodyPartial />
      <GradientBackground buttonAppear={hasAtLeastOneExpense} handleNextClick={handleNextClick}>
        <Container>
          <QuestionText>{translations.expenseTrackerTitle}</QuestionText>

          {/* React-select searchable dropdown with dark menu styling */}
          <Select
            options={currencyOptions}
            value={{ value: selectedCurrency, label: selectedCurrency }}
            onChange={handleCurrencySelectChange}
            isSearchable={true} // Allow text-based filtering
            placeholder="Select a currency..."
            styles={customSelectStyles} // Apply custom dark styles
          />

          {expenses.map((expense, index) => (
            <ExpenseItem key={expense.label}>
              <ExpenseLabel>
                {translations[`expenseTracker${expense.label.replace(/ /g, '')}`]}
              </ExpenseLabel>
              <ExpenseInput
                type="number"
                value={expense.value}
                onChange={(e) => handleChange(e, index)}
              />
            </ExpenseItem>
          ))}

          <Summary>
            <SummaryTitle>{translations.expenseTrackerSummaryTitle}</SummaryTitle>
            <SummaryValue>
              {translations.expenseTrackerTotalInCurrency} {selectedCurrency}: {totalExpenses.toFixed(2)}
            </SummaryValue>
            <SummaryValue>
              <br />
              {translations.expenseTrackerTotalInPHP}: ₱ {convertedTotal.toFixed(2)}
            </SummaryValue>
          </Summary>

          <NormOption style={buttonAnimation} onClick={handleForgetButtonClick}>
            {translations.expenseTrackerForgetButton}
          </NormOption>
        </Container>
      </GradientBackground>
    </>
  );
};

export default ExpenseTracker;
