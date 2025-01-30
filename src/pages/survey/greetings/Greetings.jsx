import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgoverlay from "../../../components/img/commentsbg.png";
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import useTranslations from '../../../components/utils/useTranslations';
import { GREETINGS } from '../../../components/utils/componentConstants';
import { NextButtonU } from '../../../components/utils/styles1';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: white;
  text-align: justify;
`;

const Button = styled(animated.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background: 'linear-gradient(135deg, #95b1ed, #3abde9)';

  &:hover {
    background-color: #0056b3;
  }
`;

const Greetings = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations(GREETINGS, language);

  const buttonProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 12 },
  });

  const handleStartSurvey = () => {
    // Prepare the survey response data
    const surveyResponses = [
      {
        surveyquestion_ref: 'CONSENT', // Custom code for consent
        response_value: 'true', // Consent given
      },
    ];

    // Submit survey responses using the axios util function
    submitSurveyResponses(surveyResponses)
      .then(() => {
        console.log('Survey responses submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting survey responses:', error);
      });
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <Container>
          <Title>{translations.greetingsTitle}</Title>
          <Subtitle>{translations.greetingsInvitation}</Subtitle>
          <Subtitle>{translations.greetingsDOTSurvey}</Subtitle>
          <Paragraph>{translations.greetingsSurveyPurpose}</Paragraph>
          <Paragraph>{translations.greetingsDataPrivacy}</Paragraph>
          <NextButtonU style={buttonProps} onClick={handleStartSurvey}>
            {translations.greetingsStartSurvey}
          </NextButtonU>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Greetings;
