import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated, useSpring } from 'react-spring';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Container, Title } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { useNavigate } from 'react-router-dom';

const RatingSlider = ({ title, categories, onRatingComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderValue, setSliderValue] = useState(2); // Default to neutral
  const navigate = useNavigate();

  const handleRating = (value) => {
    if (currentSlide < categories.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setSliderValue(2); // Reset slider to neutral for the next category
    } else {
      onRatingComplete(); // Call the callback when all ratings are done
    }
  };

  const transitions = useTransition(currentSlide, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const [sliderSpring, sliderApi] = useSpring(() => ({
    transform: 'scale(1)',
    config: { tension: 200, friction: 20 },
  }));

  const [emojiSpring, emojiApi] = useSpring(() => ({
    opacity: 1,
    transform: 'scale(1)',
    config: { tension: 200, friction: 20 },
  }));

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);

    // Animate the slider thumb
    sliderApi.start({
      transform: 'scale(1.2)',
      immediate: false,
      onRest: () => sliderApi.start({ transform: 'scale(1)' }),
    });

    // Animate the emoji points
    emojiApi.start({
      opacity: 0.5,
      transform: 'scale(0.8)',
      immediate: false,
      onRest: () => emojiApi.start({ opacity: 1, transform: 'scale(1)' }),
    });
  };

  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.2} blendMode='screen'>
        <Container>
          <Title>{title}</Title>
          <SlidesContainer>
            {transitions((style, index) => (
              <Slide style={style}>
                <Label>{categories[index]}</Label>
                <EmojiSlider>
                  <EmojiPoint style={emojiSpring}>☹️</EmojiPoint>
                  <EmojiPoint style={emojiSpring}>😐</EmojiPoint>
                  <EmojiPoint style={emojiSpring}>🙂</EmojiPoint>
                  <EmojiPoint style={emojiSpring}>😄</EmojiPoint>
                  <Slider
                    type="range"
                    min="1"
                    max="4"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={sliderSpring}
                  />
                </EmojiSlider>
                <EmojiButtons>
                  <EmojiButton onClick={() => handleRating(sliderValue)}>
                    Submit
                  </EmojiButton>
                </EmojiButtons>
              </Slide>
            ))}
          </SlidesContainer>
          {currentSlide === categories.length - 1 && (
            <NextButton onClick={handleNextClick}>NEXT</NextButton>
          )}
        </Container>
      </GradientBackground>
    </>
  );
};

const SlidesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
  overflow: hidden;
`;

const Slide = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
  background-color: #007bff;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EmojiSlider = styled.div`
  position: relative;
  width: 80%;
  margin: 20px 0;
`;

const EmojiPoint = styled(animated.span)`
  position: absolute;
  top: -30px;
  font-size: 20px;
  transform: translateX(-50%);

  &:nth-child(1) {
    left: 0%;
  }
  &:nth-child(2) {
    left: 29.5%;
  }
  &:nth-child(3) {
    left: 60.66%;
  }
  &:nth-child(4) {
    left: 92%;
  }
`;

const Slider = styled(animated.input)`
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

const EmojiButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const EmojiButton = styled.button`
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

export default RatingSlider;