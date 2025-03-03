import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../../components/utils/styles1';
import imgoverlay from "../../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const OpenEndedLifestyle = () => {
    const { routes } = useContext(UnifiedContext);
    const currentStepIndex = useCurrentStepIndex(routes);
    const { activeBlocks } = useContext(UnifiedContext);

    const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
    const [textFeedback, setTextFeedback] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const [buttonAppear, setButtonAppear] = useState(false); // New state for button visibility
    const translations = useTranslations('OpenEnded1', language);
    const navigate = useNavigate();

    useEffect(() => {
        setLanguage(localStorage.getItem('selectedLanguage'));
    }, [localStorage.getItem('selectedLanguage')]);

    const handleButtonClick = (level) => {
        setSelectedSatisfaction(level);
        console.log(`Selected: ${level}`);
    };

    const handleNextClick = async () => {
        const surveyResponses = [];

        if (selectedSatisfaction) {
            surveyResponses.push({
                surveyquestion_ref: 'SATLV', // Satisfaction Level
                response_value: selectedSatisfaction
            });
        }

        if (textFeedback.trim() !== '') {
            surveyResponses.push({
                surveyquestion_ref: 'FDBCK2', // Feedback Comment
                response_value: textFeedback
            });
        }

        try {
            await submitSurveyResponses(surveyResponses);
            goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    // Effect to control button visibility
    useEffect(() => {
        if (selectedSatisfaction !== null && textFeedback.length >= 20) {
            setButtonAppear(true);
        } else {
            setButtonAppear(false);
        }
    }, [selectedSatisfaction, textFeedback]);

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.2} buttonAppear={buttonAppear} handleNextClick={handleNextClick}>
                <Container
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{translations.openEnded1TitleLifestyle}</Title>

                    {/* Emoji Buttons */}
                    <div>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('DISSATISFIED')}
                            selected={selectedSatisfaction === 'DISSATISFIED'}
                            tabIndex={0}
                            aria-label="Dissatisfied"
                        >
                            {translations.openEnded1Dissatisfied}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('NEUTRAL')}
                            selected={selectedSatisfaction === 'NEUTRAL'}
                            tabIndex={0}
                            aria-label="Neutral"
                        >
                            {translations.openEnded1Neutral}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('SATISFIED')}
                            selected={selectedSatisfaction === 'SATISFIED'}
                            tabIndex={0}
                            aria-label="Satisfied"
                        >
                            {translations.openEnded1Satisfied}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('VERY SATISFIED')}
                            selected={selectedSatisfaction === 'VERY SATISFIED'}
                            tabIndex={0}
                            aria-label="Very Satisfied"
                        >
                            {translations.openEnded1VerySatisfied}
                        </EmojiButton>
                    </div>

                    <Paragraph>{translations.openEnded1FeedbackRequest}</Paragraph>

                    {/* Large Text Field */}
                    <TextField
                        placeholder={translations.openEnded1TextFieldPlaceholder}
                        value={textFeedback}
                        onChange={(e) => setTextFeedback(e.target.value)}
                    />

                </Container>
            </GradientBackground>
        </>
    );
};

export default OpenEndedLifestyle;
