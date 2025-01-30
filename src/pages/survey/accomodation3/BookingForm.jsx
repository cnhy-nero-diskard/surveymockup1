import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import { NextButtonU } from '../../../components/utils/styles1';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/bed.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';

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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

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
    const [bookingMethod, setBookingMethod] = useState('');
    const [bookingPlatform, setBookingPlatform] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
    const [responses, setResponses] = useState([]);

    const translations = useTranslations('BookingForm', language);

    const dropdownAnimation = useSpring({
        opacity: isDropdownOpen ? 1 : 0,
        transform: isDropdownOpen ? 'scaleY(1)' : 'scaleY(0)',
        config: { tension: 200, friction: 20 },
    });

    const bookingMethods = ['Walk-in', 'Your Operator', 'Internet', 'Others (specify)'];
    const bookingPlatforms = {
        'Walk-in': ['Direct', 'Counter'],
        'Your Operator': ['Operator A', 'Operator B'],
        'Internet': ['Booking.com', 'Expedia', 'Airbnb'],
        'Others (specify)': [],
    };

    const handleBookingMethodChange = (e) => {
        const method = e.target.value;
        setBookingMethod(method);
        setBookingPlatform('');
        setIsDropdownOpen(method !== 'Others (specify)');

        // Update responses array
        setResponses((prevResponses) => [
            ...prevResponses.filter((response) => response.surveyquestion_ref !== 'METHOD'),
            { surveyquestion_ref: 'BMETHOD', response_value: method },
        ]);
    };

    const handleBookingPlatformChange = (e) => {
        const platform = e.target.value;
        setBookingPlatform(platform);

        // Update responses array
        setResponses((prevResponses) => [
            ...prevResponses.filter((response) => response.surveyquestion_ref !== 'PLATF'),
            { surveyquestion_ref: 'PLATF', response_value: platform },
        ]);
    };

    const handleOthersSpecifyChange = (e) => {
        const value = e.target.value;
        setBookingPlatform(value);

        // Update responses array
        setResponses((prevResponses) => [
            ...prevResponses.filter((response) => response.surveyquestion_ref !== 'OTHER'),
            { surveyquestion_ref: 'OTHER', response_value: value },
        ]);
    };

    const navigate = useNavigate();

    const handleNext = async () => {
        try {
            await submitSurveyResponses(responses);
            navigate('/');
        } catch (error) {
            console.error('Failed to submit survey responses:', error);
        }
    };
    
    const isNextDisabled =
        !bookingMethod || (bookingMethod !== 'Others (specify)' && !bookingPlatform) || (bookingMethod === 'Others (specify)' && !bookingPlatform.trim());
    
    return (
        <>
            <BodyPartial />
            <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="multiply">
                <Container>
                    <FormGroup>
                        <Label>{translations.bookingFormBookingMethodLabel}</Label>
                        <Dropdown value={bookingMethod} onChange={handleBookingMethodChange}>
                            <Option value="">{translations.bookingFormSelectBookingMethod}</Option>
                            {bookingMethods.map((method) => (
                                <Option key={method} value={method}>
                                    {method}
                                </Option>
                            ))}
                        </Dropdown>
                    </FormGroup>
    
                    {bookingMethod && bookingMethod !== 'Others (specify)' && (
                        <FormGroup>
                            <Label>{translations.bookingFormBookingPlatformLabel}</Label>
                            <animated.div style={dropdownAnimation}>
                                <Dropdown value={bookingPlatform} onChange={handleBookingPlatformChange}>
                                    <Option value="">{translations.bookingFormSelectBookingPlatform}</Option>
                                    {bookingPlatforms[bookingMethod].map((platform) => (
                                        <Option key={platform} value={platform}>
                                            {platform}
                                        </Option>
                                    ))}
                                </Dropdown>
                            </animated.div>
                        </FormGroup>
                    )}
    
                    {bookingMethod === 'Others (specify)' && (
                        <FormGroup>
                            <Label>{translations.bookingFormOthersSpecifyLabel}</Label>
                            <Input type="text" value={bookingPlatform} onChange={handleOthersSpecifyChange} />
                        </FormGroup>
                    )}
    
                    <NextButtonU onClick={handleNext} disabled={isNextDisabled}>
                        {translations.bookingFormNextButton}
                    </NextButtonU>
                </Container>
            </GradientBackground>
        </>
    );
    
};

export default BookingForm;