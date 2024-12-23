import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Residence1.css'; // Import the CSS file
import { CSSTransition } from 'react-transition-group';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { Container, Title, Paragraph, Button, EmojiButton, TextField } from '../../components/shared/styles1';
import imgOverlay from "../../components/img/home.png";
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';
import { RESIDENCE1 as COMPONENT } from '../../components/shared/componentConstants';

const Residence1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const [location, setLocation] = useState({
    inCity: false,
    outsideCity: false,
    foreignCountry: false,
  });

  const [provinceInput, setProvinceInput] = useState('');
  const [cityMunInput, setCityMunInput] = useState('');
  const [specifyInput, setSpecifyInput] = useState('');

  const [provinceSuggestions, setProvinceSuggestions] = useState([]);
  const [cityMunSuggestions, setCityMunSuggestions] = useState([]);
  const [specifySuggestions, setSpecifySuggestions] = useState([]);

  const [showProvinceSuggestions, setShowProvinceSuggestions] = useState(false);
  const [showCityMunSuggestions, setShowCityMunSuggestions] = useState(false);
  const [showSpecifySuggestions, setShowSpecifySuggestions] = useState(false);

  const [provincesWithMunicipalities, setProvincesWithMunicipalities] = useState({});

  const provinceRef = useRef(null);
  const cityMunRef = useRef(null);
  const specifyRef = useRef(null);




  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        console.log(`API HOST - ${process.env.REACT_APP_API_HOST}`);
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/municipalities`);
        const data = response.data;

        const formattedData = data.reduce((acc, row) => {
          const { municipality, province } = row;
          if (!acc[province]) {
            acc[province] = [];
          }
          acc[province].push(municipality);
          return acc;
        }, {});

        setProvincesWithMunicipalities(formattedData);
      } catch (err) {
        console.log(process.env.API_HOST);
        console.error(err);
        console.error("SOMETHING HAPPENED EME");
      }
    };

    fetchMunicipalities();
  }, []);

  const translations = useTranslations(COMPONENT, language);  




  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    const newLocation = { inCity: false, outsideCity: false, foreignCountry: false, [name]: checked };

    if (checked) {
      setLocation(newLocation);
    } else {
      setLocation({ ...location, [name]: checked });
    }
  };

  const handleProvinceInputChange = (e) => {
    const value = e.target.value;
    setProvinceInput(value);
    const filtered = Object.keys(provincesWithMunicipalities).filter((province) =>
      province.toLowerCase().startsWith(value.toLowerCase())
    );
    setProvinceSuggestions(filtered);
    setShowProvinceSuggestions(true);
    setCityMunInput(''); // Clear city/municipality input when province changes
    setCityMunSuggestions([]); // Clear city/municipality suggestions when province changes
  };

  const handleCityMunInputChange = (e) => {
    const value = e.target.value;
    setCityMunInput(value);
    const selectedProvince = provinceInput;
    if (provincesWithMunicipalities[selectedProvince]) {
      const filtered = provincesWithMunicipalities[selectedProvince].filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setCityMunSuggestions(filtered);
      setShowCityMunSuggestions(true);
    }
  };

  const handleSpecifyInputChange = (e) => {
    const value = e.target.value;
    setSpecifyInput(value);
    const filtered = specifySuggestionsList.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setSpecifySuggestions(filtered);
    setShowSpecifySuggestions(true);
  };

  const handleSuggestionClick = (inputSetter, suggestion) => {
    inputSetter(suggestion);
    setShowProvinceSuggestions(false);
    setShowCityMunSuggestions(false);
    setShowSpecifySuggestions(false);
  };

  const specifySuggestionsList = ['USA', 'Canada', 'Japan', 'Germany', 'France', 'Australia', 'United Kingdom', 'China', 'India', 'Brazil'];

  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay}>
        <Container>
          <h1>{translations.title}</h1>
          <p>{translations.note}</p>
          <form>
            <div className="option">
              <input type="checkbox" name="inCity" id="in-city" checked={location.inCity} onChange={handleLocationChange} />
              <label htmlFor="in-city" className="custom-checkbox">{translations.inCity}</label>
            </div>
            <div className="option">
              <input type="checkbox" name="outsideCity" id="outside-city" checked={location.outsideCity} onChange={handleLocationChange} />
              <label htmlFor="outside-city" className="custom-checkbox">{translations.outsideCity}</label>
            </div>
            <CSSTransition
              in={location.outsideCity}
              timeout={300}
              classNames="fade"
              nodeRef={provinceRef}
              unmountOnExit
            >
              <div className="input-group" ref={provinceRef}>
                <label htmlFor="province">{translations.province}</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={provinceInput}
                  onChange={handleProvinceInputChange}
                />
                {showProvinceSuggestions && provinceSuggestions.length > 0 && (
                  <div className="suggestions">
                    {provinceSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(setProvinceInput, suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CSSTransition>
            <CSSTransition
              in={location.outsideCity && provinceInput}
              timeout={300}
              classNames="fade"
              nodeRef={cityMunRef}
              unmountOnExit
            >
              <div className="input-group" ref={cityMunRef}>
                <label htmlFor="city-mun">{translations.cityMun}</label>
                <input
                  type="text"
                  id="city-mun"
                  name="city-mun"
                  value={cityMunInput}
                  onChange={handleCityMunInputChange}
                  disabled={!provinceInput}
                />
                {showCityMunSuggestions && cityMunSuggestions.length > 0 && (
                  <div className="suggestions">
                    {cityMunSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(setCityMunInput, suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CSSTransition>
            <div className="option">
              <input type="checkbox" name="foreignCountry" id="foreign-country" checked={location.foreignCountry} onChange={handleLocationChange} />
              <label htmlFor="foreign-country" className="custom-checkbox">{translations.foreignCountry}</label>
            </div>
            <CSSTransition
              in={location.foreignCountry}
              timeout={300}
              classNames="fade"
              nodeRef={specifyRef}
              unmountOnExit
            >
              <div className="input-group" ref={specifyRef}>
                <label htmlFor="specify">{translations.specify}</label>
                <input
                  type="text"
                  id="specify"
                  name="specify"
                  value={specifyInput}
                  onChange={handleSpecifyInputChange}
                />
                {showSpecifySuggestions && specifySuggestions.length > 0 && (
                  <div className="suggestions">
                    {specifySuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(setSpecifyInput, suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CSSTransition>

            <Button onClick={handleNextClick}>
              {translations.next}
            </Button>
          </form>
          <select onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Residence1;