import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchSection, Input, SubmitBtn } from '../styles/searchStyles';

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
  handleSearchChange = query => {
    this.setState({ query });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.getLocation(this.state.query);
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
            <SubmitBtn type="submit" onClick={this.handleSubmit}>
              Submit
            </SubmitBtn>
          </form>
        </SearchSection>
      </>
    );
  }
}

Search.propTypes = {
  getLocation: PropTypes.func
};
