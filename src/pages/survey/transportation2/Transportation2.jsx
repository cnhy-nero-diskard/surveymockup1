import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GradientBackground from '../../../components/partials/GradientBackground';
import BodyPartial from '../../../components/partials/BodyPartial';
import imgoverlay from '../../../components/img/suitcase.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
`;

const Option = styled(motion.div)`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 5px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(0, 123, 255, 0.78);
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(18, 166, 224);
  }

  @media (max-width: 768px) {
    padding: 14px;
    margin: 3px 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 10px;
  }
`;

const Transportation2 = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('Transportation2', language);
    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks,appendActiveBlocks,removeActiveBlocks } = useContext(UnifiedContext);
    

    useEffect(() => {
        setLanguage(localStorage.getItem('selectedLanguage'));
    }, []);

    const handleOptionClick = async (option) => {
        const surveyResponses = [
            {
                surveyquestion_ref: 'TRN02', // 5-character reference
                response_value: option, // Storing the selected value
            }
        ];

        try {
            await submitSurveyResponses(surveyResponses);
            goToNextStep(currentStepIndex, navigate,routes,activeBlocks);
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.3} blendMode="darken" buttonAppear={false}>
                <Container
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{translations.transportation2Title}</Title>
                    <Option
                        onClick={() => handleOptionClick(translations.transportation2Option1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option1}
                    </Option>
                    <Option
                        onClick={() => handleOptionClick(translations.transportation2Option2)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option2}
                    </Option>
                    <Option
                        onClick={() => handleOptionClick(translations.transportation2Option3)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option3}
                    </Option>
                </Container>
            </GradientBackground>
        </>
    );
};

export default Transportation2;