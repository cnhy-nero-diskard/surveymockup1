// src/components/BranchingSelect.jsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import './BranchingSelect.css';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/emailbg.png";
import { Container } from '../../../components/shared/styles1';
import useTranslations from '../../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../../components/shared/sendDataBindInput'; // Import the API utility function

const Option = styled(animated.div)`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: rgb(47, 134, 206);

  &:hover {
    background-color: rgb(4, 110, 197);
  }

  ${({ selected }) =>
    selected &&
    `
    background-color: rgb(18, 177, 31);
    color: white;
  `}
`;

const NextButton = styled(animated.button)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }
`;

const BranchingSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('BranchingSelect', language);

  const springProps = useSpring({
    opacity: selectedOptions.length > 0 ? 1 : 0,
    transform: selectedOptions.length > 0 ? 'scale(1)' : 'scale(0.95)',
  });

  const handleOptionClick = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter((opt) => opt !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const handleNextClick = async () => {
    // Map selected options to key-value objects
    const surveyResponses = selectedOptions.map((option) => ({
      surveyquestion_ref: getSurveyQuestionRef(option), // Generate a unique 5-character reference
      response_value: option, // Use the selected option as the response value
    }));

    try {
      // Submit the survey responses to the backend
      await submitSurveyResponses(surveyResponses);
      console.log('Survey responses submitted successfully:', surveyResponses);
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    }
  };

  // Helper function to generate a unique 5-character surveyquestion_ref
  const getSurveyQuestionRef = (option) => {
    const refMap = {
      ACCOMODATION: 'BRACC',
      TRANSPORTATION: 'BRTRA',
      'EVENT/ACTIVITIES': 'BREV', 
      SERVICES: 'BRSER',
    };
    return refMap[option] || 'UNKWN'; // Default to 'UNKWN' if option is not found
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <Container>
          <h2>{translations.branchingSelectSurveyTitle}</h2>
          <Option
            onClick={() => handleOptionClick('ACCOMODATION')}
            selected={selectedOptions.includes('ACCOMODATION')}
          >
            {translations.branchingSelectAccommodation}
          </Option>
          <Option
            onClick={() => handleOptionClick('TRANSPORTATION')}
            selected={selectedOptions.includes('TRANSPORTATION')}
          >
            {translations.branchingSelectTransportation}
          </Option>
          <Option
            onClick={() => handleOptionClick('EVENT/ACTIVITIES')}
            selected={selectedOptions.includes('EVENT/ACTIVITIES')}
          >
            {translations.branchingSelectEventActivities}
          </Option>
          <Option
            onClick={() => handleOptionClick('SERVICES')}
            selected={selectedOptions.includes('SERVICES')}
          >
            {translations.branchingSelectServices}
          </Option>
          {selectedOptions.length > 0 && (
            <animated.div style={springProps} className="selected-option">
              {translations.branchingSelectSelectedOptions} {selectedOptions.join(', ')}
            </animated.div>
          )}
          {selectedOptions.length > 0 && (
            <NextButton style={springProps} onClick={handleNextClick}>
              {translations.branchingSelectNextButton}
            </NextButton>
          )}
        </Container>
      </GradientBackground>
    </>
  );
};

export default BranchingSelect;