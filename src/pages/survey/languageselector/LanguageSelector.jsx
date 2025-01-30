import React, { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import GradientBackground from '../../../components/partials/GradientBackground';
import { Container, Title, Button } from '../../../components/utils/styles1';
import translate from "../../../components/img/translate.png";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../components/partials/LanguageContext';
import axios from 'axios';
import './LanguageSelector.css'
import BodyPartial from '../../../components/partials/BodyPartial';
import { NextButtonU } from '../../../components/utils/styles1';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const LanguageSelector = () => {
  const { setSelectedLanguage } = useLanguage(); // Access the context
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]); // State to hold the languages
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(null); // State to hold the selected language code
  const currentStepIndex = useCurrentStepIndex();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/languageselect`,
          { withCredentials: true }
        );
        const data = response.data;
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageSelect = (code) => {
    setSelectedLanguageCode(code); // Update the selected language code in state
    console.log(`Selected language: ${code}`);
  };

  const handleNextClick = async () => {
    if (selectedLanguageCode) {
      setSelectedLanguage(selectedLanguageCode); // Update the selected language in context

      // Prepare the data for the POST request
      const postData = {
        surveyquestion_ref: 'LANGPERF', // Example reference, adjust as needed
        response_value : selectedLanguageCode
      };

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/submit`, postData, {
          withCredentials: true
        });
        console.log('Response saved:', response.data);
      } catch (error) {
        console.error('Error saving response:', error);
      }

      goToNextStep(currentStepIndex, navigate);
    } else {
      alert('Please select a language before proceeding.');
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={translate}>
        <Title>Select Your Language</Title>
        <Container>
          <div className="language-buttons-grid">
            {languages.map((language) => (
              <button
                key={language.code}
                className="language-button"
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className={`fi fi-${language.flag} flag-icon`}></span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
          <NextButtonU onClick={handleNextClick} className="next-button">
            NEXT
          </NextButtonU>
        </Container>
      </GradientBackground>
    </>
  );
};

export default LanguageSelector;