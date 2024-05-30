import React, { useState, useEffect } from 'react'; // Make sure useEffect is imported
import axios from 'axios';
import './Addtemples.css';
import { useNavigate, useParams } from 'react-router-dom';

function AddTempleForm({ closeForm, refreshTemples }) {
    const { id } = useParams();
    const [newTemple, setNewTemple] = useState({
        TempleName: '',
        Location: '',
        ERA: '',
        ArchietechturalStyle: '',
        State: ''
    });

    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdating(true);
            axios.get(`http://localhost:3001/temples/${id}`)
                .then(response => {
                    setNewTemple(response.data); // Corrected this line
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemple({ ...newTemple, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isUpdating) {
            axios.put(`http://localhost:3001/temples/${id}`, newTemple)
                .then(() => {
                    alert("Temple Updated Successfully");
                    navigate("/temple");
                    refreshTemples();
                })
                .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:3001/temples', newTemple)
                .then(() => {
                    alert("Temple Added Successfully");
                    setNewTemple({
                        TempleName: '',
                        Location: '',
                        ERA: '',
                        ArchietechturalStyle: '',
                        State: ''
                    });
                    navigate("/temple");
                    refreshTemples();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{isUpdating ? "Update Temple" : "Add New Temple"}</h2>
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
                    <button type="submit" className="submit-button">{isUpdating ? "Update Temple" : "Add Temple"}</button>
                </form>
            </div>
        </div>
    );
}

export default AddTempleForm;
