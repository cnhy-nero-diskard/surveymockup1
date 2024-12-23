import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Container, EmojiButton, Title } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { useNavigate } from 'react-router-dom';

const RatingSlider = ({ title, categories, onRatingComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleRating = (value) => {
    if (currentSlide < categories.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onRatingComplete(); // Call the callback when all ratings are done
    }
  };

  const transitions = useTransition(currentSlide, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

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
                <EmojiButtons>
                  <EmojiButton onClick={() => handleRating(1)}>☹️</EmojiButton>
                  <EmojiButton onClick={() => handleRating(2)}>😐</EmojiButton>
                  <EmojiButton onClick={() => handleRating(3)}>🙂</EmojiButton>
                  <EmojiButton onClick={() => handleRating(4)}>😄</EmojiButton>
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
  height: 200px;
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
  font-size: 2rem;
  color: #fff;
  margin-bottom: 20px;
  background-color: #007bff;
  padding: 10px;
  border-radius: 20px;
`;

const EmojiButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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