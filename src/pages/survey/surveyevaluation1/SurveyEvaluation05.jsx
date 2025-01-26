import React, { useState, useEffect } from 'react';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { motion } from 'framer-motion';
import './SurveyEvaluation05.css'; // Ensure you have a CSS file for styling
import imgoverlay from "../../../components/img/shutter.png";
import useTranslations from '../../../components/shared/useTranslations';

const SurveyEvaluation05 = () => {
  const [surveyRating, setSurveyRating] = useState(1);
  const [surveyPreference, setSurveyPreference] = useState('');
  const [resultsPreference, setResultsPreference] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const translations = useTranslations('SurveyEvaluation05', language);

  const handleRatingChange = (event) => {
    setSurveyRating(parseInt(event.target.value));
  };

  const handlePreferenceChange = (event) => {
    setSurveyPreference(event.target.value);
  };

  const handleResultsPreferenceChange = (event) => {
    setResultsPreference(event.target.value);
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
                  checked={resultsPreference === 'yes'}
                  onChange={handleResultsPreferenceChange}
                /> {translations.surveyEvaluation05OptionYes}
              </label>
              <label>
                <input 
                  type="radio" 
                  name="results" 
                  value="no" 
                  checked={resultsPreference === 'no'}
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
                    checked={surveyRating === value}
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
                  checked={surveyPreference === 'like'}
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionLike}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="expect"
                  checked={surveyPreference === 'expect'}
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionExpect}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="dontCare"
                  checked={surveyPreference === 'dontCare'}
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionDontCare}
              </label>
              <label>
                <input
                  type="radio"
                  name="preference"
                  value="dontLike"
                  checked={surveyPreference === 'dontLike'}
                  onChange={handlePreferenceChange}
                /> {translations.surveyEvaluation05OptionDontLike}
              </label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button 
            className="submit-button"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {translations.surveyEvaluation05ButtonNext}
          </motion.button>
        </motion.div>
      </GradientBackground>
    </>
  );
};

export default SurveyEvaluation05;