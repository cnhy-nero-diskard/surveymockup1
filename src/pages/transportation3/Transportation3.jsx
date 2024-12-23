import React, { useEffect, useState } from 'react';
import RatingSlider from '../../components/partials/RatingSlider';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../../components/shared/useTranslations';

const Transportation3 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('Transportation3', language);

  const categories = [
    translations.transportation3RentalMotorcycleCarVan,
    translations.transportation3MotorcycleHabalHabal,
    translations.transportation3BikePedicab,
    translations.transportation3Tricycle,
    translations.transportation3Jeepney,
    translations.transportation3Bus,
    translations.transportation3TaxiGrab,
    translations.transportation3VanAUVPublicUtility,
    translations.transportation3SmallBoatBangka,
    translations.transportation3FerryCommercialShipBig,
    translations.transportation3TrainMRTLRT,
    translations.transportation3PrivateVehicleNoNeedToRate,
  ];

  const navigate = useNavigate();

  const handleRatingComplete = () => {
    navigate('/'); // Navigate to the next page after rating is complete
  };

  return (
    <RatingSlider
      title={translations.transportation3PleaseRateThisTouristAttractionEvent}
      categories={categories}
      onRatingComplete={handleRatingComplete}
    />
  );
};

export default Transportation3;