import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // Importing the function
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
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

const CurrencySelect = styled.select`
  font-size: 18px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const NextButton = styled(animated.button)`
 margin-top:20px; 
 padding:10px 
 // ... rest of your styles
`;

const ForgetButton = styled(animated.button)`
 margin-top:10px; 
 padding:10px 
 // ... rest of your styles
`;

const ExpenseTracker = () => {
    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

    const [expenses, setExpenses] = useState([
        { label: 'Accommodation', value: '' },
        { label: 'Food and Beverage', value: '' },
        { label: 'Shopping', value: '' },
        { label: 'Local Transport', value: '' },
        { label: 'Tourism Activities Entertainment', value: '' },
        { label: 'Miscellaneous', value: '' },
    ]);

    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const conversionRates = {
        USD: 56,
        EUR: 60,
        JPY: .4,
        PHP: 1,
        CNY: .7,
        INR: .75,
        RUB: .04,
        KRW: .6,
        FRF: .6,
        ESP: .6,
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + (parseFloat(expense.value) || 0), 0);
    const convertedTotal = totalExpenses * conversionRates[selectedCurrency];

    const handleChange = (e, index) => {
        const newExpenses = [...expenses];
        newExpenses[index].value = e.target.value; // Update specific expense value
        setExpenses(newExpenses);
    };
    const handleNextClick = async () => {
        // Check if at least one expense has a value
        const hasAtLeastOneExpense = expenses.some(expense => expense.value.trim() !== '');

        if (!hasAtLeastOneExpense) {
            // alert(translations.expenseTrackerValidationMessage || 'Please fill in at least one expense before proceeding.');
            return;
        }

        const surveyResponses = expenses.map((expense, index) => ({
            surveyquestion_ref: `EXP${index + 1}`, // Generate a unique reference for each expense
            response_value: expense.value || '0' // Default to '0' if empty
        }));

        // Add selected currency to survey responses
        surveyResponses.push({
            surveyquestion_ref: `EXPCURR`, // Unique reference for currency
            response_value: selectedCurrency // Include selected currency
        });

        try {
            await submitSurveyResponses(surveyResponses); // Submit data
            goToNextStep(currentStepIndex, navigate, routes, activeBlocks); // Proceed to the next step
        } catch (error) {
            console.error("Error submitting survey responses:", error);
            // Handle error (e.g., show a notification)
        }
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const buttonAnimation = useSpring({
        transform: 'scale(1)',
        from: { transform: 'scale(0.95)' },
        config: { tension: 200, friction: 10 }
    });

    const navigate = useNavigate();
    const handleForgetButtonClick = () => {
        //   navigate('/percentagesharelist');
        removeActiveBlocks(['perclist']);
        appendActiveBlocks(['perclist']);
        goToNextStep(currentStepIndex, navigate, routes, activeBlocks); // Proceed to the next step
    };

    const translations = useTranslations('ExpenseTracker', language);

    return (
        <>
            <BodyPartial />
            <GradientBackground>
                <Container>
                    <Title>{translations.expenseTrackerTitle}</Title>
                    <CurrencySelect value={selectedCurrency} onChange={handleCurrencyChange}>
                        {Object.keys(conversionRates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </CurrencySelect>
                    {expenses.map((expense, index) => (
                        <ExpenseItem key={expense.label}>
                            <ExpenseLabel>{translations[`expenseTracker${expense.label.replace(/ /g, '')}`]}</ExpenseLabel>
                            <ExpenseInput
                                type="number"
                                value={expense.value}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </ExpenseItem>
                    ))}
                    <Summary>
                        <SummaryTitle>{translations.expenseTrackerSummaryTitle}</SummaryTitle>
                        <SummaryValue>{translations.expenseTrackerTotalInCurrency} {selectedCurrency}: {totalExpenses.toFixed(2)}</SummaryValue>
                        <SummaryValue><br />{translations.expenseTrackerTotalInPHP}: ₱{convertedTotal.toFixed(2)}</SummaryValue>
                    </Summary>
                    <NextButton style={buttonAnimation} onClick={handleNextClick}>{translations.expenseTrackerNextButton}</NextButton>
                    <ForgetButton style={buttonAnimation} onClick={handleForgetButtonClick}>{translations.expenseTrackerForgetButton}</ForgetButton>
                </Container>
            </GradientBackground>
        </>
    );
};

export default ExpenseTracker;

