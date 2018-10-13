import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import styled from 'styled-components';
import Locations from './containers/Locations';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

class App extends Component {
  state = {
    locationsData: [],
    location: ''
  };

  componentDidMount() {
    fetch('locations.json')
      .then(res => res.json())
      .then(data =>
        this.setState({
          locationsData: data
        })
      );
  }

  getLocation = location => {
    this.setState({ location });
  };

  render() {
    console.log(this.state.location);
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <div>
            <Search getLocation={this.getLocation} />
            <Locations
              allLocations={this.state.locationsData}
              location={this.state.location}
            />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
