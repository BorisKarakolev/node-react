import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDrafts, submitSurvey } from "../actions";

const Modal = ({
  modalOpen,
  modalClose,
  fetchDrafts,
  surveys,
  submitSurvey,
}) => {
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
              <div
              // Make new api in the backend ex: sabmitDraft, already done survey just to send and save in surveys but delete from drafts
                onClick={() => console.log(draft)}
                className="secondary-content"
              >
                <i className="material-icons" style={{ cursor: "pointer" }}>
                  send
                </i>
              </div>
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

export default connect(mapStateToProps, { fetchDrafts, submitSurvey })(Modal);
