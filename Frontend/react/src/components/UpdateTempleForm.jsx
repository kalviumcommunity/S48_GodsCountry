import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import './UpdateTempleForm.css';

const UpdateTempleForm = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState({
    TempleName: '',
    Location: '',
    ERA: '',
    ArchietechturalStyle: '',
    State: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/temples/${id}`)
      .then(response => {
        setTemple(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemple({ ...temple, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/temples/${id}`, temple)
      .then(response => {
        console.log('Temple updated:', response.data);
        navigate('/temple'); // Navigate back to the temple list after updating
      })
      .catch(err => {
        console.log(err);
        setError('An error occurred while updating the temple. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <h2>Update Temple</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className='form-updt-container'>
        <label className='update-form'>
          Temple Name:
          <input type="text" name="TempleName" value={temple.TempleName} onChange={handleChange} required />
        </label>
        <label className='update-form'>
          Location:
          <input type="text" name="Location" value={temple.Location} onChange={handleChange} required />
        </label>
        <label className='update-form'>
          ERA:
          <input type="text" name="ERA" value={temple.ERA} onChange={handleChange} required />
        </label>
        <label className='update-form'>
          Archietechtural Style:
          <input type="text" name="ArchietechturalStyle" value={temple.ArchietechturalStyle} onChange={handleChange} required />
        </label>
        <label className='update-form'>
          State:
          <input type="text" name="State" value={temple.State} onChange={handleChange} required />
        </label>
        <button type="submit">Update Temple</button>
      </form>
    </div>
  );
};

export default UpdateTempleForm;
