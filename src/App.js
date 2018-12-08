import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import './App.css';
import { GMap, MapSection, Main, Wrapper } from './styles/appStyles';
import loadScript from './utils/loadScript';
import getVenues from './api/api';
import Header from './components/Header';
import Search from './containers/Search';
import Locations from './containers/Locations';

export default class App extends Component {
  state = {
    venue: '',
    venues: [],
    map: {},
    markers: [],
    listItems: [],
    hasMap: false
  };

  componentDidMount() {
    if (this.state.venues.length === 0) {
      const script =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBBlr6-M5k81x_a4D8PQGCYm1BdTHABUA&libraries=places&callback=initMap';

      getVenues()
        .then(res => {
          if (!res) return;
          localStorage.setItem('venues', JSON.stringify(res));
          this.setState(
            { venues: res.data.response.groups[0].items },
            this.renderMap(script)
          );
        })
        .catch(err => {
          const storedVenues = JSON.parse(localStorage.getItem('venues'));
          this.setState({
            venues: storedVenues.data.response.groups[0].items
          });
          console.log(err);
        });
    }

    this.updateMarkers();
  }

  renderMap = script => {
    loadScript(script);
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
    this.setState(state => (state.markers.length = 0));

    const infoWindow = new window.google.maps.InfoWindow();

    venues.map(ven => {
      const { name, location } = ven.venue;

      var marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        animation: window.google.maps.Animation.DROP
      });

      const getVenueDetails = results => {
        if (!results) return;

        const { name, formatted_address, rating, opening_hours } = results[0];
        const content = `<div class="info-window" tabindex="-1" role="dialog">
                          <h2>${name}</h2>
                          <p>${formatted_address || ''}</p>
                          <div class="info-window__content">
                            <p class="info-window__rating"><span class="text--bold">Rating:</span> ${rating}</p>
                            <p class="text--bold ${
                              opening_hours.open_now === true
                                ? 'color--success'
                                : 'color--warn'
                            }">${
          opening_hours.open_now === true ? 'Open' : 'Closed'
        }<p>
                          </div>
                        </div>`;

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
        fields: ['rating', 'name', 'opening_hours', 'formatted_address'],
        locationBias: {
          lat: location.lat,
          lng: location.lng
        }
      };

      const service = new window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, getVenueDetails);

      this.setState(state => state.markers.push([marker, name]));
    });

    this.setState({ hasMap: true });
  };

  updateMarkers(searchedVenue) {
    if (searchedVenue) {
      this.initMap(searchedVenue);
    }
  }

  showMarkerInfo = venueName => {
    const filteredMarker = this.state.markers.filter(marker => {
      return marker[1].toLowerCase() === venueName.toLowerCase();
    });

    if (filteredMarker.length === 0) return;
    window.google.maps.event.trigger(filteredMarker[0][0], 'click');
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
              <GMap id="map" role="application" />
            </MapSection>
          </Main>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
