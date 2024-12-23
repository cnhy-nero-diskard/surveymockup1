// src/page3.jsx

import React, { useState, useEffect } from 'react';
import './MainPurpose.css'; // Import the CSS file for styling
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgoverlay from "../../components/img/question.png";
import { useNavigate } from 'react-router-dom';
import { Button } from 'style-components';
import axios from 'axios';
import { MAINPURPOSE as COMPONENT }  from '../../components/shared/componentConstants';
import useTranslations from '../../components/shared/useTranslations';  

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

  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
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