'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputField = require('../InputField/InputField.js');

var _InputField2 = _interopRequireDefault(_InputField);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// Import components

// ALT Flux Store/Actions

// GA Utility Library


// Radio button properties
var inputOptionData = [{
  id: 'catalog',
  name: 'inputOption',
  value: 'catalog',
  ref: 'optionCatalog',
  labelText: 'Search the Catalog'
}, {
  id: 'website',
  name: 'inputOption',
  value: 'website',
  ref: 'optionWebsite',
  labelText: 'Search NYPL.org'
}];

// mobile submit button properties
var mobileSubmitButtonData = [{
  columnClass: 'left-column',
  value: 'catalog',
  text: 'catalog'
}, {
  columnClass: 'right-column',
  value: 'website',
  text: 'nypl.org'
}];

var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchBox).call(this, props));

    _this.state = {
      searchKeywords: '',
      searchOption: 'catalog',
      placeholder: 'What would you like to find?',
      placeholderAnimation: null,
      noAnimationBefore: true,
      actionValue: _HeaderStore2.default.getState().searchButtonAction,
      lastActiveMenuItem: _HeaderStore2.default.getState().lastActiveMenuItem
    };

    // The function listens to the changes of input fields
    _this._inputChange = _this._inputChange.bind(_this);
    // The function sends search requests
    _this._submitSearchRequest = _this._submitSearchRequest.bind(_this);
    // Listen to the event if enter is pressed
    _this._triggerSubmit = _this._triggerSubmit.bind(_this);
    // The fucntion to trigger validation animation for keywords input
    _this._animationTimer = _this._animationTimer.bind(_this);
    _this._watchHoverIntentEnter = _this._watchHoverIntentEnter.bind(_this);
    _this._watchHoverIntentLeave = _this._watchHoverIntentLeave.bind(_this);
    return _this;
  }

  // Listen to the search button action changes in Store,


  _createClass(SearchBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _HeaderStore2.default.listen(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HeaderStore2.default.unlisten(this._onChange.bind(this));
    }

    // Update the state of the class

  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({
        actionValue: _HeaderStore2.default.getState().searchButtonAction,
        lastActiveMenuItem: _HeaderStore2.default.getState().lastActiveMenuItem
      });
    }

    /**
     *  _inputChange(field, event)
     * Listen to the changes on keywords input field and option input fields.
     * Grab the event value, and change the state.
     * The parameter indicates which input field has been changed.
     * Passng event as the argument here as FireFox doesn't accept event
     * as a global variable.
     *
     * @param {String} field  {Event Object} event
     */

  }, {
    key: '_inputChange',
    value: function _inputChange(field, event) {
      if (field === 'keywords') {
        this.setState({ searchKeywords: event.target.value });
      } else if (field === 'option') {
        this.setState({ searchOption: event.target.value });
      }
    }

    /**
     * _submitSearchRequest(value)
     * Submit the search request based on the values of the input fields.
     *
     * @param {String} value
     */

  }, {
    key: '_submitSearchRequest',
    value: function _submitSearchRequest(value) {
      var encoreBaseUrl = 'http://browse.nypl.org/iii/encore/search/';
      var catalogBaseUrl = 'http://www.nypl.org/search/apachesolr_search/';
      // Store the data that the user entered
      var requestParameters = {
        keywords: this.state.searchKeywords.trim(),
        // If the value is null, it indicates the function is triggered on desktop version.
        // Then it should get the value for option from state.
        option: value || this.state.searchOption
      };
      // The variable for request URL
      var requestUrl = void 0;
      var gaSearchLabel = void 0;

      // Decide the search option based on which button the user clicked on mobile version search box
      if (requestParameters.option === 'catalog') {
        gaSearchLabel = 'Submit Catalog Search';
        requestUrl = this._setEncoreUrl(requestParameters.keywords, encoreBaseUrl, 'eng');
      } else if (requestParameters.option === 'website') {
        gaSearchLabel = 'Submit Search';
        requestUrl = this._setCatalogUrl(requestParameters.keywords, catalogBaseUrl);
      }

      // This portion is for the interactions if the user doesn't enter any input
      if (!requestParameters.keywords) {
        // The new placeholder that tells users there's no keywords input
        this.setState({ placeholder: 'Please enter a search term.' });
        // Trigger the validation animation
        this._animationTimer();
      } else {
        // Fire GA event to track Search
        _utils2.default._trackHeader('Search', gaSearchLabel);
        // Go to the search page
        window.location.assign(requestUrl);
      }
    }

    /**
     * _triggerSubmit(event)
     * The fuction listens to the event of enter key.
     * Submit search request if enter is pressed.
     *
     * @param {Event} event
     */

  }, {
    key: '_triggerSubmit',
    value: function _triggerSubmit(event) {
      if (event && event.charCode === 13) {
        this._submitSearchRequest(null);
      }
    }

    /**
     * _animationTimer()
     * Add the CSS animation to the placeholder of the keywords Input.
     * It adds the proper class to the html element to trigger the animation,
     * and then removes the class to stop it.
     *
     */

  }, {
    key: '_animationTimer',
    value: function _animationTimer() {
      var _this2 = this;

      var frame = 0;
      var animation = setInterval(function () {
        frame++;
        // Remove the class to stop the animation after 0.1s
        if (frame > 1) {
          clearInterval(animation);
          _this2.setState({ placeholderAnimation: null });
          // Set animation to be sequential
          _this2.setState({ noAnimationBefore: false });
        }
      }, 100);

      // Decide which CSS animation is going to perform
      // by adding different classes to the element.
      // It is based on if it is the first time the validation to be triggered.
      if (this.state.noAnimationBefore) {
        this.setState({ placeholderAnimation: 'initial' });
      } else {
        this.setState({ placeholderAnimation: 'sequential' });
      }
    }

    /**
     * _watchHoverIntentEnter()
     * If the lastActiveMenuItem passed as a prop
     * matches the search by hover. Then fire the
     * Action to store a reference to the lastActiveMenuItem as hoverSearch.
     */

  }, {
    key: '_watchHoverIntentEnter',
    value: function _watchHoverIntentEnter() {
      if (this.state.actionValue === 'hoverSearch') {
        _Actions2.default.setLastActiveMenuItem(this.state.actionValue);
      }
    }

    /**
     * _watchHoverIntentLeave()
     * Sets the Store's lastActiveMenuItem
     * property to an empty string when
     * hovered out.
     */

  }, {
    key: '_watchHoverIntentLeave',
    value: function _watchHoverIntentLeave() {
      _Actions2.default.setLastActiveMenuItem('');
    }

    /**
     * _setCatalogUrl(searchString, catalogBaseUrl)
     * Returns the final URL for the catalog search.
     */

  }, {
    key: '_setCatalogUrl',
    value: function _setCatalogUrl(searchString, catalogBaseUrl) {
      var catalogUrl = catalogBaseUrl || '//www.nypl.org/search/apachesolr_search/';

      if (searchString) {
        return catalogUrl + encodeURIComponent(searchString);
      }
    }

    /**
     * _encoreEncodeSearchString(string)
     * base64_encoding_map includes special characters that need to be
     * encoded using base64 - these chars are "=","/", "\", "?"
     * character : base64 encoded
     */

  }, {
    key: '_encoreEncodeSearchString',
    value: function _encoreEncodeSearchString(string) {
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

    /**
     * _setEncoreUrl(searchInput, baseUrl, language)
     * Returns the final URL for encore search which,
     * is first encoded, then concatenated by the
     * base encore root url. An optional scope and
     * language may be concatenated as well.
     */

  }, {
    key: '_setEncoreUrl',
    value: function _setEncoreUrl(searchInput, baseUrl, language, scopeString) {
      var searchTerm = this._encoreEncodeSearchString(searchInput);
      var rootUrl = baseUrl || 'http://browse.nypl.org/iii/encore/search/';
      var defaultLang = language ? '?lang=' + language : '';
      var finalEncoreUrl = void 0;

      if (searchTerm) {
        finalEncoreUrl = this._encoreAddScope(rootUrl, searchTerm, scopeString) + defaultLang;
      }

      return finalEncoreUrl;
    }

    /**
     * _encoreAddScope(baseUrl, searchString, scopeString)
     * Enchances the encore url with a possible scope.
     * If no scope is set, adds the required string to
     * be returned as the final url.
     */

  }, {
    key: '_encoreAddScope',
    value: function _encoreAddScope(baseUrl, searchString, scopeString) {
      return scopeString ? baseUrl + 'C__S' + searchString + scopeString + '__Orightresult__U' : baseUrl + 'C__S' + searchString + '__Orightresult__U';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // Set active class if search button is hovered or clicked
      var classes = (0, _classnames2.default)({
        'active animateMegaMenuEnter fadeIn': this.state.actionValue === 'hoverSearch',
        active: _HeaderStore2.default._getLastActiveMenuItem() === 'hoverSearch',
        mobileActive: this.state.actionValue === 'clickSearch'
      });
      // Classes for keywords input fields to activate pulse animation
      var pulseAnimation = (0, _classnames2.default)({
        'keywords-pulse-fade-in': this.state.placeholderAnimation === 'initial',
        'keywords-pulse': this.state.placeholderAnimation === 'sequential'
      });

      // Render radio buttons with their own properties
      var inputOptions = inputOptionData.map(function (element, i) {
        return _react2.default.createElement(
          'div',
          { className: _this3.props.className + '-Input-Option', key: i },
          _react2.default.createElement(_InputField2.default, {
            type: 'radio',
            id: element.id,
            name: element.name,
            value: element.value,
            ref: element.ref,
            checked: _this3.state.searchOption === element.value,
            onChange: _this3._inputChange.bind(_this3, 'option')
          }),
          _react2.default.createElement(
            'label',
            {
              htmlFor: element.id,
              className: _this3.props.className + '-Input-Options-label'
            },
            element.labelText
          )
        );
      });

      // Render submit buttons for the mobile version
      var mobileSubmitButtons = mobileSubmitButtonData.map(function (element, i) {
        return _react2.default.createElement(
          'div',
          {
            key: i,
            className: _this3.props.className + '-Mobile-Submit-Option ' + element.columnClass,
            value: element.value,
            onClick: _this3._submitSearchRequest.bind(_this3, element.value)
          },
          _react2.default.createElement(
            'span',
            { className: 'title' },
            element.text
          ),
          _react2.default.createElement('span', { className: 'nypl-icon-wedge-right icon' })
        );
      });

      return _react2.default.createElement(
        'div',
        {
          id: this.props.id,
          className: this.props.className + ' ' + classes,
          onKeyPress: this._triggerSubmit,
          onMouseEnter: this._watchHoverIntentEnter,
          onMouseLeave: this._watchHoverIntentLeave
        },
        _react2.default.createElement(
          'div',
          {
            id: this.props.className + '-Elements-Wrapper',
            className: this.props.className + '-Elements-Wrapper'
          },
          _react2.default.createElement(
            'div',
            {
              id: this.props.className + '-Elements-Input-Wrapper',
              className: this.props.className + '-Elements-Input-Wrapper'
            },
            _react2.default.createElement(
              'div',
              {
                id: this.props.className + '-Elements-Input-Keywords-Wrapper',
                className: this.props.className + '-Elements-Input-Keywords-Wrapper'
              },
              _react2.default.createElement(
                'div',
                { className: this.props.className + '-Input-Keywords-Border' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement('span', { className: 'nypl-icon-magnifier-thin icon' }),
                  _react2.default.createElement(_InputField2.default, {
                    type: 'text',
                    id: this.props.id + '-Input-Keywords',
                    className: this.props.className + '-Input-Keywords ' + pulseAnimation,
                    ref: 'keywords',
                    value: this.state.searchKeywords,
                    maxLength: '128',
                    placeholder: this.state.placeholder,
                    onChange: this._inputChange.bind(this, 'keywords')
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              {
                id: this.props.className + '-Elements-Input-Options-Wrapper',
                className: this.props.className + '-Elements-Input-Options-Wrapper'
              },
              inputOptions
            )
          ),
          _react2.default.createElement(
            'div',
            {
              id: this.props.className + '-Mobile-Submit',
              className: this.props.className + '-Mobile-Submit'
            },
            mobileSubmitButtons
          ),
          _react2.default.createElement('button', {
            id: this.props.className + '-Elements-SubmitButton',
            className: 'nypl-icon-magnifier-fat ' + this.props.className + '-Elements-SubmitButton',
            onClick: this._submitSearchRequest.bind(this, null)
          })
        )
      );
    }
  }]);

  return SearchBox;
}(_react2.default.Component);

SearchBox.propTypes = {
  lang: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};

SearchBox.defaultProps = {
  lang: 'en',
  id: 'SearchBox',
  className: 'SearchBox'
};

exports.default = SearchBox;