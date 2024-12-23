import React, { useState, useEffect } from 'react';
import './WhereLearn.css';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';
import imgOverlay from "../../components/img/soundwave.png";
import { Container } from '../../components/shared/styles1';
import useTranslations from '../../components/shared/useTranslations';

const WhereLearn = () => {
  const [selectedSource, setSelectedSource] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Use the useTranslations hook to get translations
  const translations = useTranslations('WhereLearn', language);

  const handleSourceSelection = (value) => {
    setSelectedSource(value);
    navigate('/'); // Replace '/next-page' with the actual path to your next page
  };

  // Add a state to control the animation
  const [animate, setAnimate] = useState(false);

  // Trigger the animation after the component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.1} blendMode='screen'>
        <Container className={animate ? 'intro-animation' : ''}>
          <h2>{translations.whereLearnTitle}</h2>
          <form>
            <div className="text-button-group">
              {/* Text Buttons */}
              <button
                type="button"
                className={`text-button ${selectedSource === 'Friends,Family/Relatives' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Friends,Family/Relatives')}
              >
                {translations.whereLearnOptionFriendsFamily}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Books,Magazines,Articles' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Books,Magazines,Articles')}
              >
                {translations.whereLearnOptionBooksMagazines}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Online/Social Media' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Online/Social Media')}
              >
                {translations.whereLearnOptionOnlineSocialMedia}
              </button>
              <button
                type="button"
                className={`text-button ${selectedSource === 'Advertisements' ? 'selected' : ''}`}
                onClick={() => handleSourceSelection('Advertisements')}
              >
                {translations.whereLearnOptionAdvertisements}
              </button>
            </div>
          </form>
        </Container>
      </GradientBackground>
    </>
  );
};

export default WhereLearn;