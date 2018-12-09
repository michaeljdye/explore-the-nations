import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LocationContent } from '../styles/locationsStyles';

export default class Locations extends Component {
  getName = name => {
    this.props.showMarkerInfo(name);
  };

  render() {
    return (
      <ul>
        {this.props.listItems.map((data, index) => (
          <LocationContent
            key={index}
            onClick={() => this.getName(data.venue.name)}
            tabIndex="0"
          >
            <p className="location-title">{data.venue.name}</p>
            <p className="location-address">{data.venue.location.address}</p>
          </LocationContent>
        ))}
      </ul>
    );
  }
}

Locations.propTypes = {
  showMarkerInfo: PropTypes.func,
  venue: PropTypes.string,
  listItems: PropTypes.array
};
