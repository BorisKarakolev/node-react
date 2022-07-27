import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

import SurveyItem from "./SurveyItem";

class SurveyList extends Component {
  state = { orderedSurveys: this.props?.surveys };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.orderedSurveys);
    const [reorderItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItems);

    this.setState({ orderedSurveys: items });
  };

  renderSurveys = () => {
    if (this.state.orderedSurveys.length) {
      return this.state.orderedSurveys.map((survey, index) => {
        return <SurveyItem survey={survey} index={index} key={survey._id} />;
      });
    }
    return (
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <i className="material-icons large">inbox</i>
        <p>No surveys</p>
      </div>
    );
  };

  render() {
    console.log(
      "🚀 ~ file: SurveyList.js ~ line 40 ~ SurveyList ~ render ~ this.props",
      this.props
    );
    return (
      <div>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable droppableId="surveys">
            {(provided) => (
              <div
                style={{ height: "100%" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.renderSurveys()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
