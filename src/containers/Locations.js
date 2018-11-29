import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  background: #fff;
  border-bottom: 1px solid #818a8f;
  color: #fff;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #818a8f;

  &:hover {
    cursor: pointer;
    background-color: #f8f9fd;
  }

  .location-title,
  .location-address {
    margin: 0;
    padding: 5px;
  }

  .location-title {
    font-weight: 700;
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

  getLatLng = (lat, lng) => {
    this.props.showMarker(lat, lng);
  };

  render() {
    return (
      <div>
        {this.state.filteredVenues.map((ven, index) => (
          <Wrapper
            key={index}
            onClick={() =>
              this.getLatLng(ven.venue.location.lat, ven.venue.location.lng)
            }
          >
            <p className="location-title">{ven.venue.name}</p>
            <p className="location-address">{ven.venue.location.address}</p>
          </Wrapper>
        ))}
      </div>
    );
  }
}
