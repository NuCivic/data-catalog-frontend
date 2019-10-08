import React, { useEffect, useState } from 'react';
import { Link } from "gatsby";
import Loader from "react-loader-advanced";
import LoadingSpin from "react-loading-spin";
import { PageHeader } from "interra-data-catalog-components";
import { Select, FormLabel } from "@cmsgov/design-system-core";
// import FacetList from "../../components/FacetList";
// import search from "../../services/search";
// import backend from "../../services/backend";
import Layout from "../../../components/Layout";
// import Pagination from "react-js-pagination";
// import StyledPagination from "../../theme/pagination.js"
import SearchInput from "../SearchInput";
import Wrapper from "./Wrapper";
import links from "../../../assets/menu.json";
import { ToggleBlock, withSearch, NavBar, SearchList } from '@civicactions/data-catalog-components';
// import SearchFacets from '../../components/SearchParts/SearchFacets';

const DatasetSearch = ({
  path,
  facets,
  items,
  location,
  searchParams,
  searchFunctions,
  searchLink,
  facetsResults,
  selectedFacets,
  total,
  options
}) => {
  const [hasWindow, checkForWindow] = useState(false);
  const [show, toggleShow] = useState(true);
  useEffect(() => {
    if(window !== undefined) {
      checkForWindow(true);
    }
    if(items !== undefined) {
      toggleShow(false);
    }
  }, [items]);
  const resultsMessage = searchParams.q.length ? `${total} datasets found for ${searchParams.q}` : `${total} datasets found`;
  let facetTypes = [];
  for(let facet in facets) {
    facetTypes.push(facet);
  }
  return(
    <Layout path={path} title="Search">
      <NavBar
        navItems={links.main.map((item) => (<Link activeClassName="active" to={item.url}>{item.label}</Link>))}
        customClasses="container-fluid main-navigation"  
      />
      <Wrapper className="search-page containter-fluid m-5">
        <div className="row">
          <PageHeader title="Datasets" />
        </div>
        <div className="row">
          <div className="results-list col-md-8 col-sm-12 p-5">
            <SearchInput
              label="Dataset Search Filter"
              labelid="dataset_search_filter_label"
              labelClassName="sr-only"
              id="search"
              ariaLabel="Dataset Search Filter"
              name="dataset_search_filter"
              placeholder="Type your search term here...e.g. physician quality, medicare spending..."
              onChange={(event) => searchFunctions.termChange(event)}
            />
            {hasWindow &&
              <Loader hideContentOnLoad backgroundStyle={{backgroundColor: "#f9fafb"}} foregroundStyle={{backgroundColor: "#f9fafb"}} show={show} message={<LoadingSpin width={"3px"} primaryColor={"#007BBC"}/>}>
                {items &&
                  <SearchList message={resultsMessage}>
                    {items.map((item) => <li>{item.title}</li>)}
                  </SearchList>
                }
              </Loader>
            }
          </div>
          <div className="search-sidebar col-md-4 col-sm-12 p-5">
            <div className="search-sidebar-options ds-u-radius">
              <label className="search-sidebar-label" for="search_sort_change">Sort by</label>
              <select
                aria-label="Search Sort Change"
                defaultValue="1"
                name="search_sort_change"
                className="form-control input-sm"
                onChange={(event) => searchFunctions.sort(event)}
              >
                {options.sort.map((sortOption, index) => {
                  return (<option key={index} value={sortOption.value}>{sortOption.title}</option>);
                })}
              </select>
            </div>
            <div className="search-sidebar-options ds-u-radius">
              {items &&
                facetTypes.map((facetKey) => {
                  const filteredFacetList = searchFunctions.filteredFacets(facetKey);
                  const choices = filteredFacetList.map((item) => {
                    const selected = selectedFacets.filter((facet) => facet[1] === item[0]).length > 0 || false;
                    return(
                      <li key={item[0]}>
                        <label>
                          <input
                            name={facetKey}
                            value={item[0]}
                            type="checkbox"
                            checked={selected}
                            onChange={(event) => searchFunctions.facetChange(event)} />
                            {item[0]} ({item[1]})
                        </label>
                      </li>
                    )
                  })
                  return (
                    <ToggleBlock>
                      {choices}
                    </ToggleBlock>
                  );
                })
              }
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );

}

export default withSearch(DatasetSearch, 'http://dkan/api/v1/search-index.json');
