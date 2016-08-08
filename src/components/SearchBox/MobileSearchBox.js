// Import React libraries
import React from 'react';
// GA Utility Library
import utils from '../../utils/utils.js';

class MobileSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      placeholder: this.props.placeholder,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
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

  isSearchInputValid(input) {
    return input !== '';
  }

  handleSearchInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  submitSearchRequest(searchType) {
    event.preventDefault();
    let requestUrl;
    let gaSearchLabel;
    const searchInputValue = this.state.searchInput;
    const encoreBaseUrl = 'http://browse.nypl.org/iii/encore/search/';
    const catalogBaseUrl = '//www.nypl.org/search/apachesolr_search/';

    if (this.isSearchInputValid(searchInputValue)) {
      if (searchType === 'catalog') {
        gaSearchLabel = 'Submit Catalog Search';
        requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
      } else if (searchType === 'website') {
        gaSearchLabel = 'Submit Search';
        requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
      } else {
        // TODO: Add logic to determine search based on radio controls
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
      // No search input has been entered
      this.setState({ placeholder: 'Please enter a search term.' });
      this.refs.headerSearchInputField.focus();
    }
  }

  renderSearchInputField() {
    return (
      <div className={`${this.props.className}-inputBox`}>
        <label
          className="visuallyHidden"
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
      <div></div>
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
            this.renderMobileControls() : null
          }
        </fieldset>
      </div>
    );
  }
}

MobileSearchBox.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  legendText: React.PropTypes.string,
};

MobileSearchBox.defaultProps = {
  lang: 'en',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website',
};

export default MobileSearchBox;
