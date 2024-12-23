import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import useTranslations from '../../components/shared/useTranslations';

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
  margin-bottom: 20px;
`;

const NextButton = styled(animated.button)`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ForgetButton = styled(animated.button)`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #6c757d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
`;

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState({
        Accommodation: 0,
        'Food and Beverage': 0,
        Shopping: 0,
        'Local Transport': 0,
        'TourismActivitiesEntertainment': 0,
        Miscellaneous: 0,
    });

    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

    const conversionRates = {
        USD: 56, // Example rate to PHP
        EUR: 60, // Example rate to PHP
        JPY: 0.4, // Example rate to PHP
        PHP: 1, // PHP itself
        CNY: 8, // Chinese Yuan to PHP
        INR: 0.7, // Indian Rupee to PHP
        RUB: 0.75, // Russian Ruble to PHP
        KRW: 0.04, // Korean Won to PHP
        FRF: 60, // French Franc (assuming Euro rate)
        ESP: 60, // Spanish Peseta (assuming Euro rate)
    };

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const convertedTotal = totalExpenses * conversionRates[selectedCurrency];

    const handleChange = (e, key) => {
        setExpenses({ ...expenses, [key]: parseFloat(e.target.value) || 0 });
    };

    const handleNext = () => {
        navigate('/');
    };

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const buttonAnimation = useSpring({
        transform: 'scale(1)',
        from: { transform: 'scale(0.95)' },
        config: { tension: 200, friction: 10 },
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleForgetButtonClick = () => {
        navigate('/percentagesharelist'); // Redirect to /percentagesharelist
    };

    const translations = useTranslations('ExpenseTracker', language);

    return (
        <><BodyPartial />
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
                    {Object.keys(expenses).map((key) => (
                        <ExpenseItem key={key}>
                            <ExpenseLabel>{translations[`expenseTracker${key.replace(/ /g, '')}`]}</ExpenseLabel>
                            <ExpenseInput
                                type="number"
                                value={expenses[key]}
                                onChange={(e) => handleChange(e, key)}
                            />
                        </ExpenseItem>
                    ))}
                    <Summary>
                        <SummaryTitle>{translations.expenseTrackerSummaryTitle}</SummaryTitle>
                        <SummaryValue>{translations.expenseTrackerTotalInCurrency} {selectedCurrency}: {totalExpenses.toFixed(2)}</SummaryValue>
                        <SummaryValue><br />{translations.expenseTrackerTotalInPHP}: ₱{convertedTotal.toFixed(2)}</SummaryValue>
                    </Summary>
                    <NextButton style={buttonAnimation} onClick={handleNext}>{translations.expenseTrackerNextButton}</NextButton>
                    <ForgetButton style={buttonAnimation} onClick={handleForgetButtonClick}>{translations.expenseTrackerForgetButton}</ForgetButton>
                </Container>
            </GradientBackground>
        </>
    );
};

export default ExpenseTracker;