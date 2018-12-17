import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LocationContent } from '../styles/locationsStyles';

/**
 * @description React class component - return locations list
 * and pass location data when a location is clicked.
 */
export default class Locations extends Component {
  /**
   * @description Pass location name to showMarkerInfo func
   * @param { string } name - name of selected location
   */
  getName = name => {
    this.props.showMarkerInfo(name);
  };

  /**
   * @description Render filtered locations.
   */
  render() {
    return (
      <nav>
        <ul>
          {this.props.listItems.map((data, index) => (
            <LocationContent
              key={index}
              onClick={() => this.getName(data.venue.name)}
              role="button"
              tabIndex="0"
            >
              <h2 className="location-title">{data.venue.name}</h2>
            </LocationContent>
          ))}
        </ul>
      </nav>
    );
  }
}

Locations.propTypes = {
  showMarkerInfo: PropTypes.func,
  venue: PropTypes.string,
  listItems: PropTypes.array
};
