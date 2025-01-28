import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgoverlay from "../../components/img/beach.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../components/shared/apiUtils';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  max-width: 50vw;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #fff;
`;

const Option = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #007bff;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(18, 166, 224);
  }
`;

const PrimaryAtt = () => {
    const [selected, setSelected] = useState(null);
    const [showNextPage, setShowNextPage] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const [responses, setResponses] = useState([]);

    const translations = useTranslations('PrimaryAtt', language);

    const handleOptionClick = (option) => {
        setSelected(option);
        setShowNextPage(true);

        // Create a response object
        const response = {
            surveyquestion_ref: 'PRATT', // Example 5-character unique reference
            response_value: option === 'YES' ? 'Yes' : 'No' // Language-agnostic value
        };

        // Add the response to the array
        setResponses([response]);

        // Submit the responses to the backend
        submitSurveyResponses([response])
            .then(() => {
                console.log('Responses submitted successfully');
            })
            .catch((error) => {
                console.error('Error submitting responses:', error);
            });
    };

    const navigate = useNavigate();
    const handleNextClick = () => {
        navigate('/');
    };

    const NextPage = () => (
        handleNextClick()
    );

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.15} blendMode='screen'>
                {showNextPage ? (
                    <NextPage />
                ) : (
                    <Container
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Title>{translations.primaryAttQuestion}</Title>
                        <Option
                            onClick={() => handleOptionClick('YES')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {translations.primaryAttYesOption}
                        </Option>
                        <Option
                            onClick={() => handleOptionClick('NO')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {translations.primaryAttNoOption}
                        </Option>
                    </Container>
                )}
            </GradientBackground>
        </>
    );
};

export default PrimaryAtt;