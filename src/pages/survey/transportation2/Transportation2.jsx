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
import { NormOption, Option, QuestionText } from '../../../components/utils/styles1';

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
                >
                    <QuestionText>{translations.transportation2Title}</QuestionText>
                    <NormOption
                        onClick={() => handleOptionClick(translations.transportation2Option1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option1}
                    </NormOption>
                    <NormOption
                        onClick={() => handleOptionClick(translations.transportation2Option2)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option2}
                    </NormOption>
                    <NormOption
                        onClick={() => handleOptionClick(translations.transportation2Option3)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {translations.transportation2Option3}
                    </NormOption>
                </Container>
            </GradientBackground>
        </>
    );
};

export default Transportation2;