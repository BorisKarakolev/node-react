import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Sign in</a>;
      default:
        return <a href="/api/logout">Logout</a>;
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{this.renderContent()}</li>
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
