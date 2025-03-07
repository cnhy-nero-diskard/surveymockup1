import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, TextField, OptionButton } from '../../../components/utils/styles1';
import imgoverlay from "../../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';

const OpenEnded1Services = () => {
    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks } = useContext(UnifiedContext);

    const [selectedButton, setSelectedButton] = useState(null);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const [buttonAppear, setButtonAppear] = useState(false);
    const translations = useTranslations('OpenEnded1', language);

    const navigate = useNavigate();

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        console.log(`Selected: ${button}`);
    };

    const handleNextClick = async () => {
        const surveyResponses = [
            { surveyquestion_ref: 'SATLVHTL', response_value: selectedButton },
            { surveyquestion_ref: 'FDBKHTL', response_value: textFieldValue }
        ];

        try {
            await submitSurveyResponses(surveyResponses);
            goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    useEffect(() => {
        setLanguage(localStorage.getItem('selectedLanguage'));
    }, [localStorage.getItem('selectedLanguage')]);

    useEffect(() => {
        // Check if all input fields are valid
        if (selectedButton !== null && textFieldValue.length >= 20) {
            setButtonAppear(true);
        } else {
            setButtonAppear(false);
        }
    }, [selectedButton, textFieldValue]);

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.2} handleNextClick={handleNextClick} buttonAppear={buttonAppear}>
                <Container
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{translations.openEnded1Title}</Title>

                        {['Dissatisfied', 'Neutral', 'Satisfied', 'VerySatisfied'].map((option) => (
                            <OptionButton
                                style={{marginBottom:5}}
                                as={motion.button}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                key={option}
                                className={selectedButton === option ? `selected ${option}` : ''}
                                onClick={() => handleButtonClick(option)}
                                tabIndex={0}
                                aria-label={option}
                            >
                                {translations[`openEnded1${option}`]}
                            </OptionButton>
                        ))}

                    <Paragraph>{translations.openEnded1FeedbackRequest}</Paragraph>
                    <TextField 
                        placeholder={translations.openEnded1TextFieldPlaceholder} 
                        value={textFieldValue} 
                        onChange={(e) => setTextFieldValue(e.target.value)}
                    />
                </Container>
            </GradientBackground>
        </>
    );
};

export default OpenEnded1Services;
