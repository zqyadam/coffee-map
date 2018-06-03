import React, { Component } from "react";

class PlaceItem extends Component {
  getAddress(place) {
    let address = "";
    if (place.address) {
      address = place.address;
    } else if (place.business_area) {
      address = `在${place.business_area}附近`;
    } else {
      return "";
    }
    return "地址：" + address;
  }

  handleClick(){
    this.props.onClick(this.props.place.id);
  }

  render() {
    let place = this.props.place;
    return (
      <div className="place-item" onClick={()=>this.handleClick()}>
        <p>名称：{place.name}</p>
        <p>{this.getAddress(place)}</p>
        <p>距离：{place.distance}米</p>
      </div>
    );
  }
}

export default PlaceItem;
