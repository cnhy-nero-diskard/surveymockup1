import React from "react";
import "./TourismSurvey.css"; // For external styling

const TourismSurvey = () => {
  return (
    <div className="survey-container">
      <div className="header-wave"></div>
      <div className="content">
        <div className="logo">
          <img
            src="path-to-dot-logo.png"
            alt="Department of Tourism Logo"
            className="logo-img"
          />
        </div>
        <h1 className="title">Tourism Product Market Survey</h1>
        <button className="next-button">Next</button>
      </div>
      <div className="footer-wave"></div>
    </div>
  );
};

export default TourismSurvey;
