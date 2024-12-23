import React, { useState, useEffect } from 'react';
import RatingSlider from '../../components/partials/RatingSlider';
import GradientBackground from '../../components/partials/GradientBackground';
import BodyPartial from '../../components/partials/BodyPartial';
import imgOverlay from "../../components/img/sentiment.png";
import useTranslations from '../../components/shared/useTranslations';

const Services2 = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage'));
  const translations = useTranslations('Services2', language);

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

  const handleRatingComplete = () => {
    console.log(translations.services2AllRatingsCompleted);
    // Handle any additional logic here (e.g., saving ratings, navigating, etc.)
  };

  return (
    <RatingSlider
      title={translations.services2RateServicesFacilitiesTitle}
      categories={categories}
      onRatingComplete={handleRatingComplete}
    />
  );
};

export default Services2;