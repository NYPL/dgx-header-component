// Import React libraries
import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchIcon,
  RightWedgeIcon,
} from '@nypl/dgx-svg-icons';
// GA Utility Library
import utils from '../../utils/utils';
import gaConfig from '../../gaConfig';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      searchOption: 'circulatingCatalog',
      placeholder: this.props.placeholder,
      placeholderAnimation: null,
      isSearchRequested: false,
      isGAResponseReceived: false,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchOptionChange = this.handleSearchOptionChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /**
   * setNYPLSearchUrl(searchString, websiteSearchBaseUrl)
   * Returns the final URL for the catalog search.
   */
  setNYPLSearchUrl(searchString, websiteSearchBaseUrl) {
    const catalogUrl = websiteSearchBaseUrl || '//www.nypl.org/search/';

    if (searchString) {
      return catalogUrl + encodeURIComponent(searchString) + this.generateQueriesForGA();
    }
    return null;
  }

  /**
   * setResearchCatalogUrl(searchString)
   * Returns the final URL for the Research Catalog search.
   */
   setResearchCatalogUrl(searchString) {
    const catalogUrl = '//www.nypl.org/research/research-catalog/search?q=';

    if (searchString) {
      return catalogUrl + encodeURIComponent(searchString) + "&" + this.generateQueriesForGA();
    }
    return null;
  }

  getAnimationClass() {
    if (this.state.placeholderAnimation === 'initial') {
      return 'keywords-pulse-fade-in';
    }
    if (this.state.placeholderAnimation === 'sequential') {
      return 'keywords-pulse';
    }
    return '';
  }

  /**
   * setCatalogUrl(searchInput, baseUrl, language, scopeString)
   * Returns the final URL for Encore search which,
   * is first encoded, then concatenated by the
   * base Encore root url. An optional scope and
   * language may be concatenated as well.
   * 2022 Note: Eventually, Encore will be replaced and this URL will
   * redirect the user. Until we get the new URL, we will keep this one.
   */
  setCatalogUrl(searchInput, baseUrl, language, scopeString) {
    const searchTerm = this.catalogEncodeSearchString(searchInput);
    const rootUrl = baseUrl || 'https://browse.nypl.org/iii/encore/search/';
    const defaultLang = (language) ? `&lang=${language}` : '';
    let finalCatalogUrl;

    if (searchTerm) {
      finalCatalogUrl = this.catalogAddScope(rootUrl, searchTerm, scopeString) +
        this.generateQueriesForGA() + defaultLang;
    }

    return finalCatalogUrl;
  }

  /**
   * generateQueriesForGA()
   * Generates the queries to be added to the URL of Encore Catalogsearch page.
   * It is for the scripts of GA on Encore to tell where the search request
   * is coming from.
   *
   * @return {string} the queries to add to the URL for Encore Catalog search.
   */
  generateQueriesForGA() {
    // the time stamp here is for the purpose of telling when this search query is made.
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp) ? `?searched_from=header_search&timestamp=${currentTimeStamp}` :
      '?searched_from=header_search';
  }

  /**
  * catalogAddScope(baseUrl, searchString, scopeString)
  * Enchances the encore catalog url with a possible scope.
  * If no scope is set, adds the required string to
  * be returned as the final url.
  */
  catalogAddScope(baseUrl, searchString, scopeString) {
    return scopeString ?
    `${baseUrl}C__S${searchString}${scopeString}__Orightresult__U` :
      `${baseUrl}C__S${searchString}__Orightresult__U`;
  }

  /**
   * catalogEncodeSearchString(string)
   * base64_encoding_map includes special characters that need to be
   * encoded using base64 - these chars are "=","/", "\", "?"
   * character : base64 encoded
   */
  catalogEncodeSearchString(string) {
    const base64EncMap = {
      '=': 'PQ==',
      '/': 'Lw==',
      '\\': 'XA==',
      '?': 'Pw==',
    };
    let encodedString = string;
    let charRegExString;
    let base64Regex;

    Object.keys(base64EncMap).forEach((specialChar) => {
      charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
      base64Regex = new RegExp(charRegExString, 'g');
      encodedString = encodedString.replace(base64Regex, base64EncMap[specialChar]);
    });

    return encodedString;
  }

  animationTimer() {
    let frame = 0;
    // Decide which CSS animation is going to perform
    // by adding different classes to the element.
    // It is based on if it is the first time the validation to be triggered.
    if (this.state.placeholder === 'Please enter a search term.') {
      this.setState({ placeholderAnimation: 'sequential' });
    } else {
      this.setState({ placeholderAnimation: 'initial' });
    }

    const animation = setInterval(() => {
      frame ++;
      // Remove the class to stop the animation after 0.1s
      if (frame > 1) {
        clearInterval(animation);
        this.setState({ placeholderAnimation: null });
      }
    }, 100);
  }

  isSearchInputValid(input) {
    return input !== '';
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' || e.charCode === 13) {
      this.submitSearchRequest();
    }
  }

  handleSearchInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSearchOptionChange(event) {
    this.setState({ searchOption: event.target.value });
  }

  submitSearchRequest() {
    let requestUrl;
    let gaSearchLabel;
    const searchInputValue = this.state.searchInput;
    const searchOptionValue = this.state.searchOption;
    const catalogBaseUrl = 'https://browse.nypl.org/iii/encore/search/';
    let websiteSearchBaseUrl;

    try {
      if (appEnv === 'development') {
        websiteSearchBaseUrl = '//dev-www.nypl.org/search/';
      } else if (appEnv === 'qa') {
        websiteSearchBaseUrl = '//qa-www.nypl.org/search/';
      } else {
        websiteSearchBaseUrl = '//www.nypl.org/search/';
      };
    }
    catch(err) {
      // For the header markup and static assets import, appEnv will not be set so it will always get caught here.
      // One example is the Drupal import.
      websiteSearchBaseUrl = '//www.nypl.org/search/';
    }

    // For GA "Search" Catalog, "Query Sent" Action Event
    // GASearchedRepo indicates which kind of search is sent
    let GASearchedRepo = 'Unknown';
    const isSearchRequested = this.state.isSearchRequested;
    const isGAResponseReceived = this.state.isGAResponseReceived;

    if (this.isSearchInputValid(searchInputValue)) {
      if (searchOptionValue === 'circulatingCatalog') {
        gaSearchLabel = 'Submit Circulating Catalog Search';
        GASearchedRepo = 'Circulating Catalog';
        requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl, 'eng');
      } else if (searchOptionValue === 'researchCatalog') {
        gaSearchLabel = 'Submit Research Catalog Search';
        GASearchedRepo = 'Research Catalog';
        requestUrl = this.setResearchCatalogUrl(searchInputValue);
      } else if (searchOptionValue === 'website') {
        gaSearchLabel = 'Submit Search';
        GASearchedRepo = 'DrupalSearch';
        requestUrl = this.setNYPLSearchUrl(searchInputValue, websiteSearchBaseUrl);
      }

      // Safety check to ensure a proper requestUrl has been defined.
      if (gaSearchLabel && requestUrl) {
        // Fire GA event to track Search
        utils.trackHeader('Search', gaSearchLabel);

        // Set a dynamic value for custom dimension2
        gaConfig.customDimensions.dimension2 = GASearchedRepo;

        // 3 phase to handle GA event. We need to prevent sending extra GA events after the search
        // request is made.
        if (isSearchRequested && !isGAResponseReceived) {
          return false;
        }

        if (isSearchRequested && isGAResponseReceived) {
          window.location.assign(requestUrl);

          return true;
        }

        if (!isSearchRequested && !isGAResponseReceived) {
          this.setState({ isSearchRequested: true });
          // Send GA "Search" Catalog, "Query Sent" Action Event
          utils.trackSearchQuerySend(
            searchInputValue,
            gaConfig.customDimensions,
            () => {
              this.setState({ isGAResponseReceived: true });
              // Go to the proper search page
              window.location.assign(requestUrl);
            }
          );
        }
      }
    } else {
      event.preventDefault();
      // No search input has been entered
      this.setState({ placeholder: 'Please enter a search term.' });
      this.animationTimer();
      this.refs.headerSearchInputField.focus();
    }

    return true;
  }

  renderSearchInputField() {
    const animationClass = this.getAnimationClass();
    return (
      <div className={`${this.props.className}-inputBox ${animationClass}`}>
        <label htmlFor={`${this.props.className}-searchInput`}>
          Enter Search Keyword
        </label>
        <div>
          <input
            id={`${this.props.className}-searchInput`}
            type="text"
            ref="headerSearchInputField"
            placeholder={this.state.placeholder}
            value={this.state.searchInput}
            onChange={this.handleSearchInputChange}
            onKeyPress={this.handleKeyPress}
            required
            aria-required="true"
            autoComplete="off"
            autoFocus
          />
          {this.props.type === 'mobile' ? (
              <button id="desktop-submit-search-btn" type="submit" onClick={() => this.submitSearchRequest()}>
                <span className="visuallyHidden">Search</span>
                <SearchIcon ariaHidden fill="#FFF" focusable={false} />
              </button>
            ) : null
          }
        </div>
      </div>
    );
  }

  renderDesktopControls() {
    return (
      <div className={`${this.props.className}-desktopControls`}>
        <div>
          <input
            type="radio"
            name="catalogWebsiteSearch"
            id="circulatingCatalogSearch"
            value="circulatingCatalog"
            checked={this.state.searchOption === 'circulatingCatalog'}
            onChange={this.handleSearchOptionChange}
          />
          <label htmlFor="circulatingCatalogSearch" className="catalogOption">Search books, music and movies</label>
        </div>
        <div>
          <input
            type="radio"
            name="catalogWebsiteSearch"
            id="researchCatalogSearch"
            value="researchCatalog"
            checked={this.state.searchOption === 'researchCatalog'}
            onChange={this.handleSearchOptionChange}
          />
          <label htmlFor="researchCatalogSearch" className="catalogOption">Search the research catalog</label>
        </div>
        <div>
          <input
            type="radio"
            name="catalogWebsiteSearch"
            id="websiteSearch"
            value="website"
            checked={this.state.searchOption === 'website'}
            onChange={this.handleSearchOptionChange}
          />
          <label htmlFor="websiteSearch" className="websiteOption">Search the library website</label>
        </div>
        {this.props.type !== 'mobile' ? (
          <button id="desktop-submit-search-btn" type="submit" onClick={() => this.submitSearchRequest()}>
            <span className="visuallyHidden">Search</span>
            <SearchIcon ariaHidden fill="#FFF" focusable={false} />
          </button>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div aria-label="Search form dropdown" className={this.props.className} role="dialog">
        <fieldset>
          <legend className={`${this.props.className}-legend visuallyHidden`}>
            {this.props.legendText}
          </legend>
          {this.renderSearchInputField()}
          {this.renderDesktopControls()}
        </fieldset>
      </div>
    );
  }
}

SearchBox.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  legendText: PropTypes.string,
};

SearchBox.defaultProps = {
  lang: 'en',
  type: '',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website',
};

export default SearchBox;
