import React, { Component } from 'react';

export default class Location extends Component {
  render() {
    return (
      <div>
        <p>{this.props.location}</p>
      </div>
    );
  }
}
