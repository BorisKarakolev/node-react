import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          type="text"
          key={name}
          name={name}
          label={label}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <h5>What's on your mind?</h5>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div>
            <Link to="/surveys" className="btn waves-effect red">
              Cancel
            </Link>
            <button
              className="btn waves-effect right waves-light"
              type="submit"
              name="action"
            >
              Next
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  FIELDS.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
