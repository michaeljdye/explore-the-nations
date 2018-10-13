import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  background: #555;
  border-top: 1px solid #fff;
`;

const Input = styled.input`
  border: none;
  border-radius: 1rem;
  width: 60%;
  height: 2rem;
  font-size: 1rem;
  text-align: center;
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
