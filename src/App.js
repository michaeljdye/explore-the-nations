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
    location: ''
  };

  getLocation = location => {
    this.setState({ location });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <div>
            <Search getLocation={this.getLocation} />
            <Locations location={this.state.location} />
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default App;
