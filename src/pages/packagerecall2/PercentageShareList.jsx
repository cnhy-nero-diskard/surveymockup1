import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations'; // Import the translation hook
import Slider from 'rc-slider'; // Import the slider component
import 'rc-slider/assets/index.css'; // Import the default styles

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ListItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #333;
`;

const ItemName = styled.span`
  font-weight: bold;
  flex: 1;
`;

const SliderContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PercentageDisplay = styled.span`
  font-size: 16px;
  color: #555;
  min-width: 40px;
  text-align: right;
`;

const TotalPercentage = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #28a745; /* Always green since it's balanced */
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PercentageShareList = () => {
  const [items, setItems] = useState([
    { key: 'accommodation', percentage: 25 },
    { key: 'foodAndBeverage', percentage: 20 },
    { key: 'shopping', percentage: 15 },
    { key: 'localTransport', percentage: 10 },
    { key: 'tourismActivitiesAttraction', percentage: 15 },
    { key: 'entertainment', percentage: 10 },
    { key: 'miscellaneous', percentage: 5 },
  ]);

  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const translations = useTranslations('PercentageShareList', language); // Fetch translations

  const handleSliderChange = (index, value) => {
    const newItems = [...items];
    const originalValue = newItems[index].percentage;
    newItems[index].percentage = parseFloat(value);

    const totalPercentage = newItems.reduce((sum, item) => sum + item.percentage, 0);

    if (totalPercentage > 100) {
      const excess = totalPercentage - 100;
      const otherItems = newItems.filter((item, i) => i !== index && item.percentage > 0);
      if (otherItems.length === 0) return;

      const totalOtherPercentages = otherItems.reduce((sum, item) => sum + item.percentage, 0);
      otherItems.forEach((item, i) => {
        const proportion = item.percentage / totalOtherPercentages;
        newItems[i].percentage -= excess * proportion;
      });
    }

    if (totalPercentage < 100) {
      const deficit = 100 - totalPercentage;
      const otherItems = newItems.filter((item, i) => i !== index && item.percentage > 0);
      if (otherItems.length === 0) return;

      const totalOtherPercentages = otherItems.reduce((sum, item) => sum + item.percentage, 0);
      otherItems.forEach((item, i) => {
        const proportion = item.percentage / totalOtherPercentages;
        newItems[i].percentage += deficit * proportion;
      });
    }

    setItems(newItems);
  };

  const totalPercentage = items.reduce((sum, item) => sum + item.percentage, 0);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };

  return (
    <><BodyPartial />
      <GradientBackground>
        <Container>
          <Title>{translations.percentageShareListTitle}</Title>
          {items.map((item, index) => (
            <ListItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ItemName>{translations[item.key]}</ItemName>
              <SliderContainer>
                <Slider
                  min={0}
                  max={100}
                  value={item.percentage}
                  onChange={(value) => handleSliderChange(index, value)}
                  trackStyle={{ backgroundColor: '#007bff', height: 4 }} // Customize track color
                  handleStyle={{
                    borderColor: '#007bff',
                    height: 20,
                    width: 20,
                    marginTop: -8,
                    backgroundColor: '#fff',
                  }} // Customize handle style
                  railStyle={{ backgroundColor: '#ddd', height: 4 }} // Customize rail color
                />
                <PercentageDisplay>{item.percentage.toFixed(1)}%</PercentageDisplay>
              </SliderContainer>
            </ListItem>
          ))}
          <TotalPercentage>
            {translations.percentageShareListTotalPercentage}: {totalPercentage.toFixed(1)}%
          </TotalPercentage>
          <NextButton onClick={handleNext}>{translations.percentageShareListNextButton}</NextButton>
        </Container>
      </GradientBackground>
    </>
  );
};

export default PercentageShareList;