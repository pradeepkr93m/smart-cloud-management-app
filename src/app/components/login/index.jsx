import React, { useState, useEffect } from "react";
import LoginImg from "../../images/login.png";
import Devices from "../devices";
import "./login.css";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("mount of login");
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(JSON.parse(token));
      setUsername(username);
    }
  }, []);

  const handleInputChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    field === "username" ? setUsername(value) : setPassword(value);
    setMessage("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage("Please enter login credentials");
    } else {
      if (username === "Rob" && password === "abcde") {
        setIsAuthenticated(true);
        setUserRole("Admin");
        setMessage("");
      } else if (username === "Martin" && password === "abc123") {
        setIsAuthenticated(true);
        setUserRole("Member");
        setMessage("");
      } else {
        setIsAuthenticated(false);
        setMessage(
          "Incorrect Username/Password. Please try again with valid credentials"
        );
      }
    }
  };

  const handleLogout = () => {
    console.log("You have been successfully logged out");
    setIsAuthenticated((isAuthenticated) => !isAuthenticated);
    localStorage.clear();
    console.log("isAuthenticated: ", isAuthenticated);
  };

  if (isAuthenticated) {
    return (
      <Devices
        username={username}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        logout={handleLogout}
      />
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 left-align">
          <img
            src={LoginImg}
            alt="login img"
            className="img-responsive logo-image"
          />
        </div>
        <div className="col-md-8 form-div">
          <h2 className="heading">Smart Cloud Management Application</h2>
          <form className="form-tab">
            <div className="login-form">
              <div className="row">
                <div className="col-md-4 login-field-size">
                  <label htmlFor="username" className="login-label">
                    <span className="glyphicon glyphicon-user" /> Username:
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                    value={username}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4 login-field-size">
                  <label htmlFor="password" className="login-label">
                    <span className="glyphicon glyphicon-lock" /> Password:
                  </label>
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                    value={password}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
              <br />
              <div className="statusRow">
                {message ? (
                  <span className="error-message">
                    <i className="glyphicon glyphicon-exclamation-sign" />{" "}
                    {message}
                  </span>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
