import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled, { ThemeProvider } from 'styled-components';
import BodyPartial from '../../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import { FORM } from '../../../components/utils/componentConstants';
import useTranslations from '../../../components/utils/useTranslations';
import { NextButtonU } from '../../../components/utils/styles1';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import GradientBackground from '../../../components/partials/GradientBackground';

export const theme = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        error: '#dc3545',
        background: '#f8f9fa',
        text: '#212529',
    },
    fonts: {
        primary: 'Arial, sans-serif',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Styled components
const FormContainer = styled(animated.div)`
    max-width: 400px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.large};
    background: transparent;
    border-radius: ${({ theme }) => theme.borderRadius};
    text-align: center;
`;

const FormTitle = styled.h2`
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const InputField = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 20px;
    font-family: ${({ theme }) => theme.fonts.primary};
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`;

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });

    const [language] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const translations = useTranslations(FORM, language);

    const formAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the survey responses array
        const surveyResponses = [
            {
                surveyquestion_ref: 'FNAME', // 5 chars, all caps
                response_value: formData.fullName,
            },
            {
                surveyquestion_ref: 'EMAIL', // 5 chars, all caps
                response_value: formData.email,
            },
        ];

        try {
            // Submit the survey responses
            await submitSurveyResponses(surveyResponses);
            console.log('Survey responses submitted successfully!');
            navigate('/'); // Navigate to the next page after submission
        } catch (error) {
            console.error('Failed to submit survey responses:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <BodyPartial />
<GradientBackground>
                <FormContainer style={formAnimation}>
                    <FormTitle>
                        <span>{translations.formWelcomeTourists}</span> 
                        <span>{translations.formFillOutForm}</span>
                    </FormTitle>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            type="text"
                            name="fullName"
                            placeholder={translations.formFullNamePlaceholder}
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        <InputField
                            type="text"
                            name="email"
                            placeholder={translations.formEmailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <NextButtonU type="submit">
                            {translations.formSubmitButton}
                        </NextButtonU>
                    </form>
                </FormContainer>
    
</GradientBackground>        </ThemeProvider>
    );
};

export default Form;