import React, { Component } from "react";

class PlaceItem extends Component {
  /**
   * 格式化地址
   *
   * @param {*} place
   * @returns
   * @memberof PlaceItem
   */
  getAddress(place) {
    let address = "";
    if (place.address) {
      // 有地址则直接显示地址
      address = place.address;
    } else if (place.business_area) {
      // 没有地址时显示在商业圈附近
      address = `在${place.business_area}附近`;
    } else {
      // 是在没有地址就啥都不显示
      return "";
    }
    return "地址：" + address;
  }

  /**
   * 处理点击餐厅的事件
   *
   * @memberof PlaceItem
   */
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
