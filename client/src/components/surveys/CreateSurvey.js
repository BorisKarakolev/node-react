import React, { Component } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";

class NewSurvey extends Component {
  state = { showReview: false };

  render() {
    return this.state.showReview ? (
      <SurveyReview onCancel={() => this.setState({ showReview: false })} />
    ) : (
      <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />
    );
  }
}

export default reduxForm({
  form: "surveyForm",
})(NewSurvey);
