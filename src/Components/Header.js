import React, { Component } from "react";
import logo from "../food.svg";

class Header extends Component {
  render() {
    return (
      <div>
        <header className="app-header">
          <img src={logo} alt="logo" className="app-logo" />
          <h1 className="app-title">吃货地图</h1>
        </header>
      </div>
    );
  }
}

export default Header;
