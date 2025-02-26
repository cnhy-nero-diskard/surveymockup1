import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';
import imgOverlay from "../../../components/img/venue.png";
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import { useCurrentStepIndex } from '../../../components/utils/useCurrentIndex';
import { UnifiedContext } from '../../../routes/UnifiedContext';
import { goToNextStep } from '../../../components/utils/navigationUtils';

const Container = styled(motion.div)`
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled(motion.li)`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ selected }) => (selected ? '#007bff' :' rgba(35, 144, 245, 0.86)')};
  color: ${({ selected }) => (selected ? 'white' : '#fff')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#e0e0e0')};
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(85, 148, 230, 0.1);
  width: 300px;
`;

const PopupTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
`;

const PopupInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PopupButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SurveyVenue = () => {
  const { routes } = useContext(UnifiedContext);
  const currentStepIndex = useCurrentStepIndex(routes);
  const { activeBlocks, appendActiveBlocks, removeActiveBlocks } = useContext(UnifiedContext);

  
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [otherVenue, setOtherVenue] = useState('');
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('SurveyVenue', language);

  const venues = [
    translations.surveyVenueAccommodationEstablishment,
    translations.surveyVenueTouristAttraction,
    translations.surveyVenueMICEFacility,
    translations.surveyVenueEmailedSurvey,
    translations.surveyVenuePortTransportationFacility,
    translations.surveyVenueOthersSpecify,
  ];

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    if (venue === translations.surveyVenueOthersSpecify) {
      setShowPopup(true);
    } else {
      submitResponse(venue);
      goToNextStep(currentStepIndex, navigate, routes, activeBlocks);
    }
  };

  const handlePopupSubmit = () => {
    if (otherVenue) {
      setSelectedVenue(otherVenue);
      submitResponse(otherVenue);
      setShowPopup(false);
      navigate('/next-page'); // Navigate to the next page after specifying the venue
    }
  };

  const submitResponse = (responseValue) => {
    const surveyResponses = [{
      surveyquestion_ref: 'VENUE', // 5 characters, all caps
      response_value: responseValue,
    }];

    submitSurveyResponses(surveyResponses)
      .then(() => {
        console.log('Survey responses submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting survey responses:', error);
      });
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgOverlay} opacity={0.05} blendMode='darken'>
        <Container
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>{translations.surveyVenueTitle}</Title>
          <List>
            {venues.map((venue, index) => (
              <ListItem
                key={index}
                selected={selectedVenue === venue}
                onClick={() => handleVenueSelect(venue)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {venue}
              </ListItem>
            ))}
          </List>
        </Container>
      </GradientBackground>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>{translations.surveyVenuePopupTitle}</PopupTitle>
            <PopupInput
              type="text"
              placeholder={translations.surveyVenuePopupPlaceholder}
              value={otherVenue}
              onChange={(e) => setOtherVenue(e.target.value)}
            />
            <PopupButton onClick={handlePopupSubmit}>{translations.surveyVenuePopupButton}</PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default SurveyVenue;