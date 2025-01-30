import React, { useState, useEffect } from 'react';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { motion } from 'framer-motion';
import './SurveyEvaluation05.css';
import imgoverlay from "../../../components/img/shutter.png";
import useTranslations from '../../../components/shared/useTranslations';
import { NextButtonU } from '../../../components/shared/styles1';
import { submitSurveyResponses } from '../../../components/shared/sendDataBindInput';

const SurveyEvaluation05 = () => {
  const [responses, setResponses] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const translations = useTranslations('SurveyEvaluation05', language);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    updateResponse('RAT01', value);
  };

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    updateResponse('PREF01', value);
  };

  const handleResultsPreferenceChange = (event) => {
    const value = event.target.value;
    updateResponse('RES01', value);
  };

  const updateResponse = (questionRef, value) => {
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(response => response.surveyquestion_ref === questionRef);
      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex].response_value = value;
        return updatedResponses;
      } else {
        return [...prevResponses, { surveyquestion_ref: questionRef, response_value: value }];
      }
    });
  };

  const handleSubmit = () => {
    submitSurveyResponses(responses)
      .then(() => {
        console.log('Responses submitted successfully');
        // Optionally, you can redirect or show a success message here
      })
      .catch((error) => {
        console.error('Failed to submit responses:', error);
        // Optionally, you can show an error message here
      });
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <motion.div 
          className="survey-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="survey-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {translations.surveyEvaluation05Header}
          </motion.h1>
          
          {/* Question 1 */}
          <motion.div 
            className="survey-question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          >
            <p>{translations.surveyEvaluation05Question1}</p>
            <div className="survey-options">
              <label>
                <input 
                  type="radio" 
                  name="results" 
                  value="yes" 
                  onChange={handleResultsPreferenceChange}
                /> {translations.surveyEvaluation05OptionYes}
              </label>
              <label>
                <input 
                  type="radio" 
                  name="results" 
                  value="no" 
                  onChange={handleResultsPreferenceChange}
                /> {translations.surveyEvaluation05OptionNo}
              </label>
            </div>
          </motion.div>

          {/* Question 2 */}
          <motion.div 
            className="survey-question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          >
            <p>{translations.surveyEvaluation05Question2}</p>
            <div className="survey-options">
              {[1, 2, 3, 4].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    onChange={handleRatingChange}
                  /> {value}
                </label>
              ))}
            </div>
          </motion.div>

          {/* Question 3 */}
          <motion.div 
            className="survey-question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          >
            <p>{translations.surveyEvaluation05Question3}</p>
            <div className="survey-options">
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="like"
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionLike}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="expect"
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionExpect}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="dontCare"
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionDontCare}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="dontLike"
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionDontLike}
              </label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <NextButtonU onClick={handleSubmit}>
            {translations.surveyEvaluation05ButtonNext}
          </NextButtonU>
        </motion.div>
      </GradientBackground>
    </>
  );
};

export default SurveyEvaluation05;