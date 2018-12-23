import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchSection, Input } from '../styles/searchStyles';

/**
 * @description React class component - receive user search input
 * and pass queries to other part of the app.
 */
export default class Search extends Component {
  state = {
    query: ''
  };

  /**
   * @description Update state with new search query and passes query to getLocation func.
   * @param { string } query - value of search input.
   */
  searchLocation = query => {
    this.setState({ query }, this.props.getLocation(query));
  };

  /**
   * @description Render search form.
   */
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
