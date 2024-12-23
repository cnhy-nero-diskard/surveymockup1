import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './VisitCounterR.css'; // Import the CSS file
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/city.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import { VISITFREQUENCYFORM } from '../../components/shared/componentConstants';

const VisitCounterR = ({ title }) => {
  const [visitCount, setVisitCount] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  const handleChoice = (value) => {
    // Map the placeholder values to numerical values
    const numericalValue = value === "1x" ? 1 : value === "2x" ? 2 : 3;
    setVisitCount(numericalValue);
  };

  const navigate = useNavigate(); // Initialize useNavigate

  const handleNextClick = () => {
    console.log(`Selected visit count (numerical): ${visitCount}`);
    navigate('/'); // Navigate to the next question
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    transform: visitCount ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  const translations = useTranslations(VISITFREQUENCYFORM, language);

  return (
    <>
      <BodyPartial />
      <GradientBackground imgOverlay={imgOverlay}>
        <Container>
          <animated.div className="container" style={containerAnimation}>
            <h2 className="title">{title}</h2>
            <div className="button-group">
              <button
                className={`choice-button ${visitCount === 1 ? "selected" : ""}`}
                onClick={() => handleChoice("1x")}
              >
                {translations.VisitFrequencyForm_Option1x || "1x"}
              </button>
              <button
                className={`choice-button ${visitCount === 2 ? "selected" : ""}`}
                onClick={() => handleChoice("2x")}
              >
                {translations.VisitFrequencyForm_Option2x || "2x"}
              </button>
              <button
                className={`choice-button ${visitCount === 3 ? "selected" : ""}`}
                onClick={() => handleChoice("3x or more")}
              >
                {translations.VisitFrequencyForm_Option3xOrMore || "3x or more"}
              </button>
            </div>
            <animated.button className="next-button" style={buttonAnimation} onClick={handleNextClick}>
              {translations.VisitFrequencyForm_NextButton || "NEXT"}
            </animated.button>
          </animated.div>
        </Container>
      </GradientBackground>
    </>
  );
};

export default VisitCounterR;