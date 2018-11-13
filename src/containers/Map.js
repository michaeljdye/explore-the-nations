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
    const mapCenter = { lat: 36.162177, lng: -86.849023 };
    var map = new window.google.maps.Map(
      window.document.getElementById('map'),
      {
        center: mapCenter,
        zoom: 15
      }
    );

    this.props.venues.map(ven => {
      const lat = ven.venue.location.lat;
      const lng = ven.venue.location.lng;
      const name = ven.venue.name.toString();
      var marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: name,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        infoWindow.setContent(name);
      });
    });

    const infoWindow = new window.google.maps.InfoWindow();
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
