import React from 'react';
import PropTypes from 'prop-types';
import { PageSizer } from './PageSizer';
import { SearchResultsMessage } from '../SearchResultsMessage';
import Pagination from "react-js-pagination";

export const SearchPagination = ({
  total,
  searchParams,
  searchFunctions,
  pageSizerOptions,
  paginationOptions,
  includePageResults
}) => {
  return(
    <div className="pagination-container">
      {includePageResults &&
        <SearchResultsMessage
          total={total}
          pageSize={searchParams.pageSize}
          currentPage={searchParams.page}
        />
      }
      {pageSizerOptions.active &&
        <PageSizer
          defaultPagesize={searchParams.pageSize.toString()}
          optionsArray={pageSizerOptions.optionsArray}
          onChangeFunction={(event) => searchFunctions.pageSizeChange(event)}
        />
      }
      <Pagination
        hideDisabled={paginationOptions.hideDisabled}
        activePage={parseInt(searchParams.page)}
        itemsCountPerPage={parseInt(searchParams.pageSize)}
        totalItemsCount={total}
        pageRangeDisplayed={paginationOptions.pageRange}
        onChange={(event) => searchFunctions.pageChange(event)}
      />
    </div>
  );
}

SearchPagination.defaultProps = {
  pageSizerOptions: {
    active: true,
    defaultPagesize: "",
    optionsArray: []
  },
  paginationOptions: {
    pageRange: 5,
    hideDisabled: true,
  }
}

SearchPagination.propTypes = {
  pageSizerOptions: PropTypes.shape({
    active: PropTypes.bool,
    defaultPagesize: PropTypes.string,
    optionsArray: PropTypes.array,
  }),
  paginationOptions: PropTypes.shape({
    pageRange: PropTypes.number,
    hideDisabled: PropTypes.bool,
  })
}
