// Import React libraries
import React from 'react';
import { SearchIcon } from 'dgx-svg-icons';
// GA Utility Library
import utils from '../../utils/utils.js';

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
  }

  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */
  setCatalogUrl(searchString, catalogBaseUrl) {
    const catalogUrl = catalogBaseUrl || '//www.nypl.org/search/apachesolr_search/';

    if (searchString) {
      return catalogUrl + encodeURIComponent(searchString);
    }
    return null;
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
    const rootUrl = baseUrl || 'http://browse.nypl.org/iii/encore/search/';
    const defaultLang = (language) ? `?lang=${language}` : '';
    let finalEncoreUrl;

    if (searchTerm) {
      finalEncoreUrl = this.encoreAddScope(rootUrl, searchTerm, scopeString) + defaultLang;
    }

    return finalEncoreUrl;
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

  getAnimationClass() {
    if (this.state.placeholderAnimation === 'initial') {
      return 'keywords-pulse-fade-in';
    }
    if (this.state.placeholderAnimation === 'sequential') {
      return 'keywords-pulse';
    }
    return '';
  }

  isSearchInputValid(input) {
    return input !== '';
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
    const encoreBaseUrl = 'http://browse.nypl.org/iii/encore/search/';
    const catalogBaseUrl = '//www.nypl.org/search/apachesolr_search/';

    if (this.isSearchInputValid(searchInputValue)) {
      if (searchType === 'catalog' || searchOptionValue === 'catalog') {
        gaSearchLabel = 'Submit Catalog Search';
        requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
      } else if (searchType === 'website' || searchOptionValue === 'website') {
        gaSearchLabel = 'Submit Search';
        requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
      }

      // requestUrl && gaSearchLabel are now defined
      // either by mobileControls or desktopControls
      if (gaSearchLabel && requestUrl) {
        // Fire GA event to track Search
        utils._trackHeader('Search', gaSearchLabel);
        // Go to the proper search page
        window.location.assign(requestUrl);
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
          required
          aria-required="true"
          autoComplete="off"
          autoFocus
        />
        <span className="nypl-icon-magnifier-thin icon" aria-hidden="true"></span>
      </div>
    );
  }

  renderMobileControls() {
    return (
      <div className={`${this.props.className}-mobileControls`}>
        <button
          type="submit"
          aria-label="Submit Catalog Search"
          onClick={() => this.submitSearchRequest('catalog')}
        >
          <span className="label">CATALOG</span>
          <span className="nypl-icon-wedge-right icon"></span>
        </button>
        <button
          type="submit"
          aria-label="Submit NYPL Website Search"
          onClick={() => this.submitSearchRequest('website')}
        >
          <span className="label">NYPL.ORG</span>
          <span className="nypl-icon-wedge-right icon"></span>
        </button>
      </div>
    );
  }

  renderDesktopControls() {
    return (
      <div className={`${this.props.className}-desktopControls`}>
        <input
          type="radio"
          name="catalogSearch"
          id="catalogSearch"
          value="catalog"
          checked={this.state.searchOption === 'catalog'}
          onChange={this.handleSearchOptionChange}
        />
        <label htmlFor="catalogSearch" className="catalogOption">Search the Catalog</label>
        <input
          type="radio"
          name="websiteSearch"
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
  lang: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  legendText: React.PropTypes.string,
};

SearchBox.defaultProps = {
  lang: 'en',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website',
};

export default SearchBox;
