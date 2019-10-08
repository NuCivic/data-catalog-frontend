import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormLabel } from "@cmsgov/design-system-core";

export const SearchSort = ({
  labelClasses,
  labelValue,
  sortFunction,
  sortOptions,
  sortValue,
  hideLabel,
  selectClasses
}) => {
  return(
    <>
      {!hideLabel &&
        <FormLabel className={labelClasses} for="search_sort_change">{labelValue}</FormLabel>
      }
      <Select
        aria-label="Search Sort Change"
        value={sortValue}
        name="search_sort_change"
        className={selectClasses}
        onChange={sortFunction}
      >
        {sortOptions.map((sortOption, index) => {
          return (<option key={index} value={sortOption.value}>{sortOption.title}</option>);
        })}
      </Select>
    </>
  );
}

SearchSort.defaultProps = {
  selectClasses: 'form-control input-sm',
  formLabelClasses: 'search-sort-label',
  labelValue: 'Sort by'
};

SearchSort.propTypes = {
  containerClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  labelValue: PropTypes.string,
  sortFunction: PropTypes.func.isRequired,
  sortOptions: PropTypes.array.isRequired,
  sortValue: PropTypes.string.isRequired
}
