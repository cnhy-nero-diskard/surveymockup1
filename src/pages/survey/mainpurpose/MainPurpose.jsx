// src/page3.jsx

import React, { useState } from 'react';
import './MainPurpose.css'; // Import the CSS file for styling
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/question.png";
import { useNavigate } from 'react-router-dom';
import { Button } from 'style-components';
import { MAINPURPOSE as COMPONENT }  from '../../../components/shared/componentConstants';
import useTranslations from '../../../components/shared/useTranslations';  
import { submitSurveyResponse } from '../../../components/shared/apiUtils';

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
        // Send each purpose as a separate POST request using the utility function
        for (const purpose of purposes) {
            const checkbox = document.getElementById(purpose.id);
            const surveyResponse = {
                surveyquestion_ref: purpose.ref, // Unique reference for each purpose
                response_value: checkbox.checked ? 'YES' : 'NO', // Send 'YES' or 'NO' based on checkbox state
            };

            await submitSurveyResponse(surveyResponse);
        }

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
        <div className="containerr">
          <h1>{translations.MainPurposeHeader}</h1>
          <form>
            {showOptions && ( // Conditionally render the options
              <div className="options-grid">
                <div className="option">
                  <input
                    type="checkbox"
                    id="pleasureVacation"
                    value="Pleasure/Vacation"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="pleasureVacation" className="custom-checkbox">
                    {translations.MainPurposePleasureVacation}
                  </label>
                </div>
                <div className="option">
                  <input
                    type="checkbox"
                    id="businessProfessional"
                    value="Business/Professional Work"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="businessProfessional" className="custom-checkbox">
                    {translations.MainPurposeBusinessProfessional}
                  </label>
                </div>
                <div className="option">
                  <input
                    type="checkbox"
                    id="educationalFieldtrip"
                    value="Educational/Fieldtrip"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="educationalFieldtrip" className="custom-checkbox">
                    {translations.MainPurposeEducationalFieldtrip}
                  </label>
                </div>
                <div className="option">
                  <input
                    type="checkbox"
                    id="healthWellnessRetirement"
                    value="Health/Wellness/Retirement"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="healthWellnessRetirement" className="custom-checkbox">
                    {translations.MainPurposeHealthWellnessRetirement}
                  </label>
                </div>
                <div className="option">
                  <input
                    type="checkbox"
                    id="visitFriendsRelatives"
                    value="Visit Friends and Relatives"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="visitFriendsRelatives" className="custom-checkbox">
                    {translations.MainPurposeVisitFriendsRelatives}
                  </label>
                </div>
                <div className="option">
                  <input
                    type="checkbox"
                    id="meetingIncentiveConventionExhibition"
                    value="Meeting, Incentive, Convention, Exhibition"
                    onChange={handlePurposeChange}
                  />
                  <label htmlFor="meetingIncentiveConventionExhibition" className="custom-checkbox">
                    {translations.MainPurposeMeetingIncentiveConventionExhibition}
                  </label>
                </div>
              </div>
            )}
          </form>
          <Button onClick={handleNextClick} className="next-button">
            {translations.MainPurposeNextButton}
          </Button>
        </div>
      </GradientBackground>
    </>
  );
};

export default MainPurpose;