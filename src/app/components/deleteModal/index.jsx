import React from "react";
import Modal from "react-modal";
import "../../styles/style.css";

const customStyles = {
  overlay: {
    background: "#7d7b7aa1",
    color: "#7d7b7aa1",
    zIndex: "2",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transfom: "translate(-50%, -50%)",
  },
  modal: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transfom: "translate(-40%, -10%)",
  },
  greenText: {
    color: "#00ff64",
  },
  style3: {
    marginRight: "-25%",
  },
};

const DeleteModal = (props) => {
  return (
    <Modal
      className="modalDiv"
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="delete-popup" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="delete-popup-modal-body">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="delete-popup-text">
                    Are you sure you want to delete <b>{props.username}</b>?
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-md-offset-4 col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="submit"
                    onClick={props.handleDelete}
                  >
                    Yes
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="submit"
                    className="btn btn-default"
                    id="close"
                    onClick={props.closeModal}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-offset-3 col-md-8 statusRow">
                  {props.successMessage !== "" && (
                    <span id="successMessage">
                      <i className="glyphicon glyphicon-thumbs-up icon-white" />
                      &nbsp;&nbsp; {props.successMessage}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
