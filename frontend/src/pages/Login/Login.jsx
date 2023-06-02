import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function LoginForm({ user, setUser }) {
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError(null); // Reset the error message when input fields changes
  };

  const handleKeepLoggedInChange = (e) => {
    setKeepLoggedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoggingIn(true);
    setError(null);

    if (formData.email === "" || formData.password === "") {
      setError("You have to fill in all fields!");
      setisLoggingIn(false);
      return;
    }

    try {
      setTimeout(async () => {
        const res = await axios.post(
          "http://localhost:8080/api/users/loginadmin",
          formData
        );
        console.log(res);
        if (res.data) {
          // Setting user to the data stored in the MongoDB
          setUser(res.data);

          // Save usertoken
          localStorage.setItem("token", res.data.token);
          setisLoggingIn(false);
          // Resets the login-form
          setFormData({
            email: "",
            password: "",
          });
          navigate("/productlist");
        }
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Wrong email or password");
        setError("Wrong email or password");
        setisLoggingIn(false); // Resets the loading animation
      } else {
        console.log(err);
        setError("Something went wrong while logging in");
      }
      setisLoggingIn(false); // Resets the loading animation
    }
  };

  // Logging user when updated.
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="login-container">
      <div className="login-parent">
        <form onSubmit={handleSubmit} noValidate>
          <div className="loginRegister">
            <p>Please Login To get Admin Access</p>
          </div>
          <br></br>

          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="checkbox">
            <div className="checkbox-label-parent">
              <input
                type="checkbox"
                id="checkbox"
                checked={keepLoggedIn}
                onChange={handleKeepLoggedInChange}
              />
              <label htmlFor="checkbox">Please keep me logged in</label>
            </div>
          </div>
          <p className="error">{error}</p>
          <button type="submit" id="btn-submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
