import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import {jskey, center} from '../data'
console.log(center)
class Map extends Component {
  state = {
    map: null
  }

  initMap(){
    let map = new window.AMap.Map("map", {
      resizeEnable: true,
      zoom: 12,
      center: center
    });

    this.setState({
      map: map
    })
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    console.log("receiving props", this.props);
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        console.log('success loaded:', this.props);
        this.initMap();
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
console.log(`http://webapi.amap.com/maps?v=1.4.6&key=${jskey}`);
export default scriptLoader(`http://webapi.amap.com/maps?v=1.4.6&key=${jskey}`)(
  Map
);
