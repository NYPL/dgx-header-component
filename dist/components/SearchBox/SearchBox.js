'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dgxSvgIcons = require('dgx-svg-icons');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// GA Utility Library


var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

    _this.state = {
      searchInput: '',
      searchOption: 'catalog',
      placeholder: _this.props.placeholder,
      placeholderAnimation: null
    };

    _this.handleSearchInputChange = _this.handleSearchInputChange.bind(_this);
    _this.handleSearchOptionChange = _this.handleSearchOptionChange.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    return _this;
  }

  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */


  _createClass(SearchBox, [{
    key: 'setCatalogUrl',
    value: function setCatalogUrl(searchString, catalogBaseUrl) {
      var catalogUrl = catalogBaseUrl || '//www.nypl.org/search/apachesolr_search/';

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

  }, {
    key: 'setEncoreUrl',
    value: function setEncoreUrl(searchInput, baseUrl, language, scopeString) {
      var searchTerm = this.encoreEncodeSearchString(searchInput);
      var rootUrl = baseUrl || 'https://browse.nypl.org/iii/encore/search/';
      var defaultLang = language ? '?lang=' + language : '';
      var finalEncoreUrl = void 0;

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

  }, {
    key: 'encoreAddScope',
    value: function encoreAddScope(baseUrl, searchString, scopeString) {
      return scopeString ? baseUrl + 'C__S' + searchString + scopeString + '__Orightresult__U' : baseUrl + 'C__S' + searchString + '__Orightresult__U';
    }

    /**
     * encoreEncodeSearchString(string)
     * base64_encoding_map includes special characters that need to be
     * encoded using base64 - these chars are "=","/", "\", "?"
     * character : base64 encoded
     */

  }, {
    key: 'encoreEncodeSearchString',
    value: function encoreEncodeSearchString(string) {
      var base64EncMap = {
        '=': 'PQ==',
        '/': 'Lw==',
        '\\': 'XA==',
        '?': 'Pw=='
      };
      var encodedString = string;
      var charRegExString = void 0;
      var base64Regex = void 0;

      Object.keys(base64EncMap).forEach(function (specialChar) {
        charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
        base64Regex = new RegExp(charRegExString, 'g');
        encodedString = encodedString.replace(base64Regex, base64EncMap[specialChar]);
      });

      return encodedString;
    }
  }, {
    key: 'animationTimer',
    value: function animationTimer() {
      var _this2 = this;

      var frame = 0;
      // Decide which CSS animation is going to perform
      // by adding different classes to the element.
      // It is based on if it is the first time the validation to be triggered.
      if (this.state.placeholder === 'Please enter a search term.') {
        this.setState({ placeholderAnimation: 'sequential' });
      } else {
        this.setState({ placeholderAnimation: 'initial' });
      }

      var animation = setInterval(function () {
        frame++;
        // Remove the class to stop the animation after 0.1s
        if (frame > 1) {
          clearInterval(animation);
          _this2.setState({ placeholderAnimation: null });
        }
      }, 100);
    }
  }, {
    key: 'getAnimationClass',
    value: function getAnimationClass() {
      if (this.state.placeholderAnimation === 'initial') {
        return 'keywords-pulse-fade-in';
      }
      if (this.state.placeholderAnimation === 'sequential') {
        return 'keywords-pulse';
      }
      return '';
    }
  }, {
    key: 'isSearchInputValid',
    value: function isSearchInputValid(input) {
      return input !== '';
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (e.key === 'Enter' || e.charCode === 13) {
        if (this.props.type !== 'mobile') {
          this.submitSearchRequest(null);
        }
      }
    }
  }, {
    key: 'handleSearchInputChange',
    value: function handleSearchInputChange(event) {
      this.setState({ searchInput: event.target.value });
    }
  }, {
    key: 'handleSearchOptionChange',
    value: function handleSearchOptionChange(event) {
      this.setState({ searchOption: event.target.value });
    }
  }, {
    key: 'submitSearchRequest',
    value: function submitSearchRequest(searchType) {
      var requestUrl = void 0;
      var gaSearchLabel = void 0;
      var searchInputValue = this.state.searchInput;
      var searchOptionValue = this.state.searchOption;
      var encoreBaseUrl = 'https://browse.nypl.org/iii/encore/search/';
      var catalogBaseUrl = '//www.nypl.org/search/apachesolr_search/';

      if (this.isSearchInputValid(searchInputValue)) {
        // Explicit checks for mobile search
        if (this.props.type === 'mobile') {
          if (searchType === 'catalog') {
            gaSearchLabel = 'Submit Catalog Search';
            requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
          } else if (searchType === 'website') {
            gaSearchLabel = 'Submit Search';
            requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
          }
        } else {
          // Explicit checks for desktop search
          if (searchOptionValue === 'catalog') {
            gaSearchLabel = 'Submit Catalog Search';
            requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
          } else if (searchOptionValue === 'website') {
            gaSearchLabel = 'Submit Search';
            requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
          }
        }

        // Safety check to ensure a proper requestUrl has been defined.
        if (gaSearchLabel && requestUrl) {
          // Fire GA event to track Search
          _utils2.default.trackHeader('Search', gaSearchLabel);

          // A second GA for parsing the queries easier
          _utils2.default.trackHeaderSiteSearch('pageview', '/analytics/search?analytics_search_q=' + searchInputValue + '&c=' + searchOptionValue);

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
  }, {
    key: 'renderSearchInputField',
    value: function renderSearchInputField() {
      var animationClass = this.getAnimationClass();
      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-inputBox ' + animationClass },
        _react2.default.createElement(
          'label',
          {
            className: this.props.type === 'mobile' ? 'visuallyHidden' : '',
            htmlFor: this.props.className + '-searchInput'
          },
          'Enter Search Keyword'
        ),
        _react2.default.createElement('input', {
          id: this.props.className + '-searchInput',
          type: 'text',
          ref: 'headerSearchInputField',
          placeholder: this.state.placeholder,
          value: this.state.searchInput,
          onChange: this.handleSearchInputChange,
          onKeyPress: this.handleKeyPress,
          required: true,
          'aria-required': 'true',
          autoComplete: 'off',
          autoFocus: true
        }),
        _react2.default.createElement('span', { className: 'nypl-icon-magnifier-thin icon', 'aria-hidden': 'true' })
      );
    }
  }, {
    key: 'renderMobileControls',
    value: function renderMobileControls() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-mobileControls' },
        _react2.default.createElement(
          'button',
          {
            'aria-label': 'Submit Catalog Search',
            onClick: function onClick() {
              return _this3.submitSearchRequest('catalog');
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'label' },
            'CATALOG'
          ),
          _react2.default.createElement('span', { className: 'nypl-icon-wedge-right icon' })
        ),
        _react2.default.createElement(
          'button',
          {
            'aria-label': 'Submit NYPL Website Search',
            onClick: function onClick() {
              return _this3.submitSearchRequest('website');
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'label' },
            'NYPL.ORG'
          ),
          _react2.default.createElement('span', { className: 'nypl-icon-wedge-right icon' })
        )
      );
    }
  }, {
    key: 'renderDesktopControls',
    value: function renderDesktopControls() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-desktopControls' },
        _react2.default.createElement('input', {
          type: 'radio',
          name: 'catalogSearch',
          id: 'catalogSearch',
          value: 'catalog',
          checked: this.state.searchOption === 'catalog',
          onChange: this.handleSearchOptionChange
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'catalogSearch', className: 'catalogOption' },
          'Search the Catalog'
        ),
        _react2.default.createElement('input', {
          type: 'radio',
          name: 'websiteSearch',
          id: 'websiteSearch',
          value: 'website',
          checked: this.state.searchOption === 'website',
          onChange: this.handleSearchOptionChange
        }),
        _react2.default.createElement(
          'label',
          { htmlFor: 'websiteSearch', className: 'websiteOption' },
          'Search NYPL.org'
        ),
        _react2.default.createElement(
          'button',
          { type: 'submit', onClick: function onClick() {
              return _this4.submitSearchRequest(null);
            } },
          _react2.default.createElement(
            'span',
            { className: 'visuallyHidden' },
            'Search'
          ),
          _react2.default.createElement(_dgxSvgIcons.SearchIcon, { ariaHidden: true, fill: '#FFF' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            'legend',
            { className: this.props.className + '-legend visuallyHidden' },
            this.props.legendText
          ),
          this.renderSearchInputField(),
          this.props.type === 'mobile' ? this.renderMobileControls() : this.renderDesktopControls()
        )
      );
    }
  }]);

  return SearchBox;
}(_react2.default.Component);

SearchBox.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  legendText: _propTypes2.default.string
};

SearchBox.defaultProps = {
  lang: 'en',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website'
};

exports.default = SearchBox;
module.exports = exports['default'];