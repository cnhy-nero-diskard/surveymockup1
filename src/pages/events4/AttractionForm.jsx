import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import imgOverlay from "../../components/img/umb.png";
import { Button, Container } from '../../components/shared/styles1';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

const TableContainer = styled(animated.div)`
  width: 90%;
  max-width: 800px;
  margin: 50px auto;
  padding-bottom: 20px;
  padding-right: 1px;
  padding-left: 1px;
  // overflow-x: auto; /* Enable horizontal scrolling on small screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
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
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 95%;
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

  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
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

    setRows([...rows, { ...currentInput, id: Date.now() }]);
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

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.15} blendMode='screen'>
        <Container>
          <TableContainer style={formAnimation}>
            <Title>{translations.attractionFormTitle}</Title>
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
                <tr>
                  <TableCell>
                    <Input
                      type="text"
                      name="attraction"
                      value={currentInput.attraction}
                      onChange={handleChange}
                      placeholder={translations.attractionFormPlaceholderAttraction}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      name="location"
                      value={currentInput.location}
                      onChange={handleChange}
                      placeholder={translations.attractionFormPlaceholderLocation}
                    />
                  </TableCell>
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
                            name="rating"
                            value={option.value}
                            checked={currentInput.rating === option.value}
                            onChange={handleChange}
                          />
                          <Emoji>{option.emoji}</Emoji>
                        </label>
                      ))}
                    </RadioGroup>
                  </TableCell>
                  <TableCell>-</TableCell>
                </tr>
              </tbody>
            </Table>
            <Button onClick={handleAddRow}>{translations.attractionFormButtonAddRow}</Button>
            <Button onClick={handleNextClick}>{translations.attractionFormButtonNext}</Button>
          </TableContainer>
        </Container>
      </GradientBackground>
      <ToastContainer />
    </>
  );
};

export default AttractionForm;