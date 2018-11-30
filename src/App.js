import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GMap, MapSection, Main, Wrapper } from './styles/appStyles';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import Locations from './containers/Locations';
import { getVenues } from './api/api';

export default class App extends Component {
  state = {
    venue: '',
    venues: [],
    map: '',
    markers: [],
    listItems: []
  };

  componentDidMount() {
    if (this.state.venues.length === 0)
      getVenues()
        .then(res => {
          this.setState(
            { venues: res.data.response.groups[0].items },
            this.renderMap()
          );
        })
        .catch(err => console.log(err));
    this.updateMarkers();
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

      const getVenueDetails = results => {
        const content = `<div style="text-align: center;">
                          <h2>${results[0].name}</h2>
                          <p>${results[0].formatted_address || ''}</p>
                          <div style="display: flex; justify-content: center;">
                          <p style="margin-right: 25px;"><span style="font-weight: 700">Rating:</span> ${
                            results[0].rating
                          }</p>
                          <p style="${
                            results[0].opening_hours.open_now === true
                              ? 'color: green;'
                              : 'color: red;'
                          } font-weight: 700;">${
          results[0].opening_hours.open_now === true ? 'Open' : 'Closed'
        }<p>
                          </div>
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

      this.setState(state => state.markers.push([marker, name]));
    });
  };

  updateMarkers(searchedVenue) {
    if (this.state.markers) {
      this.state.markers.map(marker => {
        marker[0].setMap(null);
      });
    }

    if (searchedVenue) {
      searchedVenue.forEach(searchedVen => {
        const selectedVenue = this.state.venues.filter(
          ven => ven.venue.location.lat === searchedVen.venue.location.lat
        );

        const name = selectedVenue[0].venue.name;

        const position = {
          lat: selectedVenue[0].venue.location.lat,
          lng: selectedVenue[0].venue.location.lng
        };
        const marker = new window.google.maps.Marker({
          position: position,
          map: this.state.map,
          animation: window.google.maps.Animation.DROP
        });

        const infoWindow = new window.google.maps.InfoWindow();

        const content = `<h2>${selectedVenue[0].venue.name} Poop</h2>
          <p>${selectedVenue[0].venue.location.address || ''}</p>`;

        marker.addListener('click', () => {
          infoWindow.open(this.state.map, marker);
          infoWindow.setContent(content);
        });

        this.setState({ listItems: searchedVenue });
        this.setState(state => state.markers.push([marker, name]));
      });
    }
  }

  showMarkerInfo = name => {
    const filteredMarker = this.state.markers.filter(
      marker => marker[1] === name
    );
    window.google.maps.event.trigger(filteredMarker[0][0], 'click');
  };

  getLocation = venue => {
    const searchedVenue = this.state.venues.filter(ven =>
      ven.venue.name.toLowerCase().includes(venue.toString().toLowerCase())
    );
    this.setState({ venue });
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
              <GMap id="map" />
            </MapSection>
          </Main>
        </Wrapper>
      </ThemeProvider>
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
