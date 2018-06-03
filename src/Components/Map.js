import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { jskey, center } from "../data";
console.log(center);
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      SimpleMarker: null,
      markers: []
    };
  }

  createMarker(pos, title) {
    let marker = new window.AMap.Marker({
      position: pos,
      title: title
    });
    return marker;
  }

  createSimpleMarker(pos, label, style, title) {
    let simpleMarker = new this.state.SimpleMarker({
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
  markMyPosition() {
    this.createSimpleMarker(center, "这", "red", "我的位置");
  }

  makeMarkers(places) {
    let markers = places.map(place => {
      return this.createMarker(place.location.split(","), place.name);
    });
    this.setState({ markers: markers });
    this.state.map.add(markers);
  }

  initMap() {
    let map = new window.AMap.Map("map", {
      resizeEnable: true,
      zoom: 18,
      center: center
    });

    this.setState({
      map: map
    });
  }

  reloadMarkers(places) {
    this.state.map.remove(this.state.markers);
    this.makeMarkers(places);
  }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed, places }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        this.initMap();

        window.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
          this.setState({ SimpleMarker });
          this.markMyPosition();
          console.log(places)
          this.reloadMarkers(places);
        });
      } else this.props.onError();
    }

    if (this.state.map) {
      console.log('places change')
      console.log(places);
      this.reloadMarkers(places);
    }
  }

  componentDidMount() {
    console.log("component did mount");
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    console.log("did mount", this.props);
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

