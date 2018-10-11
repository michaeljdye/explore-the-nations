import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './containers/Search';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <Search />
        </Wrapper>
      </div>
    );
  }
}

export default App;
