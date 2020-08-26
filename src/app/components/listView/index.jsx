import React, { Fragment, useState } from "react";
import DeleteModal from "../deleteModal";

const ListView = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const tableHeaders = ["Service Name", "Status"];

  const openModal = (e) => {
    let username = e.target.id;
    setUsername(username);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSuccessMessage("");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    props.handleDelete(e, username);
    setSuccessMessage("Deleted successfully.");
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const callTableHeader = () => {
    let result = [];
    result.push(tableHeaders.map((header) => <th key={header}>{header}</th>));
    return result;
  };

  const callTableBody = () => {
    let result = [];
    const tableData = props.isFilter ? props.filterCardData : props.data;
    result.push(
      tableData.map((data) => (
        <tr key={data.username + "_running"}>
          <td>{data.username}</td>
          <td>{data.location}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              id={data.username}
              value="Delete"
              onClick={openModal}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );
    return result;
  };

  return (
    <Fragment>
      <div>
        <table className="table table-responsive table-stripped">
          <thead>
            <tr>{callTableHeader()}</tr>
          </thead>
          <tbody>{callTableBody()}</tbody>
        </table>
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
    </Fragment>
  );
};

export default ListView;
