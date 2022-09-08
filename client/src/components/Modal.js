import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDrafts } from "../actions";

const Modal = ({ modalOpen, modalClose, fetchDrafts, surveys }) => {

  useEffect(() => {
    fetchDrafts()
  }, [])

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
      </div>
    </div>
  );
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchDrafts })(Modal);
