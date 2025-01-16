import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgoverlay from "../../components/img/persons.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

const TravelWith = () => {
    const [selectedOptions, setSelectedOptions] = useState([]); // State to store multiple selected options
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('TravelWith', language);

    const handleOptionClick = (option) => {
        // Check if the option is already selected
        if (selectedOptions.includes(option)) {
            // If selected, remove it from the array
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            // If not selected, add it to the array
            setSelectedOptions([...selectedOptions, option]);
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
    const handleNextClick = () => {
        navigate('/'); // Navigate to the next question
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
                                animate={{ backgroundColor: selectedOptions.includes(option) ? '#4CAF50' : '#E0E0E0' }}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionsContainer>
                    <NextButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextClick}
                        disabled={selectedOptions.length === 0} // Disable button if no options are selected
                    >
                        {translations.travelWithNextButton}
                    </NextButton>
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

const NextButton = styled(motion.button)`
  margin-top: 20px;
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.disabled ? '#B0B0B0' : '#007bff'};
  color: white;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
`;

export default TravelWith;