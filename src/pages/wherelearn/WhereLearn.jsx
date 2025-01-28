import React, { useState, useEffect } from 'react';
import './WhereLearn.css';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import imgOverlay from "../../components/img/soundwave.png";
import { Container } from '../../components/shared/styles1';
import useTranslations from '../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../components/shared/apiUtils';
const WhereLearn = () => {
  const [selectedSource, setSelectedSource] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const [animate, setAnimate] = useState(false);

  // Use the useTranslations hook to get translations
  const translations = useTranslations('WhereLearn', language);

  // Define the survey question reference (strictly 5 chars long, all caps)
  const surveyQuestionRef = 'WLRN1'; // Example: WLRN1 for "Where Learn"

  // Handle source selection and prepare the data for submission
  const handleSourceSelection = (value) => {
    setSelectedSource(value);

    // Prepare the survey response object
    const surveyResponse = {
      surveyquestion_ref: surveyQuestionRef,
      response_value: value, // The selected value (e.g., 'Friends,Family/Relatives')
    };

    // Submit the survey response
    submitSurveyResponses([surveyResponse])
      .then(() => {
        // Navigate to the next page after successful submission
        navigate('/'); // Replace '/next-page' with the actual path to your next page
      })
      .catch((error) => {
        console.error('Error submitting survey response:', error);
      });
  };

  // Trigger the animation after the component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.1} blendMode='screen'>
        <Container className={animate ? 'intro-animation' : ''}>
          <h2>{translations.whereLearnTitle}</h2>
          <form>
            <div className="text-button-group">
              {/* Text Buttons */}
              <button
                type="button"
                className={`text-button ${selectedSource === 'Friends,Family/Relatives' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Friends,Family/Relatives')}
              >
                {translations.whereLearnOptionFriendsFamily}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Books,Magazines,Articles' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Books,Magazines,Articles')}
              >
                {translations.whereLearnOptionBooksMagazines}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Online/Social Media' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Online/Social Media')}
              >
                {translations.whereLearnOptionOnlineSocialMedia}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Advertisements' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Advertisements')}
              >
                {translations.whereLearnOptionAdvertisements}
              </button>
            </div>
          </form>
        </Container>
      </GradientBackground>
    </>
  );
};

export default WhereLearn;