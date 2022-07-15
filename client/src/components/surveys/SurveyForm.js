import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "You must provide a title",
  },
  {
    label: "Subject Line",
    name: "subject",
    noValueError: "You must provide a subject",
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "You must tell us what's on your mind",
  },
  {
    label: "Recipient List",
    name: "emails",
    noValueError: "You must provide resipients list",
  },
];

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
      <div>
        <h5>What's on your mind?</h5>
        <form
          style={{ marginTop: "20px" }}
          onSubmit={this.props.handleSubmit((values) => console.log(values))}
        >
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

  errors.emails = validateEmails(values.emails || "");

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
})(SurveyForm);
