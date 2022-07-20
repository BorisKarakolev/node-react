import React from "react";
import { Link } from "react-router-dom";

import SurveyList from './surveys/SurveyList'

const Dashboard = () => {
  return (
    <div style={{padding: '20px'}}>
      <h3>Dashboard</h3>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to='/surveys/new' className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
};

export default Dashboard;
