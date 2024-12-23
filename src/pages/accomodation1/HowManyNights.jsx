import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container } from '../../components/shared/styles1';
import { useNavigate } from 'react-router-dom';
import imgOverlay from "../../components/img/bed.png";
import useTranslations from '../../components/shared/useTranslations';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FormContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 50vw;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Question = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  justify-content: center;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const RadioInput = styled.input`
  margin-right: 12px;
  cursor: pointer;
  transform: scale(1.5);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const NextButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const HowManyNights = () => {
  const [stayOvernight, setStayOvernight] = useState(null);
  const [nights, setNights] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('HowManyNights', language);

  const handleRadioChange = (e) => {
    setStayOvernight(e.target.value);
  };

  const handleNightsChange = (e) => {
    setNights(e.target.value);
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/");
  };

  useEffect(() => {
    // Update the language state when the localStorage value changes
    setLanguage(localStorage.getItem('selectedLanguage'));
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.34} blendMode="multiply">
        <Container>
          <FormContainer>
            <Question>{translations.howManyNightsQuestion}</Question>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="stay"
                  value="yes"
                  checked={stayOvernight === "yes"}
                  onChange={handleRadioChange}
                />
                {translations.howManyNightsYes}
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="stay"
                  value="no"
                  checked={stayOvernight === "no"}
                  onChange={handleRadioChange}
                />
                {translations.howManyNightsNo}
              </RadioLabel>
            </RadioGroup>
            {stayOvernight === "yes" && (
              <InputGroup>
                <InputLabel>{translations.howManyNightsNightsLabel}</InputLabel>
                <InputField
                  type="number"
                  value={nights}
                  onChange={handleNightsChange}
                />
              </InputGroup>
            )}
            {stayOvernight && (
              <NextButton onClick={handleNextClick} disabled={stayOvernight === "yes" && !nights}>
                {translations.howManyNightsNextButton}
              </NextButton>
            )}
          </FormContainer>
        </Container>
      </GradientBackground>
    </>
  );
};

export default HowManyNights;