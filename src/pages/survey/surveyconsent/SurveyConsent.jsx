import React, { useContext, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // Import the submit function
import axios from 'axios';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import SurveyRoutesContext from '../../../routes/__SurveyRoutesContext';
import { UnifiedContext } from '../../../routes/UnifiedContext';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  background: linear-gradient(135deg, #95b1ed, #3abde9);
  font-family: Arial, sans-serif;
  border-radius: 40px;
`;

const Title = styled(animated.h1)`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 1.8rem;
  }

  @media (min-width: 901px) {
    font-size: 2rem;
  }
`;

const Text = styled(animated.p)`
  font-size: 20px;
  text-align: justify;
  margin-bottom: 20px;
  padding: 0 2px 0 2px;
  color:rgb(255, 255, 255);
  width: 100%;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    font-size: 1.5rem;
  }

  @media (min-width: 901px) {
    font-size: 1.8rem;
  }
`;

const Button = styled(animated.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 80%;
  max-width: 300px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 600px) {
    width: 90%;
    font-size: 1rem;
  }

  @media (min-width: 601px) and (max-width: 900px) {
    width: 70%;
    font-size: 1rem;
  }

  @media (min-width: 901px) {
    width: 50%;
    font-size: 1rem;
  }
`;

const SurveyConsent = () => {
  const [translations, setTranslations] = useState({});
  const [language, ] = useState(localStorage.getItem('selectedLanguage') || 'en');

  const {routes} = useContext(UnifiedContext);
  const [setCurrentStep] = useState();
  const currentStepIndex = useCurrentStepIndex(routes);
  const {activeBlocks } = useContext(UnifiedContext);

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

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        console.log("GET SURVEYPROGRESS")
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        setCurrentStep(response.data.currentStep);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, [navigate]);

  const handleNextClick = async () => {
    const responses = [
      { surveyquestion_ref: 'CONS1', response_value: 'Agreed' },
    ];


    try {
      await submitSurveyResponses(responses); // Submit the responses
      notify();
      goToNextStep(currentStepIndex, navigate);
    } catch (error) {
      console.error('Error submitting survey responses:', error);
    }
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/texts?language=${language}&component=SurveyConsent`,
          { withCredentials: true }
        );
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

      <GradientBackground handleNextClick={handleNextClick}>
        <Container>
          <Title style={titleProps}>{translations.SurveyConsentTitle}</Title>
          <Text style={textProps}>
            {translations.SurveyConsentDescription || 'Thank you for taking part in our survey for the Department of Tourism. This survey aims to improve tourism services, and your participation is voluntary. You can stop at any time without any consequences. Your responses will be kept anonymous and used only for the purpose of this survey.'}
          </Text>
          {/* <Button style={buttonProps} onClick={handleNextClick}>
            {translations.SurveyConsentAgreeButton || 'AGREE'}
          </Button> */}
        </Container>
      </GradientBackground>

      <ToastContainer />
    </>
  );
};

export default SurveyConsent;