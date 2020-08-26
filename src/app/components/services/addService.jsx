import React, { useState, useEffect } from "react";
import Card from "../card";
import serviceData from "../../mock/service.json";
import AddServiceModal from "./addServiceModal";

const AddService = (props) => {
  const [upload, setUpload] = useState({
    serviceName: "",
    serviceStatus: "",
    deviceIP: "",
    version: "",
  });
  const [state, setState] = useState({
    modalIsOpen: false,
    updateFlag: false,
    successMessage: "",
    errorMessage: "",
    loading: false,
    reqSerDet: [],
    reqSerLst: [],
    registeredServices: [],
  });

  useEffect(() => {
    selectService();
    let serviceList = localStorage.getItem("serviceData");
    if (serviceList)
      setState({ ...state, registeredServices: JSON.parse(serviceList) });
  }, []);

  let openModal = () => {
    setState({ ...state, modalIsOpen: true });
  };

  let closeModal = () => {
    setState({ ...state, modalIsOpen: false });
  };

  const addServiceDetails = (serObj) => {
    let registeredServices = upload.registeredServices;
    localStorage.removeItem("serviceData");
    registeredServices.push(serObj);
    localStorage.setItem("serviceData", JSON.stringify(registeredServices));
  };

  const updateService = (e) => {
    setState({ ...state, modalIsOpen: true, updateFlag: true });
    filterService(e);
  };

  const filterService = (e) => {
    let username = e.target.getAttribute("name");
    let reqSerDet = upload.registeredServices.filter(
      (ser) => ser.username === username
    );
    setState({ ...state, reqSerDet: reqSerDet });
  };

  const selectService = () => {
    let selSerLst = serviceData.filter((ser) => ser[props.currentDevice]);
    if (selSerLst.length > 0) selSerLst = selSerLst[0][props.currentDevice];
    console.log("selSerLst", selSerLst);
    setState({ ...state, reqSerLst: selSerLst });
  };

  const showCards = () => {
    let result = [];
    let userList = serviceData.map((ser) => Object.keys(ser)[0]);
    let index = userList.indexOf(props.currentDevice);
    let reqSerList = index > -1 ? state.reqSerLst : state.registeredServices;
    result.push(
      reqSerList.map((card) => (
        <Card
          data={card}
          key={card.username}
          tab="addService"
          updateService={updateService}
        />
      ))
    );
    return result;
  };

  const handleChange = (e) => {
    setState({ ...state, errorMessage: null });
    let field = e.target.name;
    let value = e.target.value;
    setState({ ...state, [field]: value });
  };

  const updateServiceDetails = (e, username, serviceStatus) => {
    var registeredServicesList = [...state.registeredServices];
    username = username.toUpperCase().replace("_", " ");
    let index = registeredServicesList.findIndex(
      (ser) => ser.username.toUpperCase() === username
    );
    if (index > -1) {
      registeredServicesList[index].location = serviceStatus;
      setState({ ...state, registeredServices: registeredServicesList });
      localStorage.removeItem("serviceData");
      localStorage.setItem(
        "serviceData",
        JSON.stringify(registeredServicesList)
      );
    }
  };

  const handleDelete = (e, username) => {
    e.preventDefault();
    // do api call
    deleteCard(username);
  };

  const deleteCard = (username) => {
    var registeredServicesList = [...state.registeredServices];
    let index = registeredServicesList.findIndex(
      (ser) => ser.username.toUpperCase() === username
    );
    if (index > -1) {
      registeredServicesList.splice(index, 1);
      setState({ ...state, registeredServices: registeredServicesList });
      localStorage.removeItem("serviceData");
      localStorage.setItem(
        "serviceData",
        JSON.stringify(registeredServicesList)
      );
    }
  };

  console.log("state: ", state);
  return (
    <div className="container">
      <div className="row">
        <span className="add-service-user">{props.currentDevice} Devices</span>
        <span className="add-service fa fa-plus" onClick={openModal}>
          &nbsp; Add Service
        </span>
      </div>
      {state.modalIsOpen && (
        <AddServiceModal
          modalIsOpen={state.modalIsOpen}
          closeModal={closeModal}
          reqSerDet={state}
          updateFlag={state.updateFlag}
          addServiceDetails={addServiceDetails}
          updateServiceDetails={updateServiceDetails}
        />
      )}
      {(state.registeredServices.length > 0 || state.reqSerLst.length > 0) &&
        showCards()}
    </div>
  );
};

export default AddService;
