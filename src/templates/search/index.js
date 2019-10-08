import React from 'react';
import DatasetSearch from './DatasetSearch';

const facets = {
  "Topics": {
    "label": "Topics",
    "field": "theme.0.title",
    "showAll": false
  },
  "Tags": {
    "label": "Tags",
    "field": "keyword.*.title",
    "showAll": false
  }
};

const defaultParams = {
  page: 1,
  pageSize: 10,
  q: "",
  sort: "alpha",
  facets: []
}

const Search = ({
  path,
  location
  }) => {
    return(
      <DatasetSearch
        path={path}
        searchType={'Lunr'}
        location={location}
        defaultParams={defaultParams}
        facets={facets}
      />
    );
};

export default Search;
