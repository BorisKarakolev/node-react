import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

import SurveyItem from "./SurveyItem";

const SurveyList = ({ surveys, fetchSurveys }) => {
console.log("🚀 ~ file: SurveyList.js ~ line 9 ~ SurveyList ~ surveys", surveys)

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(surveys);
    const [reorderItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItems);

    console.log(items)
  };

  const renderSurveys = () => {
    if (surveys.length) {
      return surveys.map((survey, index) => (
        <SurveyItem survey={survey} index={index} key={survey._id} />
      ));
    }
    return (
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <i className="material-icons large">inbox</i>
        <p>No surveys</p>
      </div>
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="surveys">
          {(provided) => (
            <div
              style={{ height: "100%" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {renderSurveys()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
