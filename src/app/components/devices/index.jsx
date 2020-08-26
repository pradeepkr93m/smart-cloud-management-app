import React, { Fragment, useState, useEffect } from "react";
import Header from "../header";
import Card from "../card";
import ListView from "../listView";
import About from "../about";
import data from "../../mock/device.json";
import "./devices.css";
import AddService from "../services/addService";
import AddDeviceModal from "./addDeviceModal";

const Devices = (props) => {
  const [state, setState] = useState({
    showServicesTabFlag: true,
    showAboutTabFlag: false,
    showAddServiceFlag: false,
    showEditDeviceFlag: false,
    showListViewFlag: false,
    modalIsOpen: false,
    cardData: [],
    filterCardData: [],
    isFilter: false,
  });
  const [currentDevice, setCurrentDevice] = useState("");

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(props.isAuthenticated));
    localStorage.setItem("username", props.username);
    let isDevice = localStorage.getItem("devicesData");
    if (isDevice) {
      setState((state) => ({ ...state, cardData: JSON.parse(isDevice) }));
    } else {
      console.log("DevicesData: ", data);
      let cardData = data;
      setState((state) => ({ ...state, cardData: cardData }));
      localStorage.setItem("devicesData", JSON.stringify(cardData));
    }
    return () => {
      localStorage.clear();
    };
  }, []);

  const toggleTabs = (e) => {
    let tabName = e.target.id;
    // console.log("tabName from parent: ", tabName);
    let value = e.target.getAttribute("name");
    setCurrentDevice(value);
    switch (tabName) {
      case "devices":
        setState({
          ...state,
          showServicesTabFlag: true,
          showAboutTabFlag: false,
          showAddServiceFlag: false,
          showEditDeviceFlag: false,
          showListViewFlag: false,
        });
        break;
      case "about":
        setState({
          ...state,
          showServicesTabFlag: false,
          showAboutTabFlag: true,
          showAddServiceFlag: false,
          showEditDeviceFlag: false,
          showListViewFlag: false,
        });
        break;
      case "addDevice":
        setState({
          ...state,
          showServicesTabFlag: false,
          showAboutTabFlag: false,
          showAddServiceFlag: true,
          showEditDeviceFlag: false,
          showListViewFlag: false,
        });
        break;
      case "editDevice":
        setState({
          ...state,
          showServicesTabFlag: false,
          showAboutTabFlag: false,
          showAddServiceFlag: false,
          showEditDeviceFlag: true,
          showListViewFlag: false,
        });
        break;
      case "listView":
        setState({
          ...state,
          showServicesTabFlag: true,
          showAboutTabFlag: false,
          showAddServiceFlag: false,
          showEditDeviceFlag: false,
          showListViewFlag: true,
        });
        break;
      case "cardView":
        setState({
          ...state,
          showServicesTabFlag: true,
          showAboutTabFlag: false,
          showAddServiceFlag: false,
          showEditDeviceFlag: false,
          showListViewFlag: false,
        });
        break;
      default:
        console.log("Nothing matched");
        break;
    }
  };

  const showCards = () => {
    let cardData = state.isFilter ? state.filterCardData : state.cardData;
    console.log("inside showCards: ", cardData);
    let result = [];
    result.push(
      cardData.map((card) => (
        <Card
          data={card}
          key={card.username}
          tab={"addDevice"}
          toggleTabs={toggleTabs}
          deleteInstance={handleDelete}
        />
      ))
    );
    return result;
  };

  const addDeviceDetails = (device) => {
    let cardData = state.cardData;
    localStorage.removeItem("devicesData");
    cardData.push(device);
    localStorage.setItem("devicesData", JSON.stringify(cardData));
  };

  const showlistView = () => {
    return (
      <ListView
        data={state.cardData}
        handleDelete={handleDelete}
        filterCardData={state.filterCardData}
        isFilter={state.isFilter}
      />
    );
  };

  const handleDelete = (e, username) => {
    e.preventDefault();
    deleteCard(username);
  };

  const deleteCard = (username) => {
    let cardDataList = state.cardData;
    let index = cardDataList.findIndex((card) => card.username === username);
    console.log("index: ", index);
    if (index > -1) {
      cardDataList.splice(index, 1);
      setState({ ...state, cardData: cardDataList });
      localStorage.removeItem("devicesData");
      localStorage.setItem("devicesData", JSON.stringify(cardDataList));
    }
  };

  const filterDevices = (e) => {
    let filterText = e.target.value;
    let filterCardData = state.cardData.filter((card) =>
      card.username.toUpperCase().includes(filterText.toUpperCase())
    );
    console.log("filterCardData: ", filterCardData);
    setState({ ...state, filterCardData: filterCardData, isFilter: true });
  };

  const openModal = () => {
    setState({ ...state, modalIsOpen: true });
  };
  const closeModal = () => {
    setState({ ...state, modalIsOpen: false });
  };
  return (
    <Fragment>
      <Header
        username={props.username}
        toggleTabs={toggleTabs}
        logout={props.logout}
        userRole={props.userRole}
      />
      {state.showServicesTabFlag && (
        <div className="services-wrapper">
          <div className="service-body">
            <div className="service-header">
              <i className="fa fa-cloud" /> &nbsp;&nbsp; Smart Edge Devices
              <span className="user-role">
                <strong>UserRole:</strong> Smart Edge Group
              </span>
            </div>
            <div className="service-options">
              <span className="option" id="cardView" onClick={toggleTabs}>
                <i className="fa fa-th-large" /> &nbsp; Card View
              </span>
              <span className="option" id="listView" onClick={toggleTabs}>
                <i className="fa fa-list" /> &nbsp; List View
              </span>
              <span className="option" id="addDevice" onClick={openModal}>
                <i className="fa fa-plus" /> &nbsp; Add Customer
              </span>
              <span className="filter">
                Filter: &nbsp;&nbsp;
                <input
                  type="text"
                  className="filter-by"
                  id="filterText"
                  onChange={filterDevices}
                />
              </span>
            </div>
            <div className="card-container row">
              {state.showListViewFlag ? showlistView() : showCards()}
            </div>
          </div>
        </div>
      )}
      {state.showEditDeviceFlag && (
        <AddService
          addDeviceDetails={addDeviceDetails}
          currentDevice={currentDevice}
        />
      )}
      {state.showAboutTabFlag && <About />}
      {state.modalIsOpen && (
        <AddDeviceModal
          modalIsOpen={state.modalIsOpen}
          closeModal={closeModal}
          addDeviceDetails={addDeviceDetails}
        />
      )}
    </Fragment>
  );
};

export default Devices;
