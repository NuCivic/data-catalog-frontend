import React from 'react';
import PropTypes from 'prop-types';
import FacetBlock from './FacetBlock';

export const SearchFacets = ({
  facets,
  facetClick,
  facetResults,
  selectedFacets,
  truncatedAmount,
  allowToggle,
  isMobile
}) => {
  let facetTypes = [];
  for(let facet in facets) {
    facetTypes.push(facet);
  }

  const facetBlocks = facetTypes.map((facetKey) => {
    const visibleFacets = facetResults[facetKey];
    const title = facets[facetKey].label;

    return (
      <FacetBlock
        key={facetKey}
        facetKey={facetKey}
        title={title}
        clickFunction={facetClick}
        items={visibleFacets}
        selectedFacets={selectedFacets}
        truncatedAmount={truncatedAmount}
        allowToggle={allowToggle}
        isMobile={isMobile}
      />
    );
  });

  return facetBlocks;
};

SearchFacets.propTypes = {
  facets: PropTypes.object.isRequired,
  facetClick: PropTypes.func.isRequired,
  facetResults: PropTypes.object.isRequired,
  selectedFacets: PropTypes.array.isRequired,
  truncatedAmount: PropTypes.number.isRequired,
};
