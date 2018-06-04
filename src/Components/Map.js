import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { jskey, webServiceKey, defaultCenter } from "../data";

// const IP = "113.230.121.67"; // 铁岭
const IP = "119.188.132.10"; // 济南
// console.log(center);
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      SimpleMarker: null,
      markers: {},
      infoWindow: null,
      center: []
    };
  }

  /**
   * 创建一个标记
   *
   * @param {object} place
   * @returns
   * @memberof Map
   */
  createMarker(place) {
    let marker = new window.AMap.Marker({
      position: place.location.split(","),
      title: place.name
    });
    marker.place = place;
    let { infoWindow, map } = this.state;
    marker.on("click", event => {
      this.popupInfoWindow(marker, infoWindow, map);
    });
    return marker;
  }
  /**
   * 打开信息窗口
   *
   * @param {object} marker
   * @param {object} infoWindow
   * @param {object} map
   * @memberof Map
   */
  popupInfoWindow(marker, infoWindow, map) {
    let content = `<div className="place-item">
        <p> 名称：${marker.place.name}</p >
        <p>地址：${marker.place.address}</p>
        <p>距离：${marker.place.distance}米</p>
      </div >`;
    infoWindow.setContent(content);
    infoWindow.open(map, marker.getPosition());
    // 将选择的地点设置为地图中心
    map.setCenter(marker.getPosition());
  }

  /**
   * 创建简单标记
   *
   * @param {array} pos
   * @param {string} label
   * @param {string} style
   * @param {string} title
   * @returns
   * @memberof Map
   */
  createSimpleMarker(pos, label, style, title) {
    let simpleMarker = new this.state.SimpleMarker({
      draggable: false, // 可拖动，后续用来更改所在位置，展示先不需要该功能
      iconLabel: {
        innerHTML: label,
        style: {
          color: "#fff"
        }
      },
      iconStyle: style,
      map: this.state.map,
      position: pos,
      title: title
    });

    simpleMarker.on("dragend", event => {
      console.log(event);
    });

    return simpleMarker;
  }

  /**
   * 标记当前中心位置
   *
   * @memberof Map
   */
  markCenter() {
    let center = this.state.center;
    this.setState({
      myPosMarker: this.createSimpleMarker(center, "这", "red", "我的位置")
    });
  }

  /**
   * 批量创建标记
   *
   * @param {array} places
   * @memberof Map
   */
  createMarkers(places) {
    console.log("creating markerssssss");
    this.cleanMarkers();
    let m = {};
    places.forEach(place => {
      m[place.id] = this.createMarker(place);
    });
    this.setState({ markers: m });
    this.state.map.add(Object.values(m));
    this.state.map.setFitView();
  }
  /**
   * 清除地图上的标记
   *
   * @memberof Map
   */
  cleanMarkers() {
    if (this.state.map) {
      this.state.map.remove(Object.values(this.state.markers));
    }
  }

  /**
   * 通过IP获取所在城市
   *
   * @param {string} IP IP地址
   * @memberof App
   */
  getCityByIP(IP) {
    const IP_str = IP ? `&ip=${IP}` : "";
    let url = `https://restapi.amap.com/v3/ip?key=${webServiceKey}${IP_str}`;
    console.log(url);
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
   * @param {string} city 城市名称
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
        this.initMap(center);
        // 搜索中心坐标附近餐厅
        // this.searchAround(center, 8, 50);
      })
      .catch(err => {
        console.log(defaultCenter);
      });
  }
  /**
   * 初始化地图
   *
   * @param {array} center 地图中心点坐标
   * @memberof Map
   */
  initMap(center) {
    let map = new window.AMap.Map("map", {
      resizeEnable: true,
      zoom: 18,
      center: center
    });
    this.setState({
      map
    });
    this.props.onMapInited(center);

    let infoWindow = new window.AMap.InfoWindow({
      offset: new window.AMap.Pixel(0, -20)
    });

    window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
      this.setState({ SimpleMarker, infoWindow, map });
      this.markCenter();
      this.state.map.setFitView();
    });
  }

  componentWillReceiveProps({
    isScriptLoaded,
    isScriptLoadSucceed,
    places,
    clickedPlace
  }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        // 初始化地图
        console.log("init in props");
        this.getCityByIP();
      } else this.props.onError();
    }
    // 每次收到新的props时，需要进行的动作
    if (this.state.map) {
      console.log("map inited");
      // 关闭当前显示的InfoWindow
      if (this.state.infoWindow) {
        this.state.infoWindow.close();
      }
      // 如果点击了PlaceList中的地点，则显示infoWindow
      if (clickedPlace) {
        let { markers, infoWindow, map } = this.state;
        let marker = markers[clickedPlace];
        this.popupInfoWindow(marker, infoWindow, map);
        return; // 阻止刷新地图markers
      }
      // 当下拉列表的值变化时，刷新地图的markers
      this.createMarkers(places);
    }
  }

  componentDidMount() {
    console.log("component did mount");
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
    }
  }
  render() {
    return <div className="map-container" id="map" />;
  }
}

export default scriptLoader(
  `//webapi.amap.com/maps?v=1.4.7&key=${jskey}`,
  `//webapi.amap.com/ui/1.0/main.js`
)(Map);
