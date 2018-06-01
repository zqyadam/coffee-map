import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { jskey, center } from "../data";
console.log(center);
class Map extends Component {
  state = {
    map: null,
    SimpleMarker: null,
    markers:{}
  };

  createMarker(pos, title, icon) {
    let marker = new window.AMap.marker({
      position: new window.AMap.LngLat(pos),
      title: title,
      icon: icon
    });
    return marker;
  }

  createSimpleMarker(pos, label, style, title) {
    let simpleMarker = new this.state.SimpleMarker({
      iconLabel: label,
      iconStyle: style,
      map: this.state.map,
      position: pos,
      title: title
    });
    return simpleMarker;
  }
  markMyPosition() {
    this.createMarker(this.center, "我的位置");
  }

  initMap() {
    let map = new window.AMap.Map("map", {
      resizeEnable: true,
      zoom: 16,
      center: center
    });

    this.setState({
      map: map
    });
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    console.log("receiving props", this.props);
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        console.log("success loaded:", this.props);
        this.initMap();
        console.log(window.AMapUI);
        window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
          this.setState({ SimpleMarker });
          this.createSimpleMarker(center, '这', 'red', '我的位置');
          this
        });
      } else this.props.onError();
    }
  }

  componentDidMount() {
    console.log("component did mount");
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    console.log(isScriptLoaded);
    if (isScriptLoaded && isScriptLoadSucceed) {
    }
  }

  render() {
    return <div className="map-container" id="map" />;
  }
}
console.log(`//webapi.amap.com/maps?v=1.4.6&key=${jskey}`);
export default scriptLoader(
  `//webapi.amap.com/maps?v=1.4.6&key=${jskey}`,
  "//webapi.amap.com/ui/1.0/main.js"
)(Map);
