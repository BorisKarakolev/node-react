import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FIELDS from "./formFields";
import * as actions from "../../actions";

const SurveyReview = ({ onCancel, formValues, submitSurvey, saveDraft, history }) => {
  const reviewFields = FIELDS.map(({ name, label }) => {
    return (
      <div key={name} style={{ margin: "20px" }}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <div className="right">
        <button
          onClick={() => submitSurvey(formValues, history)}
          className="btn waves-effect waves-light"
          style={{ marginLeft: "10px" }}
        >
          Submit
          <i className="material-icons right">email</i>
        </button>
        <button
          onClick={() => saveDraft(formValues, history)}
          className="btn waves-effect waves-light left"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
