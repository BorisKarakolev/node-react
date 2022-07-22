import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyList from "./surveys/SurveyList";

const Dashboard = ({ auth }) => {
  return (
    <div style={{ padding: "20px" }} className="container">
      <h3>Dashboard</h3>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className={`btn-floating btn-large ${
            auth?.credits === 0 ? "disabled" : "block"
          }`}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Dashboard);
