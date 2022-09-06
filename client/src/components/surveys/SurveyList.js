import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

import SurveyItem from "./SurveyItem";

const SurveyList = ({ surveys, fetchSurveys }) => {
  const [orderedSurveys, setOrderedSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  useEffect(() => {
    console.log('surveys', surveys)
    setOrderedSurveys(surveys)
  }, [surveys])

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(orderedSurveys);
    const [reorderItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItems);

    // Implement localStorage or set indexes in the surveys collection to reorder
    setOrderedSurveys(items)
  };

  const renderSurveys = () => {
    if (orderedSurveys.length) {
      return orderedSurveys.map((survey, index) => (
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
