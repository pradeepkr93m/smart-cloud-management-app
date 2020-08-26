import React, { useState } from "react";
import DeleteModal from "../deleteModal";
import active from "../../images/active.png";
import inactive from "../../images/inactive.png";
import "./card.css";

const Card = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const openModal = (e) => {
    let username = e.target.id;
    setUsername(username);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteInstance(e, username);
    setSuccessMessage("Deleted successfully");
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <div className="card-wrapper col-md-3">
      <div className="card-header">
        <span
          id="editDevice"
          name={props.data.username}
          onClick={
            props.tab !== "addService" ? props.toggleTabs : props.updateService
          }
          title={
            props.tab !== "addService"
              ? "Click to Add Service"
              : "Click to Update Service"
          }
        >
          {props.data.username}
        </span>
        <span className="close" id={props.data.username} onClick={openModal}>
          x
        </span>
      </div>
      <div className="card-body">
        Status: {props.data.location}
        <span className="card-status">
          <img
            src={props.data.location === "Inactive" ? inactive : active}
            alt="card status"
          />
        </span>
      </div>
      {modalIsOpen && (
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          username={username}
          handleDelete={handleDelete}
          successMessage={successMessage}
        />
      )}
    </div>
  );
};

export default Card;
