import React, { useState } from 'react';
import styled from 'styled-components';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { Title } from '../utils/styles1';
import imgOverlay from "../../components/img/sentiment.png";
import { submitSurveyResponses } from '../utils/sendInputUtils';
import { NextButtonU } from '../utils/styles1';
import useTranslations from '../utils/useTranslations';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const StyledThead = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const StyledTbody = styled.tbody``;

const StyledTr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const StyledTh = styled.th`
  padding: 0.75rem;
  text-align: left;
`;

const StyledTd = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 1rem;
`;

const RatingSlider = ({ 
  title, 
  categories, 
  onRatingComplete, 
  surveyquestion_refs, 
  entranslations 
}) => {
  // Store each category's rating in an array rather than controlling row-by-row with currentSlide
  const [sliderValues, setSliderValues] = useState(Array(categories.length).fill(''));
  
  // We'll store final responses in state, though you can build them on the fly in handleSubmitAll
  const [responses, setResponses] = useState([]);

  const choosetoskip = useTranslations('RATINGSLIDER', localStorage.getItem('selectedLanguage')).chooseToSkipText;
  const rtranslations = useTranslations('RATINGSLIDER', localStorage.getItem('selectedLanguage'));

  // Potential emoji array for reference
  const emojis = ['☹️', '😐', '🙂', '😄'];

  // Handle dropdown changes for any row 
  const handleSelectChange = (e, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = e.target.value;
    setSliderValues(newSliderValues);
  };

  // Collect all responses and submit 
  const handleSubmitAll = () => {
    // Build a response object for each category
    const newResponses = sliderValues.map((value, index) => {
      const parsedValue = parseInt(value, 10) || 0;
      const questionStub = entranslations[index] || '';
      return {
        surveyquestion_ref: surveyquestion_refs + questionStub.substring(0, 5).toUpperCase(),
        response_value: parsedValue ? parsedValue.toString() : ''
      };
    });

    // Store them in state if needed, then submit
    setResponses(newResponses);
    submitSurveyResponses(newResponses)
      .then(() => {
        onRatingComplete();
      })
      .catch((error) => {
        console.error('Error submitting survey responses:', error);
      });
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.2} blendMode="screen" buttonAppear={true} handleNextClick={handleSubmitAll}>
        <Title>{title}</Title>
        <Title style={{ fontSize: '1rem' }}>{choosetoskip}</Title>
        
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>{rtranslations.category}</StyledTh>
              <StyledTh>{rtranslations.choose}</StyledTh>
              <StyledTh>{rtranslations.rating}</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {categories.map((category, index) => {
              const selectedValue = sliderValues[index];
              const parsedValue = parseInt(selectedValue, 10) || 0;
              // Display the corresponding emoji (or ⛔ if empty)
              const displayedEmoji = parsedValue ? emojis[parsedValue - 1] : '⛔';

              return (
                <StyledTr key={index}>
                  <StyledTd>{category}</StyledTd>
                  <StyledTd>
                    <StyledSelect 
                      value={selectedValue} 
                      onChange={(e) => handleSelectChange(e, index)}
                    >
                      <option value="">⛔</option>
                      <option value="1">☹️</option>
                      <option value="2">😐</option>
                      <option value="3">🙂</option>
                      <option value="4">😄</option>
                    </StyledSelect>
                  </StyledTd>
                  <StyledTd style={{ fontSize: '2rem' }}>
                    {displayedEmoji}
                  </StyledTd>
                </StyledTr>
              );
            })}
          </StyledTbody>
        </StyledTable>
        {/* <NextButtonU onClick={handleSubmitAll}>
          {rtranslations.submitAll}
        </NextButtonU> */}
      </GradientBackground>
    </>
  );
};

export default RatingSlider;
