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
      <div id='add-temple-button'><a href="/addtemple"><button>Add Temples</button></a></div>
      <div className="temple-container">
      {temples && temples.map((temple, id) => (
        <div className="temple-card" key={id}>
          <p><strong>TempleName: </strong>{temple.TempleName}</p>
          <p><strong>Location: </strong>{temple.Location}</p>
          <p><strong>ERA: </strong>{temple.ERA}</p>
          <p><strong>ArchietechturalStyle: </strong>{temple.ArchietechturalStyle}</p>
          <p><strong>State: </strong>{temple.State}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Temple;

