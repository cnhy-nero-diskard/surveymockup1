import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations'; // Import the translation hook
import Slider from 'rc-slider'; // Import the slider component
import 'rc-slider/assets/index.css'; // Import the default styles
import { submitSurveyResponses } from '../../components/shared/apiUtils'; // Import the submission function
import { NextButtonU } from '../../components/shared/styles1';

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
  margin-bottom:10px;
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

    const [language] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const translations = useTranslations('PercentageShareList', language); // Fetch translations
    const navigate = useNavigate();

    const handleSliderChange = (index, value) => {
        const newItems = [...items];
        newItems[index].percentage = parseFloat(value);
        
        // Adjust percentages to ensure they sum to exactly100%
        adjustPercentages(newItems, index);
        
        setItems(newItems);
    };

    const adjustPercentages = (newItems, changedIndex) => {
        const totalPercentage = newItems.reduce((sum, item) => sum + item.percentage, 0);

        if (totalPercentage > 100) {
            const excess = totalPercentage -100; 
            redistributePercentages(newItems, changedIndex, -excess);
        } else if (totalPercentage <100) {
            const deficit =100 - totalPercentage; 
            redistributePercentages(newItems, changedIndex, deficit);
        }
    };

    const redistributePercentages = (newItems, changedIndex, amount) => {
        const otherItems = newItems.filter((item, i) => i !== changedIndex && item.percentage >0);
        
        if (otherItems.length ===0) return;

        const totalOtherPercentages = otherItems.reduce((sum, item) => sum + item.percentage,0);
        
        otherItems.forEach((item) => {
            const proportion = item.percentage / totalOtherPercentages; 
            item.percentage += amount * proportion; 
        });
    };

    const prepareSurveyResponses = () => {
        return items.map((item) => ({
            surveyquestion_ref:`${item.key.toUpperCase().substring(0,5)}`, // Create a unique ref
            response_value:item.percentage.toFixed(1), // Store percentage as string
        }));
    };

    const handleNext = async () => {
        const surveyResponses = prepareSurveyResponses();
        
        try {
            await submitSurveyResponses(surveyResponses); // Submit survey responses
            navigate('/'); // Navigate after successful submission
        } catch (error) {
            console.error("Error submitting survey responses:", error);
            // Handle error appropriately here (e.g., show a message)
        }
    };

    return (
      <>
          <BodyPartial />
          <GradientBackground>
                  <Title>{translations.percentageShareListTitle}</Title>
                  {items.map((item, index) => (
                      <ListItem
                          key={index}
                          initial={{ opacity:0,y :20 }}
                          animate={{ opacity :1,y :0 }}
                          transition={{ delay:index *0.1 }}
                      >
                          <ItemName>{translations[item.key]}</ItemName>
                          <SliderContainer>
                              <Slider
                                  min={0}
                                  max={100}
                                  value={item.percentage}
                                  onChange={(value) => handleSliderChange(index,value)}
                                  trackStyle={{ backgroundColor:'#007bff', height :4 }}
                                  handleStyle={{
                                      borderColor:'#007bff',
                                      height :20,
                                      width :20,
                                      marginTop:-8,
                                      backgroundColor:'#fff',
                                  }}
                                  railStyle={{ backgroundColor:'#ddd', height :4 }}
                              />
                              <PercentageDisplay>{item.percentage.toFixed(1)}%</PercentageDisplay>
                          </SliderContainer>
                      </ListItem>
                  ))}
                  {/* <TotalPercentage>
                      {translations.percentageShareListTotalPercentage}: {items.reduce((sum,item) => sum + item.percentage ,0).toFixed(1)}%
                  </TotalPercentage> */}
                  <NextButtonU onClick={handleNext}>{translations.percentageShareListNextButton}</NextButtonU>
          </GradientBackground>
      </>
    );
};

export default PercentageShareList;

