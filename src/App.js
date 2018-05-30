import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Header from "./Components/Header";
import PlaceList from "./Components/PlaceList";
import {webServiceKey, center} from './data'

// const webServiceKey = "d3f5ec8963493f40e86aaf99abfdba9d";

class App extends Component {
  state = {
    center: [],
    adcode: "",
    places:[]
  };

  searchAround() {
    let url = `http://restapi.amap.com/v3/place/around?key=${webServiceKey}&location=${center.join(",")}&keywords=咖啡&types=050500&radius=5000&offset=30&page=1&extensions=all`;
    console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('search around');
        console.log(data)
        this.setState({
          places: data.pois
        })
      })
  }

 /*  getCenter(city = "沈阳") {
    // 获取城市中心
    fetch(`http://restapi.amap.com/v3/config/district?keywords=${city}&key=${webServiceKey}&subdistrict=0&extensions=base`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let center = data.districts[0].center.split(",");
        console.log('city center:',center);
        this.setState({ center: center });
        this.searchAround();
      });
  } */

  componentDidMount() {
    this.searchAround();
  }

  successload() {
    console.log("App:script loaded success ");

  }

  render() {
    return <div className="app">
        <Header />
        <main className="main">
          <PlaceList places={this.state.places} />
          <Map places={this.state.places} />
        </main>
      </div>;
  }
}

export default App;
