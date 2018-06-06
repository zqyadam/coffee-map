import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Header from "./Components/Header";
import PlaceList from "./Components/PlaceList";
import { webServiceKey } from "./data";

class App extends Component {
  state = {
    enableFilter: false,
    adcode: "",
    places: [],
    filterd_places: [],
    clickedPlaceId: "",
    showSidebar: true
  };

  /**
   * 搜索中心点周边的餐厅
   * 向高德地图搜索API发起4次请求，由于每次请求数量有限，所以分多次请求，然后合并，避免一次请求出现错误和时间过长导致的超时报错
   *
   * @param {array} center 中心点坐标
   * @param {number} [times=1] 搜索次数
   * @param {number} [pageNum=25] 每页数量
   * @memberof App
   */
  searchAround(center, times = 1, pageNum = 25) {
    for (let index = 1; index <= times; index++) {
      this.searchAroundOnce(center, index, pageNum);
    }
    this.setState({ enableFilter: true });
  }

  /**
   * 向服务器发起一次搜索请求
   *
   * @param {string} center 中心点坐标
   * @param {number} [page=1] 当前第几页
   * @param {number} [pageNum=25] 每页数量
   * @memberof App
   */
  searchAroundOnce(center, page = 1, pageNum = 25) {
    let url = `https://restapi.amap.com/v3/place/around?key=${webServiceKey}&location=${center.join(
      ","
    )}&types=050000&radius=3000&offset=${pageNum}&page=${page}&extensions=all`;
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
   * @param {array} oldPois 现有的Pois
   * @param {array} newPois 新增的Pois
   * @returns
   * @memberof App
   */
  combinePois(oldPois, newPois) {
    let all = oldPois.concat(newPois);
    let temp = [];
    return all.filter(item => {
      if (!item.typecode.startsWith("050")) {
        return false;
      }
      return !temp.includes(item.id) && temp.push(item.id);
    });
  }
  //

  /**
   * 根据选择的值过滤餐厅地点
   *
   * @param {string} current_filter_value 需要过滤的值
   * @memberof App
   */
  filterPlaces(current_filter_value) {
    let { places } = this.state;
    this.setState({
      filterd_places: places.filter(place =>
        place.typecode.startsWith(current_filter_value)
      ),
      clickedPlaceId: "",
      current_filter_value: current_filter_value
    });
  }

  /**
   * 设置城市adcode，给Header获取天气预报
   *
   * @param {*} city
   * @memberof App
   */
  setCity(city) {
    this.setState({
      adcode: city
    });
  }

  /**
   * 地图加载完成后，使下拉列表可用，否则在加载完成前禁用，以免报错
   *
   * @param {*} center
   * @memberof App
   */
  handleMapInited(center) {
    // 加载2页数据，1页加载20条
    this.searchAround(center, 2, 50);
  }

  /**
   * 点击侧边栏的餐厅处理事件
   *
   * @param {string} id
   * @memberof App
   */
  handleClick(id) {
    this.setState({
      clickedPlaceId: id
    });
  }

  /**
   * 切换侧边栏显示状态
   *
   * @memberof App
   */
  handleToggleSidebar() {
    let { showSidebar } = this.state;
    this.setState({
      showSidebar: !showSidebar
    });
  }

  render() {
    return (
      <div className="app">
        <Header cityCode={this.state.adcode} />
        <main className="main">
          <PlaceList
            places={this.state.filterd_places}
            onFilter={val => this.filterPlaces(val)}
            enable={this.state.enableFilter}
            onClick={id => this.handleClick(id)}
            showSidebar={this.state.showSidebar}
          />
          <Map
            places={this.state.filterd_places}
            onMapInited={center => {
              this.handleMapInited(center);
            }}
            clickedPlace={this.state.clickedPlaceId}
            onToggleSidebar={() => this.handleToggleSidebar()}
            setCity={city => this.setCity(city)}
          />
        </main>
      </div>
    );
  }
}

export default App;
