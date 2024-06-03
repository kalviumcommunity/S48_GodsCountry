import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [field, setField] = useState({
    userName: "",
    password: ""
  });

  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!field.userName || !field.password) {
      setSubmit(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: field.userName,
        password: field.password
      });

      if (response.status === 200) {
        setValidation(true);
        setSubmit(true);
        document.cookie = `username=${field.userName}; path=/`;
        navigate("/Home"); // Redirect to home page on successful login
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("Login Suseccfull");
      }
      setError(error.response ? error.response.data.message : "An error occurred during login");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {submitted && validate && <div className="success-message">Login successful!</div>}
          {error && <div className="error-message">{error}</div>}

          <input
            id="username"
            className="form-field"
            type="text"
            placeholder="Username"
            name="username"
            value={field.userName}
            onChange={(e) => setField({ ...field, userName: e.target.value })}
          />
          {submitted && !field.userName && <span>Please enter your username</span>}

          <input
            id="password"
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={(e) => setField({ ...field, password: e.target.value })}
          />
          {submitted && !field.password && <span>Please enter your password</span>}

          <button className="form-field" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
