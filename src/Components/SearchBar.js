import React, {useState} from 'react';

export default function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  
    return (
      <div>
        <input
          aria-labelledby = "search-button"
          name = "search"
          id = "search"
          type = "search"
          value = {innerSearch}
          onChange = {e => setInnerSearch(e.target.value)}
        />

        <button
          class="btn btn-success"
          id = "search"
          type = "button"
          onClick = {() => props.onSubmit(innerSearch)}
        >
          Search
        </button>
      </div>
    );
  }