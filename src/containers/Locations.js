import React, { Component } from 'react';
import { LocationsSection } from '../styles/locationsStyles';

export default class Locations extends Component {
  state = {
    filteredVenues: []
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.venue) {
      this.setState({ filteredVenues: nextProps.venues });
      return;
    }
    const searchedVenue = nextProps.venues.filter(ven =>
      ven.venue.name.toLowerCase().startsWith(nextProps.venue.toLowerCase())
    );

    this.setState({ filteredVenues: searchedVenue });
  }

  getName = name => {
    this.props.showMarkerInfo(name);
  };

  render() {
    return (
      <div>
        {this.state.filteredVenues.map((ven, index) => (
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
