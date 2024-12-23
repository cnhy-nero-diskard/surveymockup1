// FeedbackForm.jsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BodyPartial from './BodyPartial';
import GradientBackground from './GradientBackground';
import imgOverlay from "../../components/img/ball.png";
import useTranslations from '../../components/shared/useTranslations';

const FeedbackFormContainer = styled(animated.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.selected {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }

  &:hover {
    background-color: rgb(65, 141, 255);
  }
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NextButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #45a049;
  }
`;

const FeedbackForm = ({ title, onNext, satisfactionOptions = {
    Dissatisfied: 1,
    Neutral: 2,
    Satisfied: 3,
    VerySatisfied: 4,
} }) => {
    const [feedback, setFeedback] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [placeholderText, setPlaceholderText] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

    // Fetch translations based on the selected language
    const translations = useTranslations('FeedbackForm', language);

    useEffect(() => {
        setPlaceholderText(translations.feedbackFormPlaceholderDefault);
    }, [language, translations]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        // Update placeholder text based on the selected option
        switch (option) {
            case 'Dissatisfied':
                setPlaceholderText(translations.feedbackFormPlaceholderDissatisfied);
                break;
            case 'Neutral':
                setPlaceholderText(translations.feedbackFormPlaceholderNeutral);
                break;
            case 'Satisfied':
                setPlaceholderText(translations.feedbackFormPlaceholderSatisfied);
                break;
            case 'VerySatisfied':
                setPlaceholderText(translations.feedbackFormPlaceholderVerySatisfied);
                break;
            default:
                setPlaceholderText(translations.feedbackFormPlaceholderDefault);
        }
    };

    const animation = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    const navigate = useNavigate(); // Initialize useNavigate
    const handleNextClick = () => {
        // Pass the selected option and feedback to the parent component
        const selectedOptionValue = satisfactionOptions[selectedOption];
        onNext(selectedOptionValue, feedback);
        navigate('/'); // Navigate to the next question
    };

    return (
        <><BodyPartial />
            <GradientBackground overlayImage={imgOverlay} opacity={0.15} blendMode='screen'>
                <FeedbackFormContainer style={animation}>
                    <Title>{title || translations.feedbackFormTitle}</Title>
                    <OptionsContainer>
                        {Object.keys(satisfactionOptions).map((option) => (
                            <OptionButton
                                key={option}
                                className={selectedOption === option ? 'selected' : ''}
                                onClick={() => handleOptionClick(option)}
                            >
                                {translations[`feedbackFormOption${option}`]}
                            </OptionButton>
                        ))}
                    </OptionsContainer>
                    <FeedbackTextarea
                        placeholder={placeholderText}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <NextButton onClick={handleNextClick}>{translations.feedbackFormNextButton}</NextButton>
                </FeedbackFormContainer>
            </GradientBackground>
        </>);
};

export default FeedbackForm;