import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgoverlay from "../../components/img/items.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../components/shared/apiUtils';

const ChecklistContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  width: 350px;
  margin: 0 auto;
`;

const ChecklistTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  width: 100%;
`;

const ChecklistItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-radius:15px;
  cursor: pointer;
  font-size: 1rem;
  background-color:rgb(3, 112, 207);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color:rgb(46, 145, 231);
    border-color: #007bff;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid #007bff;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 2px;
    position: absolute;
    top: 5px;
    left: 5px;
  }
`;

const NextButton = styled(motion.button)`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f88;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PackageTourItems = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('PackageTourItems', language);

    // Mapping of translations to English values
    const englishValues = {
        [translations.packageTourItemsAccommodation]: 'Accommodation',
        [translations.packageTourItemsEstablishment]: 'Establishment',
        [translations.packageTourItemsFoodBeverages]: 'Food & Beverages',
        [translations.packageTourItemsShopping]: 'Shopping',
        [translations.packageTourItemsLocalTransport]: 'Local Transport',
        [translations.packageTourItemsTourismActivities]: 'Tourism Activities',
        [translations.packageTourItemsEntertainment]: 'Entertainment',
        [translations.packageTourItemsMiscellaneous]: 'Miscellaneous',
    };

    const handleCheckboxChange = (item) => {
        const englishValue = englishValues[item];
        const surveyResponse = {
            surveyquestion_ref: 'PKGITEMS', // Example 5-char ref, can be dynamic if needed
            response_value: englishValue,
        };

        if (selectedItems.some((i) => i.response_value === englishValue)) {
            setSelectedItems(selectedItems.filter((i) => i.response_value !== englishValue));
        } else {
            setSelectedItems([...selectedItems, surveyResponse]);
        }
    };

    const navigate = useNavigate();

    const handleNextClick = async () => {
        setIsLoading(true);
        console.log('Selected Items:', selectedItems);

        try {
            await submitSurveyResponses(selectedItems);
            setIsLoading(false);
            navigate('/'); // Navigate to the next question
        } catch (error) {
            console.error('Error submitting survey responses:', error);
            setIsLoading(false);
        }
    };

    const checklistItems = [
        translations.packageTourItemsAccommodation,
        translations.packageTourItemsEstablishment,
        translations.packageTourItemsFoodBeverages,
        translations.packageTourItemsShopping,
        translations.packageTourItemsLocalTransport,
        translations.packageTourItemsTourismActivities,
        translations.packageTourItemsEntertainment,
        translations.packageTourItemsMiscellaneous,
    ];

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.1} blendMode="normal">   
                <ChecklistContainer
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ChecklistTitle>{translations.packageTourItemsTitle}</ChecklistTitle>
                    {checklistItems.map((item) => (
                        <ChecklistItem key={item}>
                            <Checkbox
                                checked={selectedItems.some((i) => i.response_value === englishValues[item])}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            {item}
                        </ChecklistItem>
                    ))}
                    <NextButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingSpinner/> : translations.packageTourItemsNextButton}
                    </NextButton>
                </ChecklistContainer>
            </GradientBackground>
        </>
    );
};

export default PackageTourItems;