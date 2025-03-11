import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { Input, NextButtonU } from '../../../components/utils/styles1';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/bed.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Option = styled.option``;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BookingForm = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks } = useContext(UnifiedContext);

  const [bookingMethod, setBookingMethod] = useState('');
  const [bookingPlatform, setBookingPlatform] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const [responses, setResponses] = useState([]);

  const navigate = useNavigate();
  const translations = useTranslations('BookingForm', language);

  // Define booking methods with label/value
  const bookingMethods = [
    { label: translations.bookingMethodWalkIn, value: 'Walk-in' },
    { label: translations.bookingMethodTourOperator, value: 'Your Operator' },
    { label: translations.bookingMethodInternet, value: 'Internet' },
    { label: translations.bookingMethodOthers, value: 'Others (specify)' }
  ];

  // Define booking platforms keyed by the *value*, each array is label/value
  const bookingPlatforms = {
    'Walk-in': [
      { label: translations.bookingPlatformDirect, value: 'Direct' },
      { label: translations.bookingPlatformCounter, value: 'Counter' }
    ],
    'Internet': [
      { label: translations.bookingPlatformBookingCom, value: 'Booking.com' },
      { label: translations.bookingPlatformExpedia, value: 'Expedia' },
      { label: translations.bookingPlatformAirbnb, value: 'Airbnb' },
      { label: translations.bookingPlatformAgoda, value: 'Agoda' }
    ],
    'Others (specify)': []
  };

  const dropdownAnimation = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'scaleY(1)' : 'scaleY(0)',
    config: { tension: 200, friction: 20 },
  });

  const handleBookingMethodChange = (e) => {
    const method = e.target.value;
    setBookingMethod(method);
    setBookingPlatform('');
    setIsDropdownOpen(method !== 'Others (specify)' && method !== 'Your Operator');

    // Update responses array (store the English value)
    setResponses((prevResponses) => [
      ...prevResponses.filter((response) => response.surveyquestion_ref !== 'BMETHOD'),
      { surveyquestion_ref: 'BMETHOD', response_value: method },
    ]);
  };

  const handleBookingPlatformChange = (e) => {
    const platform = e.target.value;
    setBookingPlatform(platform);

    // Update responses array (store the English value)
    setResponses((prevResponses) => [
      ...prevResponses.filter((response) => response.surveyquestion_ref !== 'PLATF'),
      { surveyquestion_ref: 'PLATF', response_value: platform },
    ]);
  };

  const handleOthersSpecifyChange = (e) => {
    const value = e.target.value;
    setBookingPlatform(value);

    // Update responses array (store the user's typed text, which may be in any language)
    setResponses((prevResponses) => [
      ...prevResponses.filter((response) => response.surveyquestion_ref !== 'OTHER'),
      { surveyquestion_ref: 'OTHER', response_value: value },
    ]);
  };

  const handleNextClick = async () => {
    try {
      await submitSurveyResponses(responses);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    } catch (error) {
      console.error('Failed to submit survey responses:', error);
    }
  };

  const isNextDisabled =
    !bookingMethod ||
    (bookingMethod !== 'Others (specify)' && bookingMethod !== 'Your Operator' && !bookingPlatform) ||
    (bookingMethod === 'Others (specify)' && !bookingPlatform.trim()) ||
    (bookingMethod === 'Your Operator' && !bookingPlatform.trim());

  return (
    <>
      <BodyPartial />
      <GradientBackground
        overlayImage={imgoverlay}
        opacity={0.2}
        blendMode="multiply"
        handleNextClick={handleNextClick}
        buttonAppear={!isNextDisabled}
      >
        <Container>
          <FormGroup>
            <Label>{translations.bookingFormBookingMethodLabel}</Label>
            <Dropdown value={bookingMethod} onChange={handleBookingMethodChange}>
              <Option value="">
                {translations.bookingFormSelectBookingMethod}
              </Option>
              {bookingMethods.map((method) => (
                <Option key={method.value} value={method.value}>
                  {method.label}
                </Option>
              ))}
            </Dropdown>
          </FormGroup>

          {bookingMethod && bookingMethod !== 'Others (specify)' && bookingMethod !== 'Your Operator' && (
            <FormGroup>
              <Label>{translations.bookingFormBookingPlatformLabel}</Label>
              <animated.div style={dropdownAnimation}>
                <Dropdown
                  value={bookingPlatform}
                  onChange={handleBookingPlatformChange}
                >
                  <Option value="">
                    {translations.bookingFormSelectBookingPlatform}
                  </Option>
                  {bookingPlatforms[bookingMethod]?.map((platform) => (
                    <Option key={platform.value} value={platform.value}>
                      {platform.label}
                    </Option>
                  ))}
                </Dropdown>
              </animated.div>
            </FormGroup>
          )}

          {bookingMethod === 'Others (specify)' && (
            <FormGroup>
              <Label>{translations.bookingFormOthersSpecifyLabel}</Label>
              <Input
                type="text"
                value={bookingPlatform}
                onChange={handleOthersSpecifyChange}
              />
            </FormGroup>
          )}

          {bookingMethod === 'Your Operator' && (
            <FormGroup>
              <Label>{translations.bookingFormTourOperatorLabel}</Label>
              <Input
                type="text"
                value={bookingPlatform}
                onChange={handleOthersSpecifyChange}
                placeholder={translations.bookingFormTourOperatorPlaceholder}
              />
            </FormGroup>
          )}
        </Container>
      </GradientBackground>
    </>
  );
};

export default BookingForm;