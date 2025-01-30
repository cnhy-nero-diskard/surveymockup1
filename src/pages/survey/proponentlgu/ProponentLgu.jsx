import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils'; // import the submission function
import imgoverlay from '../../../components/img/profile.png';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #f9f9f9;

  &:focus {
    border-color: #007bff;
  }

  &:disabled {
    color: #333;
    background-color: #e9e9e9;
    cursor: not-allowed;
  }
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProponentLgu = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [inputs, setInputs] = useState([
    { key: 'PRCITY', value: 'PANGLAO' },
    { key: 'PRPROV', value: 'BOHOL' },
  ]);

  // Function to handle the change in input fields
  const handleInputChange = (index, newValue) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = newValue;
    setInputs(updatedInputs);
  };

  // Submit the responses to the backend
  const handleNextClick = async () => {
    const surveyResponses = inputs.map(input => ({
      surveyquestion_ref: input.key,
      response_value: input.value,
    }));

    try {
      await submitSurveyResponses(surveyResponses); // Submit the responses to backend
      navigate('/'); // Navigate to the next question or page
    } catch (error) {
      console.error('Error submitting survey responses:', error);
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="darken">
        <Container
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Proponent LGU</Title>
          {inputs.map((input, index) => (
            <InputGroup key={input.key}>
              <Label>{input.key === 'CITY' ? 'City/Municipality' : 'Province/HUC/ICC'}</Label>
              <Input
                type="text"
                value={input.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={input.key === 'PRCITY' || input.key === 'PRPROV'}
              />
            </InputGroup>
          ))}
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Container>
      </GradientBackground>
    </>
  );
};

export default ProponentLgu;
