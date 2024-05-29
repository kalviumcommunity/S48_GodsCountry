import React, { useState } from 'react';
import axios from 'axios';
import './Addtemples.css';
import { useNavigate } from 'react-router-dom';

function AddTempleForm({ closeForm, refreshTemples }) {
  const [newTemple, setNewTemple] = useState({
    TempleName: '',
    Location: '',
    ERA: '',
    ArchietechturalStyle: '',
    State: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemple({ ...newTemple, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(newTemple)

    axios.post('http://localhost:3001/temples', newTemple).then(()=>{
        alert("Temple Added Successfully");
        setNewTemple({
            TempleName: '',
            Location: '',
            ERA: '',
            ArchietechturalStyle: '',
            State: ''
          });
          navigate("/temple")
    }).catch(err => console.log(err))
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Temple</h2>
        <form className="add-temple-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="TempleName">TempleName</label>
            <input
              type="text"
              id="TempleName"
              name="TempleName"
              value={newTemple.TempleName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Location">Location</label>
            <input
              type="text"
              id="Location"
              name="Location"
              value={newTemple.Location}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ERA">ERA</label>
            <input
              type="text"
              id="ERA"
              name="ERA"
              value={newTemple.ERA}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ArchietechturalStyle">ArchietechturalStyle</label>
            <input
              type="text"
              id="ArchietechturalStyle"
              name="ArchietechturalStyle"
              value={newTemple.ArchietechturalStyle}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="State">State</label>
            <input
              type="text"
              id="State"
              name="State"
              value={newTemple.State}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="submit-button">Add Temple</button>
        </form>
      </div>
    </div>
  );
}
export default AddTempleForm;
