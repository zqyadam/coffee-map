import React, { Component } from 'react'
import PlaceItem from './PlaceItem'

class PlaceList extends Component {
  state = {

  }

  inputChange(){

  }

  render () {
    let places = this.props.places;
    return (<div className="place-list">
      <div>
        <input className="place-filter-text" type="text" onChange={this.inputChange}/>
        <button className="place-filter-btn">过滤</button>
      </div>
      {places.map((place) => (
          <PlaceItem place={place} key={place.id} />
        ))}
      </div>);
  }
}

export default PlaceList
