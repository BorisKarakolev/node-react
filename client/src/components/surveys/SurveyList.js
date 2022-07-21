import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys.length !== 0) {
      return this.props.surveys.reverse().map((survey) => {
        return (
          <div className="card white darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent on: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
              <i
                className="material-icons right tooltipped"
                data-position="bottom"
                data-tooltip="Permanent delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  axios.delete(`/api/delete-survey/${survey._id}`);
                  this.props.fetchSurveys();
                }}
              >
                delete
              </i>
            </div>
          </div>
        );
      });
    }
    return (
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <i className="material-icons large">inbox</i>
        <p>No surveys</p>
      </div>
    );
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
