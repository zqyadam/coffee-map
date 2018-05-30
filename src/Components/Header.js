import React, { Component } from "react";
import logo from "../coffee.png";

class Header extends Component {
  render() {
    return (
      <div>
        <header className="app-header">
          <img src={logo} alt="logo" className="app-logo" />
          <h1 className="app-title"> Coffee Map </h1>
        </header>
      </div>
    );
  }
}

export default Header;
