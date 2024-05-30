import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './temples.css';
import { useNavigate } from 'react-router-dom';

function Temples() {
  const [temples, setTemples] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/temples')
      .then(response => setTemples(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/temples/${id}`)
      .then(response => {
        setTemples(temples.filter(temple => temple._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = (id) => {
    navigate(`/temples/${id}`);
  };

  return (
    <div>
      <div id='add-temple-button'><a href="/addtemple"><button>Add Temples</button></a></div>
      <div className="temple-container">
        {temples && temples.map((temple, id) => (
          <div className="temple-card" key={id}>
            <p><strong>TempleName: </strong>{temple.TempleName}</p>
            <p><strong>Location: </strong>{temple.Location}</p>
            <p><strong>ERA: </strong>{temple.ERA}</p>
            <p><strong>ArchietechturalStyle: </strong>{temple.ArchietechturalStyle}</p>
            <p><strong>State: </strong>{temple.State}</p>
            <div className="temple-actions" >
              <div><button onClick={() => handleUpdate(temple._id)}>Update</button></div>
              <div><button onClick={() => handleDelete(temple._id)}>Delete</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Temples;
