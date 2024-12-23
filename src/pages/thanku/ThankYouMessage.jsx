import React from 'react';
import './ThankYouMessage.css'; // Import the CSS file
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgoverlay from "../../components/img/thank.png";
import useTranslations from '../../components/shared/useTranslations';

const ThankYouMessage = () => {
  const language = localStorage.getItem('selectedLanguage');
  const translations = useTranslations('ThankYouMessage', language);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay}>
        <div className="containerr">
          <h1 className="header">{translations.thankYouMessageHeader}</h1>
          <p className="paragraph">{translations.thankYouMessageParagraph1}</p>
          <p className="paragraph">{translations.thankYouMessageParagraph2}</p>
        </div>
      </GradientBackground>
    </>
  );
};

export default ThankYouMessage;