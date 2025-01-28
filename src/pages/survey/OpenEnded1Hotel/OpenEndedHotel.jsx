import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../../components/shared/styles1';
import imgoverlay from "../../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../../components/shared/apiUtils';

const OpenEndedHotel = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
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
            navigate('/'); // Navigate to the next question
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    useEffect(() => {
        setLanguage(localStorage.getItem('selectedLanguage'));
    }, [localStorage.getItem('selectedLanguage')]);

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.2} >
                <Container
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{translations.openEnded1Title}</Title>

                    <div>
                        {['Dissatisfied', 'Neutral', 'Satisfied', 'VerySatisfied'].map((option) => (
                            <EmojiButton
                                key={option}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleButtonClick(option)}
                                selected={selectedButton === option}
                                tabIndex={0}
                                aria-label={option}
                            >
                                {translations[`openEnded1${option}`]}
                            </EmojiButton>
                        ))}
                    </div>

                    <Paragraph>{translations.openEnded1FeedbackRequest}</Paragraph>
                    <TextField 
                        placeholder={translations.openEnded1TextFieldPlaceholder} 
                        value={textFieldValue} 
                        onChange={(e) => setTextFieldValue(e.target.value)}
                    />

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

export default OpenEndedHotel;
