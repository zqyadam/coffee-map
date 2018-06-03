import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Header from "./Components/Header";
import PlaceList from "./Components/PlaceList";
import { fs_v, center, webServiceKey } from "./data";

// const IP = "113.230.121.67"; // 铁岭
const IP = "119.188.132.10";
console.log(fs_v);
// const webServiceKey = "d3f5ec8963493f40e86aaf99abfdba9d";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableFilter: false,
      center: [],
      adcode: "",
      places: [],
      filterd_places: [],
      clickedPlaceId: ""
    };
  }

  // searchAroundByFourSqueare() {
  //   const url = `https://api.foursquare.com/v2/venues/search?ll=${[center[1], center[0]]}&radius=2000&query=咖啡&client_secret=${client_secret}&client_id=${client_id}&v=${fs_v}`;
  //   console.log(url)
  //   fetch(url).then(response => response.json()).then((data) => {
  //     console.log(data)
  //     this.setState({ places : data.response.venues });
  //   })
  // }

  /**
   * 搜索中心点周边的餐厅
   *
   * @param {*} center 中心点坐标
   * @param {*} times 搜索次数
   * @param {number} [pageNum=25] 每页数量
   * @memberof App
   */
  searchAround(center, times, pageNum = 25) {
    for (let index = 1; index <= times; index++) {
      this.searchAroundOnce(center, index, 50);
    }
  }

  /**
   * 向服务器发起一次搜索请求
   *
   * @param {*} center 中心点坐标
   * @param {number} [page=1] 当前第几页
   * @param {number} [pageNum=25] 每页数量
   * @memberof App
   */
  searchAroundOnce(center, page = 1, pageNum = 25) {
    // let center = this.state.center;
    let url = `http://restapi.amap.com/v3/place/around?key=${webServiceKey}&location=${center.join(
      ","
    )}&types=050000&radius=3000&offset=${pageNum}&page=${page}&extensions=all`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let allPlaces = this.combinePois(this.state.places, data.pois);
        this.setState({ places: allPlaces, filterd_places: allPlaces });
      });
  }

  /**
   * 合并新旧地点信息，避免ID重复
   *
   * @param {*} oldPois 现有的Pois
   * @param {*} newPois 新增的Pois
   * @returns
   * @memberof App
   */
  combinePois(oldPois, newPois) {
    let all = oldPois.concat(newPois);
    let temp = [];
    return all.filter(item => {
      return !temp.includes(item.id) && temp.push(item.id);
    });
  }
  //

  /**
   * 通过IP获取所在城市
   *
   * @param {*} IP IP地址
   * @memberof App
   */
  getCityByIP(IP) {
    let url = `https://restapi.amap.com/v3/ip?key=${webServiceKey}&ip=${IP}`; //&ip=${IP}
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let city = data.city;
        this.getCityCenter(city);
      });
  }

  /**
   * 通过城市名称获取城市中心坐标
   *
   * @param {*} city 城市名称
   * @memberof App
   */
  getCityCenter(city) {
    // 获取城市中心
    fetch(
      `http://restapi.amap.com/v3/config/district?keywords=${city}&key=${webServiceKey}&subdistrict=0&extensions=base`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let center = data.districts[0].center.split(",");
        console.log("city center:", center);
        this.setState({ center: center });
        // 搜索中心坐标附近餐厅
        this.searchAround(center, 8, 50);
      });
  }

  /**
   * 根据选择的值过滤餐厅地点
   *
   * @param {*} current_filter_value 需要过滤的值
   * @memberof App
   */
  filterPlaces(current_filter_value) {
    let { places } = this.state;
    this.setState({
      filterd_places: places.filter(place =>
        place.typecode.startsWith(current_filter_value)
      ),
      clickedPlaceId: ""
    });
  }
  // 地图加载完成后，使下拉列表可用，否则在加载完成前禁用，以免报错
  handleMapInited(isInited) {
    this.setState({ enableFilter: isInited });
  }

  handleClick(id) {
    console.log("place item clicked", id);
    this.setState({
      clickedPlaceId: id
    });
  }

  componentDidMount() {
    // 向高德地图搜索API发起4次请求，由于每次请求数量有限，所以分多次请求，然后合并，避免一次请求出现错误和时间过长导致的超时报错
    this.getCityByIP(IP);
  }

  render() {
    let { isScriptLoaded, isScriptLoadSucceed } = this.props;
    return (
      <div className="app">
        <Header />
        <main className="main">
          <PlaceList
            places={this.state.filterd_places}
            onFilter={val => this.filterPlaces(val)}
            enable={this.state.enableFilter}
            onClick={id => this.handleClick(id)}
          />
          <Map
            center={this.state.center}
            places={this.state.filterd_places}
            isScriptLoaded={isScriptLoaded}
            isScriptLoadSucceed={isScriptLoadSucceed}
            onMapInited={isInited => {
              this.handleMapInited(isInited);
            }}
            clickedPlace={this.state.clickedPlaceId}
          />
        </main>
      </div>
    );
  }
}

export default App;
