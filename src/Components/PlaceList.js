import React, { Component } from "react";
import PlaceItem from "./PlaceItem";

class PlaceList extends Component {
  state = {
    filterd_places: [],
    places: [],
    current_filter_value: "050"
  };

  componentWillReceiveProps({ places }) {
    console.log(places);
    this.setState({ places: places, filterd_places: places });
  }

  handleSelectChange(e) {
    this.setState({
      current_filter_value: e.target.value
    });
    this.filterCoffee();
  }

  filterCoffee(current_filter_value) {
    let { places } = this.state;

    this.setState({
      filterd_places: places.filter(
        place => place.typecode.startsWith(current_filter_value)
      ),
      current_filter_value
    })
  }

  render() {
    let { places, filterd_places, current_filter_value } = this.state;

    return (
      <div className="place-list">
        {places.length === 0 ? (
          <div>暂时啥也没有</div>
        ) : (
          <div className="place-select-container">
            <select
              className="place-select"
              value={current_filter_value}
              onChange={event => {
                this.filterCoffee(event.target.value);
              }}
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
          </div>
        )}
        <div className="place-item-list">
          {filterd_places.map(place => (
            <PlaceItem place={place} key={place.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default PlaceList;
