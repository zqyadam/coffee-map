import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { jskey } from "../data";
// console.log(center);
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      SimpleMarker: null,
      markers: {},
      infoWindow: null
    };
  }

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

  popupInfoWindow(marker, infoWindow, map) {
    let content = `<div className="place-item">
        <p> 名称：${marker.place.name}</p >
        <p>地址：${marker.place.address}</p>
        <p>距离：${marker.place.distance}米</p>
      </div >`;
    infoWindow.setContent(content);
    // 将选择的地点设置为地图中心
    // map.setCenter(marker.getPosition());
    infoWindow.open(map, marker.getPosition());
  }

  createSimpleMarker(pos, label, style, title) {
    let simpleMarker = new this.state.SimpleMarker({
      draggable:false, // 可拖动，后续用来更改所在位置，展示先不需要该功能
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

    simpleMarker.on("dragend",(event) => {
      console.log(event)
    });

    return simpleMarker;
  }
  // 标记当前中心位置
  markCenter() {
    let center = this.props.center;
    this.setState({
      myPosMarker: this.createSimpleMarker(center, "这", "red", "我的位置")
    });
  }

  makeMarkers(places) {
    let m = {};
    places.forEach(place => {
      m[place.id] = this.createMarker(place);
    });
    this.setState({ markers: m });
    this.state.map.add(Object.values(m));
  }

  createMarkers(places) {
    this.state.map.remove(Object.values(this.state.markers));
    this.makeMarkers(places);
    this.state.map.setFitView();
  }

  initMap(center) {
    let map = new window.AMap.Map("map", {
      resizeEnable: true,
      zoom: 18,
      center: center
    });

    let infoWindow = new window.AMap.InfoWindow({
      offset: new window.AMap.Pixel(0, -20)
    });

    window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
      this.setState({ SimpleMarker, infoWindow, map });
      this.markCenter();
      this.props.onMapInited(true);
    });
  }

  componentWillReceiveProps({
    isScriptLoaded,
    isScriptLoadSucceed,
    places,
    clickedPlace,
    center
  }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        // 初始化地图
        this.initMap(center);
      } else this.props.onError();
    }
    // 每次收到新的props时，需要进行的动作
    if (this.state.map) {
      // 中心点变化
      if (center.join(",") !== this.props.center.join(",")) {
        this.state.map.setCenter(center);
        this.state.myPosMarker.setPosition(center);
      }

      // 关闭当前显示的InfoWindow
      if (this.state.infoWindow) {
        this.state.infoWindow.close();
      }
      // 刷新地图的marker
      this.createMarkers(places);
      // 如果点击了PlaceList中的地点，则显示infoWindow
      if (clickedPlace) {
        let { markers, infoWindow, map } = this.state;
        let marker = markers[clickedPlace];
        this.popupInfoWindow(marker, infoWindow, map);
      }
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
  `//webapi.amap.com/maps?v=1.4.6&key=${jskey}`,
  "//webapi.amap.com/ui/1.0/main.js"
)(Map);

