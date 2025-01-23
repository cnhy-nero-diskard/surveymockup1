// components/shared/styles1.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  max-height: 80vh;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 10px;
  justify-content: center;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

export const Button = styled(motion.button)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 5px;
`;

export const EmojiButton = styled(Button)`
  background-color: rgba(240, 240, 240, 0.39);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 1.2rem;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;

  /* Style for selected button */
  ${({ selected }) =>
    selected &&
    `
    background-color: #007bff;
    color: white;
  `}
`;

export const TextField = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
`;
