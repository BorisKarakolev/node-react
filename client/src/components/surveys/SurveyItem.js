import React from "react";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyItem = ({ survey, fetchSurveys, index }) => {
  return (
    <Draggable draggableId={survey._id} index={index}>
      {(provided) => (
        <div
          className="card white darken-1"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
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
              data-position="top"
              data-tooltip="Permanent delete"
              style={{ cursor: "pointer" }}
              onClick={() => {
                axios.delete(`/api/delete-survey/${survey._id}`);
                fetchSurveys();
              }}
            >
              delete
            </i>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyItem);
