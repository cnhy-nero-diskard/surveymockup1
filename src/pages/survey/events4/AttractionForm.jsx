import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgOverlay from "../../../components/img/umb.png";
import { Button, Container, NextButtonU } from '../../../components/utils/styles1';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import axios from 'axios';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const TableContainer = styled(animated.div)`
  width: 105%;
  max-width: 800px;
  margin: 50px auto;
  padding-right:20px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const ScrollableTableContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 10px;
  }
`;

const MobileRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MobileRowHeader = styled.div`
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: 768px) {
    padding: 6px;
    font-size: 14px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BottomEmojiRadioGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }

  label {
    font-size: 24px;
  }

  input {
    transform: scale(1.5);
  }

  span {
    font-size: 24px;
  }
`;

const RadioInput = styled.input`
  margin: 0 5px;
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const Emoji = styled.span`
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TrashButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: darkred;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SuggestionList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  background-color: blue;
  width: 100%;
  z-index: 1;

  &:hover {
    background-color: lightblue; /* Change this to your desired hover color */
  }
`;


const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const AttractionForm = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  const [rows, setRows] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    attraction: '',
    location: '',
    rating: '',
  });

  const [attractionSuggestions, setAttractionSuggestions] = useState([]); // Ensure this is an array
  const [showSuggestions, setShowSuggestions] = useState(false);

  const language = localStorage.getItem('selectedLanguage');
  const translations = useTranslations('AttractionForm', language);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  useEffect(() => {
    const fetchAttractionLocalizations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/attraction`, {
          params: { languageCode: language },
          withCredentials: true
        });
        if (response.status !== 200) {
          throw new Error('Failed to fetch attraction localizations');
        }
        const data = response.data;
  
        // Extract the translatedNames array from the response
        if (data && data.translatedNames && Array.isArray(data.translatedNames)) {
          setAttractionSuggestions(data.translatedNames);
        } else {
          console.error('API response does not contain a valid translatedNames array:', data);
          setAttractionSuggestions([]); // Set to empty array to avoid errors
        }
      } catch (error) {
        console.error('Error fetching attraction localizations:', error);
        setAttractionSuggestions([]); // Set to empty array to avoid errors
      }
    };
  
    fetchAttractionLocalizations();
  }, [language]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInput({ ...currentInput, [name]: value });

    if (name === 'attraction') {
      setShowSuggestions(value.length > 0);
    }
  };

  const handleSuggestionClick = (attraction) => {
    // Find the selected attraction in the suggestions array
    const selectedAttraction = attractionSuggestions.find(item => Object.keys(item)[0] === attraction);
    setCurrentInput({
      attraction: attraction,
      location: selectedAttraction ? selectedAttraction[attraction] : '', // Autofill location
      rating: currentInput.rating
    });
    setShowSuggestions(false);
  };

  const handleAddRow = () => {
    if (rows.length >= 5) {
      toast.error(translations.attractionFormErrorMaxRows, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!currentInput.attraction || !currentInput.location || !currentInput.rating) {
      toast.error(translations.attractionFormErrorAllFields, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const rowNumber = rows.length + 1;
    const newRow = {
      ...currentInput,
      id: Date.now(),
      attraction_ref: `ATTRA${rowNumber}`,
      location_ref: `LOCAT${rowNumber}`,
      rating_ref: `RATNG${rowNumber}`
    };

    setRows([...rows, newRow]);
    setCurrentInput({ attraction: '', location: '', rating: '' });
    toast.success(translations.attractionFormRowAdded, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    toast.info(translations.attractionFormRowDeleted, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const navigate = useNavigate();
  const handleNextClick = async () => {
    const surveyResponses = rows.map((row) => [
      { surveyquestion_ref: row.attraction_ref, response_value: row.attraction },
      { surveyquestion_ref: row.location_ref, response_value: row.location },
      { surveyquestion_ref: row.rating_ref, response_value: row.rating },
    ]).flat();

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      toast.error(translations.attractionFormErrorSubmission, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.15} blendMode='screen' handleNextClick={handleNextClick}>
          <TableContainer style={formAnimation}>
            <Title>{translations.attractionFormTitle}</Title>
            <ScrollableTableContainer>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{translations.attractionFormHeaderAttraction}</TableHeader>
                    <TableHeader>{translations.attractionFormHeaderLocation}</TableHeader>
                    <TableHeader>{translations.attractionFormHeaderRating}</TableHeader>
                    <TableHeader>{translations.attractionFormHeaderDelete}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <TableCell>{row.attraction}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>
                        <RadioGroup>
                          {[
                            { value: '1', emoji: '☹️' },
                            { value: '2', emoji: '😐' },
                            { value: '3', emoji: '🙂' },
                            { value: '4', emoji: '😄' },
                          ].map((option) => (
                            <label key={option.value}>
                              <RadioInput
                                type="radio"
                                value={option.value}
                                checked={row.rating === option.value}
                                readOnly
                              />
                              <Emoji>{option.emoji}</Emoji>
                            </label>
                          ))}
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <TrashButton onClick={() => handleDeleteRow(row.id)}>🗑️</TrashButton>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div>
                <MobileRow>
                  <MobileRowHeader>{translations.attractionFormHeaderAttraction}</MobileRowHeader>
                  <Input
                    name="attraction"
                    value={currentInput.attraction}
                    onChange={handleChange}
                    placeholder={translations.attractionFormPlaceholderAttraction}
                  />
                  {showSuggestions && Array.isArray(attractionSuggestions) && (
                    <SuggestionList>
                      {attractionSuggestions
                        .filter(item => Object.keys(item)[0].toLowerCase().includes(currentInput.attraction.toLowerCase()))
                        .map((item, index) => (
                          <SuggestionItem key={index} onClick={() => handleSuggestionClick(Object.keys(item)[0])}>
                            {Object.keys(item)[0]}
                          </SuggestionItem>
                        ))}
                    </SuggestionList>
                  )}
                  <MobileRowHeader>{translations.attractionFormHeaderLocation}</MobileRowHeader>
                  <Input
                    name="location"
                    value={currentInput.location}
                    onChange={handleChange}
                    placeholder={translations.attractionFormPlaceholderLocation}
                  />
                  <MobileRowHeader>{translations.attractionFormHeaderRating}</MobileRowHeader>
                  <BottomEmojiRadioGroup>
                    {[
                      { value: '1', emoji: '☹️' },
                      { value: '2', emoji: '😐' },
                      { value: '3', emoji: '🙂' },
                      { value: '4', emoji: '😄' },
                    ].map((option) => (
                      <label key={option.value}>
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={currentInput.rating === option.value}
                          onChange={(e) => handleChange(e)}
                        />
                        <Emoji>{option.emoji}</Emoji>
                      </label>
                    ))}
                  </BottomEmojiRadioGroup>
                </MobileRow>
              </div>
            </ScrollableTableContainer>
          </TableContainer>
          <Button onClick={handleAddRow}>{translations.attractionFormButtonAddRow}</Button>
      </GradientBackground>
      <ToastContainer />
    </>
  );
};



export default AttractionForm;
