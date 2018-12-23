import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchSection, Input, Btn } from '../styles/searchStyles';

/**
 * @description React class component - receive user search input
 * and pass queries to other part of the app.
 */
export default class Search extends Component {
  state = {
    query: ''
  };

  /**
   * @description Update state with new search query.
   * @param { string } query - value of search input.
   */
  handleSearchChange = query => {
    this.setState({ query });
  };

  /**
   * @description Pass query to getLocation function.
   * @param { object } e - event
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.getLocation(this.state.query);
  };

  /**
   * @description Reset search.
   * @param { object } e - event
   */
  handleReset = e => {
    e.preventDefault();
    this.setState({ query: '' });
    this.props.getLocation();
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
                onChange={e => this.handleSearchChange(e.target.value)}
                type="search"
                value={query}
                tabindex="0"
              />
              <label htmlFor="search">Search Location</label>
            </div>
            <Btn
              type="button"
              onClick={this.handleReset}
              aria-label="Submit search"
            >
              Reset
            </Btn>
            <Btn
              type="button"
              onClick={this.handleSubmit}
              aria-label="Reset search"
            >
              Submit
            </Btn>
          </form>
        </SearchSection>
      </>
    );
  }
}

Search.propTypes = {
  getLocation: PropTypes.func
};
