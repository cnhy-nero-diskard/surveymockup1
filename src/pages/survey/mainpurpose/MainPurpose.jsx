/**
 * @file MainPurpose.jsx
 * @description This component renders the main purpose survey question with multiple checkbox options.
 * It allows users to select one or more purposes for their travel and submits the responses to the server.
 *
 * @requires react
 * @requires styled-components
 * @requires react-router-dom
 * @requires ./../../../components/partials/BodyPartial
 * @requires ./../../../components/partials/GradientBackground
 * @requires ./../../../components/img/question.png
 * @requires ./../../../components/utils/componentConstants
 * @requires ./../../../components/utils/useTranslations
 * @requires ./../../../components/utils/sendInputUtils
 * @requires ./../../../routes/UnifiedContext
 * @requires ./../../../components/utils/useCurrentIndex
 * @requires ./../../../components/utils/navigationUtils
 */
import styled, { keyframes } from 'styled-components';
import React, { useContext, useState } from 'react';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/question.png";
import { useNavigate } from 'react-router-dom';
import { MAINPURPOSE as COMPONENT } from '../../../components/utils/componentConstants';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Header = styled.h1`
  font-size: 2.1rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


export const Option = styled.div`
  display: flex;
  align-items: center;
  background: ${({ selected }) => (selected ? 'rgb(8, 65, 252)' : 'rgb(184, 201, 255)')};
  padding: 15px 20px;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(29, 43, 105, 0.69);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: ${({ selected }) => (selected ? '#6a11cb' : '#2575fc')};
    box-shadow: 0 6px 8px rgba(29, 43, 105, 0.8);
  }

  &:active {
    transform: scale(0.95);
  }
      &:focus-within {
    outline: 2px solid #6a11cb;
    outline-offset: 2px;
  }
`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 15px;
  cursor: pointer;
  opacity: 0;
  position: absolute;

  &:checked + label {
    color: white;
  }
`;

export const Label = styled.label`
  font-size: 1.3rem;
  color: ${({ selected }) => (selected ? 'white' : '#555')};
  cursor: pointer;
  transition: color 0.3s ease-in-out;
`;

export const NextButton = styled.button`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    animation: none;
  }
`;

/**
 * @function MainPurpose
 * @description A survey component that allows users to select the main purpose of their visit.
 * It renders a form with several options, each represented by a checkbox.
 * Upon submission, the selected purpose is sent to the server, and the user is navigated to the next step in the survey.
 *
 * @component
 * @returns {JSX.Element} The MainPurpose component.
 *
 * @example
 * // Usage:
 * <MainPurpose />
 */
const MainPurpose = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const navigate = useNavigate();

  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const translations = useTranslations(COMPONENT, language);

  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  const handleNextClick = async () => {
    setIsSubmitting(true);
    const purposes = [
      { id: 'pleasureVacation', value: 'Pleasure/Vacation', ref: 'PUR01' },
      { id: 'businessProfessional', value: 'Business/Professional Work', ref: 'PUR02' },
      { id: 'educationalFieldtrip', value: 'Educational/Fieldtrip', ref: 'PUR03' },
      { id: 'healthWellnessRetirement', value: 'Health/Wellness/Retirement', ref: 'PUR04' },
      { id: 'visitFriendsRelatives', value: 'Visit Friends and Relatives', ref: 'PUR05' },
      { id: 'meetingIncentiveConventionExhibition', value: 'Meeting, Incentive, Convention, Exhibition', ref: 'PUR06' },
    ];

    try {
      const surveyResponses = purposes.map(purpose => ({
        surveyquestion_ref: purpose.ref,
        response_value: document.getElementById(purpose.id).checked ? 'YES' : 'NO',
      }));

      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Error submitting survey responses:', error);
      // alert('Failed to submit survey responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} handleNextClick={handleNextClick} buttonAppear={selectedPurpose !== ''}>
        <Container>
          <Header>{translations.MainPurposeHeader}</Header>
          <form>
            {showOptions && (
              <OptionsGrid>
                {[
                  { id: 'pleasureVacation', label: translations.MainPurposePleasureVacation },
                  { id: 'businessProfessional', label: translations.MainPurposeBusinessProfessional },
                  { id: 'educationalFieldtrip', label: translations.MainPurposeEducationalFieldtrip },
                  { id: 'healthWellnessRetirement', label: translations.MainPurposeHealthWellnessRetirement },
                  { id: 'visitFriendsRelatives', label: translations.MainPurposeVisitFriendsRelatives },
                  { id: 'meetingIncentiveConventionExhibition', label: translations.MainPurposeMeetingIncentiveConventionExhibition },
                ].map(({ id, label }) => (
                  <Option key={id} selected={selectedPurpose === id}>
                    <CustomCheckbox
                      type="checkbox"
                      id={id}
                      value={label}
                      onChange={handlePurposeChange}
                      aria-label={label}
                    />
                    <Label htmlFor={id} selected={selectedPurpose === id}>
                      {label}
                    </Label>
                  </Option>
                ))}
              </OptionsGrid>
            )}
          </form>
        </Container>
      </GradientBackground>
    </>
  );
};

export default MainPurpose;