// OpenEnded1.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../components/shared/styles1';
import imgoverlay from "../../components/img/review.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

const OpenEnded1 = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const translations = useTranslations('OpenEnded1', language);

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        console.log(`Selected: ${button}`);
    };

    const navigate = useNavigate(); // Initialize useNavigate
    const handleNextClick = () => {
        navigate('/'); // Navigate to the next question
    };

    useEffect(() => {
        // Update translations when language changes
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

                    {/* Emoji Buttons */}
                    <div>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('DISSATISFIED')}
                            selected={selectedButton === 'DISSATISFIED'}
                            tabIndex={0}
                            aria-label="Dissatisfied"
                        >
                            {translations.openEnded1Dissatisfied}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('NEUTRAL')}
                            selected={selectedButton === 'NEUTRAL'}
                            tabIndex={0}
                            aria-label="Neutral"
                        >
                            {translations.openEnded1Neutral}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('SATISFIED')}
                            selected={selectedButton === 'SATISFIED'}
                            tabIndex={0}
                            aria-label="Satisfied"
                        >
                            {translations.openEnded1Satisfied}
                        </EmojiButton>
                        <EmojiButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick('VERY SATISFIED')}
                            selected={selectedButton === 'VERY SATISFIED'}
                            tabIndex={0}
                            aria-label="Very Satisfied"
                        >
                            {translations.openEnded1VerySatisfied}
                        </EmojiButton>
                    </div>

                    <Paragraph>{translations.openEnded1FeedbackRequest}</Paragraph>

                    {/* Large Text Field */}
                    <TextField placeholder={translations.openEnded1TextFieldPlaceholder} />

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

export default OpenEnded1;