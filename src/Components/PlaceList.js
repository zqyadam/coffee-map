import React, { Component } from "react";
import PlaceItem from "./PlaceItem";

class PlaceList extends Component {
  state = {
    filterd_places: [],
    places: [],
    current_filter_value: "all"
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
    this.setState({
      current_filter_value
    });

    let { places } = this.state;

    if (current_filter_value === "all") {
      this.setState({
        filterd_places: places
      });
    } else {
      this.setState({
        filterd_places: places.filter(
          place => place.typecode === current_filter_value
        )
      });
    }
  }

  render() {
    let { places, filterd_places, current_filter_value } = this.state;

    return (
      <div className="place-list">
        <div className="place-select">
          {places.length === 0 ? (
            "暂时啥也没有"
          ) : (
            <select
              value={current_filter_value}
              onChange={event => {
                this.filterCoffee(event.target.value);
              }}
            >
              <option value="all">所有</option>
              <option value="050501">星巴克咖啡</option>
              <option value="050502">上岛咖啡</option>
              <option value="050503">太平洋咖啡</option>
              <option value="050504">巴黎咖啡店</option>
              <option value="050500">其他</option>
            </select>
          )}
        </div>
        {filterd_places.map(place => (
          <PlaceItem place={place} key={place.id} />
        ))}
      </div>
    );
  }
}

export default PlaceList;
