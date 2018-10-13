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
    filteredLocations: []
  };

  componentWillReceiveProps(nextProps) {
    let filteredLocations = Object.entries(nextProps.allLocations);

    if (nextProps.location) {
      filteredLocations = Object.entries(nextProps.allLocations).filter(
        location =>
          location[0].toLowerCase().startsWith(nextProps.location.toLowerCase())
      );
    }

    this.setState({ filteredLocations });
  }

  render() {
    console.log(this.state.filteredLocations);
    return (
      <div>
        {this.state.filteredLocations.map((location, index) => (
          <Wrapper key={index}>
            <p className="location-title">{location[0]}</p>
            <p className="location-address">{location[1].address}</p>
          </Wrapper>
        ))}
        <Location />
      </div>
    );
  }
}
