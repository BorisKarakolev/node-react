import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDrafts } from "../actions";

const Modal = ({ modalOpen, modalClose, fetchDrafts, surveys }) => {
  console.log("🚀 ~ file: Modal.js ~ line 6 ~ Modal ~ surveys", surveys);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const renderDrafts = () => {
    return (
      <ul className="collection">
        {surveys.map((draft) => (
          <li key={draft._id} className="collection-item">
            <div>
              {draft.title}
              <a href="#!" className="secondary-content">
                <i className="material-icons">send</i>
              </a>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className="modal"
      style={{
        display: modalOpen ? "block" : "none",
      }}
    >
      <div className="modal-content">
        <div onClick={modalClose}>
          <i className="material-icons right" style={{ cursor: "pointer" }}>
            close
          </i>
        </div>
        <h4>Drafts</h4>
        {renderDrafts()}
      </div>
    </div>
  );
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchDrafts })(Modal);
