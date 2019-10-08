import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChoiceList } from '@cmsgov/design-system-core';
import MobileShowMore from '../../../MobileFacetList/MobileShowMore'
import BlockWrapper from './BlockWrapper';

const FacetBlock = ({
  facetKey,
  title,
  clickFunction,
  items,
  selectedFacets,
  truncatedAmount,
  allowToggle,
  isMobile
}) => {
  // Show More is true, all facets visible
  const [showMore, toggleShowMore] = useState(false);
  const [showFacets, toggleShowFacets] = useState(allowToggle ? false : true);
  let showMoreButton = null;
  let toggleFacetsButton = null;
  const totalFacets = items.length;

  let facetChoices = items.filter((choice, index) => {
    if(!showMore && index >= truncatedAmount) {
      return false;
    }
    return choice;
  }).map((choice) => {
    const name = choice[0];
    const count = `(${choice[1]})`;
    let isSelected = false;
    if(selectedFacets.length > 0) {
      isSelected = selectedFacets.find((blah) => {
        const currentFacet = blah[1];
        const currentType = blah[0];
        return (currentFacet === name) && (currentType === facetKey)
      });
    }
    return {
      defaultChecked: isSelected ? true : false,
      value: name,
      label: `${name} ${count}`
    };
  });

  if (allowToggle) {
    if (!showFacets) {
      facetChoices = []
      toggleFacetsButton = <MobileShowMore className={`facet-block-toggle`} onClick={() => toggleShowFacets(!showFacets)}><i className="fa fa-chevron-down"></i></MobileShowMore>
    } else {
      toggleFacetsButton = <MobileShowMore className={`facet-block-toggle`} onClick={() => toggleShowFacets(!showFacets)}><i className="fa fa-chevron-up"></i></MobileShowMore>
    }
  }

  if(totalFacets >= truncatedAmount && showFacets) {
    if(!showMore) {
      showMoreButton = <button className={`facet-block-showmore`} onClick={() => toggleShowMore(!showMore)}>Show {totalFacets - facetChoices.length} more</button>
    } else {
      showMoreButton = <button className={`facet-block-showmore`} onClick={() => toggleShowMore(!showMore)}>Show less</button>
    }
  }

  return(
    <BlockWrapper id={`facet-block-${facetKey.toLowerCase()}`} className={isMobile ? 'isMobile' : ''}>
      <div className={`facet-block-${facetKey.toLowerCase()}-inner`}>
        {toggleFacetsButton}
        <div className="list-group">
          <ChoiceList
            choices={facetChoices}
            label={title}
            onChange={clickFunction}
            multiple
            name={facetKey}
          />
        </div>
        {showMoreButton}
      </div>
    </BlockWrapper>
  )
}

FacetBlock.defaultProps = {
  allowToggle: false,
  isMobile: false,

};

FacetBlock.propTypes = {
  allowToggle: PropTypes.bool,
  facetKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickFunction: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  selectedFacets: PropTypes.array.isRequired,
  truncatedAmount: PropTypes.number.isRequired,
  isMobile: PropTypes.bool
};

export default FacetBlock;
