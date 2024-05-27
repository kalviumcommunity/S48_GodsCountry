import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Temple() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="api">
      {users && users.map((user, id) => (
        <div className="data" key={id}>
          <p><strong>Place: </strong>{user.TempleName}</p>
          <p><strong>City: </strong>{user. Location}</p>
          <p><strong>State: </strong>{user.ERA}</p>
          <p><strong>Vehicles Available: </strong>{user. ArchietechturalStyle}</p>
          <p><strong>Options to Stay: </strong>{user. State}</p>
        </div>
      ))}
    </div>
  );
}

export default Temple;
