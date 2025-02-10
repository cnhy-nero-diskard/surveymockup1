// Residence1Styles.js
import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { RESIDENCE1 as COMPONENT } from '../../../components/utils/componentConstants';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { countries } from 'countries-list';
import { NextButtonU, fontColorU } from '../../../components/utils/styles1';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-color: ${fontColorU};
  margin-bottom: 1rem;
  text-align: center;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-color: ${fontColorU};
  margin-bottom: 2rem;
  text-align: center;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const CustomCheckbox = styled.label`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  font-color: ${fontColorU};
  cursor: pointer;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  font-color: ${fontColorU};

  
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const Suggestions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li`
  padding: 0.75rem;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }
`;

const FadeTransition = styled(CSSTransition)`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const Residence1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const [location, setLocation] = useState({
    inCity: false,
    outsideCity: false,
    foreignCountry: false,
  });

  // -----------------------------<>----------------------------
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks,appendActiveBlocks,removeActiveBlocks } = useContext(UnifiedContext);

  const [provinceInput, setProvinceInput] = useState('');
  const [cityMunInput, setCityMunInput] = useState('');
  const [specifyInput, setSpecifyInput] = useState('');

  const [provinceSuggestions, setProvinceSuggestions] = useState([]);
  const [cityMunSuggestions, setCityMunSuggestions] = useState([]);
  const [specifySuggestions, setSpecifySuggestions] = useState([]);

  const [showProvinceSuggestions, setShowProvinceSuggestions] = useState(false);
  const [showCityMunSuggestions, setShowCityMunSuggestions] = useState(false);
  const [showSpecifySuggestions, setShowSpecifySuggestions] = useState(false);
  const navigate = useNavigate();

  const [provincesWithMunicipalities, setProvincesWithMunicipalities] = useState({});

  const provinceRef = useRef(null);
  const cityMunRef = useRef(null);
  const specifyRef = useRef(null);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/municipalities`,
          { withCredentials: true });
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
        console.error("ERROR");
      }
    };

    fetchMunicipalities();
  }, []);

  const translations = useTranslations('residence1', language);

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    const newLocation = { inCity: false, outsideCity: false, foreignCountry: false, [name]: checked };

    // Remove all related blocks first to avoid duplicates
    removeActiveBlocks('iprovblock');
    removeActiveBlocks('oprovblock');

    if (checked) {
      // Append the corresponding block based on the checkbox
      if (name === 'inCity') {
        appendActiveBlocks(['iprovblock']);
      } else if (name === 'outsideCity') {
        appendActiveBlocks(['oprovblock']);
      } else if (name === 'foreignCountry') {
        appendActiveBlocks(['oprovblock']);
      }
    }

    // Update the location state
    setLocation(newLocation);
  };


  const handleProvinceInputChange = (e) => {
    const value = e.target.value;
    setProvinceInput(value);
    const filtered = Object.keys(provincesWithMunicipalities).filter((province) =>
      province.toLowerCase().startsWith(value.toLowerCase())
    );
    setProvinceSuggestions(filtered);
    setShowProvinceSuggestions(true);
    setCityMunInput('');
    setCityMunSuggestions([]);
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
    const filtered = Object.keys(countries).filter((countryCode) =>
      countries[countryCode].native.toLowerCase().startsWith(value.toLowerCase())
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

  const handleNextClick = async () => {
    const surveyResponses = [
      { surveyquestion_ref: 'LOCIN', response_value: location.inCity ? 'Yes' : 'No' },
      { surveyquestion_ref: 'LOCOUT', response_value: location.outsideCity ? 'Yes' : 'No' },
      { surveyquestion_ref: 'LOCFRN', response_value: location.foreignCountry ? 'Yes' : 'No' },
      { surveyquestion_ref: 'PROV', response_value: provinceInput || ' ' },
      { surveyquestion_ref: 'CITY', response_value: cityMunInput || ' ' },
      { surveyquestion_ref: 'CNTRY', response_value: specifyInput || ' ' },
    ];
    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate,routes,activeBlocks); //<---------------------------
    } catch (error) {
      console.log('Error submitting survey responses:');
    }
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground >
        <Container>
          <Title>{translations.title}</Title>
          <Paragraph>{translations.note}</Paragraph>
          <Option>
            <input type="checkbox" name="inCity" id="in-city" checked={location.inCity} onChange={handleLocationChange} />
            <CustomCheckbox htmlFor="in-city">{translations.inCity}</CustomCheckbox>
          </Option>
          <Option>
            <input type="checkbox" name="outsideCity" id="outside-city" checked={location.outsideCity} onChange={handleLocationChange} />
            <CustomCheckbox htmlFor="outside-city">{translations.outsideCity}</CustomCheckbox>
          </Option>
          <FadeTransition
            in={location.outsideCity}
            timeout={300}
            classNames="fade"
            nodeRef={provinceRef}
            unmountOnExit
          >
            <InputGroup ref={provinceRef}>
              <Label htmlFor="province">{translations.province}</Label>
              <Input
                type="text"
                id="province"
                name="province"
                value={provinceInput}
                onChange={handleProvinceInputChange}
              />
              {showProvinceSuggestions && provinceSuggestions.length > 0 && (
                <Suggestions>
                  {provinceSuggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => handleSuggestionClick(setProvinceInput, suggestion)}
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </Suggestions>
              )}
            </InputGroup>
          </FadeTransition>
          <FadeTransition
            in={location.outsideCity && provinceInput}
            timeout={300}
            classNames="fade"
            nodeRef={cityMunRef}
            unmountOnExit
          >
            <InputGroup ref={cityMunRef}>
              <Label htmlFor="city-mun">{translations.cityMun}</Label>
              <Input
                type="text"
                id="city-mun"
                name="city-mun"
                value={cityMunInput}
                onChange={handleCityMunInputChange}
                disabled={!provinceInput}
              />
              {showCityMunSuggestions && cityMunSuggestions.length > 0 && (
                <Suggestions>
                  {cityMunSuggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => handleSuggestionClick(setCityMunInput, suggestion)}
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </Suggestions>
              )}
            </InputGroup>
          </FadeTransition>
          <Option>
            <input type="checkbox" name="foreignCountry" id="foreign-country" checked={location.foreignCountry} onChange={handleLocationChange} />
            <CustomCheckbox htmlFor="foreign-country">{translations.foreignCountry}</CustomCheckbox>
          </Option>
          <FadeTransition
            in={location.foreignCountry}
            timeout={300}
            classNames="fade"
            nodeRef={specifyRef}
            unmountOnExit
          >
            <InputGroup ref={specifyRef}>
              <Label htmlFor="specify">{translations.specify}</Label>
              <Input
                type="text"
                id="specify"
                name="specify"
                value={specifyInput}
                onChange={handleSpecifyInputChange}
              />
              {showSpecifySuggestions && specifySuggestions.length > 0 && (
                <Suggestions>
                  {specifySuggestions.map((countryCode, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => handleSuggestionClick(setSpecifyInput, countries[countryCode].native)}
                    >
                      {countries[countryCode].native}
                    </SuggestionItem>
                  ))}
                </Suggestions>
              )}
            </InputGroup>
          </FadeTransition>
          <NextButtonU onClick={handleNextClick}>
            {translations.next}
          </NextButtonU>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Residence1;