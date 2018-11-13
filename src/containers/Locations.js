import React, { Component } from 'react';
import Location from './Location';
import styled from 'styled-components';

const Wrapper = styled.section`
  background: #555;
  border-top: 1px solid #fff;
  color: #fff;

  .location-title,
  .location-address {
    margin: 0;
    padding: 5px;
  }
`;

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

  render() {
    return (
      <div>
        {this.state.filteredVenues.map((ven, index) => (
          <Wrapper key={index}>
            <p className="location-title">{ven.venue.name}</p>
            <p className="location-address">{ven.venue.location.address}</p>
          </Wrapper>
        ))}
        <Location />
      </div>
    );
  }
}
