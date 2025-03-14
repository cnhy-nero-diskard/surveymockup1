import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated, useSpring } from 'react-spring';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Container, Title } from '../utils/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { useNavigate } from 'react-router-dom';
import { submitSurveyResponses } from '../utils/sendInputUtils';
import { NextButtonU } from '../utils/styles1';
import useTranslations from '../utils/useTranslations';
import { useEffect } from 'react';
const SlidesContainer = styled.div`
  position: relative;
  max-width: 100%;
  height: 35vh;
  overflow: hidden;
`;

const Slide = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Label = styled.div`
  font-size: calc(1rem + 0.5vw);
  color: #fff;
  margin-bottom: 20px;
  background-color: #007bff;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EmojiSlider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

const EmojiDisplay = styled(animated.div)`
  font-size: 4rem;
  margin-left: 20px;
`;

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }
`;

const SliderSteps = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 25px;
`;

const StepMarker = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#007bff' : '#aaa')};
  transform: translateX(-50%);
`;

const EmojiButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const EmojiButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RatingSlider = ({ title, categories, onRatingComplete, surveyquestion_refs, entranslations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderValue, setSliderValue] = useState(2); // Default to neutral
  const [responses, setResponses] = useState([]); // Array to store responses
  const choosetoskip = useTranslations('RATINGSLIDER', localStorage.getItem('selectedLanguage')).chooseToSkipText

  const emojis = ['☹️', '😐', '🙂', '😄'];

  // Use useEffect to log responses after they are updated
  useEffect(() => {
    if (responses.length === categories.length) {
      // console.log(`RESPONSES: >>>> ${JSON.stringify(responses)}`);
      submitSurveyResponses(responses)
        .then(() => {
          onRatingComplete();
        })
        .catch((error) => {
          console.error('Error submitting survey responses:', error);
        });
    }
  }, [responses, categories.length, onRatingComplete]);

  const handleRating = (value) => {
    const currentCategory = entranslations[currentSlide];
    const response = {
      surveyquestion_ref: surveyquestion_refs + currentCategory.substring(0, 5).toUpperCase(),
      response_value: value.toString(),
    };

    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses, response];

      if (currentSlide < categories.length - 1) {
        setCurrentSlide(currentSlide + 1);
        setSliderValue(2);
      }

      return updatedResponses;
    });
  };

  const transitions = useTransition(currentSlide, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const [emojiSpring, emojiApi] = useSpring(() => ({
    opacity: 1,
    transform: 'scale(1)',
    config: { tension: 1000, friction: 100},
  }));

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);

    // Animate the emoji transition
    emojiApi.start({
      opacity: 0.5,
      transform: 'scale(0.8)',
      immediate: true,
      onRest: () => {
        emojiApi.start({
          opacity: 1,
          transform: 'scale(1.5)',
        });
      },
    });
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.2} blendMode='screen' buttonAppear={false}>
            <Title>{title}</Title>
            <Title style={{fontSize:'1rem'}}>{choosetoskip}</Title>
            
            <SlidesContainer>
              {transitions((style, index) => (
                <Slide style={style}>
                  <EmojiSlider>
                    <Label>{categories[index]}</Label>
                    <SliderContainer>
                      <Slider
                        type="range"
                        min="1"
                        max="4"
                        step="1" // Snap to discrete steps
                        value={sliderValue}
                        onChange={handleSliderChange}
                      />
                      <SliderSteps>
                        {[1, 2, 3, 4].map((step) => (
                          <StepMarker key={step} active={step === sliderValue} />
                        ))}
                      </SliderSteps>
                    </SliderContainer>
                    <EmojiButtons>
                      <NextButtonU onClick={() => handleRating(sliderValue)}>
                        Submit
                      </NextButtonU>
                    </EmojiButtons>
                  </EmojiSlider>
                  <EmojiDisplay style={emojiSpring}>
                    {emojis[sliderValue - 1]}
                  </EmojiDisplay>
                </Slide>
              ))}
            </SlidesContainer>
  
      </GradientBackground>
    </>
  );
};

export default RatingSlider;

