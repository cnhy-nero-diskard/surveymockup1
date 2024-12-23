import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imageoverlay from '../../components/img/pricetag.png';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

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

const Rating = styled.span`
  font-size: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  font-size: 16px;
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

const DestinationShoppingList = () => {
  const [items, setItems] = useState([]); // Initialize as empty array
  const [newItem, setNewItem] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en'); // Default to 'en' if no language is selected

  const translations = useTranslations('DestinationShoppingList', language);

  // Fetch the initial items from translations
  useEffect(() => {
    if (translations.destinationShoppingListItems) {
 
      setItems(JSON.parse(translations.destinationShoppingListItems).map(item => ({
        name: item.name,
        rating: item.rating || 1 // Default rating to 1 if not provided
      })));
    }
  }, [translations]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { name: newItem, rating: newRating }]);
      setNewItem('');
      setNewRating(1);
    }
  };

  const handleUpdateRating = (index, newRating) => {
    const updatedItems = [...items];
    updatedItems[index].rating = newRating;
    setItems(updatedItems);
  };

  const animations = useSpring({ opacity: 1, from: { opacity: 0 } });
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

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
          <div>
            <Input
              type="text"
              placeholder={translations.destinationShoppingListAddItemPlaceholder}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <Select
              value={newRating}
              onChange={(e) => setNewRating(parseInt(e.target.value))}
            >
              {Object.entries(emojiMap).map(([key, emoji]) => (
                <option key={key} value={key}>
                  {emoji}
                </option>
              ))}
            </Select>
            <Button onClick={handleAddItem}>{translations.destinationShoppingListAddItemButton}</Button>
          </div>
          <NextButton onClick={handleNextClick}>{translations.destinationShoppingListNextButton}</NextButton>
        </Container>
      </GradientBackground>
    </>
  );
};

export default DestinationShoppingList;