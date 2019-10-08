import React from 'react';
import PropTypes from 'prop-types';

export const SearchResultsMessage = ({
  total,
  pageSize,
  currentPage
}) => {
  const startingNumber = total > 0 ? 1 : 0;
  const currentLowestResult = startingNumber + ((pageSize * currentPage) - pageSize);
  let currentHighestResult = (pageSize * currentPage);
  if(currentHighestResult > total) {
    currentHighestResult = total;
  }
  return(
    <div className="dataset-results-count">{currentLowestResult}-{currentHighestResult} out of {total} datasets</div>
  );
}

SearchResultsMessage.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}
