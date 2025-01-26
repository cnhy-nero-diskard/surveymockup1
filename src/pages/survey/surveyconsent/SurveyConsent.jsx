import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SurveyConsent.css';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SurveyConsent = () => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  });

  const textProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 400,
  });

  const buttonProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 600,
  });

  const notify = () => toast(translations.SurveyConsentAgreeToast || 'Thank you for agreeing to participate!');

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/texts?language=${language}&component=SurveyConsent`);
        setTranslations(response.data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [language]);

  return (
    <>
      <BodyPartial />

      <GradientBackground>
        <div className="containerr">
          <animated.h1 className="title" style={titleProps}>{translations.SurveyConsentTitle || 'Hello, our beloved visitors'}</animated.h1>
          <animated.p className="text" style={textProps}>
            {translations.SurveyConsentDescription || 'Thank you for taking part in our survey for the Department of Tourism. This survey aims to improve tourism services, and your participation is voluntary. You can stop at any time without any consequences. Your responses will be kept anonymous and used only for the purpose of this survey.'}
          </animated.p>
          <animated.button className="button" style={buttonProps} onClick={() => { notify(); handleNextClick(); }}>
            {translations.SurveyConsentAgreeButton || 'AGREE'}
          </animated.button>
        </div>
      </GradientBackground>

      <ToastContainer />
    </>
  );
};

export default SurveyConsent;