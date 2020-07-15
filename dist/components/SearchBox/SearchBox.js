"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _gaConfig = _interopRequireDefault(require("../../gaConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SearchBox = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  var _super = _createSuper(SearchBox);

  function SearchBox(props) {
    var _this;

    _classCallCheck(this, SearchBox);

    _this = _super.call(this, props);
    _this.state = {
      searchInput: '',
      searchOption: 'catalog',
      placeholder: _this.props.placeholder,
      placeholderAnimation: null,
      isSearchRequested: false,
      isGAResponseReceived: false
    };
    _this.handleSearchInputChange = _this.handleSearchInputChange.bind(_assertThisInitialized(_this));
    _this.handleSearchOptionChange = _this.handleSearchOptionChange.bind(_assertThisInitialized(_this));
    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * setCatalogUrl(searchString, catalogBaseUrl)
   * Returns the final URL for the catalog search.
   */


  _createClass(SearchBox, [{
    key: "setCatalogUrl",
    value: function setCatalogUrl(searchString, catalogBaseUrl) {
      var catalogUrl = catalogBaseUrl || '//www.nypl.org/search/';

      if (searchString) {
        return catalogUrl + encodeURIComponent(searchString) + this.generateQueriesForGA();
      }

      return null;
    }
  }, {
    key: "getAnimationClass",
    value: function getAnimationClass() {
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

  }, {
    key: "setEncoreUrl",
    value: function setEncoreUrl(searchInput, baseUrl, language, scopeString) {
      var searchTerm = this.encoreEncodeSearchString(searchInput);
      var rootUrl = baseUrl || 'https://browse.nypl.org/iii/encore/search/';
      var defaultLang = language ? "&lang=".concat(language) : '';
      var finalEncoreUrl;

      if (searchTerm) {
        finalEncoreUrl = this.encoreAddScope(rootUrl, searchTerm, scopeString) + this.generateQueriesForGA() + defaultLang;
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

  }, {
    key: "generateQueriesForGA",
    value: function generateQueriesForGA() {
      // the time stamp here is for the purpose of telling when this search query is made.
      var currentTimeStamp = new Date().getTime();
      return currentTimeStamp ? "?searched_from=header_search&timestamp=".concat(currentTimeStamp) : '?searched_from=header_search';
    }
    /**
    * encoreAddScope(baseUrl, searchString, scopeString)
    * Enchances the encore url with a possible scope.
    * If no scope is set, adds the required string to
    * be returned as the final url.
    */

  }, {
    key: "encoreAddScope",
    value: function encoreAddScope(baseUrl, searchString, scopeString) {
      return scopeString ? "".concat(baseUrl, "C__S").concat(searchString).concat(scopeString, "__Orightresult__U") : "".concat(baseUrl, "C__S").concat(searchString, "__Orightresult__U");
    }
    /**
     * encoreEncodeSearchString(string)
     * base64_encoding_map includes special characters that need to be
     * encoded using base64 - these chars are "=","/", "\", "?"
     * character : base64 encoded
     */

  }, {
    key: "encoreEncodeSearchString",
    value: function encoreEncodeSearchString(string) {
      var base64EncMap = {
        '=': 'PQ==',
        '/': 'Lw==',
        '\\': 'XA==',
        '?': 'Pw=='
      };
      var encodedString = string;
      var charRegExString;
      var base64Regex;
      Object.keys(base64EncMap).forEach(function (specialChar) {
        charRegExString = specialChar.replace(/([\.\*\+\?\^\=\!\:\$\{\}\(\)\|\[\]\/\\])/g, '\\$1');
        base64Regex = new RegExp(charRegExString, 'g');
        encodedString = encodedString.replace(base64Regex, base64EncMap[specialChar]);
      });
      return encodedString;
    }
  }, {
    key: "animationTimer",
    value: function animationTimer() {
      var _this2 = this;

      var frame = 0; // Decide which CSS animation is going to perform
      // by adding different classes to the element.
      // It is based on if it is the first time the validation to be triggered.

      if (this.state.placeholder === 'Please enter a search term.') {
        this.setState({
          placeholderAnimation: 'sequential'
        });
      } else {
        this.setState({
          placeholderAnimation: 'initial'
        });
      }

      var animation = setInterval(function () {
        frame++; // Remove the class to stop the animation after 0.1s

        if (frame > 1) {
          clearInterval(animation);

          _this2.setState({
            placeholderAnimation: null
          });
        }
      }, 100);
    }
  }, {
    key: "isSearchInputValid",
    value: function isSearchInputValid(input) {
      return input !== '';
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
      if (e.key === 'Enter' || e.charCode === 13) {
        if (this.props.type !== 'mobile') {
          this.submitSearchRequest(null);
        }
      }
    }
  }, {
    key: "handleSearchInputChange",
    value: function handleSearchInputChange(event) {
      this.setState({
        searchInput: event.target.value
      });
    }
  }, {
    key: "handleSearchOptionChange",
    value: function handleSearchOptionChange(event) {
      this.setState({
        searchOption: event.target.value
      });
    }
  }, {
    key: "submitSearchRequest",
    value: function submitSearchRequest(searchType) {
      var _this3 = this;

      var requestUrl;
      var gaSearchLabel;
      var searchInputValue = this.state.searchInput;
      var searchOptionValue = this.state.searchOption;
      var encoreBaseUrl = 'https://browse.nypl.org/iii/encore/search/';
      var catalogBaseUrl;

      try {
        if (appEnv === 'development') {
          catalogBaseUrl = '//dev-www.nypl.org/search/';
        } else if (appEnv === 'qa') {
          catalogBaseUrl = '//qa-www.nypl.org/search/';
        } else {
          catalogBaseUrl = '//www.nypl.org/search/';
        }

        ;
      } catch (err) {
        // For the header markup and static assets import, appEnv will not be set so it will always get caught here.
        // One example is the Drupal import.
        catalogBaseUrl = '//www.nypl.org/search/';
      } // For GA "Search" Catalog, "Query Sent" Action Event
      // GASearchedRepo indicates which kind of search is sent


      var GASearchedRepo = 'Unknown';
      var isSearchRequested = this.state.isSearchRequested;
      var isGAResponseReceived = this.state.isGAResponseReceived;

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
        } // Safety check to ensure a proper requestUrl has been defined.


        if (gaSearchLabel && requestUrl) {
          // Fire GA event to track Search
          _utils.default.trackHeader('Search', gaSearchLabel); // Set a dynamic value for custom dimension2


          _gaConfig.default.customDimensions.dimension2 = GASearchedRepo; // 3 phase to handle GA event. We need to prevent sending extra GA events after the search
          // request is made.

          if (isSearchRequested && !isGAResponseReceived) {
            return false;
          }

          if (isSearchRequested && isGAResponseReceived) {
            window.location.assign(requestUrl);
            return true;
          }

          if (!isSearchRequested && !isGAResponseReceived) {
            this.setState({
              isSearchRequested: true
            }); // Send GA "Search" Catalog, "Query Sent" Action Event

            _utils.default.trackSearchQuerySend(searchInputValue, _gaConfig.default.customDimensions, function () {
              _this3.setState({
                isGAResponseReceived: true
              }); // Go to the proper search page


              window.location.assign(requestUrl);
            });
          }
        }
      } else {
        event.preventDefault(); // No search input has been entered

        this.setState({
          placeholder: 'Please enter a search term.'
        });
        this.animationTimer();
        this.refs.headerSearchInputField.focus();
      }

      return true;
    }
  }, {
    key: "renderSearchInputField",
    value: function renderSearchInputField() {
      var animationClass = this.getAnimationClass();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.props.className, "-inputBox ").concat(animationClass)
      }, /*#__PURE__*/_react.default.createElement("label", {
        className: this.props.type === 'mobile' ? 'visuallyHidden' : '',
        htmlFor: "".concat(this.props.className, "-searchInput")
      }, "Enter Search Keyword"), /*#__PURE__*/_react.default.createElement("input", {
        id: "".concat(this.props.className, "-searchInput"),
        type: "text",
        ref: "headerSearchInputField",
        placeholder: this.state.placeholder,
        value: this.state.searchInput,
        onChange: this.handleSearchInputChange,
        onKeyPress: this.handleKeyPress,
        required: true,
        "aria-required": "true",
        autoComplete: "off",
        autoFocus: true
      }), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.SearchIcon, {
        ariaHidden: true,
        focusable: false
      }));
    }
  }, {
    key: "renderMobileControls",
    value: function renderMobileControls() {
      var _this4 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.props.className, "-mobileControls")
      }, /*#__PURE__*/_react.default.createElement("button", {
        "aria-label": "Submit Catalog Search",
        onClick: function onClick() {
          return _this4.submitSearchRequest('catalog');
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "label"
      }, "CATALOG"), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.RightWedgeIcon, {
        ariaHidden: true,
        focusable: false
      })), /*#__PURE__*/_react.default.createElement("button", {
        "aria-label": "Submit NYPL Website Search",
        onClick: function onClick() {
          return _this4.submitSearchRequest('website');
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "label"
      }, "NYPL.ORG"), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.RightWedgeIcon, {
        ariaHidden: true,
        focusable: false
      })));
    }
  }, {
    key: "renderDesktopControls",
    value: function renderDesktopControls() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.props.className, "-desktopControls")
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        name: "catalogWebsiteSearch",
        id: "catalogSearch",
        value: "catalog",
        checked: this.state.searchOption === 'catalog',
        onChange: this.handleSearchOptionChange
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "catalogSearch",
        className: "catalogOption"
      }, "Search the Catalog"), /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        name: "catalogWebsiteSearch",
        id: "websiteSearch",
        value: "website",
        checked: this.state.searchOption === 'website',
        onChange: this.handleSearchOptionChange
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "websiteSearch",
        className: "websiteOption"
      }, "Search NYPL.org"), /*#__PURE__*/_react.default.createElement("button", {
        type: "submit",
        onClick: function onClick() {
          return _this5.submitSearchRequest(null);
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, "Search"), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.SearchIcon, {
        ariaHidden: true,
        fill: "#FFF",
        focusable: false
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.className,
        role: "dialog"
      }, /*#__PURE__*/_react.default.createElement("fieldset", null, /*#__PURE__*/_react.default.createElement("legend", {
        className: "".concat(this.props.className, "-legend visuallyHidden")
      }, this.props.legendText), this.renderSearchInputField(), this.props.type === 'mobile' ? this.renderMobileControls() : this.renderDesktopControls()));
    }
  }]);

  return SearchBox;
}(_react.default.Component);

SearchBox.propTypes = {
  lang: _propTypes.default.string,
  className: _propTypes.default.string.isRequired,
  type: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  legendText: _propTypes.default.string
};
SearchBox.defaultProps = {
  lang: 'en',
  type: '',
  placeholder: 'What would you like to find?',
  legendText: 'Enter a keyword, then choose to search either the catalog or the website'
};
var _default = SearchBox;
exports.default = _default;