import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../components/img/profile.png';
import useTranslations from '../../components/shared/useTranslations';

const FormContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const NextButton = styled(animated.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PProfile2 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accomplishedDate, setAccomplishedDate] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('PProfile2', language);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 300, delay: 500 },
  });

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/');
  };

  return (
    <><BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="darken">
        <FormContainer style={formAnimation}>
          <FormTitle>{translations.pprofile2FormTitle}</FormTitle>
          <FormField>
            <Label>{translations.pprofile2ArrivalDateLabel}</Label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" />
          </FormField>
          <FormField>
            <Label>{translations.pprofile2DepartureDateLabel}</Label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="MM/dd/yyyy" />
          </FormField>
          <FormField>
            <Label>{translations.pprofile2AccomplishedDateLabel}</Label>
            <DatePicker selected={accomplishedDate} onChange={(date) => setAccomplishedDate(date)} dateFormat="MM/dd/yyyy" />
          </FormField>
          <NextButton style={buttonAnimation} onClick={handleNextClick}>{translations.pprofile2NextButton}</NextButton>
        </FormContainer>
      </GradientBackground>
    </>);
};

export default PProfile2;