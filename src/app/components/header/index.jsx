import React from "react";
import Logo from "../../images/people.png";
import "./header.css";

const Header = (props) => {
  const toggleTab = (e) => {
    e.preventDefault();
    props.toggleTabs(e);
  };
  return (
    <div className="header">
      <span className="header-title" id="devices" onClick={toggleTab}>
        <img src={Logo} alt="logo img" id="devices" className="logo-img" />{" "}
        Smart Cloud Management
      </span>
      <span className="options">
        <span className="services active" id="devices" onClick={toggleTab}>
          Devices
        </span>
        <span className="about" id="about" onClick={toggleTab}>
          About
        </span>
      </span>
      <span className="right-menu">
        <span className="loggedInUser" title={props.userRole}>
          Hi {props.username}
        </span>
        <span className="logout" onClick={props.logout}>
          Logout
        </span>
      </span>
    </div>
  );
};

export default Header;
