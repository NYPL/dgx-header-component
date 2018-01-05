// Import React libraries
import React from 'react';
import PropTypes from 'prop-types';
import {
  SearchIcon,
  RightWedgeIcon,
} from '@nypl/dgx-svg-icons';
// GA Utility Library
import utils from '../../utils/utils.js';
import gaConfig from '../../gaConfig.js';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      searchOption: 'catalog',
      placeholder: this.props.placeholder,
      placeholderAnimation: null,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchOptionChange = this.handleSearchOptionChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */
  setCatalogUrl(searchString, catalogBaseUrl) {
    const catalogUrl = catalogBaseUrl || '//www.nypl.org/search/apachesolr_search/';

    if (searchString) {
      return catalogUrl + encodeURIComponent(searchString) + this.generateQueriesForGA();
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
   * setEncoreUrl(searchInput, baseUrl, language, scopeString)
   * Returns the final URL for encore search which,
   * is first encoded, then concatenated by the
   * base encore root url. An optional scope and
   * language may be concatenated as well.
   */
  setEncoreUrl(searchInput, baseUrl, language, scopeString) {
    const searchTerm = this.encoreEncodeSearchString(searchInput);
    const rootUrl = baseUrl || 'https://browse.nypl.org/iii/encore/search/';
    const defaultLang = (language) ? `?lang=${language}` : '';
    let finalEncoreUrl;

    if (searchTerm) {
      finalEncoreUrl = this.encoreAddScope(rootUrl, searchTerm, scopeString) + defaultLang +
        this.generateQueriesForGA();
    }

    return finalEncoreUrl;
  }

  /**
   * generateQueriesForGA()
   * Generates the queries to be added to the URL of Encore search page. It is for the scripts
   * of GA on Encore to tell where the search request is coming from.
   *
   * @return {string} the queries to add to the URL for Encore search.
   */
  generateQueriesForGA() {
    // the time stamp here is for the purpose of telling when this search query is made.
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp) ? `&searched_from=header_search&timestamp=${currentTimeStamp}` :
      '&searched_from=header_search';
  }

  /**
  * encoreAddScope(baseUrl, searchString, scopeString)
  * Enchances the encore url with a possible scope.
  * If no scope is set, adds the required string to
  * be returned as the final url.
  */
  encoreAddScope(baseUrl, searchString, scopeString) {
    return scopeString ?
    `${baseUrl}C__S${searchString}${scopeString}__Orightresult__U` :
      `${baseUrl}C__S${searchString}__Orightresult__U`;
  }

  /**
   * encoreEncodeSearchString(string)
   * base64_encoding_map includes special characters that need to be
   * encoded using base64 - these chars are "=","/", "\", "?"
   * character : base64 encoded
   */
  encoreEncodeSearchString(string) {
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
      if (this.props.type !== 'mobile') {
        this.submitSearchRequest(null);
      }
    }
  }

  handleSearchInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSearchOptionChange(event) {
    this.setState({ searchOption: event.target.value });
  }

  submitSearchRequest(searchType) {
    let requestUrl;
    let gaSearchLabel;
    const searchInputValue = this.state.searchInput;
    const searchOptionValue = this.state.searchOption;
    const encoreBaseUrl = 'https://browse.nypl.org/iii/encore/search/';
    const catalogBaseUrl = '//www.nypl.org/search/apachesolr_search/';
    // For GA "Search" Catalog, "Query Sent" Action Event
    // GASearchedRepo indicates which kind of search is sent
    let GASearchedRepo = 'Unknown';

    if (this.isSearchInputValid(searchInputValue)) {
      // Explicit checks for mobile search
      if (this.props.type === 'mobile') {
        if (searchType === 'catalog') {
          gaSearchLabel = 'Submit Catalog Search';
          GASearchedRepo = 'Encore';
          requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
        } else if (searchType === 'website') {
          gaSearchLabel = 'Submit Search';
          GASearchedRepo = 'DrupalSearch';
          requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
        }
      } else {
        // Explicit checks for desktop search
        if (searchOptionValue === 'catalog') {
          gaSearchLabel = 'Submit Catalog Search';
          GASearchedRepo = 'Encore';
          requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
        } else if (searchOptionValue === 'website') {
          gaSearchLabel = 'Submit Search';
          GASearchedRepo = 'DrupalSearch';
          requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
        }
      }

      // Safety check to ensure a proper requestUrl has been defined.
      if (gaSearchLabel && requestUrl) {
        // Fire GA event to track Search
        utils.trackHeader('Search', gaSearchLabel);

        // Set a dynamic value for custom dimension2
        gaConfig.customDimensions.dimension2 = GASearchedRepo;

        // Send GA "Search" Catalog, "Query Sent" Action Event
        utils.trackSearchQuerySend(
          searchInputValue,
          gaConfig.customDimensions,
          () => {
            // Go to the proper search page
            window.location.assign(requestUrl);
          }
        );
      }
    } else {
      event.preventDefault();
      // No search input has been entered
      this.setState({ placeholder: 'Please enter a search term.' });
      this.animationTimer();
      this.refs.headerSearchInputField.focus();
    }
  }

  renderSearchInputField() {
    const animationClass = this.getAnimationClass();
    return (
      <div className={`${this.props.className}-inputBox ${animationClass}`}>
        <label
          className={this.props.type === 'mobile' ? 'visuallyHidden' : ''}
          htmlFor={`${this.props.className}-searchInput`}
        >
          Enter Search Keyword
        </label>
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
        <SearchIcon ariaHidden />
      </div>
    );
  }

  renderMobileControls() {
    return (
      <div className={`${this.props.className}-mobileControls`}>
        <button
          aria-label="Submit Catalog Search"
          onClick={() => this.submitSearchRequest('catalog')}
        >
          <span className="label">CATALOG</span>
          <RightWedgeIcon ariaHidden />
        </button>
        <button
          aria-label="Submit NYPL Website Search"
          onClick={() => this.submitSearchRequest('website')}
        >
          <span className="label">NYPL.ORG</span>
          <RightWedgeIcon ariaHidden />
        </button>
      </div>
    );
  }

  renderDesktopControls() {
    return (
      <div className={`${this.props.className}-desktopControls`}>
        <input
          type="radio"
          name="catalogWebsiteSearch"
          id="catalogSearch"
          value="catalog"
          checked={this.state.searchOption === 'catalog'}
          onChange={this.handleSearchOptionChange}
        />
        <label htmlFor="catalogSearch" className="catalogOption">Search the Catalog</label>
        <input
          type="radio"
          name="catalogWebsiteSearch"
          id="websiteSearch"
          value="website"
          checked={this.state.searchOption === 'website'}
          onChange={this.handleSearchOptionChange}
        />
        <label htmlFor="websiteSearch" className="websiteOption">Search NYPL.org</label>
        <button type="submit" onClick={() => this.submitSearchRequest(null)}>
          <span className="visuallyHidden">Search</span>
          <SearchIcon ariaHidden fill="#FFF" />
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.className} role="dialog">
        <fieldset>
          <legend className={`${this.props.className}-legend visuallyHidden`}>
            {this.props.legendText}
          </legend>
          {this.renderSearchInputField()}
          {(this.props.type === 'mobile') ?
            this.renderMobileControls() : this.renderDesktopControls()
          }
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
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website',
};

export default SearchBox;
