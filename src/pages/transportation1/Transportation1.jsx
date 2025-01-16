import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgoverlay from '../../components/img/suitcase.png';
import useTranslations from '../../components/shared/useTranslations';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  max-width: 50vw;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #fff;
`;

const OptionsGrid = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Option = styled(motion.div)`
  display: flex;
  align-items: center;

  justify-content: center;
  width: 6em;
  height: 100px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #007bff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  color: #fff;

  &:hover {
    background-color: rgb(18, 166, 224);
  }
`;

const Transportation1 = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const translations = useTranslations('Transportation1', language);

    useEffect(() => {
        setLanguage(localStorage.getItem('selectedLanguage') || 'en');
    }, []);

    const handleOptionClick = (option) => {
        console.log('Option selected:', option);
        navigate('/'); // Navigate to the root route
    };

    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.4} blendMode="darken">
                <Container
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{translations.transportation1Title}</Title>
                    <OptionsGrid>
                        <Option
                            onClick={() => handleOptionClick('AIR')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {translations.transportation1OptionAir}🛬
                        </Option>
                        <Option
                            onClick={() => handleOptionClick('SEA')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {translations.transportation1OptionSea}🚢
                        </Option>
                        <Option
                            onClick={() => handleOptionClick('LAND')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {translations.transportation1OptionLand}🚌
                        </Option>
                    </OptionsGrid>
                </Container>
            </GradientBackground>
        </>
    );
};

export default Transportation1;