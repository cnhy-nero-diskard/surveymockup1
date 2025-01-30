import React, { useState, useEffect } from 'react';
import RatingSlider from '../../../components/partials/RatingSlider';
import useTranslations from '../../../components/utils/useTranslations';
import { useNavigate } from 'react-router-dom';

const Services2 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('Services2', language);
  const entranslations = useTranslations('Services2', 'en');

  const categories = [
    translations.services2AccomodationPersonnel,
    translations.services2RestaurantFoodBeveragesPersonnel,
    translations.services2TransportPersonnel,
    translations.services2TravelTourOperators,
    translations.services2TourGuides,
    translations.services2AttractionPersonnel,
    translations.services2GovernmentPersonnel,
    translations.services2FinancialServicesPersonnel,
    translations.services2Facilities,
    translations.services2Restaurant,
    translations.services2LeisureEntertainmentFacilities,
    translations.services2ShopsMalls,
    translations.services2PanglaoInternationalAirport,
    translations.services2Seaport,
    translations.services2MobileSignalWifi
  ];
  const encategories = [
    entranslations.services2AccomodationPersonnel,
    entranslations.services2RestaurantFoodBeveragesPersonnel,
    entranslations.services2TransportPersonnel,
    entranslations.services2TravelTourOperators,
    entranslations.services2TourGuides,
    entranslations.services2AttractionPersonnel,
    entranslations.services2GovernmentPersonnel,
    entranslations.services2FinancialServicesPersonnel,
    entranslations.services2Facilities,
    entranslations.services2Restaurant,
    entranslations.services2LeisureEntertainmentFacilities,
    entranslations.services2ShopsMalls,
    entranslations.services2PanglaoInternationalAirport,
    entranslations.services2Seaport,
    entranslations.services2MobileSignalWifi
  ];
  const navigate = useNavigate();
  const handleRatingComplete = () => {
    console.log(translations.services2AllRatingsCompleted);
    navigate('/');
  };

  return (
    <RatingSlider
      title={translations.services2RateServicesFacilitiesTitle}
      categories={categories}
      onRatingComplete={handleRatingComplete}
      surveyquestion_refs={'SVC2'}
      entranslations={encategories}
    />
  );
};

export default Services2;