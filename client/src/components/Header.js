import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Sign in</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{margin: '0 10px 0 20px'}}>Credits: {this.props.auth.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>{" "}
            </li>
          </>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="brand-logo"
            style={{ marginLeft: "10px" }}
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
