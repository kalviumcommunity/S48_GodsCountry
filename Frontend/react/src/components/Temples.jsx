import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './temples.css'; // Import the new CSS file

function Temple() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/temples')
      .then(response => setTemples(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className="temple-container">
      {temples && temples.map((temple, id) => (
        <div className="temple-card" key={id}>
          <p><strong>Place: </strong>{temple.TempleName}</p>
          <p><strong>City: </strong>{temple.Location}</p>
          <p><strong>State: </strong>{temple.ERA}</p>
          <p><strong>Vehicles Available: </strong>{temple.ArchietechturalStyle}</p>
          <p><strong>Options to Stay: </strong>{temple.State}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Temple;

