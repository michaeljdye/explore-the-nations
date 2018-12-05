import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GMap, MapSection, Main, Wrapper } from './styles/appStyles';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import Locations from './containers/Locations';
import getVenues from './api/api';
import loadScript from './utils/loadScript';

export default class App extends Component {
  state = {
    venue: '',
    venues: [],
    map: '',
    markers: [],
    listItems: [],
    hasMap: false
  };

  componentDidMount() {
    if (this.state.venues.length === 0)
      getVenues()
        .then(res => {
          if (res) {
            localStorage.setItem('venues', JSON.stringify(res));
            this.setState(
              { venues: res.data.response.groups[0].items },
              this.renderMap()
            );
          }
        })
        .catch(err => {
          const storedVenues = JSON.parse(localStorage.getItem('venues'));
          this.setState({
            venues: storedVenues.data.response.groups[0].items
          });
        });
    this.updateMarkers();
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBBlr6-M5k81x_a4D8PQGCYm1BdTHABUA&libraries=places&callback=initMap'
    );
    window.initMap = this.initMap;
  };

  initMap = (venues = this.state.venues) => {
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

    venues.map(ven => {
      const lat = ven.venue.location.lat;
      const lng = ven.venue.location.lng;
      const name = ven.venue.name;
      var marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        animation: window.google.maps.Animation.DROP
      });

      const getVenueDetails = results => {
        if (!results) return;
        const content = `<div class="info-window">
                          <h2>${results[0].name}</h2>
                          <p>${results[0].formatted_address || ''}</p>
                          <div class="info-window__content">
                          <p class="info-window__rating"><span class="text--bold">Rating:</span> ${
                            results[0].rating
                          }</p>
                          <p class="text--bold ${
                            results[0].opening_hours.open_now === true
                              ? 'color--success'
                              : 'color--warn'
                          }">${
          results[0].opening_hours.open_now === true ? 'Open' : 'Closed'
        }<p>
                          </div>
                        </div>
                         `;

        marker.addListener('click', () => {
          const animateMarker = marker => {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 750);
          };

          infoWindow.open(map, marker, animateMarker(marker));
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

      this.setState(state => (state.markers.length = 0));
      this.setState(state => state.markers.push([marker, name]));
    });

    this.setState({ hasMap: true });
  };

  updateMarkers(searchedVenue) {
    if (searchedVenue) {
      this.initMap(searchedVenue);
    }
  }

  showMarkerInfo = name => {
    console.log(this.state.markers);
    const filteredMarker = this.state.markers.filter(
      marker => marker[1] === name
    );

    console.log(filteredMarker);

    if (filteredMarker.length > 0) {
      window.google.maps.event.trigger(filteredMarker[0][0], 'click');
    }
  };

  getLocation = venue => {
    if (this.state.markers.length === 0) return;
    const searchedVenue = this.state.venues.filter(ven =>
      ven.venue.name.toLowerCase().includes(venue.toString().toLowerCase())
    );

    this.setState({ venue, listItems: searchedVenue });
    this.updateMarkers(searchedVenue);
  };

  render() {
    const { venue, venues, listItems } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header />
          <Main>
            <div>
              <Search getLocation={this.getLocation} />
              <Locations
                showMarkerInfo={this.showMarkerInfo}
                venue={venue}
                listItems={listItems.length === 0 ? venues : listItems}
              />
            </div>
            <MapSection>
              {this.state.hasMap === false ? <h2>No Connection</h2> : ''}
              <GMap id="map" />
            </MapSection>
          </Main>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
