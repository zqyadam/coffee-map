import React, { Component } from 'react'

class PlaceItem extends Component {
  render () {
    let place = this.props.place;
    return <div className="place-item">
        <p>名称：{place.name}</p>
        <p>地址：{place.address}</p>
        {place.tel.length ? <p>联系电话：{place.tel}</p> : ""}
        <p>距离：{place.distance}米</p>
      </div>;
  }
}

export default PlaceItem