// src/Page1.jsx
import React, { useState } from 'react';
import translations from '../translations.json';
import './page1.css'; // Import the CSS file

const Page1x = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handlePrivateVehicleChange = (e) => {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.checked = false; // Clear the value
      radio.disabled = e.target.checked; // Disable if the checkbox is checked
    });
  };

  const t = translations[language].page1;

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>{t.title}</h1>
        </div>
        <div className="card-body content">
          <p>{t.rateScale}</p>
          <table className="table table-bordered">
            <tr>
              <th></th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
            </tr>
            <tr>
              <td>{t.rental}</td>
              <td><input name="rental" type="radio" value="1"/></td>
              <td><input name="rental" type="radio" value="2"/></td>
              <td><input name="rental" type="radio" value="3"/></td>
              <td><input name="rental" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.motorcycle}</td>
              <td><input name="motorcycle" type="radio" value="1"/></td>
              <td><input name="motorcycle" type="radio" value="2"/></td>
              <td><input name="motorcycle" type="radio" value="3"/></td>
              <td><input name="motorcycle" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.bike}</td>
              <td><input name="bike" type="radio" value="1"/></td>
              <td><input name="bike" type="radio" value="2"/></td>
              <td><input name="bike" type="radio" value="3"/></td>
              <td><input name="bike" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.tricycle}</td>
              <td><input name="tricycle" type="radio" value="1"/></td>
              <td><input name="tricycle" type="radio" value="2"/></td>
              <td><input name="tricycle" type="radio" value="3"/></td>
              <td><input name="tricycle" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.jeepney}</td>
              <td><input name="jeepney" type="radio" value="1"/></td>
              <td><input name="jeepney" type="radio" value="2"/></td>
              <td><input name="jeepney" type="radio" value="3"/></td>
              <td><input name="jeepney" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.bus}</td>
              <td><input name="bus" type="radio" value="1"/></td>
              <td><input name="bus" type="radio" value="2"/></td>
              <td><input name="bus" type="radio" value="3"/></td>
              <td><input name="bus" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.taxi}</td>
              <td><input name="taxi" type="radio" value="1"/></td>
              <td><input name="taxi" type="radio" value="2"/></td>
              <td><input name="taxi" type="radio" value="3"/></td>
              <td><input name="taxi" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.van}</td>
              <td><input name="van" type="radio" value="1"/></td>
              <td><input name="van" type="radio" value="2"/></td>
              <td><input name="van" type="radio" value="3"/></td>
              <td><input name="van" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.boat}</td>
              <td><input name="boat" type="radio" value="1"/></td>
              <td><input name="boat" type="radio" value="2"/></td>
              <td><input name="boat" type="radio" value="3"/></td>
              <td><input name="boat" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.ferry}</td>
              <td><input name="ferry" type="radio" value="1"/></td>
              <td><input name="ferry" type="radio" value="2"/></td>
              <td><input name="ferry" type="radio" value="3"/></td>
              <td><input name="ferry" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.train}</td>
              <td><input name="train" type="radio" value="1"/></td>
              <td><input name="train" type="radio" value="2"/></td>
              <td><input name="train" type="radio" value="3"/></td>
              <td><input name="train" type="radio" value="4"/></td>
            </tr>
            <tr>
              <td>{t.privateVehicle}</td>
              <td colSpan="4"><input id="private_vehicle" name="private_vehicle" type="checkbox" onChange={handlePrivateVehicleChange}/></td>
            </tr>
          </table>
        </div>
        <div className="card-footer footer">
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <select onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};

export default Page1x;