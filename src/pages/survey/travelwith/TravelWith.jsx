import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { NextButtonU, Option, QuestionText } from '../../../components/utils/styles1';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Question = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
  font-weight: 600;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-bottom: 20px;
`;

// const Option = styled(motion.div)`
//   padding: 15px;
//   text-align: center;
//   border-radius: 25px;
//   cursor: pointer;
//   font-size: 1.1rem;
//   color: #333;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s ease, transform 0.2s ease;
//   background-color: ${props => (props.selected ? 'blue' : '#f0f0f0')};
//   color: ${props => (props.selected ? '#fff' : '#333')};

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

const TravelWith = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('TravelWith', language);

    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks, appendActiveBlocks, removeActiveBlocks, isBlockActive } = useContext(UnifiedContext);

    useEffect (() => {
        if (isBlockActive('isalone')){
            console.log('COUNTER IS ALONE FOR ENUMERATION');
            submitSurveyResponses({ surveyquestion_ref: "TRWTH", response_value: "Alone" })
            goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
        }
    }, []);
    const handleOptionClick = (option) => {
        const optionObject = { surveyquestion_ref: "TRWTH", response_value: option };

        if (selectedOptions.some(item => item.response_value === option)) {
            setSelectedOptions(selectedOptions.filter(item => item.response_value !== option));
        } else {
            setSelectedOptions([...selectedOptions, optionObject]);
        }
        setError('');
    };

    const options = [
        translations.travelWithOptionAlone,
        translations.travelWithOptionBusinessColleague,
        translations.travelWithOptionFamilyRelatives,
        translations.travelWithOptionFriends,
        translations.travelWithOptionPartner
    ];

    const navigate = useNavigate();

    const handleNextClick = async () => {
        if (selectedOptions.length === 0) {
            setError(translations.errorNoSelection);
            return;
        }
        try {
            await submitSurveyResponses(selectedOptions);
            goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
        } catch (error) {
            console.error('Error submitting survey responses:', error);
            setError(translations.errorSubmission);
        }
    };

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.25} blendMode="screen" handleNextClick={handleNextClick}>
                <FormContainer>
                    <QuestionText>{translations.travelWithQuestion}</QuestionText>
                    <OptionsContainer>
                        {options.map((option, index) => (
                            <Option
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                selected={selectedOptions.some(item => item.response_value === option)}
                                role="button"
                                aria-label={`Select ${option}`}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionsContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </FormContainer>
            </GradientBackground>
        </>
    );
};

export default TravelWith;
