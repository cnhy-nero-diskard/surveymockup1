import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import imgoverlay from '../../../components/img/bed.png';
import useTranslations from '../../../components/utils/useTranslations';
import { submitSurveyResponses } from '../../../components/utils/sendInputUtils';
import BodyPartial from '../../../components/partials/BodyPartial';
import GradientBackground from '../../../components/partials/GradientBackground';

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

const emojiToRating = { '☹️': 1, '😐': 2, '🙂': 3, '😄': 4 };
const ratingToEmoji = { 1: '☹️', 2: '😐', 3: '🙂', 4: '😄' };

const AccommodationForm = () => {
  const [isCommercial, setIsCommercial] = useState(null);
  const [ratings, setRatings] = useState({
    Hotel: '',
    Resort: '',
    'Serviced Residences': '',
    'PensionLodging house': '',
    'Tourist InnMotelDriveIn': '',
    Homestay: '',
  });
  const [durations, setDurations] = useState({
    Hotel: '',
    Resort: '',
    'Serviced Residences': '',
    'PensionLodging house': '',
    'Tourist InnMotelDriveIn': '',
    Homestay: '',
  });
  const [surveyResponses, setSurveyResponses] = useState([]);

  const emoj = ['☹️', '😐', '🙂', '😄'];
  const accommodationTypes = [
    'Hotel',
    'Resort',
    'Serviced Residences',
    'PensionLodging house',
    'Tourist InnMotelDriveIn',
    'Homestay',
  ];
  const navigate = useNavigate();

  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('AccommodationForm', language);

  const handleRatingChange = (type, emoji) => {
    const rating = emojiToRating[emoji];
    setRatings((prevState) => ({ ...prevState, [type]: emoji }));
    updateSurveyResponses(type, 'RATING', rating);
  };

  const handleDurationChange = (type, duration) => {
    setDurations((prevState) => ({ ...prevState, [type]: duration }));

    if (duration === '' || duration === '0') {
      setRatings((prevState) => ({ ...prevState, [type]: '' }));
      updateSurveyResponses(type, 'RATING', '');
    }

    updateSurveyResponses(type, 'DURATION', duration);
  };

  const updateSurveyResponses = (type, field, value) => {
    setSurveyResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (response) => response.surveyquestion_ref === `${type}_${field}`
      );

      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex].response_value = value;
        return updatedResponses;
      } else {
        return [
          ...prevResponses,
          {
            surveyquestion_ref: `${type}_${field}`,
            response_value: value,
          },
        ];
      }
    });
  };

  const handleCommercialResponse = (responseValue) => {
    setSurveyResponses((prevResponses) => {
      const commercialResponseIndex = prevResponses.findIndex(
        (response) => response.surveyquestion_ref === 'commercial'
      );

      if (commercialResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[commercialResponseIndex].response_value = responseValue;
        return updatedResponses;
      } else {
        return [
          ...prevResponses,
          {
            surveyquestion_ref: 'COMMACC',
            response_value: responseValue,
          },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await submitSurveyResponses(surveyResponses);
      navigate('/');
    } catch (error) {
      console.error('Error submitting survey responses:', error);
    }
  };

  const handleNoButtonClick = () => {
    handleCommercialResponse('NO');
    setIsCommercial(false);
    handleSubmit();
  };

  useEffect(() => {
    if (surveyResponses.length > 0) {
      const updatedRatings = { ...ratings };
      surveyResponses.forEach(response => {
        if (response.surveyquestion_ref.endsWith('_RATING')) {
          const type = response.surveyquestion_ref.split('_')[0];
          const ratingValue = parseInt(response.response_value);
          updatedRatings[type] = ratingToEmoji[ratingValue] || '';
        }
      });
      setRatings(updatedRatings);
    }
  }, [surveyResponses]);

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
              onClick={() => {
                handleCommercialResponse('YES');
                setIsCommercial(true);
              }}
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
                  {accommodationTypes.map((type) => (
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
                onClick={handleSubmit}
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