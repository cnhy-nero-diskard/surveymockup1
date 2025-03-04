import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BodyPartial from './BodyPartial';
import GradientBackground from './GradientBackground';
import imgOverlay from "../../components/img/ball.png";
import useTranslations from '../utils/useTranslations';
import { submitSurveyResponses } from '../utils/sendInputUtils';
import { QuestionText } from '../utils/styles1';

const FeedbackFormContainer = styled(animated.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
`;



const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;
`;

const OptionButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  border: 2px solid #ddd;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.selected {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
    transform: scale(1.05);
  }

  &:hover {
    border-color: #4caf50;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
  }
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  margin-bottom: 24px;
  border: 2px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

const NextButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 25px;
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const WarningMessage = styled(animated.div)`
  color: #d32f2f;
  margin-bottom: 16px;
  text-align: center;
  font-size: 0.9rem;
  padding: 8px;
  background-color: rgba(211, 47, 47, 0.1);
  border-radius: 8px;
`;

/**
 * FeedbackForm component allows users to provide feedback on their satisfaction level.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the feedback form.
 * @param {Function} props.onNext - Callback function to handle the next action.
 * @param {string} props.squestion_identifier - Identifier for the survey question.
 * @param {Object} [props.satisfactionOptions] - Options for satisfaction levels with default values.
 * @param {number} [props.satisfactionOptions.Dissatisfied=1] - Value for Dissatisfied option.
 * @param {number} [props.satisfactionOptions.Neutral=2] - Value for Neutral option.
 * @param {number} [props.satisfactionOptions.Satisfied=3] - Value for Satisfied option.
 * @param {number} [props.satisfactionOptions.VerySatisfied=4] - Value for Very Satisfied option.
 *
 * @returns {JSX.Element} The rendered FeedbackForm component.
 */
const FeedbackForm = ({ title, onNext, squestion_identifier, satisfactionOptions = {
    Dissatisfied: 1,
    Neutral: 2,
    Satisfied: 3,
    VerySatisfied: 4,
} }) => {
    const [feedback, setFeedback] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [placeholderText, setPlaceholderText] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const [isFormValid, setIsFormValid] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const translations = useTranslations('FeedbackForm', language);

    useEffect(() => {
        setPlaceholderText(translations.feedbackFormPlaceholderDefault);
    }, [language, translations]);

    useEffect(() => {
        setIsFormValid(selectedOption !== null && feedback.trim().length >= 20);
    }, [selectedOption, feedback]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);

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

    const warningAnimation = useSpring({
        opacity: showWarning ? 1 : 0,
        transform: showWarning ? 'translateY(0)' : 'translateY(-10px)',
        config: { tension: 300, friction: 20 },
    });

    const navigate = useNavigate();

    const handleNextClick = async () => {
        if (!isFormValid) {
            setShowWarning(true);
            return;
        }

        const surveyResponses = [];

        if (selectedOption) {
            surveyResponses.push({
                surveyquestion_ref: 'SATLV' + squestion_identifier,
                response_value: selectedOption,
            });
        }

        if (feedback) {
            surveyResponses.push({
                surveyquestion_ref: 'FDBK' + squestion_identifier,
                response_value: feedback,
            });
        }

        try {
            await submitSurveyResponses(surveyResponses);
            onNext(selectedOption, feedback);
        } catch (error) {
            console.error('Error submitting survey responses:', error);
        }
    };

    return (
        <><BodyPartial />
            <GradientBackground overlayImage={imgOverlay}
                opacity={0.15}
                blendMode='screen'
                buttonAppear={isFormValid}
                handleNextClick={handleNextClick}

            >
                <FeedbackFormContainer style={animation}>
                    <QuestionText>{title || translations.feedbackFormTitle}</QuestionText>
                    <OptionsContainer>
                        {Object.keys(satisfactionOptions).map((option) => (
                            <OptionButton
                                key={option}
                                className={selectedOption === option ? 'selected' : ''}
                                onClick={() => handleOptionClick(option)}
                                aria-pressed={selectedOption === option}
                            >
                                {translations[`feedbackFormOption${option}`]}
                            </OptionButton>
                        ))}
                    </OptionsContainer>
                    <FeedbackTextarea
                        placeholder={placeholderText}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        aria-label="Feedback textarea"
                    />
                    {showWarning && (
                        <WarningMessage style={warningAnimation}>
                            {translations.feedbackFormWarning}
                        </WarningMessage>
                    )}
                </FeedbackFormContainer>
            </GradientBackground>
        </>
    );
};

export default FeedbackForm;
