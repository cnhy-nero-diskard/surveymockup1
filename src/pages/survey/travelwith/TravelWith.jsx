import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { NextButtonU } from '../../../components/utils/styles1';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // Import the submit function
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const TravelWith = () => {
    const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options as objects
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('TravelWith', language);

    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks,appendActiveBlocks,removeActiveBlocks } = useContext(UnifiedContext);


    const handleOptionClick = (option) => {
        // const optionKey = option.toUpperCase().replace(/\s+/g, '_').substring(0, 5); // Generate a 5-char key
        const optionObject = { surveyquestion_ref: "TRWTH", response_value: option };

        // Check if the option is already selected
        if (selectedOptions.some(item => item.response_value === option)) {
            // If selected, remove it from the array
            setSelectedOptions(selectedOptions.filter(item => item.response_value !== option));
        } else {
            // If not selected, add it to the array
            setSelectedOptions([...selectedOptions, optionObject]);
        }
    };

    const options = [
        translations.travelWithOptionAlone,
        translations.travelWithOptionBusinessColleague,
        translations.travelWithOptionFamilyRelatives,
        translations.travelWithOptionFriends,
        translations.travelWithOptionPartner
    ];

    const navigate = useNavigate(); // Initialize useNavigate

    const handleNextClick = async () => {
        try {
            // Submit the selected options to the backend
            await submitSurveyResponses(selectedOptions);
            goToNextStep(currentStepIndex, navigate,routes,activeBlocks); //<---------------------------
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    return (
        <><BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.25} blendMode="screen">
                <FormContainer>
                    <Question>{translations.travelWithQuestion}</Question>
                    <OptionsContainer>
                        {options.map((option, index) => (
                            <Option
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{ backgroundColor: selectedOptions.some(item => item.response_value === option) ? '#4CAF50' : '#E0E0E0' }}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionsContainer>
                    <NextButtonU
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextClick}
                        disabled={selectedOptions.length === 0} // Disable button if no options are selected
                    >
                        {translations.travelWithNextButton}
                    </NextButtonU>
                </FormContainer>
            </GradientBackground>
        </>
    );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: rgb(4, 79, 160);
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom:5px;
`;

const Option = styled(motion.div)`
  padding: 15px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

export default TravelWith;