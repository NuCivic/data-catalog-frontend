import React from 'react';
import PropTypes from 'prop-types';
import { SearchReset } from '../SearchReset';
import Wrapper from './Wrapper';

export const SearchTextInput = ({
  containerClasses,
  labelOptions,
  ariaLabel,
  inputClasses,
  inputName,
  placeHolder,
  value,
  onChangeFunction,
  reset
}) => {
  return(
    <Wrapper className='search-input-container'>
      <div className={containerClasses}>
        <label className={labelOptions.classes} htmlFor="searchTextInput" id="search-text-input-label">
          <span className="">{labelOptions.label}</span>
        </label>
        <input
          aria-label={ariaLabel}
          className={inputClasses}
          id="searchTextInput"
          type="text"
          name={inputName}
          placeholder={placeHolder}
          value={value}
          onChange={onChangeFunction}
        />
      </div>
      {reset.active &&
        <SearchReset
          searchParams={value}
          resetFunction={reset.resetFunction}
        >
          {reset.children}
        </SearchReset>
      }
    </Wrapper>
  );
};

SearchTextInput.defaultProps = {
  containerClasses: "",
  labelOptions: {
    label: "Dataset Search Filter",
    classes: ""
  },
  ariaLabel: 'Dataset Search Filter',
  inputClasses: '',
  inputName: 'dataset_search_filter',
  placeHolder: 'Type your search term here',
  value: ''
};

SearchTextInput.propTypes = {
  containerClasses: PropTypes.string,
  labelOptions: PropTypes.object,
  ariaLabel: PropTypes.string,
  inputClasses: PropTypes.string,
  inputName: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  onChangeFunction: PropTypes.func.isRequired,
  reset: PropTypes.shape({
    active: PropTypes.bool.isRequired
  })
};
