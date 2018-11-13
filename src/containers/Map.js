import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const GoogleMap = styled.div`
  height: 100%;
`;

export default class Map extends Component {
  state = {
    markerPositions: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ markerPositions: nextProps });
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBBlr6-M5k81x_a4D8PQGCYm1BdTHABUA&callback=initMap'
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    const mapCenter = { lat: 36.14954, lng: -86.86528 };
    var map = new window.google.maps.Map(
      window.document.getElementById('map'),
      {
        center: mapCenter,
        zoom: 14
      }
    );

    var marker = new window.google.maps.Marker({
      position: mapCenter,
      map: map,
      title: 'Hello World',
      animation: window.google.maps.Animation.DROP
    });
  };

  render() {
    return (
      <Main>
        <GoogleMap id="map" />
      </Main>
    );
  }
}

const loadScript = url => {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
};
