import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import styled from 'styled-components';
import Locations from './containers/Locations';
import Axios from 'axios';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const Main = styled.main`
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const GoogleMap = styled.div`
  height: 100%;
`;

class App extends Component {
  state = {
    venue: '',
    venues: [],
    map: '',
    markers: []
  };

  componentDidMount() {
    this.getVenues();
    this.updateMarkers();
  }

  updateMarkers(lat, lng) {
    if (this.state.markers) {
      this.state.markers.map(marker => {
        marker.setMap(null);
      });
    }

    const selectedVenue = this.state.venues.filter(
      ven => ven.venue.location.lat === lat
    );

    if (lat) {
      const position = { lat: lat, lng: lng };
      const marker = new window.google.maps.Marker({
        position: position,
        map: this.state.map,
        animation: window.google.maps.Animation.DROP
      });

      const infoWindow = new window.google.maps.InfoWindow();

      const content = `<h2>${selectedVenue[0].venue.name}</h2>
      <p>${selectedVenue[0].venue.location.address || ''}</p>`;

      marker.addListener('click', () => {
        infoWindow.open(this.state.map, marker);
        infoWindow.setContent(content);
      });

      this.setState(state => state.markers.push(marker));
    }
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBBlr6-M5k81x_a4D8PQGCYm1BdTHABUA&libraries=places&callback=initMap'
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

    this.setState({ map });

    const infoWindow = new window.google.maps.InfoWindow();

    this.state.venues.map(ven => {
      const lat = ven.venue.location.lat;
      const lng = ven.venue.location.lng;
      const name = ven.venue.name;
      var marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        animation: window.google.maps.Animation.DROP
      });

      const getVenueDetails = (results, status) => {
        console.log(results);
        const content = `<div style="height:fit-content;">
                          <h2>${results[0].name}</h2>
                          <p>${results[0].formatted_address || ''}</p>
                          <p>Rating: ${results[0].rating}</p>
                          <p>${
                            results[0].opening_hours.open_now === true
                              ? 'Open'
                              : 'Closed'
                          }<p>
                          <img src="${results[0].photos[0].getUrl()}" height="200px" alt="${
          results[0].name
        }">
                        </div>
                         `;
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          infoWindow.setContent(content);
        });
      };

      const request = {
        query: name,
        fields: [
          'photos',
          'rating',
          'name',
          'opening_hours',
          'formatted_address'
        ],
        locationBias: {
          lat,
          lng
        }
      };
      const service = new window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, getVenueDetails);

      this.setState(state => state.markers.push(marker));
    });
  };

  showMarker = (lat, lng) => {
    this.setState({ selectedLocation: { lat, lng } });
    this.updateMarkers(lat, lng);
  };

  getVenues = () => {
    const endpoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: '4YDVSH1N0LJ4OF32W33SCDN2DTJTU1IPVSJ0W1JAZBPYAVBR',
      client_secret: 'XSDZ20QPDEFL0HZJFNEFK24BYUNSE1I23ZWMOQUNP3A3L1OZ',
      query: 'food',
      ll: '36.162177, -86.849023',
      radius: '500',
      v: '20181112'
    };

    Axios.get(endpoint + new URLSearchParams(parameters))
      .then(res => {
        this.setState(
          { venues: res.data.response.groups[0].items },
          this.renderMap()
        );
      })
      .catch(err => console.log(err));
  };

  getLocation = venue => {
    this.setState({ venue });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <div>
            <Search getLocation={this.getLocation} />
            <Locations
              showMarker={this.showMarker}
              venue={this.state.venue}
              venues={this.state.venues}
            />
          </div>
          <Main>
            <GoogleMap id="map" />
          </Main>
        </Wrapper>
      </div>
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

export default App;
