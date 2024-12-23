// Page1.js

import React from 'react';
import './Page1.css'; // Import the CSS file
import bg from './page1bg.jpg';
import logo from './logo.svg';
import nextArrow from '../../svg/flnext.svg'; // Assuming you have an arrow icon
import BodyPartial from '../../components/partials/BodyPartial';
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextClick = () => {
    navigate('/'); // Navigate to the next question
  };

  return (
    <>
      <BodyPartial />
      <div className="body">
        <div className="containerr">
          <div className="wave">
            <img
              className="waveImg"
              src={bg}
              alt="Background with blue waves and lines"
              width="1920"
              height="1080"
            />
          </div>
          <div className="content">
            <img
              className="contentImg"
              src={logo}
              alt="Department of Tourism Philippines logo"
              width="100"
              height="100"
            />
            <h1 className="contentH1">TOURISM PRODUCT MARKET SURVEY</h1>
            {/* <button className="rounded-button">        </button> */}
            {/* <img class = "arr" src={nextArrow} alt="Next" /> */}
            <input onClick={handleNextClick} class="rounded-button" type="image" src={nextArrow} />

          </div>

        </div>
      </div>

    </>);
};

export default Page1;