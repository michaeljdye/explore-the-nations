import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchSection, Input } from '../styles/searchStyles';

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
      <>
        <SearchSection>
          <form role="search">
            <div>
              <Input
                id="search"
                onChange={e => this.searchLocation(e.target.value)}
                type="search"
                value={query}
                tabindex="0"
              />
              <label htmlFor="search">Search Location</label>
            </div>
          </form>
        </SearchSection>
      </>
    );
  }
}

Search.propTypes = {
  getLocation: PropTypes.func
};
