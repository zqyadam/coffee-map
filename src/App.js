import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Header from "./Components/Header";
import PlaceList from "./Components/PlaceList";
import { client_id, client_secret, fs_v, center, webServiceKey} from "./data";

console.log(fs_v)
// const webServiceKey = "d3f5ec8963493f40e86aaf99abfdba9d";

class App extends Component {
  state = {
    center: [],
    adcode: "",
    places: []
  };

  // searchAroundByFourSqueare() {
  //   const url = `https://api.foursquare.com/v2/venues/search?ll=${[center[1], center[0]]}&radius=2000&query=咖啡&client_secret=${client_secret}&client_id=${client_id}&v=${fs_v}`;
  //   console.log(url)
  //   fetch(url).then(response => response.json()).then((data) => {
  //     console.log(data)
  //     this.setState({ places : data.response.venues });
  //   })
  // }

   searchAround() {
     let url = `http://restapi.amap.com/v3/place/around?key=${webServiceKey}&location=${center.join(",")}&types=050000&radius=5000&offset=50&page=1&extensions=all`;
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
    return (
      <div className="app">
        <Header />
        <main className="main">
          <PlaceList places={this.state.places} />
          <Map places={this.state.places} />
        </main>
      </div>
    );
  }
}

export default App;
