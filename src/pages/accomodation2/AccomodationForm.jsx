import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BodyPartial from '../../components/partials/BodyPartial';
import GradientBackground from '../../components/partials/GradientBackground';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../components/img/bed.png';
import useTranslations from '../../components/shared/useTranslations';

const FormContainer = styled(motion.div)`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Question = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Button = styled(motion.button)`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
`;

const TableRow = styled.tr`
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const RatingCell = styled.td`
  display: flex;
  gap: 6px;
  padding: 5px;
`;

const RatingButton = styled.button`
  background: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;

  &.selected {
    background-color: #007bff;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const DurationInput = styled.input`
  width: 80px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
`;

const NextButton = styled(motion.button)`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const AccommodationForm = () => {
  const [isCommercial, setIsCommercial] = useState(null);
  const [ratings, setRatings] = useState({
    Hotel: '',
    Resort: '',
    'Serviced Residences': '',
    'Pension/Lodging house': '',
    'Tourist Inn/Motel/Drive-In': '',
    Homestay: '',
  });
  const [durations, setDurations] = useState({
    Hotel: '',
    Resort: '',
    'Serviced Residences': '',
    'Pension/Lodging house': '',
    'Tourist Inn/Motel/Drive-In': '',
    Homestay: '',
  });
  const emoj = ['☹️', '😐', '🙂', '😄'];
  const accomodationTypes = [
    'Hotel',
    'Resort',
    'Serviced Residences',
    'PensionLodging house',
    'TouristInnMotelDriveIn',
    'Homestay',
  ];
  const navigate = useNavigate();

  // Fetch the selected language from localStorage
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));

  // Fetch translations using the useTranslations hook
  const translations = useTranslations('AccommodationForm', language);

  const handleRatingChange = (type, rating) => {
    setRatings((prevState) => ({ ...prevState, [type]: rating }));
  };

  const handleDurationChange = (type, duration) => {
    setDurations((prevState) => ({ ...prevState, [type]: duration }));

    // Clear the rating if the duration is 0 or empty
    if (duration === '' || duration === '0') {
      setRatings((prevState) => ({ ...prevState, [type]: '' }));
    }
  };

  const handleNext = () => {
    navigate('/'); // Navigate to the home page
  };

  const handleNoButtonClick = () => {
    setIsCommercial(false);
    navigate('/');
  };

  return (
    <>
      <BodyPartial />
      <GradientBackground overlayImage={imgoverlay} opacity={0.2} blendMode="multiply">
        <FormContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Question>{translations.accommodationFormCommercialQuestion}</Question>
          <ButtonGroup>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCommercial(true)}
            >
              {translations.accommodationFormYesButton}
            </Button>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNoButtonClick}
            >
              {translations.accommodationFormNoButton}
            </Button>
          </ButtonGroup>
          {isCommercial !== null && isCommercial && (
            <>
              <Question>{translations.accommodationFormTypesAndLengthQuestion}</Question>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>{translations.accommodationFormNameHeader}</TableHeader>
                    <TableHeader>{translations.accommodationFormRatingHeader}</TableHeader>
                    <TableHeader>{translations.accommodationFormDurationHeader}</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {accomodationTypes.map((type) => (
                    <TableRow key={type}>
                      <TableCell>{translations[`accommodationFormType${type.replace(/ /g, '')}`]}</TableCell>
                      <RatingCell>
                        {emoj.map((emoji) => (
                          <RatingButton
                            key={emoji}
                            className={ratings[type] === emoji ? 'selected' : ''}
                            onClick={() => handleRatingChange(type, emoji)}
                            disabled={durations[type] === '' || durations[type] === '0'}
                          >
                            {emoji}
                          </RatingButton>
                        ))}
                      </RatingCell>
                      <TableCell>
                        <DurationInput
                          type="number"
                          value={durations[type]}
                          onChange={(e) => handleDurationChange(type, e.target.value)}
                          placeholder={translations.accommodationFormDaysPlaceholder}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <NextButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
              >
                {translations.accommodationFormNextButton}
              </NextButton>
            </>
          )}
        </FormContainer>
      </GradientBackground>
    </>
  );
};

export default AccommodationForm;