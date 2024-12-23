import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import withBackground from '../../components/partials/withBackground';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgoverlay from "../../components/img/commentsbg.png";
import useTranslations from '../../components/shared/useTranslations';
import { GREETINGS } from '../../components/shared/componentConstants';

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
          <Button style={buttonProps}>{translations.greetingsStartSurvey}</Button>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Greetings;