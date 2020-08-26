import React, { useState } from "react";
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

const AddDeviceModal = (props) => {
  const [upload, setUpload] = useState({
    customerName: "",
    serviceStatus: "",
    deviceIP: "",
    version: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");
    const field = e.target.name;
    const value = e.target.value;
    setUpload({ ...upload, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !upload.customerName ||
      !upload.serviceStatus ||
      !upload.deviceIP ||
      !upload.version
    ) {
      setErrorMessage("Please enter all the details");
    } else {
      setErrorMessage("");
      setLoading(true);
      //   console.log("Upload:", upload);
      props.addDeviceDetails({
        username: upload.customerName,
        location: "Running",
      });
      setSuccessMessage("Device created successfully.");
      setTimeout(() => {
        props.closeModal();
      }, 2000);
    }
  };

  return (
    <Modal
      className="modalDiv"
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="add-device" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="add-device-modal-body">
              <div className="col-md-12">
                <h2 className="add-device-title">
                  <span className="glyphicon glyphicon-edit"></span> Add Device
                </h2>
              </div>
              <div className="col-md-12">
                <form id="addService" className="grey-text">
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="customerName">Customer Name:</label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        name="customerName"
                        id="customerName"
                        className="form-control"
                        required
                        placeholder="Please enter customer name"
                        value={upload.customerName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="serviceStatus">Request:</label>
                    </div>
                    <div className="col-md-7">
                      <div className="radio">
                        <label
                          htmlFor="serviceStatus"
                          className="radio radio-align"
                        >
                          <input
                            type="radio"
                            name="serviceStatus"
                            id="active"
                            value="Active"
                            onChange={handleChange}
                          />
                          Activate
                        </label>
                      </div>
                      <div className="radio">
                        <label
                          htmlFor="serviceStatus"
                          className="radio radio-align"
                        >
                          <input
                            type="radio"
                            name="serviceStatus"
                            id="de-active"
                            value="Inactive"
                            onChange={handleChange}
                          />
                          De-activate <br />
                        </label>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="deviceIP">IP Address:</label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        name="deviceIP"
                        id="deviceIP"
                        className="form-control"
                        required
                        placeholder="Please enter IP address"
                        value={upload.deviceIP}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="version">Version:</label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="number"
                        name="version"
                        id="version"
                        className="form-control"
                        required
                        placeholder="Please enter version number"
                        value={upload.version}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="submit"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="submit"
                        className="btn btn-default"
                        id="close"
                        onClick={props.closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <br />
                  <div className="statusRow">
                    {successMessage && (
                      <span id="successMessage">
                        <i className="glyphicon glyphicon-thumbs-up icon-white" />
                        &nbsp;&nbsp; {successMessage}
                      </span>
                    )}
                    {errorMessage && (
                      <span id="errorMessage">
                        <i className="glyphicon glyphicon-thumbs-down icon-white" />
                        &nbsp;&nbsp; {errorMessage}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddDeviceModal;
