import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from "react-highlight-words";
import { Link } from "gatsby";
import ItemWrapper from './ItemWrapper';
// 
import excerpts from 'excerpts';

const SearchResultsListItem = ({
  title,
  modifiedDate,
  downloadTitle,
  downloadURL,
  downloadIcon,
  description,
  descriptionLength,
  theme,
  url,
  searchTerm,
  searchLink
}) => {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  let dateString;
  if(modifiedDate) {
    dateString= new Date(modifiedDate).toLocaleDateString("en-US", options)
  }
  const excerptLength = descriptionLength ? descriptionLength : 35;
  const trimmedDescription = excerpts(description, {words: excerptLength});
  let themes;
  if(theme) {
    themes = (
      <ul className="theme-list item-theme">
        {theme.map((topic, index) => (
          <li key={`dist-${topic.identifier}-${index}`}>
            {topic.title}
          </li>
        ))}
      </ul>
    );
  }

  return(
    <ItemWrapper className="search-list-item">
      {themes}
      <h3>
        <Link
          to={url}
          state={{
            fromSearchList: true,
            path: searchLink
          }}
        >
          {searchTerm ?
            <Highlighter
              highlightClassName="highlighted"
              searchWords={searchTerm.split(' ')}
              autoEscape={true}
              textToHighlight={title}
            />
            : title
          }
          
        </Link></h3>
      <p className="item-description">
        {searchTerm ?
          <Highlighter
            highlightClassName="highlighted"
            searchWords={searchTerm.split(' ')}
            autoEscape={true}
            textToHighlight={trimmedDescription}
          />
          : trimmedDescription
        }
      </p>
      <div className="dataset-file">
        {`Last updated on ${dateString}`}
        {` `}
        <span className="bullet-point">&bull;</span>
        {` `}
        <a href={downloadURL}>
          {downloadIcon}
          {downloadTitle}
        </a>
      </div>
    </ItemWrapper>
  );
}

SearchResultsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string,
  downloadTitle: PropTypes.string,
  downloadURL: PropTypes.string,
  description: PropTypes.string.isRequired,
  descriptionLength: PropTypes.number,
  location: PropTypes.object,
  theme: PropTypes.array,
  url: PropTypes.string,
  searchTerm: PropTypes.string
};

export default SearchResultsListItem;
