import React from 'react';
import PropTypes from 'prop-types';
import SearchResultsListItem from './SearchResultsListItem';
import Wrapper from './Wrapper';

export const SearchResultsList = ({items, message, downloadTitle, downloadIcon, location, searchTerm, searchLink}) => {
  return(
    <Wrapper className="search-list">
      {message &&
        <div className="results-message">{ message }</div>
      }
      <ol>
        {items.map((item, index) => {
          return(
            <SearchResultsListItem
              key={`${item.modified}-${index}`}
              location={location}
              title={item.title}
              url={item.ref}
              theme={item.theme}
              description={item.description}
              modifiedDate={item.modified}
              downloadTitle={downloadTitle}
              downloadURL={item.format ? item.format[0].downloadURL : null}
              downloadIcon={downloadIcon}
              searchTerm={searchTerm}
              searchLink={searchLink}
            />
          );
        })}
      </ol>
    </Wrapper>
  );
}

SearchResultsList.propTypes = {
  items: PropTypes.array,
  message: PropTypes.string,
  downloadTitle: PropTypes.string
};
