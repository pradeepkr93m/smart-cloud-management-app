import React, { useState, Fragment } from "react";
import Modal from "react-modal";
import { version } from "react-dom";

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

const AddServiceModal = (props) => {
  const [upload, setUpload] = useState({
    serviceName: "",
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
    if (!upload.serviceName || !upload.version) {
      setErrorMessage("Please enter all the details");
    } else {
      setErrorMessage("");
      setLoading(true);
      console.log("Upload in service modal:", upload);
      if (upload.serviceStatus) {
        let message =
          upload.serviceStatus === "Active"
            ? "Service activated successfully."
            : "Service de-activated successfully.";
        setSuccessMessage(message);
        props.updateServiceDetails(e, upload.serviceName, upload.serviceStatus);
        setTimeout(() => {
          props.closeModal();
        }, 2000);
      } else {
        let serviceName = "";
        if (upload.serviceName === "aws_service") serviceName = "AWS Service";
        if (upload.serviceName === "azure_service")
          serviceName = "AZure Service";
        if (upload.serviceName === "softlayer_service")
          serviceName = "SoftLayer Service";
        props.addServiceDetails({
          username: serviceName,
          location: upload.serviceStatus ? upload.serviceStatus : "Inactive",
          version: upload.version,
        });
        setSuccessMessage("Service added successfully");
        setTimeout(() => {
          props.closeModal();
        }, 2000);
      }

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
                  <span className="glyphicon glyphicon-edit"></span>&nbsp;
                  {props.updateFlag ? "Update" : "Add"} Device
                </h2>
              </div>
              <div className="col-md-12">
                <form id="addService" className="grey-text">
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="serviceName">Service Name:</label>
                    </div>
                    <div className="col-md-7">
                      <select
                        className="form-control"
                        id="serviceName"
                        name="serviceName"
                        required
                        value={upload.serviceName}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select Service Name
                        </option>
                        <option value="aws_service">AWS Service</option>
                        <option value="azure_service">Azure Service</option>
                        <option value="softlayer_service">
                          SoftLayer Service
                        </option>
                      </select>
                    </div>
                  </div>
                  <br />
                  {props.updateFlag && (
                    <Fragment>
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
                    </Fragment>
                  )}
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
                        {props.updateFlag ? "Update" : "Add"}
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

export default AddServiceModal;
