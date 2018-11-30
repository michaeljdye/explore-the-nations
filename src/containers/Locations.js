import React, { Component } from 'react';
import { LocationsSection } from '../styles/locationsStyles';

export default class Locations extends Component {
  getName = name => {
    this.props.showMarkerInfo(name);
  };

  render() {
    return (
      <div>
        {this.props.listItems.map((data, index) => (
          <LocationsSection
            key={index}
            onClick={() => this.getName(data.venue.name)}
          >
            <p className="location-title">{data.venue.name}</p>
            <p className="location-address">{data.venue.location.address}</p>
          </LocationsSection>
        ))}
      </div>
    );
  }
}
