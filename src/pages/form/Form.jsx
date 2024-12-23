// Form.jsx
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Form.css'; // Import the new CSS file
import BodyPartial from '../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import { FORM } from '../../components/shared/componentConstants';
import useTranslations from '../../components/shared/useTranslations';

const Form = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [language] = useState(localStorage.getItem('selectedLanguage') || 'en');

    // Use the custom hook to fetch translations
    const translations = useTranslations(FORM, language);

    const formAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 500 },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', { fullName, email });
    };

    const navigate = useNavigate(); // Initialize useNavigate
    const handleNextClick = () => {
        navigate('/'); // Navigate to the next question
    };

    return (
        <>
            <BodyPartial />
            <animated.div className="form-container" style={formAnimation}>
                <h2 className="form-title">
                    <span>{translations.formWelcomeTourists}</span> 
                    <span>{translations.formFillOutForm}</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder={translations.formFullNamePlaceholder}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="input-field"
                        placeholder={translations.formEmailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleNextClick} type="submit" className="submit-button">
                        {translations.formSubmitButton}
                    </button>
                </form>
            </animated.div>
        </>
    );
};

export default Form;