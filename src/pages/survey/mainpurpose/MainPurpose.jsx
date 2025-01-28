import styled, { keyframes } from 'styled-components';
import React, { useState } from 'react';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/question.png";
import { useNavigate } from 'react-router-dom';
import { MAINPURPOSE as COMPONENT }  from '../../../components/shared/componentConstants';
import useTranslations from '../../../components/shared/useTranslations';  
import { submitSurveyResponses } from '../../../components/shared/apiUtils';

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

// Styled components
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  background:rgb(184, 201, 255);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 44, 241, 0.69);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  cursor: pointer;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
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
`;

const MainPurpose = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [showOptions, setShowOptions] = useState(true); // State to control visibility
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const navigate = useNavigate(); // Initialize useNavigate

  const translations = useTranslations(COMPONENT, language);

  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  const toggleOptionsVisibility = () => {
    setShowOptions(!showOptions); // Toggle the visibility state
  };

  const handleNextClick = async () => {
    // Prepare the data to be sent
    const purposes = [
        { id: 'pleasureVacation', value: 'Pleasure/Vacation', ref: 'PUR01' },
        { id: 'businessProfessional', value: 'Business/Professional Work', ref: 'PUR02' },
        { id: 'educationalFieldtrip', value: 'Educational/Fieldtrip', ref: 'PUR03' },
        { id: 'healthWellnessRetirement', value: 'Health/Wellness/Retirement', ref: 'PUR04' },
        { id: 'visitFriendsRelatives', value: 'Visit Friends and Relatives', ref: 'PUR05' },
        { id: 'meetingIncentiveConventionExhibition', value: 'Meeting, Incentive, Convention, Exhibition', ref: 'PUR06' },
    ];

    try {
      // Create an array to hold all survey responses
      const surveyResponses = [];
  
      // Loop through each purpose and collect the responses
      for (const purpose of purposes) {
          const checkbox = document.getElementById(purpose.id);
          const surveyResponse = {
              surveyquestion_ref: purpose.ref, // Unique reference for each purpose
              response_value: checkbox.checked ? 'YES' : 'NO', // Send 'YES' or 'NO' based on checkbox state
          };
  
          // Add the response to the array
          surveyResponses.push(surveyResponse);
      }
  
      // Send the array of responses in a single request
      await submitSurveyResponses(surveyResponses);

        navigate('/'); // Navigate to the next question
    } catch (error) {
        console.error('Error submitting survey responses:', error);
        alert('Failed to submit survey responses. Please try again.');
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <Container>
          <Header>{translations.MainPurposeHeader}</Header>
          <form>
            {showOptions && ( // Conditionally render the options
              <OptionsGrid>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="pleasureVacation"
                    value="Pleasure/Vacation"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="pleasureVacation">
                    {translations.MainPurposePleasureVacation}
                  </Label>
                </Option>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="businessProfessional"
                    value="Business/Professional Work"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="businessProfessional">
                    {translations.MainPurposeBusinessProfessional}
                  </Label>
                </Option>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="educationalFieldtrip"
                    value="Educational/Fieldtrip"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="educationalFieldtrip">
                    {translations.MainPurposeEducationalFieldtrip}
                  </Label>
                </Option>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="healthWellnessRetirement"
                    value="Health/Wellness/Retirement"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="healthWellnessRetirement">
                    {translations.MainPurposeHealthWellnessRetirement}
                  </Label>
                </Option>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="visitFriendsRelatives"
                    value="Visit Friends and Relatives"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="visitFriendsRelatives">
                    {translations.MainPurposeVisitFriendsRelatives}
                  </Label>
                </Option>
                <Option>
                  <CustomCheckbox
                    type="checkbox"
                    id="meetingIncentiveConventionExhibition"
                    value="Meeting, Incentive, Convention, Exhibition"
                    onChange={handlePurposeChange}
                  />
                  <Label htmlFor="meetingIncentiveConventionExhibition">
                    {translations.MainPurposeMeetingIncentiveConventionExhibition}
                  </Label>
                </Option>
              </OptionsGrid>
            )}
          </form>
          <NextButton onClick={handleNextClick}>
            {translations.MainPurposeNextButton}
          </NextButton>
        </Container>
      </GradientBackground>
    </>
  );
};

export default MainPurpose;