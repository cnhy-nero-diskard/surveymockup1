import React, { useEffect, useState } from 'react';
import './LanguageSelector.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container, Title, Button } from '../../components/shared/styles1';
import translate from "../../components/img/translate.png";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../components/partials/LanguageContext';
import axios from 'axios';

const LanguageSelector = () => {
  const { setSelectedLanguage } = useLanguage(); // Access the context
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]); // State to hold the languages

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/languageselect`);
        const data = response.data;
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code); // Update the selected language in context
    console.log(`Selected language: ${code}`);
  };

  const handleNextClick = () => {
    navigate('/residence1'); // Navigate to the next page
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={translate}>
        <Container>
          <Title>Select Your Language</Title>
          <div className="language-buttons-grid">
            {languages.map((language) => (
              <button
                key={language.code}
                className="language-button"
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className={`fi fi-${language.flag} flag-icon`}></span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
        </Container>
        <Button onClick={handleNextClick} className="next-button">
          NEXT
        </Button>
      </GradientBackground>
    </>
  );
};

export default LanguageSelector;