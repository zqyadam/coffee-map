import React, { Component } from "react";
import PlaceItem from "./PlaceItem";

class PlaceList extends Component {
  state = {
    places: [],
    current_filter_value: "050",
    show: false
  };

  componentWillReceiveProps({ places, showSidebar }) {
    this.setState({
      places: places,
      show: showSidebar
    });
  }

  handleSelectChange(val) {
    this.setState({ current_filter_value: val });
    this.props.onFilter(val);
  }

  render() {
    let { places, current_filter_value, show } = this.state;
    let className = `place-list ${show ? 'show' : 'hide'}`;
    return (
      <div className={className}>
        <div className="place-select-container">
          <select
            className="place-select"
            value={current_filter_value}
            onChange={event => {
              this.handleSelectChange(event.target.value);
            }}
            disabled={!this.props.enable}
          >
            <option value="050">所有餐厅</option>
            <option value="0501">中餐厅</option>
            <option value="0502">外国餐厅</option>
            <option value="0503">快餐厅</option>
            <option value="0504">休闲餐饮场所</option>
            <option value="0505">咖啡厅</option>
            <option value="0506">茶艺馆</option>
            <option value="0507">冷饮店</option>
            <option value="0508">糕饼店</option>
            <option value="0509">甜品店</option>
          </select>
          <div className="place-list-num">餐厅数量：{places.length}</div>
        </div>
        <div className="place-item-list">
          {places.map(place => (
            <PlaceItem
              place={place}
              key={place.id}
              onClick={id => this.props.onClick(id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

PlaceList.defaultProps = {
  enable: false
};

export default PlaceList;
