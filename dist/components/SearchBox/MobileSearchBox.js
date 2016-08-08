// Import React libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// GA Utility Library

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var MobileSearchBox = (function (_React$Component) {
  _inherits(MobileSearchBox, _React$Component);

  function MobileSearchBox(props) {
    _classCallCheck(this, MobileSearchBox);

    _get(Object.getPrototypeOf(MobileSearchBox.prototype), 'constructor', this).call(this, props);

    this.state = {
      searchInput: '',
      placeholder: this.props.placeholder
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */

  _createClass(MobileSearchBox, [{
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
      var rootUrl = baseUrl || 'http://browse.nypl.org/iii/encore/search/';
      var defaultLang = language ? '?lang=' + language : '';
      var finalEncoreUrl = undefined;

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
      var charRegExString = undefined;
      var base64Regex = undefined;

      Object.keys(base64EncMap).forEach(function (specialChar) {
        charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
        base64Regex = new RegExp(charRegExString, 'g');
        encodedString = encodedString.replace(base64Regex, base64EncMap[specialChar]);
      });

      return encodedString;
    }
  }, {
    key: 'isSearchInputValid',
    value: function isSearchInputValid(input) {
      return input !== '';
    }
  }, {
    key: 'handleSearchInputChange',
    value: function handleSearchInputChange(event) {
      this.setState({ searchInput: event.target.value });
    }
  }, {
    key: 'submitSearchRequest',
    value: function submitSearchRequest(searchType) {
      event.preventDefault();
      var requestUrl = undefined;
      var gaSearchLabel = undefined;
      var searchInputValue = this.state.searchInput;
      var encoreBaseUrl = 'http://browse.nypl.org/iii/encore/search/';
      var catalogBaseUrl = '//www.nypl.org/search/apachesolr_search/';

      if (this.isSearchInputValid(searchInputValue)) {
        if (searchType === 'catalog') {
          gaSearchLabel = 'Submit Catalog Search';
          requestUrl = this.setEncoreUrl(searchInputValue, encoreBaseUrl, 'eng');
        } else if (searchType === 'website') {
          gaSearchLabel = 'Submit Search';
          requestUrl = this.setCatalogUrl(searchInputValue, catalogBaseUrl);
        } else {}
        // TODO: Add logic to determine search based on radio controls

        // requestUrl && gaSearchLabel are now defined
        // either by mobileControls or desktopControls
        if (gaSearchLabel && requestUrl) {
          // Fire GA event to track Search
          _utilsUtilsJs2['default']._trackHeader('Search', gaSearchLabel);
          // Go to the proper search page
          window.location.assign(requestUrl);
        }
      } else {
        // No search input has been entered
        this.setState({ placeholder: 'Please enter a search term.' });
        this.refs.headerSearchInputField.focus();
      }
    }
  }, {
    key: 'renderSearchInputField',
    value: function renderSearchInputField() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className + '-inputBox' },
        _react2['default'].createElement(
          'label',
          {
            className: 'visuallyHidden',
            htmlFor: this.props.className + '-searchInput'
          },
          'Enter Search Keyword'
        ),
        _react2['default'].createElement('input', {
          id: this.props.className + '-searchInput',
          type: 'text',
          ref: 'headerSearchInputField',
          placeholder: this.state.placeholder,
          value: this.state.searchInput,
          onChange: this.handleSearchInputChange,
          required: true,
          'aria-required': 'true',
          autoComplete: 'off'
        }),
        _react2['default'].createElement('span', { className: 'nypl-icon-magnifier-thin icon', 'aria-hidden': 'true' })
      );
    }
  }, {
    key: 'renderMobileControls',
    value: function renderMobileControls() {
      var _this = this;

      return _react2['default'].createElement(
        'div',
        { className: this.props.className + '-mobileControls' },
        _react2['default'].createElement(
          'button',
          {
            type: 'submit',
            'aria-label': 'Submit Catalog Search',
            onClick: function () {
              return _this.submitSearchRequest('catalog');
            }
          },
          _react2['default'].createElement(
            'span',
            { className: 'label' },
            'CATALOG'
          ),
          _react2['default'].createElement('span', { className: 'nypl-icon-wedge-right icon' })
        ),
        _react2['default'].createElement(
          'button',
          {
            type: 'submit',
            'aria-label': 'Submit NYPL Website Search',
            onClick: function () {
              return _this.submitSearchRequest('website');
            }
          },
          _react2['default'].createElement(
            'span',
            { className: 'label' },
            'NYPL.ORG'
          ),
          _react2['default'].createElement('span', { className: 'nypl-icon-wedge-right icon' })
        )
      );
    }
  }, {
    key: 'renderDesktopControls',
    value: function renderDesktopControls() {
      return _react2['default'].createElement('div', null);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        _react2['default'].createElement(
          'fieldset',
          null,
          _react2['default'].createElement(
            'legend',
            { className: this.props.className + '-legend visuallyHidden' },
            this.props.legendText
          ),
          this.renderSearchInputField(),
          this.props.type === 'mobile' ? this.renderMobileControls() : null
        )
      );
    }
  }]);

  return MobileSearchBox;
})(_react2['default'].Component);

MobileSearchBox.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string.isRequired,
  type: _react2['default'].PropTypes.string,
  placeholder: _react2['default'].PropTypes.string,
  legendText: _react2['default'].PropTypes.string
};

MobileSearchBox.defaultProps = {
  lang: 'en',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website'
};

exports['default'] = MobileSearchBox;
module.exports = exports['default'];