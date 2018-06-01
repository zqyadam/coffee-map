import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Header from "./Components/Header";
import PlaceList from "./Components/PlaceList";
import { client_id, client_secret, fs_v, center, webServiceKey } from "./data";

console.log(fs_v);
// const webServiceKey = "d3f5ec8963493f40e86aaf99abfdba9d";

class App extends Component {
  state = {
    center: [],
    adcode: "",
    places: [],
    filterd_places: []
  };

  // searchAroundByFourSqueare() {
  //   const url = `https://api.foursquare.com/v2/venues/search?ll=${[center[1], center[0]]}&radius=2000&query=咖啡&client_secret=${client_secret}&client_id=${client_id}&v=${fs_v}`;
  //   console.log(url)
  //   fetch(url).then(response => response.json()).then((data) => {
  //     console.log(data)
  //     this.setState({ places : data.response.venues });
  //   })
  // }

  searchAround(page = 1, pageNum = 25) {
    let url = `http://restapi.amap.com/v3/place/around?key=${webServiceKey}&location=${center.join(
      ","
    )}&types=050000&radius=5000&offset=${pageNum}&page=${page}&extensions=all`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("search around");
        console.log(data);
        // console.log(this.state.places.concat(data.pois));
        let allPlaces = this.combinePois(this.state.places, data.pois);
        this.setState({ places: allPlaces, filterd_places: allPlaces });
      });
  }
  // 合并新旧地点信息，避免ID重复
  combinePois(oldPois, newPois) {
    let all = oldPois.concat(newPois);
    let temp = [];
    return all.filter(item => {
      return !temp.includes(item.id) && temp.push(item.id);
    });
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

  filterPlaces(current_filter_value) {
    let { places } = this.state;
    this.setState({
      filterd_places: places.filter(place =>
        place.typecode.startsWith(current_filter_value)
      )
    });
  }

  componentDidMount() {
    // 向高德地图搜索API发起4次请求，由于每次请求数量有限，所以分多次请求，然后合并，避免一次请求出现错误和时间过长导致的超时报错
    this.searchAround(1, 50);
    this.searchAround(2, 50);
    this.searchAround(3, 50);
    this.searchAround(4, 50);
  }

  successload() {
    console.log("App:script loaded success ");
  }

  render() {
    return <div className="app">
        <Header />
        <main className="main">
          <PlaceList places={this.state.filterd_places} onFilter={(val)=>this.filterPlaces(val)} />
          <Map places={this.state.filterd_places} />
        </main>
      </div>;
  }
}

export default App;
