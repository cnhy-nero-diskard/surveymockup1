import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../../components/shared/styles1';
import imgoverlay from "../../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../../components/shared/apiUtils';
const OpenEndedLifestyle = () => {
    const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
    const [textFeedback, setTextFeedback] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
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
            navigate('/'); // Navigate to the next page after submission
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.2}>
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

                    {/* Next Button */}
                    <Button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextClick}
                        tabIndex={0}
                        aria-label="Next"
                    >
                        {translations.openEnded1NextButton}
                    </Button>
                </Container>
            </GradientBackground>
        </>
    );
};

export default OpenEndedLifestyle;
