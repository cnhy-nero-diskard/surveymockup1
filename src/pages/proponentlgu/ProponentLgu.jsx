// ProponentLgu.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../components/img/profile.png';


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
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
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
          <InputGroup>
            <Label>City/Municipality</Label>
            <Input type="text" defaultValue="PANGLAO" disabled />
          </InputGroup>
          <InputGroup>
            <Label>Province/HUC/ICC</Label>
            <Input type="text" defaultValue="BOHOL" disabled />
          </InputGroup>
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