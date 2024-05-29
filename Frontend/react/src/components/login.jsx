import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './login.css';

export default function Login() {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: field.email,
        password: field.password,
        action: "login",
      });

      if (response.data.message === "Login successful") {
        setValidation(true);
        Cookies.set("token", response.data.token, { expires: 1 });
        setError("");
        navigate("/temple");
      } else {
        setValidation(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      setValidation(false);
      setError("Email or Password is invalid");
      console.error(err);
    }
  };

  return (
    <div className="loginform-container">
      <div className="loginregister-form">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {submitted && !validate && error && (
            <div className="logintext-danger">{error}</div>
          )}

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="loginform-control"
              type="text"
              placeholder="Email"
              name="email"
              value={field.email}
              onChange={(e) => {
                setField({ ...field, email: e.target.value });
              }}
            />
            {submitted && !field.email && (
              <div className="logintext-danger">Please enter your Email</div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="loginform-control"
              type="password"
              placeholder="Password"
              name="password"
              value={field.password}
              onChange={(e) => {
                setField({ ...field, password: e.target.value });
              }}
            />
            {submitted && !field.password && (
              <div className="logintext-danger">Please enter your password</div>
            )}
          </div>

          <button className="loginform-field log-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
