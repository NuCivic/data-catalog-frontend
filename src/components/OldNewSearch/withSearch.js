import React from 'react';
import queryString from "query-string";

import search from '../../services/search';
import backend from '../../services/backend';

export default function withSearch(
  OriginalComponent,
  searchEngineType,
  facets,
  defaultParams) {
  
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.searchEngineType = searchEngineType;
      this.sortOptions = [
        {
          title: "Relevance",
          value: "relevance"
        },
        {
          title: "Date",
          value: "date"
        },
        {
          title: "Alphabetical",
          value: "alpha"
        }
      ];
      this.defaultParams = defaultParams;
      this.state = {
        searchEngine: false,
        searchParams: this.defaultParams,
        selectedFacets: [],
        facetsResults: {theme: [], keyword: []},
        searchLink: ''
      }

      this.handleSortChange = this.handleSortChange.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleFacetChange = this.handleFacetChange.bind(this);
      this.setUrl = this.setUrl.bind(this);
    }

    componentDidMount() {
      const { searchEngine, searchParams } = this.state;
      const { pageContext } = this.props;
      if (pageContext.topic !== undefined) {
        this.state.selectedFacets.push(['Topics', pageContext.topic.theme]);
        this.setState({
          searchParams
        })
      }
      if(!searchEngine) {
        this.initSearch();
      }
      this.resolveParams()
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.location.search !== undefined && (this.props.location.search !== prevProps.location.search)) {
        this.resolveParams();
        this.fetchData();
      }
    }

    resolveParams() {
      const { location } = this.props;
      const { searchParams } = this.state;
     
      let selectedFacets = this.state.selectedFacets;
      const queryParams = queryString.parse(location.search);
      if(queryParams && queryParams.sort) {
        searchParams.sort = queryParams.sort;
      }
      if(queryParams && queryParams.page) {
        searchParams.page = parseInt(queryParams.page);
      }
      if(queryParams && queryParams.pageSize) {
        searchParams.pageSize = parseInt(queryParams.pageSize);
      }
      if(queryParams && queryParams.q) {
        searchParams.q = queryParams.q;
      }
      const facetKeys = Object.keys(facets)
      for (let [key, value] of Object.entries(queryParams)) {
        for(let i = 0; i < facetKeys.length; i++) {
          
          if(facetKeys[i].toLowerCase() === key) {
            const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
            let newFacetArray = value.split(',').map((param) => {
              return [capitalKey, param]
            });
            searchParams.facets = searchParams.facets.concat(newFacetArray);
            selectedFacets = selectedFacets.concat(newFacetArray)
          }
        }
      }

      this.setState({
        searchParams,
        selectedFacets
      })
    }

    render() {
      return <OriginalComponent
        {...this.props}
        items={this.state.items}
        facetsResults={this.state.facetsResults}
        message={this.state.message}
        total={this.state.total}
        searchParams={this.state.searchParams}
        selectedFacets={this.state.selectedFacets}
        searchLink={this.state.searchLink}
        options={{
          sort: this.sortOptions
        }}
        searchFunctions={{
          sort: this.handleSortChange,
          pageChange: this.handlePageChange,
          pageSizeChange: this.handlePageSizeChange,
          termChange: this.handleTermChange,
          facetChange: this.handleFacetChange
        }}
      />
    }

    /**
     * Called on page load. Inits search engine and plugs in params to search.
     */
    async initSearch() {
      const searchType = this.searchEngineType;
      const searchEngine = new search[searchType]();
      if (searchType === 'Lunr') {
        const { data } = await backend.get("/search-index.json");
        await searchEngine.init(data, facets);
      }
      this.setState({
        searchEngine
      });
      await this.fetchData(true);
    }

    /**
     * Fetches data based on state.
     */
    async fetchData(isInit = false) {
      const { searchParams, selectedFacets, searchEngine } = this.state;
      const r = await searchEngine.query(searchParams.q, selectedFacets, searchParams.pageSize, searchParams.page, searchParams.sort);
      let items = r.results;
      const facetsResults = r.facetsResults;
      const total = r.total;
      items = await this.normalize(items);
      await this.setState({
        items,
        total,
        facetsResults,
        show: false
      });
      if(!isInit) {
        await this.setUrl();
      }
    }

    /**
     * Maps search results to something like a familiar schema.
     */
    async normalize(items) {
      return items.map(x => {
        let item = {}
        item = {
          identifier: x.identifier,
          modified: x.modified,
          description: x.description,
          theme: x.theme,
          format: x.distribution,
          title: x.title,
          ref: `/dataset/${x.identifier}`,
        }
        if (x.hasOwnProperty('publisher') && x.publisher.hasOwnProperty('name')) {
          item.publisher = x.publisher.name
        }
        else {
          item.publisher = ' '
        }
        return item
      });
    }

    /**
     * Set new URL params after update.
     */
    setUrl() {
      const { searchParams } = this.state;
      let searchUrl = "/search";
      let newParams = {};
      const facetKeys = Object.keys(facets);
      const facetParams = searchParams.facets;

      if(searchParams.sort) {
        newParams['sort'] = searchParams.sort
      } 
      if(searchParams.page) {
        newParams['page'] = searchParams.page
      } 
      if(searchParams.pageSize) {
        newParams['pageSize'] = searchParams.pageSize
      } 
      if(searchParams.q) {
        newParams['q'] = searchParams.q
      } 

      for(let i = 0; i < facetKeys.length; i++) {
        const key = facetKeys[i];
        let paramString = '';
        const facetItems = facetParams.filter((param) => {
          if(param[0] === key) {
            return param[1];
          }
        })
        for(let x = 0; x < facetItems.length; x++) {
          paramString += `${facetItems[x][1]},`
        }
        paramString = paramString.slice(0, -1);
        if(paramString) {
          newParams[key.toLowerCase()] = paramString
        } 
      }
      const searchUrlParams = searchUrl + '?' + queryString.stringify(newParams)
      this.setState({searchLink: searchUrlParams})
      window.history.pushState({}, 'Search', `${searchUrlParams}`)
    }

    /**
     * Sort Results.
     */
    async handleSortChange(event) {
      const { searchParams } = this.state;
      const sort = event.target.value;
      searchParams.sort = sort;
      
      this.setState({searchParams});
      await this.fetchData();
    }

    /**
     * Pagination.
     */
    async handlePageChange(page) {
      const { searchParams } = this.state;
      searchParams.page = parseInt(page);
      this.setState({searchParams});
      await this.fetchData();
    }

    /**
     * Change Page Size.
     */
    async handlePageSizeChange(event) {
      const { searchParams } = this.state;
      const pageSize = parseInt(event.target.value);
      searchParams.pageSize = parseInt(pageSize);
      await this.fetchData();
    }

    /**
     * Search Term update.
     */
    async handleTermChange(event, reset) {
      const { searchParams } = this.state;
      let term;
      if (reset) {
        term = '';
      } else {
        term = event.target.value;
      }
      searchParams.q = term;
      this.setState({ searchParams });
      await this.fetchData();
    }

    /**
     * Facet updates.
     */
    async handleFacetChange(e) {
      const { selectedFacets, searchParams } = this.state;
      let facetType = e.target.name;
      let facetValue = e.target.value;
      const active = e.target.checked;

      let updatedFacets;
      if(selectedFacets !== undefined || selectedFacets.length < 0) {
        updatedFacets = selectedFacets;
      }

      if(active === true) {
        updatedFacets.push([facetType, facetValue]);
      } else {
        updatedFacets = selectedFacets.filter(facet => {
          return (facet[1] !== facetValue)
        });
      }

      searchParams.facets = updatedFacets
      await this.setState({
        searchParams,
        selectedFacets: updatedFacets,
      });
      await this.fetchData();
    }
  }
};
