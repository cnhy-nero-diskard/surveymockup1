import React, { useState, useEffect } from 'react';
import './Willrecom.css';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { motion } from 'framer-motion';
import imgoverlay from "../../components/img/shutter.png";
import { Container } from '../../components/shared/styles1';
import useTranslations from '../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../components/shared/apiUtils';
import { useNavigate } from 'react-router-dom';
const Willrecom = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const [responses, setResponses] = useState([]);
  const translations = useTranslations('Willrecom', language);

  const handleOptionClick = (option) => {
    // Create a new response object
    const newResponse = {
      surveyquestion_ref: 'WLRCM', // Example 5-character reference, all caps
      response_value: option
    };

    // Update the responses array
    setResponses([...responses, newResponse]);

    // Log the response for debugging
    console.log(`User selected: ${option}`);

    // Submit the responses to the backend
    submitSurveyResponses([newResponse])
      .then(() => {
        console.log('Response submitted successfully');

        // Optionally, navigate to the next page or show a success message
      })
      .catch((error) => {
        console.error('Failed to submit response:', error);
        // Optionally, show an error message to the user
      });
      navigate('/');
  };

  useEffect(() => {
    setLanguage(localStorage.getItem('selectedLanguage') || 'en');
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <Container>
          <motion.div
            className="image-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {translations.willrecomQuestion}
            </motion.div>
            <div className="options">
              <motion.button
                className="option-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleOptionClick('Yes')}
              >
                {translations.willrecomOptionYes}
              </motion.button>
              <motion.button
                className="option-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleOptionClick('No')}
              >
                {translations.willrecomOptionNo}
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Willrecom;