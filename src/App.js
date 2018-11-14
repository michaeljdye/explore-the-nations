import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import styled from 'styled-components';
import Locations from './containers/Locations';
import Map from './containers/Map';
import Axios from 'axios';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

class App extends Component {
  state = {
    venue: '',
    venues: [],
    selectedLocation: {}
  };

  componentDidMount() {
    this.getVenues();
  }

  showMarker = (lat, lng) => {
    this.setState({ selectedLocation: { lat, lng } });
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
        this.setState({ venues: res.data.response.groups[0].items });
        console.log(res.data.response.groups[0].items);
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
          <Map
            selectedLocation={this.state.selectedLocation}
            venue={this.state.venue}
            venues={this.state.venues}
          />
        </Wrapper>
      </div>
    );
  }
}

export default App;
