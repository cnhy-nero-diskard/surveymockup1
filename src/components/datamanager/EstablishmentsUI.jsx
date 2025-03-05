import React, { useState, useEffect } from 'react';
import { createEstablishment, fetchEstablishments, updateEstablishment, deleteEstablishment } from '../utils/crudapi';

const EstablishmentsUI = () => {
  const [establishments, setEstablishments] = useState([]);
  const [formData, setFormData] = useState({
    estName: '', type: '', cityMun: '', barangay: '', latitude: '', longitude: '',
    english: '', korean: '', chinese: '', japanese: '', russian: '', french: '', spanish: '', hindi: '',
  });

  useEffect(() => {
    fetchEstablishments().then(data => setEstablishments(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEstablishment = await createEstablishment(
      formData.estName, formData.type, formData.cityMun, formData.barangay, formData.latitude, formData.longitude,
      formData.english, formData.korean, formData.chinese, formData.japanese, formData.russian, formData.french, formData.spanish, formData.hindi
    );
    setEstablishments([...establishments, newEstablishment]);
  };

  const handleDelete = async (id) => {
    await deleteEstablishment(id);
    setEstablishments(establishments.filter(est => est.id !== id));
  };

  return (
    <div>
      <h2>Establishments Management</h2>
      <form onSubmit={handleSubmit}>
        {/* Add all input fields for establishment properties */}
        <input
          type="text"
          placeholder="Establishment Name"
          value={formData.estName}
          onChange={(e) => setFormData({ ...formData, estName: e.target.value })}
        />
        {/* Add other input fields similarly */}
        <button type="submit">Create</button>
      </form>
      <ul>
        {establishments.map(est => (
          <li key={est.id}>
            {est.estName} - {est.type} - {est.cityMun} - {est.barangay}
            <button onClick={() => handleDelete(est.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstablishmentsUI;
