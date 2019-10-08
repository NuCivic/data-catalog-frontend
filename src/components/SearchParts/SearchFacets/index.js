import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FacetBlock, ShowMoreContainer } from '@civicactions/data-catalog-components';
import ShowMore from '../../FacetList/ShowMore';

export function buildFacetsArray(facets) {
  let facetTypes = [];
  for(let facet in facets) {
    facetTypes.push(facet);
  }
  return facetTypes;
}



const SearchFacets = ({
  facets,
  items,
}) => {
  let facetTypes = buildFacetsArray(facets);

  const facetBlocks = facetTypes.map((facetKey) => {
    const title = facets[facetKey].label;
    return(
      <FacetBlock
        key={facetKey}
        title={title}
      >
        <ShowMoreContainer
          container="unordered"
          items={
            items[facetKey].map((item, index) => <li key={index}>{item[0]} ({item[1]})</li>)
          }
          limit={10}
        />
        
      </FacetBlock>
    );
  })

  return facetBlocks;
}

SearchFacets.defaultProps = {};
SearchFacets.propTypes = {};

export default SearchFacets;
