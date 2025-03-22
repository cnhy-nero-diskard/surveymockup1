import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { countries } from 'countries-list';
import {
  Container,
  GlowingCheckbox,
  Input,
  NextButtonU,
  QuestionText,
  fontColorU
} from '../../../components/utils/styles1';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { goToNextStep } from '../../../components/utils/navigationUtils';
import { toast } from 'react-toastify';
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from '../../../components/utils/storageUtils';

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

const Paragraph = styled.p`
  font-size: 1rem;
  color: ${fontColorU};
  margin-bottom: 2rem;
  text-align: center;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const CustomCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: ${fontColorU};
  cursor: pointer;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${slideIn} 0.5s ease-in-out;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${fontColorU};
  margin-bottom: 0.75rem;
`;

const Suggestions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  top: 64px; /* positions the suggestions below the input */
  left: 0;
  right: 0;
  z-index: 99; /* ensures suggestions appear above other elements */
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

const CloseSuggestions = styled.button`
  position: absolute;
  width: 10px;
  top: 8px;
  right: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;  
  color: #aaa;
  background: transparent;

  &:hover {
    color: #666;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
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

/**
 * Converts a native country name to the English equivalent if found.
 * Returns the original name if not found in countries-list.
 */
function convertNativeToEnglishOrReturn(nativeName) {
  const foundCode = Object.keys(countries).find(
    (code) => countries[code].native === nativeName
  );
  return foundCode ? countries[foundCode].name : nativeName;
}

/**
 * Converts an English country name to the corresponding native name if found.
 * Returns the original name if not found.
 */
function convertEnglishToNativeOrReturn(englishName) {
  const foundCode = Object.keys(countries).find(
    (code) => countries[code].name === englishName
  );
  return foundCode ? countries[foundCode].native : englishName;
}

const Residence1 = () => {
  /**
   * Check localStorage on initial render.
   */
  const storedData = loadFromLocalStorage('Residence1Data') || {};

  /**
   * For 'specifyInput', we assume the stored value is in English,
   * so we convert it to native for display.
   */
  let initialSpecifyValue = storedData.specifyInput || '';
  if (initialSpecifyValue) {
    initialSpecifyValue = convertEnglishToNativeOrReturn(initialSpecifyValue);
  }

  const [language, setLanguage] = useState(
    localStorage.getItem('selectedLanguage')
  );
  const [location, setLocation] = useState(storedData.location || {
    inCity: false,
    outsideCity: false,
    foreignCountry: false
  });
  const [provinceInput, setProvinceInput] = useState(
    storedData.provinceInput || ''
  );
  const [cityMunInput, setCityMunInput] = useState(
    storedData.cityMunInput || ''
  );

  /**
   * Display a native country name in UI,
   * but store & submit it in English form.
   */
  const [specifyInput, setSpecifyInput] = useState(initialSpecifyValue);

  const [provinceSuggestions, setProvinceSuggestions] = useState([]);
  const [cityMunSuggestions, setCityMunSuggestions] = useState([]);
  const [specifySuggestions, setSpecifySuggestions] = useState([]);
  const [showProvinceSuggestions, setShowProvinceSuggestions] = useState(false);
  const [showCityMunSuggestions, setShowCityMunSuggestions] = useState(false);
  const [showSpecifySuggestions, setShowSpecifySuggestions] = useState(false);
  const [error, setError] = useState('');

  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } =
    useContext(UnifiedContext);

  const [provincesWithMunicipalities, setProvincesWithMunicipalities] =
    useState({});
  const provinceRef = useRef(null);
  const cityMunRef = useRef(null);
  const specifyRef = useRef(null);

  const navigate = useNavigate();
  const translations = useTranslations('residence1', language);

  /**
   * Fetch the municipalities for all provinces at the start
   * to populate the suggestion lists.
   */
  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/api/municipalities`,
          {
            withCredentials: true
          }
        );
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
        console.error('Error fetching municipalities:', err);
      }
    };

    fetchMunicipalities();
  }, []);

  /**
   * Whenever the location or input states change,
   * save them to localStorage. Here we specifically
   * convert the 'specifyInput' to English before saving.
   */
  useEffect(() => {
    const dataToSave = {
      location,
      provinceInput,
      cityMunInput,
      specifyInput:
        specifyInput && specifyInput.trim()
          ? convertNativeToEnglishOrReturn(specifyInput.trim())
          : ''
    };
    saveToLocalStorage('Residence1Data', dataToSave);
  }, [location, provinceInput, cityMunInput, specifyInput]);

  // If province & city are both filled, automatically set the country to "Philippines" (in native form).
  useEffect(() => {
    if (provinceInput && cityMunInput) {
      // "Philippines" is actually the English name, so let's convert it to its native form if it exists.
      // For "Philippines", we do not have a different name in 'countries-list' for the native property:
      // countries.PH.native is "Pilipinas". If you want to show "Pilipinas", you can do so by calling:
      // convertEnglishToNativeOrReturn("Philippines").
      const philippinesNative = convertEnglishToNativeOrReturn('Philippines');
      setSpecifyInput(philippinesNative);
    }
  }, [provinceInput, cityMunInput]);

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    const newLocation = {
      inCity: false,
      outsideCity: false,
      foreignCountry: false,
      [name]: checked
    };

    removeActiveBlocks('iprovblock');
    removeActiveBlocks('oprovblock');

    if (checked) {
      if (name === 'inCity') {
        appendActiveBlocks(['iprovblock']);
        // Clear these when switching to "inCity"
        setProvinceInput('');
        setCityMunInput('');
        // Also set "Philippines" in native form for specifyInput
        setSpecifyInput(convertEnglishToNativeOrReturn('Philippines'));
      } else if (name === 'outsideCity') {
        appendActiveBlocks(['oprovblock']);
      } else if (name === 'foreignCountry') {
        appendActiveBlocks(['oprovblock']);
      }
    }

    setLocation(newLocation);
    setError('');
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
      const filtered = provincesWithMunicipalities[selectedProvince].filter(
        (city) => city.toLowerCase().startsWith(value.toLowerCase())
      );
      setCityMunSuggestions(filtered);
      setShowCityMunSuggestions(true);
    }
  };

  const handleSpecifyInputChange = (e) => {
    const value = e.target.value;
    setSpecifyInput(value);
    const filtered = Object.keys(countries).filter((countryCode) =>
      countries[countryCode].native
        .toLowerCase()
        .startsWith(value.toLowerCase())
    );
    setSpecifySuggestions(filtered);
    setShowSpecifySuggestions(true);
  };

  const handleSuggestionClick = (inputSetter, suggestion) => {
    // For provinces/cities, we just set the plain string.
    // For the country, we set the native name.
    inputSetter(suggestion);
    setShowProvinceSuggestions(false);
    setShowCityMunSuggestions(false);
    setShowSpecifySuggestions(false);
  };

  const handleCloseSuggestions = () => {
    setShowProvinceSuggestions(false);
    setShowCityMunSuggestions(false);
    setShowSpecifySuggestions(false);
  };

  const handleNextClick = async () => {
    const isLocationSelected =
      location.inCity || location.outsideCity || location.foreignCountry;
    const isProvinceFilled =
      !location.outsideCity || (location.outsideCity && provinceInput && cityMunInput);
    const isCountryFilled =
      !location.foreignCountry || (location.foreignCountry && specifyInput);

    if (!isLocationSelected || !isProvinceFilled || !isCountryFilled) {
      setError('Please complete all required fields.');
      return;
    }

    setError('');

    // For final submission, we also convert the specify input
    // to English before sending to the server.
    const finalCountryEnglish = specifyInput
      ? convertNativeToEnglishOrReturn(specifyInput)
      : ' ';

    const surveyResponses = [
      {
        surveyquestion_ref: 'LOCIN',
        response_value: location.inCity ? 'Yes' : 'No'
      },
      {
        surveyquestion_ref: 'LOCOUT',
        response_value: location.outsideCity ? 'Yes' : 'No'
      },
      {
        surveyquestion_ref: 'LOCFRN',
        response_value: location.foreignCountry ? 'Yes' : 'No'
      },
      { surveyquestion_ref: 'PROV', response_value: provinceInput || ' ' },
      { surveyquestion_ref: 'CITY', response_value: cityMunInput || ' ' },
      {
        surveyquestion_ref: 'CNTRY',
        response_value: finalCountryEnglish || ' '
      }
    ];

    try {
      await submitSurveyResponses(surveyResponses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Error submitting survey responses:', error);
    }
  };

  const totalSteps = routes?.length || 1;

  return (
    <>
      <BodyPartial />
      <GradientBackground handleNextClick={handleNextClick}>
        <Container>
          <QuestionText>{translations.title}</QuestionText>
          <Paragraph>{translations.note}</Paragraph>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Option>
            <GlowingCheckbox
              type="checkbox"
              name="inCity"
              id="in-city"
              checked={location.inCity}
              onChange={handleLocationChange}
            />
            <CustomCheckbox htmlFor="in-city">
              {translations.inCity}
            </CustomCheckbox>
          </Option>

          <Option>
            <GlowingCheckbox
              type="checkbox"
              name="outsideCity"
              id="outside-city"
              checked={location.outsideCity}
              onChange={handleLocationChange}
            />
            <CustomCheckbox htmlFor="outside-city">
              {translations.outsideCity}
            </CustomCheckbox>
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
                placeholder="Enter your province…"
                aria-label="Province Input"
              />
              {showProvinceSuggestions && provinceSuggestions.length > 0 && (
                <Suggestions show={showProvinceSuggestions}>
                  <CloseSuggestions onClick={handleCloseSuggestions}>
                    ×
                  </CloseSuggestions>
                  {provinceSuggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() =>
                        handleSuggestionClick(setProvinceInput, suggestion)
                      }
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
                placeholder="Enter your city or municipality…"
                aria-label="City/Municipality Input"
              />
              {showCityMunSuggestions && cityMunSuggestions.length > 0 && (
                <Suggestions show={showCityMunSuggestions}>
                  <CloseSuggestions onClick={handleCloseSuggestions}>
                    ×
                  </CloseSuggestions>
                  {cityMunSuggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() =>
                        handleSuggestionClick(setCityMunInput, suggestion)
                      }
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </Suggestions>
              )}
            </InputGroup>
          </FadeTransition>

          <Option>
            <GlowingCheckbox
              type="checkbox"
              name="foreignCountry"
              id="foreign-country"
              checked={location.foreignCountry}
              onChange={handleLocationChange}
            />
            <CustomCheckbox htmlFor="foreign-country">
              {translations.foreignCountry}
            </CustomCheckbox>
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
                placeholder="Enter your country…"
                aria-label="Country Input"
              />
              {showSpecifySuggestions && specifySuggestions.length > 0 && (
                <Suggestions show={showSpecifySuggestions}>
                  <CloseSuggestions onClick={handleCloseSuggestions}>
                    ×
                  </CloseSuggestions>
                  {specifySuggestions.map((countryCode, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() =>
                        handleSuggestionClick(
                          setSpecifyInput,
                          countries[countryCode].native
                        )
                      }
                    >
                      {countries[countryCode].native}
                    </SuggestionItem>
                  ))}
                </Suggestions>
              )}
            </InputGroup>
          </FadeTransition>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Residence1;
