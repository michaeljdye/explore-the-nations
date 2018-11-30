import React from 'react';
import { SearchSection, Input } from '../styles/searchStyles';

export default function Search(props) {
  return (
    <div>
      <SearchSection>
        <Input
          onChange={e => props.searchLocation(e.target.value)}
          type="search"
          placeholder="Search Location"
          value={props.query}
        />
      </SearchSection>
    </div>
  );
}
