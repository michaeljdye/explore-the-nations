import React, { Component } from 'react';
import { LocationsSection } from '../styles/locationsStyles';

export default class Locations extends Component {
  getName = name => {
    this.props.showMarkerInfo(name);
  };

  render() {
    return (
      <div>
        {this.props.listItems.map((ven, index) => (
          <LocationsSection
            key={index}
            onClick={() => this.getName(ven.venue.name)}
          >
            <p className="location-title">{ven.venue.name}</p>
            <p className="location-address">{ven.venue.location.address}</p>
          </LocationsSection>
        ))}
      </div>
    );
  }
}
