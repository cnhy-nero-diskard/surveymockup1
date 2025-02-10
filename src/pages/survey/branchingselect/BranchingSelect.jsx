import React, { useState, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import './BranchingSelect.css';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/emailbg.png";
import { Container } from '../../../components/utils/styles1';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useNavigate } from 'react-router-dom';



const Option = styled(animated.div)`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  color:white;
  border-color:transparent;
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

  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('BranchingSelect', language);

  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const springProps = useSpring({
    opacity: selectedOptions.length > 0 ? 1 : 0,
    transform: selectedOptions.length > 0 ? 'scale(1)' : 'scale(0.95)',
  });

  // Map options to their respective strings for activeBlocks
  const optionToBlockMap = {
    ACCOMODATION: 'accom',
    TRANSPORTATION: 'transp',
    'EVENT/ACTIVITIES': 'evatt',
    SERVICES: 'serv',
  };

  const handleOptionClick = (option) => {
    console.log(`ACTIVE CONDITIONAL BLOCKS - ${JSON.stringify(activeBlocks)}`);
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        // If the option is already selected, remove it
        removeActiveBlocks([optionToBlockMap[option]]); // Remove the corresponding block
        return prevOptions.filter((opt) => opt !== option);
      } else {
        // If the option is not selected, add it
        appendActiveBlocks([optionToBlockMap[option]]); // Add the corresponding block
        return [...prevOptions, option];
      }
    });
  };

  const handleNextClick = async () => {
    const surveyResponses = selectedOptions.map((option) => ({
      surveyquestion_ref: getSurveyQuestionRef(option),
      response_value: option,
    }));

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    }
  };

  const getSurveyQuestionRef = (option) => {
    const refMap = {
      ACCOMODATION: 'BRACC',
      TRANSPORTATION: 'BRTRA',
      'EVENT/ACTIVITIES': 'BREV',
      SERVICES: 'BRSER',
    };
    return refMap[option] || 'UNKWN';
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <Container>
          <h3>{translations.branchingSelectSurveyTitle}</h3>
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