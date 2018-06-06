import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { jskey, webServiceKey, defaultCenter, defaultadCode } from "../data";

// 测试IP
// const IP = "113.230.121.67"; // 铁岭
// const IP = "119.188.132.10"; // 济南

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
    let name = `<p> 名称：${marker.place.name}</p >`;
    let address = `<p>地址：${marker.place.address}</p>`;
    let distance = `<p>距离：${marker.place.distance}米</p>`;;
    let tel = !Array.isArray(marker.place.tel) ? `<p>联系方式：${marker.place.tel}</p>` : "";
    let img = (marker.place.photos && marker.place.photos[0]) ? `<img src="${marker.place.photos[0].url}" alt="${marker.place.name}" />`:'';
    let rating = (!Array.isArray(marker.place.biz_ext.rating)) ? `<p>评分：${marker.place.biz_ext.rating}</p>`:'';
    let content = `<div class="pop-item">
        ${name}
        ${address}
        ${distance}
        ${tel}
        ${rating}
        ${img}
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
        this.props.setCity(data.adcode);
        this.getCityCenter(city);
      }).catch(err=>{
        let city = '沈阳';
        this.props.setCity(defaultadCode);
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
      `https://restapi.amap.com/v3/config/district?keywords=${city}&key=${webServiceKey}&subdistrict=0&extensions=base`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let center = data.districts[0].center.split(",");
        console.log("city center:", center);
        this.setState({ center: center });
        this.initMap(center);
      })
      .catch(err => {
        this.initMap(defaultCenter);
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
    let infoWindow = new window.AMap.InfoWindow({
      offset: new window.AMap.Pixel(0, -20)
    });
    this.setState({ map, infoWindow });

    this.props.onMapInited(center);

    window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
      this.setState({ SimpleMarker });
      this.markCenter();
      this.state.map.setFitView();
    });
  }

  /**
   * 向上传播侧边栏显示状态
   *
   * @param {*} event
   * @memberof Map
   */
  toggleSidebar(event) {
    this.props.onToggleSidebar();
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
        this.getCityByIP();
      } else this.props.onError();
    }
    // 每次收到新的props时，需要进行的动作
    if (this.state.map) {
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
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
    }
  }

  render() {
    return <div className="map-container" id="map">
        <i className="iconfont icon-cebianlan btn-sidebar" onClick={(event)=>this.toggleSidebar(event)}/>
      </div>;
  }
}

export default scriptLoader(
  `https://webapi.amap.com/maps?v=1.4.7&key=${jskey}`,
  `https://webapi.amap.com/ui/1.0/main.js`
)(Map);
