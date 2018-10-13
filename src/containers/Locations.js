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
  render() {
    return (
      <div>
        {Object.entries(this.props.allLocations).map((location, index) => (
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
