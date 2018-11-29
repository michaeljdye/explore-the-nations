import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid #818a8f;
  border-bottom: 1px solid #818a8f;
`;

const Input = styled.input`
  border: none;
  border-radius: 1rem;
  width: 60%;
  height: 2rem;
  font-size: 1rem;
  text-align: center;
  background-color: #f8f9fd;
  width: 80%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 100%;
  }
`;

export default class Search extends Component {
  state = {
    query: ''
  };

  searchLocation = query => {
    this.setState({ query });
    this.props.getLocation(query);
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <Wrapper>
          <Input
            onChange={e => this.searchLocation(e.target.value)}
            type="search"
            placeholder="Search Location"
            value={query}
          />
        </Wrapper>
      </div>
    );
  }
}
