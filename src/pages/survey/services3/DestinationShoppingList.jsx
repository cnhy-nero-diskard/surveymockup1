import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imageoverlay from '../../../components/img/pricetag.png';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { NextButtonU } from '../../../components/utils/styles1';

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled(animated.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
`;

const ItemName = styled.span`
  flex: 1;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const NextButton = styled(Button)`
  margin-top: 20px;
  display: block;
  width: 100%;
`;

const emojiMap = {
  1: '☹️',
  2: '😐',
  3: '🙂',
  4: '😄',
};

const surveyQuestionRefs = ["LOCARTS", "APPAR", "FOODDE", "ACCESS", "COSM", "PERSO"];

const DestinationShoppingList = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);


  
  const [items, setItems] = useState([]);
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  const translations = useTranslations('DestinationShoppingList', language);

  useEffect(() => {
    if (translations.destinationShoppingListItems) {
      const parsedItems = JSON.parse(translations.destinationShoppingListItems).map((item, index) => ({
        name: item.name,
        rating: item.rating || 1,
        surveyquestion_ref: surveyQuestionRefs[index % surveyQuestionRefs.length]
      }));
      setItems(parsedItems);
    }
  }, [translations]);

  const handleUpdateRating = (index, newRating) => {
    const updatedItems = [...items];
    updatedItems[index].rating = newRating;
    setItems(updatedItems);
  };

  const handleNextClick = async () => {
    const formattedResponses = items.map(item => ({
      surveyquestion_ref: item.surveyquestion_ref,
      response_value: item.rating.toString()
    }));
    await submitSurveyResponses(formattedResponses);
    goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
  };

  const animations = useSpring({ opacity: 1, from: { opacity: 0 } });
  const navigate = useNavigate();

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imageoverlay} opacity={0.15}>
        <Container>
          <Title>{translations.destinationShoppingListTitle}</Title>
          <ItemList>
            {items.map((item, index) => (
              <Item key={index} style={animations}>
                <ItemName>{item.name}</ItemName>
                <Select
                  value={item.rating}
                  onChange={(e) => handleUpdateRating(index, parseInt(e.target.value))}
                >
                  {Object.entries(emojiMap).map(([key, emoji]) => (
                    <option key={key} value={key}>
                      {emoji}
                    </option>
                  ))}
                </Select>
              </Item>
            ))}
          </ItemList>
          <NextButtonU onClick={handleNextClick}>{translations.destinationShoppingListNextButton}</NextButtonU>
        </Container>
      </GradientBackground>
    </>
  );
};

export default DestinationShoppingList;
