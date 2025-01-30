import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgOverlay from "../../../components/img/umb.png";
import { Button, Container } from '../../../components/shared/styles1';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/shared/useTranslations';
import { submitSurveyResponses } from '../../../components/shared/sendDataBindInput';

const TableContainer = styled(animated.div)`
  width: 105%;
  max-width: 800px;
  margin: 50px auto;
  padding-bottom: 20px;
  padding-right: 1px;
  padding-left: 1px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  table-layout: fixed;
  @media (max-width: 768px) {
    display: block;
    padding: 10px;
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
  border: 1px solid #ddd;
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
  gap: 15px; /* Adds more space between the radio buttons */
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row; /* Keep row direction on mobile */
    gap: 10px; /* Smaller gap on mobile */
  }

  label {
    font-size: 24px; /* Increase the size of the labels */
  }

  input {
    transform: scale(1.5); /* Scale up the radio buttons */
  }

  span {
    font-size: 24px; /* Increase the size of the emoji */
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
const AttractionForm = () => {
  const [rows, setRows] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    attraction: '',
    location: '',
    rating: '',
  });

  const language = localStorage.getItem('selectedLanguage');
  const translations = useTranslations('AttractionForm', language);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInput({ ...currentInput, [name]: value });
  };

  const handleAddRow = () => {
    // Check if the maximum number of rows (5) has been reached
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

    // Check if all fields are filled
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

    // Generate unique references for the new row
    const rowNumber = rows.length + 1;
    const newRow = {
      ...currentInput,
      id: Date.now(),
      attraction_ref: `ATTRA${rowNumber}`, // Unique attraction_ref
      location_ref: `LOCAT${rowNumber}`,   // Unique location_ref
      rating_ref: `RATNG${rowNumber}`      // Unique rating_ref
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
    // Prepare survey responses as an array of key-value pairs
    const surveyResponses = rows.map((row) => [
      { surveyquestion_ref: row.attraction_ref, response_value: row.attraction },
      { surveyquestion_ref: row.location_ref, response_value: row.location },
      { surveyquestion_ref: row.rating_ref, response_value: row.rating },
    ]).flat();

    try {
      // Call the function to submit the responses
      await submitSurveyResponses(surveyResponses);
      navigate('/'); // Navigate to the next question
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
      <GradientBackground overlayImage={imgOverlay} opacity={0.15} blendMode='screen'>
        <Container>
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

              {/* Mobile View for First Row */}
              <div>
                <MobileRow>
                  <MobileRowHeader>{translations.attractionFormHeaderAttraction}</MobileRowHeader>
                  <Input
                    name="attraction"
                    value={currentInput.attraction}
                    onChange={handleChange}
                    placeholder={translations.attractionFormPlaceholderAttraction}
                  />
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
          <Button onClick={handleNextClick}>{translations.attractionFormButtonNext}</Button>
        </Container>
      </GradientBackground>
      <ToastContainer />
    </>
  );
};


export default AttractionForm;
