import React, { Component } from 'react';
import { GMap, MapSection, MapErrorWrapper } from '../styles/mapStyles';
import loadScript from '../utils/loadScript';

/**
 * @description React class component - render map
 * @param { string } script - script URL.
 */
export default class GoogleMap extends Component {
  /**
   * @description Pass Google Map script to renderMap
   * @param { string } script - script URL.
   */
  componentDidMount() {
    const script =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBBlr6-M5k81x_a4D8PQGCYm1BdTHABUA&libraries=places&callback=initMap';

    this.renderMap(script);
  }

  /**
   * @description call function to load script and set initMap function.
   * @param { string } script - script URL.
   */
  renderMap = script => {
    loadScript(script);
    window.initMap = this.props.initMap;
  };

  render() {
    return (
      <MapSection role="application" aria-label="Map with restaurants">
        {this.props.hasMap === false ? (
          <MapErrorWrapper>
            <h2>No Connection</h2>
            <p>Please connect to internet to display map.</p>
          </MapErrorWrapper>
        ) : (
          ''
        )}
        <GMap id="map" />;
      </MapSection>
    );
  }
}
